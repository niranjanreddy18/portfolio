"""
Management command: python manage.py seed_data
Seeds the database with sample portfolio data.
"""
from django.core.management.base import BaseCommand
from api.models import Skill, Project, Experience
import datetime


class Command(BaseCommand):
    help = "Seeds the database with sample portfolio data"

    def handle(self, *args, **kwargs):
        self.stdout.write("Seeding skills...")
        skills_data = [
            # Frontend
            ("React / Next.js", "frontend", 95),
            ("TypeScript", "frontend", 88),
            ("Tailwind CSS", "frontend", 92),
            ("Vue.js", "frontend", 75),
            # Backend
            ("Django / DRF", "backend", 93),
            ("FastAPI", "backend", 85),
            ("Node.js", "backend", 82),
            # Database
            ("PostgreSQL", "database", 90),
            ("MongoDB", "database", 82),
            ("Redis", "database", 78),
            # DevOps
            ("Docker", "devops", 80),
            ("AWS", "devops", 75),
            ("GitHub Actions", "devops", 85),
            # AI/ML
            ("LangChain", "ai_ml", 85),
            ("OpenAI API", "ai_ml", 90),
            ("PyTorch", "ai_ml", 72),
        ]
        for name, cat, level in skills_data:
            Skill.objects.get_or_create(name=name, defaults={"category": cat, "level": level})

        self.stdout.write("Seeding projects...")
        projects_data = [
            {
                "title": "NeuralChat",
                "slug": "neuralchat",
                "description": "Full-stack LLM chat platform with memory, RAG, and multi-model routing.",
                "short_desc": "AI conversation platform with memory and RAG",
                "category": "ai_ml",
                "tech_stack": ["React", "Django", "LangChain", "Pinecone", "PostgreSQL"],
                "is_featured": True,
                "live_url": "https://example.com",
                "github_url": "https://github.com",
            },
            {
                "title": "CodeVault",
                "slug": "codevault",
                "description": "Developer productivity tool for saving, searching, and sharing code snippets with AI-powered tagging.",
                "short_desc": "SaaS snippet manager with AI tagging",
                "category": "saas",
                "tech_stack": ["Next.js", "FastAPI", "PostgreSQL", "OpenAI"],
                "is_featured": True,
                "live_url": "https://example.com",
                "github_url": "https://github.com",
            },
        ]
        for p in projects_data:
            Project.objects.get_or_create(slug=p["slug"], defaults=p)

        self.stdout.write("Seeding experience...")
        exp_data = [
            {
                "title": "Senior Full Stack Developer",
                "company": "TechVentures Inc.",
                "type": "work",
                "description": "Lead engineer on AI-powered SaaS products.",
                "skills": ["React", "Django", "AWS", "LangChain"],
                "start_date": datetime.date(2024, 1, 1),
                "is_current": True,
            },
            {
                "title": "Freelance Developer",
                "company": "Self-Employed",
                "type": "freelance",
                "description": "Delivered 15+ client projects across e-commerce, EdTech, and HealthTech.",
                "skills": ["React", "Django", "OpenAI", "Stripe"],
                "start_date": datetime.date(2023, 1, 1),
                "end_date": datetime.date(2023, 12, 31),
                "is_current": False,
            },
        ]
        for e in exp_data:
            Experience.objects.get_or_create(
                title=e["title"], company=e["company"],
                defaults=e
            )

        self.stdout.write(self.style.SUCCESS("✓ Sample data seeded successfully!"))
