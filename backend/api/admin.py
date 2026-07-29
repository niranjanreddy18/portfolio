from django.contrib import admin
from django.utils.html import format_html
from .models import Skill, Project, Experience, ContactMessage, SiteConfig


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ["name", "category", "level_bar", "order", "is_visible"]
    list_filter = ["category", "is_visible"]
    list_editable = ["order", "is_visible"]
    search_fields = ["name"]
    ordering = ["category", "order"]

    def level_bar(self, obj):
        color = "#6ee7f7" if obj.level >= 80 else "#a78bfa" if obj.level >= 60 else "#f472b6"
        return format_html(
            '<div style="width:150px;background:#1a1a2e;border-radius:4px;height:8px;">'
            '<div style="width:{}%;background:{};border-radius:4px;height:8px;"></div></div>'
            '<span style="margin-left:8px;font-size:11px;color:#999;">{}/100</span>',
            obj.level, color, obj.level
        )
    level_bar.short_description = "Level"


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ["title", "category", "is_featured", "is_visible", "order", "created_at"]
    list_filter = ["category", "is_featured", "is_visible"]
    list_editable = ["is_featured", "is_visible", "order"]
    search_fields = ["title", "description"]
    prepopulated_fields = {"slug": ("title",)}
    readonly_fields = ["created_at", "updated_at"]
    fieldsets = (
        ("Content", {
            "fields": ("title", "slug", "description", "short_desc", "image")
        }),
        ("Classification", {
            "fields": ("category", "tech_stack", "order")
        }),
        ("Links", {
            "fields": ("live_url", "github_url")
        }),
        ("Visibility", {
            "fields": ("is_featured", "is_visible")
        }),
        ("Meta", {
            "fields": ("created_at", "updated_at"),
            "classes": ("collapse",)
        }),
    )


@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ["title", "company", "type", "period_display", "is_current", "is_visible"]
    list_filter = ["type", "is_current", "is_visible"]
    list_editable = ["is_visible"]
    search_fields = ["title", "company"]

    def period_display(self, obj):
        return obj.period
    period_display.short_description = "Period"


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ["name", "email", "status", "created_at"]
    list_filter = ["status", "created_at"]
    list_editable = ["status"]
    search_fields = ["name", "email", "message"]
    readonly_fields = ["name", "email", "message", "ip_address", "created_at"]

    def has_add_permission(self, request):
        return False  # Messages come from the form, not admin


@admin.register(SiteConfig)
class SiteConfigAdmin(admin.ModelAdmin):
    list_display = ["key", "value_short", "description"]
    search_fields = ["key", "description"]

    def value_short(self, obj):
        return obj.value[:80] + ("..." if len(obj.value) > 80 else "")
    value_short.short_description = "Value"
