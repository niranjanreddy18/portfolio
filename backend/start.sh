#!/bin/sh
set -e

echo "==> Running database migrations..."
python manage.py migrate --noinput

echo "==> Seeding initial portfolio projects..."
python manage.py seed_data

echo "==> Starting Gunicorn on port ${PORT:-8000}..."
exec gunicorn --bind 0.0.0.0:${PORT:-8000} config.wsgi:application
