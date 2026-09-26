# Django settings for Portfolio backend.
import os
from pathlib import Path
from datetime import timedelta
from decouple import Config, RepositoryEnv, config as default_config

BASE_DIR = Path(__file__).resolve().parent.parent

# Load configuration: priority:
# 1. System environment variables (Render, Docker, etc.)
# 2. .env file in BASE_DIR (local dev)
_env_file = BASE_DIR / ".env"
env_config = Config(RepositoryEnv(str(_env_file))) if _env_file.exists() else default_config

# --- Security ---
SECRET_KEY = env_config("SECRET_KEY", default="dev-secret-key-change-in-production")
DEBUG = env_config("DEBUG", default=True, cast=bool)
ALLOWED_HOSTS = [h.strip() for h in env_config("ALLOWED_HOSTS", default="localhost,127.0.0.1,testserver").split(",") if h.strip()]

# --- Apps ---
INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    # Third-party
    "rest_framework",
    "corsheaders",
    # Local
    "api",
]

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "config.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "config.wsgi.application"

# --- Database (PostgreSQL / SQLite fallback) ---
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}

if env_config("USE_SQLITE", default=False, cast=bool):
    DATABASES["default"] = {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }

# --- Auth ---
AUTH_PASSWORD_VALIDATORS = [
    {"NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"},
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]

# --- i18n ---
LANGUAGE_CODE = "en-us"
TIME_ZONE = "Asia/Kolkata"
USE_I18N = True
USE_TZ = True

# --- Static & Media ---
STATIC_URL = "/static/"
STATIC_ROOT = BASE_DIR / "staticfiles"
STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"

MEDIA_URL = "/media/"
MEDIA_ROOT = BASE_DIR / "media"

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# --- DRF ---
REST_FRAMEWORK = {
    "DEFAULT_PERMISSION_CLASSES": ["rest_framework.permissions.AllowAny"],
    "DEFAULT_RENDERER_CLASSES": ["rest_framework.renderers.JSONRenderer"],
    "DEFAULT_THROTTLE_CLASSES": [
        "rest_framework.throttling.AnonRateThrottle",
        "rest_framework.throttling.UserRateThrottle",
    ],
    "DEFAULT_THROTTLE_RATES": {
        "anon": "100/hour",
        "user": "1000/hour",
    },
    "DEFAULT_PAGINATION_CLASS": "rest_framework.pagination.PageNumberPagination",
    "PAGE_SIZE": 20,
}

# --- CORS ---
CORS_ALLOWED_ORIGINS = [
    origin.strip()
    for origin in env_config(
        "CORS_ALLOWED_ORIGINS",
        default="http://localhost:5173,http://127.0.0.1:5173"
    ).split(",")
    if origin.strip()
]
CORS_ALLOW_ALL_ORIGINS = DEBUG  # Only in development!

# --- Email Configuration (Gmail SMTP) ---
EMAIL_BACKEND = env_config(
    "EMAIL_BACKEND",
    default="django.core.mail.backends.smtp.EmailBackend",
)
EMAIL_HOST = env_config("EMAIL_HOST", default="smtp.gmail.com")
EMAIL_PORT = env_config("EMAIL_PORT", default=587, cast=int)
EMAIL_USE_TLS = env_config("EMAIL_USE_TLS", default=True, cast=bool)
EMAIL_HOST_USER = env_config("EMAIL_HOST_USER", default="")
EMAIL_HOST_PASSWORD = env_config("EMAIL_HOST_PASSWORD", default="")
EMAIL_TIMEOUT = env_config("EMAIL_TIMEOUT", default=10, cast=int)

# Admin recipient email for portfolio contact notifications
ADMIN_EMAIL = env_config(
    "ADMIN_EMAIL",
    default=env_config(
        "CONTACT_RECEIVER_EMAIL",
        default=env_config("CONTACT_EMAIL", default=EMAIL_HOST_USER)
    ),
)

DEFAULT_FROM_EMAIL = env_config(
    "DEFAULT_FROM_EMAIL",
    default=EMAIL_HOST_USER or "noreply@niranjan.dev",
)

# Kept for backward compatibility
CONTACT_RECEIVER_EMAIL = ADMIN_EMAIL
CONTACT_EMAIL = ADMIN_EMAIL

# --- Logging ---
LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "handlers": {
        "console": {"class": "logging.StreamHandler"},
    },
    "root": {
        "handlers": ["console"],
        "level": "WARNING",
    },
    "loggers": {
        "django": {
            "handlers": ["console"],
            "level": env_config("DJANGO_LOG_LEVEL", default="INFO"),
            "propagate": False,
        },
        "api": {
            "handlers": ["console"],
            "level": "INFO",
            "propagate": False,
        },
    },
}
