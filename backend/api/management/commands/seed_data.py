"""
Management command: python manage.py seed_data
Seeds the database with actual portfolio project data.
"""
from django.core.management.base import BaseCommand
from api.models import Project


class Command(BaseCommand):
    help = "Seeds the database with ShopSphere and ChatApp project data"

    def handle(self, *args, **kwargs):
        self.stdout.write("Seeding portfolio projects...")
        
        # Clear old sample projects
        Project.objects.all().delete()

        projects_data = [
            {
                "title": "ShopSphere",
                "slug": "shopsphere",
                "short_desc": "Full-Stack E-Commerce Platform",
                "description": "A full-stack e-commerce application with product catalog, search and filtering, JWT authentication, cart and wishlist management, Stripe payments, and order management.",
                "category": "full_stack",
                "tech_stack": [
                    "Django",
                    "Django REST Framework",
                    "React",
                    "PostgreSQL",
                    "Stripe",
                    "Tailwind CSS",
                ],
                "is_featured": True,
                "is_visible": True,
                "order": 1,
                "live_url": "https://shopsphere-gamma-puce.vercel.app/",
                "github_url": "https://github.com/niranjanreddy18/shopsphere",
            },
            {
                "title": "ChatApp",
                "slug": "chatapp",
                "short_desc": "Real-Time Messaging Platform",
                "description": "A real-time messaging application with WebSocket communication, JWT authentication, Redis channel layers, message persistence, typing indicators, and presence tracking.",
                "category": "real_time",
                "tech_stack": [
                    "Django",
                    "Django Channels",
                    "React",
                    "WebSockets",
                    "Redis",
                    "PostgreSQL",
                ],
                "is_featured": True,
                "is_visible": True,
                "order": 2,
                "live_url": "https://chatapp-one-neon.vercel.app/",
                "github_url": "https://github.com/niranjanreddy18/chatapp",
            },
        ]

        for p in projects_data:
            Project.objects.create(**p)

        self.stdout.write(self.style.SUCCESS("Portfolio project data seeded successfully!"))
