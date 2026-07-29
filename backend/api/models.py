from django.db import models
class Skill(models.Model):
    """A technology or skill with a proficiency level."""

    CATEGORY_CHOICES = [
        ("frontend", "Frontend"),
        ("backend", "Backend"),
        ("database", "Database"),
        ("devops", "DevOps"),
        ("ai_ml", "AI / ML"),
        ("other", "Other"),
    ]

    name = models.CharField(max_length=100)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    level = models.PositiveSmallIntegerField(
        default=80,
        help_text="Proficiency level 0–100"
    )
    icon = models.CharField(max_length=50, blank=True, help_text="Icon name or emoji")
    order = models.PositiveSmallIntegerField(default=0)
    is_visible = models.BooleanField(default=True)

    class Meta:
        ordering = ["category", "order", "name"]

    def __str__(self):
        return f"{self.name} ({self.category})"


class Project(models.Model):
    """A portfolio project."""

    CATEGORY_CHOICES = [
        ("ai_ml", "AI/ML"),
        ("saas", "SaaS"),
        ("api", "API"),
        ("open_source", "Open Source"),
        ("mobile", "Mobile"),
        ("other", "Other"),
    ]

    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    description = models.TextField()
    short_desc = models.CharField(max_length=300, blank=True)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    tech_stack = models.JSONField(default=list, help_text='["React", "Django", ...]')
    image = models.ImageField(upload_to="projects/", blank=True, null=True)
    live_url = models.URLField(blank=True)
    github_url = models.URLField(blank=True)
    is_featured = models.BooleanField(default=False)
    is_visible = models.BooleanField(default=True)
    order = models.PositiveSmallIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-is_featured", "order", "-created_at"]

    def __str__(self):
        return self.title


class Experience(models.Model):
    """Work experience or education entry."""

    TYPE_CHOICES = [
        ("work", "Work"),
        ("education", "Education"),
        ("freelance", "Freelance"),
        ("internship", "Internship"),
    ]

    title = models.CharField(max_length=200)
    company = models.CharField(max_length=200)
    type = models.CharField(max_length=50, choices=TYPE_CHOICES)
    description = models.TextField()
    skills = models.JSONField(default=list)
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    is_current = models.BooleanField(default=False)
    order = models.PositiveSmallIntegerField(default=0)
    is_visible = models.BooleanField(default=True)

    class Meta:
        ordering = ["-is_current", "-start_date"]

    def __str__(self):
        return f"{self.title} @ {self.company}"

    @property
    def period(self):
        start = self.start_date.strftime("%b %Y")
        end = "Present" if self.is_current else self.end_date.strftime("%b %Y")
        return f"{start} – {end}"


class ContactMessage(models.Model):
    """Inbound contact form submissions."""

    STATUS_CHOICES = [
        ("new", "New"),
        ("read", "Read"),
        ("replied", "Replied"),
        ("archived", "Archived"),
    ]

    name = models.CharField(max_length=200)
    email = models.EmailField()
    message = models.TextField()
    subject = models.CharField(max_length=300)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="new")
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"[{self.status.upper()}] {self.name} — {self.subject[:50]}"


class SiteConfig(models.Model):
    """Singleton model for site-wide configuration."""

    key = models.CharField(max_length=100, unique=True)
    value = models.TextField()
    description = models.CharField(max_length=300, blank=True)

    def __str__(self):
        return self.key
