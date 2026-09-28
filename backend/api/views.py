import logging
import resend
from django.conf import settings
from django.utils import timezone
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from rest_framework import generics, status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Skill, Project, Experience, ContactMessage
from .serializers import (
    SkillSerializer,
    ProjectSerializer,
    ExperienceSerializer,
    ContactMessageSerializer,
)

logger = logging.getLogger(__name__)


# ---------------------------------------------------------------------------
# Skills
# ---------------------------------------------------------------------------

class SkillListView(generics.ListAPIView):
    serializer_class = SkillSerializer

    def get_queryset(self):
        qs = Skill.objects.filter(is_visible=True)
        category = self.request.query_params.get("category")
        if category:
            qs = qs.filter(category=category)
        return qs

    @method_decorator(cache_page(60 * 10))  # cache 10 min
    def list(self, request, *args, **kwargs):
        qs = self.get_queryset()
        grouped = {}
        for skill in qs:
            grouped.setdefault(skill.category, []).append(
                SkillSerializer(skill).data
            )
        return Response(grouped)


# ---------------------------------------------------------------------------
# Projects
# ---------------------------------------------------------------------------

class ProjectListView(generics.ListAPIView):
    serializer_class = ProjectSerializer
    def get_queryset(self):
        qs = Project.objects.filter(is_visible=True)
        category = self.request.query_params.get("category")
        search = self.request.query_params.get("search")
        featured = self.request.query_params.get("featured")

        if category:
            qs = qs.filter(category=category)
        if search:
            qs = qs.filter(title__icontains=search)
        if featured and featured.lower() == "true":
            qs = qs.filter(is_featured=True)
        return qs


class ProjectDetailView(generics.RetrieveAPIView):
    serializer_class = ProjectSerializer
    lookup_field = "slug"
    queryset = Project.objects.filter(is_visible=True)


# ---------------------------------------------------------------------------
# Experience
# ---------------------------------------------------------------------------

class ExperienceListView(generics.ListAPIView):
    serializer_class = ExperienceSerializer
    queryset = Experience.objects.filter(is_visible=True)

    @method_decorator(cache_page(60 * 30))
    def list(self, *args, **kwargs):
        return super().list(*args, **kwargs)


# ---------------------------------------------------------------------------
# Contact
# ---------------------------------------------------------------------------

class ContactCreateView(generics.CreateAPIView):
    """
    POST /api/contact/
    Saves the message to the database and notifies admin via Resend Email API.
    """
    serializer_class = ContactMessageSerializer

    def perform_create(self, serializer):
        # 1. Capture client IP address if available
        ip = (
            self.request.META.get("HTTP_X_FORWARDED_FOR", "").split(",")[0].strip()
            or self.request.META.get("REMOTE_ADDR")
        )

        # 2. Save contact message to database first (preserving existing functionality)
        instance = serializer.save()

        # 3. Send notification email to admin ONLY after database save succeeds
        self._send_notification(instance)

    def _send_notification(self, msg):
        """
        Send email notification to admin using the Resend Email API.
        Wrapped in try/except so email issues do not rollback the saved message.
        """
        recipient = (
            getattr(settings, "ADMIN_EMAIL", None)
            or getattr(settings, "CONTACT_RECEIVER_EMAIL", None)
        )

        if not recipient:
            logger.warning(
                "ADMIN_EMAIL is not configured. Skipping admin notification for contact message ID %s.",
                getattr(msg, "id", None),
            )
            return

        api_key = getattr(settings, "RESEND_API_KEY", "")
        if not api_key:
            logger.warning(
                "RESEND_API_KEY is not configured. Skipping admin notification for contact message ID %s.",
                getattr(msg, "id", None),
            )
            return

        from_email = (
            getattr(settings, "DEFAULT_FROM_EMAIL", None)
            or "onboarding@resend.dev"
        )

        # Format date/time of submission
        if getattr(msg, "created_at", None):
            submission_time = timezone.localtime(msg.created_at).strftime("%B %d, %Y at %I:%M %p %Z")
        else:
            submission_time = timezone.localtime(timezone.now()).strftime("%B %d, %Y at %I:%M %p %Z")

        # Sanitize subject line to prevent header injection
        raw_subject = (getattr(msg, "subject", "") or "").strip()
        single_line_subject = " ".join(raw_subject.split())
        subject = f"New Portfolio Contact Message: {single_line_subject}" if single_line_subject else "New Portfolio Contact Message"

        body = (
            f"You have received a new contact message from your portfolio website.\n\n"
            f"--------------------------------------------------\n"
            f"Contact Details\n"
            f"--------------------------------------------------\n"
            f"Sender Name : {msg.name}\n"
            f"Sender Email: {msg.email}\n"
            f"Subject     : {msg.subject}\n"
            f"Date / Time : {submission_time}\n\n"
            f"--------------------------------------------------\n"
            f"Message\n"
            f"--------------------------------------------------\n"
            f"{msg.message}\n\n"
            f"--------------------------------------------------\n"
            f"Note: Replying to this email will reply directly to {msg.email}."
        )

        try:
            resend.api_key = api_key
            params: resend.Emails.SendParams = {
                "from": from_email,
                "to": [recipient],
                "subject": subject,
                "text": body,
                "reply_to": msg.email,
            }
            email_resp = resend.Emails.send(params)
            logger.info(
                "Admin notification email sent successfully via Resend for contact message ID %s to %s (ID: %s)",
                getattr(msg, "id", None),
                recipient,
                email_resp.get("id") if isinstance(email_resp, dict) else email_resp,
            )
        except Exception as exc:
            # Crucial: Log error, but do NOT raise or rollback the database record
            logger.error(
                "Failed to send admin notification email via Resend for contact message ID %s: %s",
                getattr(msg, "id", None),
                exc,
                exc_info=True,
            )

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(
            {"message": "Your message has been received! I'll get back to you soon."},
            status=status.HTTP_201_CREATED,
        )


# ---------------------------------------------------------------------------
# Health check
# ---------------------------------------------------------------------------

@api_view(["GET"])
def health_check(request):
    return Response({"status": "ok", "version": "1.0.0"})



