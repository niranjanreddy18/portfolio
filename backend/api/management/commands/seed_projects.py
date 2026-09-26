"""
Management command: python manage.py seed_projects
Alias for seed_data. Seeds the database with portfolio projects idempotently.
"""
from api.management.commands.seed_data import Command

__all__ = ["Command"]
