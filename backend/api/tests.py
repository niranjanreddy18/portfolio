import pytest
from unittest.mock import patch
from django.urls import reverse
from django.core import mail
from rest_framework import status
from rest_framework.test import APIClient
from api.models import ContactMessage


@pytest.fixture
def api_client():
    return APIClient()


@pytest.mark.django_db
def test_contact_form_saves_to_database_and_sends_email(api_client, settings):
    settings.ADMIN_EMAIL = "admin@example.com"
    settings.EMAIL_HOST_USER = "sender@gmail.com"
    settings.DEFAULT_FROM_EMAIL = "sender@gmail.com"
    settings.EMAIL_BACKEND = "django.core.mail.backends.locmem.EmailBackend"

    payload = {
        "name": "Jane Doe",
        "email": "janedoe@example.com",
        "subject": "Collaboration Inquiry",
        "message": "Hello, I would love to collaborate on a software project.",
    }

    url = reverse("contact-create")
    response = api_client.post(url, payload, format="json")

    # 1. API Response Check
    assert response.status_code == status.HTTP_201_CREATED
    assert "message" in response.data

    # 2. Database Persistence Check
    assert ContactMessage.objects.count() == 1
    saved = ContactMessage.objects.first()
    assert saved.name == "Jane Doe"
    assert saved.email == "janedoe@example.com"
    assert saved.subject == "Collaboration Inquiry"
    assert saved.message == payload["message"]

    # 3. Email Notification Check
    assert len(mail.outbox) == 1
    sent_mail = mail.outbox[0]
    assert "New Portfolio Contact Message: Collaboration Inquiry" in sent_mail.subject
    assert "admin@example.com" in sent_mail.to
    assert sent_mail.reply_to == ["janedoe@example.com"]
    assert "Jane Doe" in sent_mail.body
    assert "janedoe@example.com" in sent_mail.body
    assert "Collaboration Inquiry" in sent_mail.body
    assert payload["message"] in sent_mail.body
    assert "Date / Time :" in sent_mail.body


@pytest.mark.django_db
def test_contact_form_persists_even_if_email_fails(api_client, settings):
    """If SMTP fails, contact message must NOT be rolled back or lost."""
    settings.ADMIN_EMAIL = "admin@example.com"
    settings.EMAIL_BACKEND = "django.core.mail.backends.locmem.EmailBackend"

    payload = {
        "name": "Alex Smith",
        "email": "alex@example.com",
        "subject": "Urgent Question",
        "message": "This is a test message to verify error handling behavior.",
    }

    url = reverse("contact-create")

    # Mock send() to raise an exception simulating SMTP connection/auth failure
    with patch("django.core.mail.EmailMessage.send", side_effect=Exception("SMTP Connection Error")):
        response = api_client.post(url, payload, format="json")

    # Message must still be returned as 201 Created to frontend
    assert response.status_code == status.HTTP_201_CREATED

    # Message must be preserved in the database
    assert ContactMessage.objects.filter(email="alex@example.com").exists()
    saved = ContactMessage.objects.get(email="alex@example.com")
    assert saved.name == "Alex Smith"
    assert saved.subject == "Urgent Question"


@pytest.mark.django_db
def test_contact_form_validation_failure(api_client):
    """Invalid data should return 400 and not send email or save."""
    payload = {
        "name": "A",  # Too short (< 2 chars)
        "email": "not-an-email",
        "subject": "",
        "message": "Short",  # Too short (< 10 chars)
    }

    url = reverse("contact-create")
    response = api_client.post(url, payload, format="json")

    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert ContactMessage.objects.count() == 0
    assert len(mail.outbox) == 0


@pytest.mark.django_db
def test_seed_projects_and_api_projects_endpoint(api_client):
    """Verify seed_data creates 2 projects idempotently and /api/projects/ returns them."""
    from django.core.management import call_command
    from api.models import Project

    # Initial state
    assert Project.objects.count() == 0

    # First run: creates 2 projects
    call_command("seed_data")
    assert Project.objects.count() == 2

    # Second run: idempotent update, still exactly 2 projects
    call_command("seed_data")
    assert Project.objects.count() == 2

    # Verify GET /api/projects/
    url = reverse("projects-list")
    response = api_client.get(url)
    assert response.status_code == status.HTTP_200_OK

    data = response.json()
    results = data["results"] if isinstance(data, dict) and "results" in data else data
    assert len(results) == 2

    slugs = {p["slug"] for p in results}
    assert "shopsphere" in slugs
    assert "chatapp" in slugs

