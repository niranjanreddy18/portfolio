from django.urls import path
from .views import (
    SkillListView,
    ProjectListView,
    ProjectDetailView,
    ExperienceListView,
    ContactCreateView,
    health_check,
)

urlpatterns = [
    # Health
    path("health/", health_check, name="health-check"),

    # Skills
    path("skills/", SkillListView.as_view(), name="skills-list"),

    # Projects
    path("projects/", ProjectListView.as_view(), name="projects-list"),
    path("projects/<slug:slug>/", ProjectDetailView.as_view(), name="project-detail"),

    # Experience
    path("experience/", ExperienceListView.as_view(), name="experience-list"),

    # Contact
    path("contact/", ContactCreateView.as_view(), name="contact-create"),
]
