# Smart Factory Portfolio - Project Overview

## Project Purpose
A professional portfolio website showcasing expertise in **Smart Factory & Industrial Automation Engineering**. The site presents Ton's professional journey, projects, technical skills, and accomplishments in manufacturing automation, PLC programming, AI vision systems, and IoT solutions.

**Owner**: Panupong Nokaew (Ton)  
**Repository**: https://github.com/panupong1201/smart-factory-portfolio  
**Live URL**: Deployed on Windows VPS via GitHub Actions  
**Status**: Active (v0.1.0)

---

## Core Features

### 1. **Bilingual Interface** (English & Thai)
- Dynamic language switching via context provider
- All UI text localized in JSON translation files
- Supports both English and Thai audience

### 2. **Portfolio Sections**
- **Hero**: Animated introduction with typing effect
- **About**: Personal mission and background
- **WhyAI**: AI expertise value proposition
- **Skills**: Technical proficiency showcase
- **Toolkit**: Tools & technology stack with proficiency levels
- **Timeline**: Career evolution roadmap (2022-2026)
- **Projects**: Detailed project gallery with comparisons
- **Certificates**: Awards and professional certifications
- **Contact**: Email form + social linking

### 3. **Project Showcase**
- Dynamic project detail pages (`/projects/[slug]`)
- Rich content: problem statements, solutions, technical details
- Media: galleries, before/after comparisons, demo videos
- Impact metrics: quantified project results
- System architecture diagrams for complex projects

### 4. **Visitor Analytics**
- Unique visitor tracking per browser session
- Aggregated stats: today, week, month, year
- Geolocation & user agent capture
- Contact action tracking (message vs. LINE channel)
- GA4 & PostHog integration support

### 5. **Contact Integration**
- Popup email form with SMTP delivery
- Channel tracking (send message / LINE)
- Event logging for analytics

---

## Technology Stack

### Frontend
| Technology | Purpose | Version |
|-----------|---------|---------|
| **React** | UI framework | 19.2.3 |
| **Next.js** | React framework + SSR | 16.1.6 |
| **TypeScript** | Type safety | 5.x |
| **Tailwind CSS** | Utility CSS framework | 4.2.1 |
| **Framer Motion** | Component animations | 12.34.1 |
| **Lucide React** | Icon library | 0.574.0 |
| **SimpleIcons** | Brand icons | 16.12.0 |
| **React Type Animation** | Typing effect library | 3.2.0 |

### Backend & Integration
| Component | Purpose |
|-----------|---------|
| **Next.js API Routes** | RESTful endpoints (contact, analytics) |
| **Nodemailer** | SMTP email delivery |
| **Google Analytics 4** | Web analytics (optional) |
| **PostHog** | Product analytics (optional) |
| **Geolocation API** | Visitor location tracking |

### Infrastructure & DevOps
| Component | Purpose |
|-----------|---------|
| **Docker** | Containerization |
| **PM2** | Node.js process manager |
| **GitHub Actions** | CI/CD deployment automation |
| **Windows VPS** | Production server |
| **git** | Version control |

### Development Tools
| Tool | Purpose |
|------|---------|
| **ESLint** | Code linting |
| **Next.js Compiler** | React bytecode optimization |
| **PostCSS** | CSS transformation |

---

## Project Dependencies Overview

### Core Runtime Dependencies
```
react@19.2.3               - UI library
react-dom@19.2.3           - DOM rendering
next@16.1.6                - React framework
framer-motion@12.34.1      - Animations
lucide-react@0.574.0       - Icons
react-type-animation@3.2.0 - Typing effects
simple-icons@16.12.0       - Brand icons
nodemailer@8.0.1           - Email sending
```

### Development Dependencies
```
typescript@5.x             - Language
tailwindcss@4.2.1          - CSS framework
@tailwindcss/postcss@4.2.1 - PostCSS plugin
eslint@9                   - Linting
babel-plugin-react-compiler - React optimization
```

---

## Environment Variables Required

### Production (`deployed to VPS`)
```bash
# SMTP Configuration (Contact Form)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=panupong.nokaew@gmail.com
SMTP_PASS=<app-password>
CONTACT_TO_EMAIL=panupong.nokaew@gmail.com

# Analytics (Optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Deployment (GitHub Actions)
HOST=<vps-ip-or-domain>
USERNAME=Administrator
PASSWORD=<vps-password>
PORT=<ssh-port-or-db-port>
```

### Development (`.env.local`)
Copy from `.env.example` and fill with test values.

---

## Project Maturity & Scale

- **Stage**: Early production (v0.1.0)
- **Scope**: Single-page portfolio + project details
- **Users**: Portfolio viewers, potential clients/employers
- **Content**: ~6-8 featured projects, certificates, timeline
- **Deployment**: Single Windows VPS with PM2
- **Maintenance**: Automatic CI/CD via GitHub Actions on push to `main`

---

## Key Architectural Decisions

1. **Next.js App Router**: Modern routing with file-based structure
2. **Standalone Build Output**: Self-contained deployment bundle
3. **Bilingual from Start**: i18n context provider for scalability
4. **Tailwind for Styling**: Utility-first for rapid development
5. **Framer Motion for Polish**: Enterprise-grade animations
6. **API Routes for Backend**: Serverless functions for contact/analytics
7. **JSON Store for Analytics**: Simple, filesystem-based visitor tracking
8. **GitHub Actions for CI/CD**: Automatic deployment on push
9. **Docker Support**: Containerization option for future scaling
10. **PM2 for Process Management**: Reliable Node.js process handling

---

## Related Documents
- [ARCHITECTURE.md](ARCHITECTURE.md) - System design & component relationships
- [FOLDER_STRUCTURE.md](FOLDER_STRUCTURE.md) - Detailed directory breakdown
- [COMPONENTS.md](COMPONENTS.md) - UI component inventory & purposes
- [API_DOCUMENTATION.md](API_DOCUMENTATION.md) - REST API reference
- [DATA_FLOW.md](DATA_FLOW.md) - How data flows through the application
- [SETUP_DEPLOYMENT.md](SETUP_DEPLOYMENT.md) - Development & deployment guide
- [GLOSSARY.md](GLOSSARY.md) - Project-specific terminology
