import logging
from django.core.mail import send_mail
from django.conf import settings
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


# ──────────────────────────────────────────────
# Skills
# ──────────────────────────────────────────────

class SkillListView(generics.ListAPIView):
    """
    GET /api/skills/
    Returns all visible skills, optionally filtered by ?category=frontend
    """
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
        # Group by category
        grouped = {}
        for skill in qs:
            grouped.setdefault(skill.category, []).append(
                SkillSerializer(skill).data
            )
        return Response(grouped)


# ──────────────────────────────────────────────
# Projects
# ──────────────────────────────────────────────

class ProjectListView(generics.ListAPIView):
    """
    GET /api/projects/
    Supports ?category=ai_ml and ?search=query and ?featured=true
    """
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
    """GET /api/projects/<slug>/"""
    serializer_class = ProjectSerializer
    lookup_field = "slug"
    queryset = Project.objects.filter(is_visible=True)


# ──────────────────────────────────────────────
# Experience
# ──────────────────────────────────────────────

class ExperienceListView(generics.ListAPIView):
    """GET /api/experience/"""
    serializer_class = ExperienceSerializer
    queryset = Experience.objects.filter(is_visible=True)

    @method_decorator(cache_page(60 * 30))
    def list(self, *args, **kwargs):
        return super().list(*args, **kwargs)


# ──────────────────────────────────────────────
# Contact
# ──────────────────────────────────────────────

class ContactCreateView(generics.CreateAPIView):
    """
    POST /api/contact/
    Saves the message and sends notification email.
    """
    serializer_class = ContactMessageSerializer

    def perform_create(self, serializer):
        # Capture IP for spam prevention
        ip = (
            self.request.META.get("HTTP_X_FORWARDED_FOR", "").split(",")[0].strip()
            or self.request.META.get("REMOTE_ADDR")
        )
        instance = serializer.save()
        self._send_notification(instance)

    def _send_notification(self, msg):
        """Send email notification to site owner."""
        try:
            send_mail(
                subject=f"[Portfolio] New message from {msg.name}: {msg.subject}",
                message=(
                    f"From: {msg.name} <{msg.email}>\n"
                    f"Subject: {msg.subject}\n\n"
                    f"{msg.message}\n\n"
                    f"---\nReply to: {msg.email}"
                ),
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[settings.CONTACT_EMAIL],
                fail_silently=True,
            )
        except Exception as exc:
            logger.warning("Email send failed: %s", exc)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(
            {"message": "Your message has been received! I'll get back to you soon."},
            status=status.HTTP_201_CREATED,
        )


# ──────────────────────────────────────────────
# Health check
# ──────────────────────────────────────────────

@api_view(["GET"])
def health_check(request):
    """GET /api/health/ — quick availability check."""
    return Response({"status": "ok", "version": "1.0.0"})
