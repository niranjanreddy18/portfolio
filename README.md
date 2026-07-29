# 🚀 Full Stack Developer Portfolio

A premium, modern developer portfolio built with **React + Vite** (frontend) and **Django REST Framework** (backend), featuring glassmorphism UI, smooth animations, and full API integration.

---

## ✨ Features

- 🎨 **Premium Dark UI** — Glassmorphism, gradient accents, animated backgrounds
- ⚡ **Fast & Optimized** — Vite build, code splitting, lazy loading
- 📱 **Fully Responsive** — Mobile, tablet, desktop
- 🤖 **Custom Animations** — Typewriter, scroll reveals, floating elements
- 🖱️ **Custom Cursor** — Smooth trailing ring cursor
- 📬 **Contact API** — Django-powered form with email notifications
- 🗂️ **Admin Dashboard** — Full Django admin for all content
- 🔍 **Project Search & Filter** — By category and keyword
- 🐳 **Docker Ready** — One-command dev & prod setup
- 🔒 **Production Secure** — CORS, rate limiting, env vars

---

## 📂 Project Structure

```
portfolio/
├── frontend/                  # React + Vite app
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Hero.jsx         # Typewriter, animated intro
│   │   │   ├── About.jsx        # Timeline, bio cards
│   │   │   ├── Skills.jsx       # Animated progress bars
│   │   │   ├── Projects.jsx     # Cards + search/filter
│   │   │   ├── Experience.jsx   # Timeline + certifications
│   │   │   ├── Testimonials.jsx
│   │   │   ├── Contact.jsx      # Form with API integration
│   │   │   ├── Footer.jsx
│   │   │   ├── LoadingScreen.jsx
│   │   │   └── CustomCursor.jsx
│   │   ├── hooks/
│   │   │   └── useReveal.js     # Scroll animation hook
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css            # Global styles + design system
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── package.json
│   └── Dockerfile
│
├── backend/                   # Django REST API
│   ├── config/
│   │   ├── settings.py          # All settings (env-driven)
│   │   ├── urls.py
│   │   └── wsgi.py
│   ├── api/
│   │   ├── models.py            # Skill, Project, Experience, ContactMessage
│   │   ├── serializers.py       # DRF serializers with validation
│   │   ├── views.py             # List/detail/create views
│   │   ├── urls.py              # API routes
│   │   ├── admin.py             # Rich admin customization
│   │   └── management/
│   │       └── commands/
│   │           └── seed_data.py # Sample data command
│   ├── requirements.txt
│   ├── manage.py
│   ├── .env.example
│   └── Dockerfile
│
├── docker-compose.yml
└── README.md
```

---

## 🛠 Tech Stack

| Layer      | Technology                          |
|------------|-------------------------------------|
| Frontend   | React 18, Vite, Tailwind CSS        |
| Backend    | Django 5, Django REST Framework     |
| Database   | PostgreSQL 16                       |
| Cache      | Redis 7                             |
| Deployment | Docker, Gunicorn, Nginx             |
| Fonts      | Syne, DM Mono, Outfit (Google)      |

---

## 🚀 Quick Start

### Option A — Docker (Recommended)

```bash
# 1. Clone the repo
git clone https://github.com/yourhandle/portfolio.git
cd portfolio

# 2. Copy env files
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

# 3. Launch everything
docker-compose up --build

# Frontend → http://localhost:5173
# Backend  → http://localhost:8000
# Admin    → http://localhost:8000/admin
```

---

### Option B — Manual Setup

#### Backend

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate          # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Edit .env with your values

# Quick start with SQLite (no Postgres needed for dev)
echo "USE_SQLITE=True" >> .env

# Run migrations
python manage.py migrate

# Create admin user
python manage.py createsuperuser

# Load sample data
python manage.py seed_data

# Start server
python manage.py runserver
# → http://localhost:8000
```

#### Frontend

```bash
cd frontend

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# VITE_API_URL=http://localhost:8000/api

# Start dev server
npm run dev
# → http://localhost:5173
```

---

## 🌐 API Endpoints

| Method | Endpoint                    | Description                         |
|--------|-----------------------------|-------------------------------------|
| GET    | `/api/health/`              | Health check                        |
| GET    | `/api/skills/`              | Grouped skills (`?category=frontend`)|
| GET    | `/api/projects/`            | All projects (`?category=&search=`) |
| GET    | `/api/projects/<slug>/`     | Single project detail               |
| GET    | `/api/experience/`          | Work experience list                |
| POST   | `/api/contact/`             | Submit contact form                 |

### Contact Form Payload
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "subject": "Project Inquiry",
  "message": "I'd love to work together on..."
}
```

---

## 🎨 Customization Guide

### 1. Personal Info
Edit `frontend/src/components/Hero.jsx`:
```jsx
<h1>Your Name</h1>
// roles array — add/remove roles for typewriter
const roles = ["Full Stack Developer", "AI Engineer", ...];
```

### 2. Projects
- **Option A**: Edit `frontend/src/components/Projects.jsx` → `projects` array
- **Option B**: Use Django admin at `/admin` to add projects via API

### 3. Skills
Edit `frontend/src/components/Skills.jsx` → `skillGroups` array, or seed via admin.

### 4. Colors / Theme
`frontend/src/index.css`:
```css
:root {
  --accent: #6ee7f7;   /* cyan */
  --accent2: #a78bfa;  /* violet */
}
```

### 5. Email Notifications
Set in `backend/.env`:
```env
EMAIL_BACKEND=django.core.mail.backends.smtp.EmailBackend
EMAIL_HOST_USER=your@gmail.com
EMAIL_HOST_PASSWORD=your-app-password
CONTACT_EMAIL=hello@yourname.dev
```

---

## 🔒 Production Deployment

### Frontend (Vercel / Netlify)

```bash
cd frontend
npm run build
# Deploy /dist to Vercel, Netlify, or any static host
```

**Vercel:**
```bash
npm i -g vercel
vercel --prod
```

Set env var: `VITE_API_URL=https://your-api.com/api`

---

### Backend (Railway / Render / VPS)

**Railway:**
```bash
railway init
railway up
```

Set environment variables in Railway dashboard.

**VPS with Nginx + Gunicorn:**
```bash
# Collect static files
python manage.py collectstatic

# Run with Gunicorn
gunicorn config.wsgi:application \
  --bind 0.0.0.0:8000 \
  --workers 4 \
  --timeout 120

# Add Nginx reverse proxy pointing to :8000
```

---

## 🧪 Running Tests

```bash
cd backend
pytest
```

---

## 📸 Design System

| Token           | Value           | Use                        |
|-----------------|-----------------|----------------------------|
| `--accent`      | `#6ee7f7`       | Primary cyan — CTAs, glows |
| `--accent2`     | `#a78bfa`       | Violet — gradients         |
| `bg-[#080810]`  | Near-black      | Page background            |
| `font-display`  | Syne            | Headings, logo             |
| `font-mono`     | DM Mono         | Labels, code, badges       |
| `font-sans`     | Outfit          | Body copy                  |

---

## 🙏 Credits

Built with ❤️ using React, Django, Tailwind CSS, and modern web standards.

---

## 📄 License

MIT — use freely, customize fully, credit appreciated.
