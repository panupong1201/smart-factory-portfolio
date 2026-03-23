# Smart Factory Portfolio - Folder Structure & File Reference

## Directory Tree with Descriptions

```
smart-factory-portfolio/
│
├── .github/                          # GitHub configuration
│   └── workflows/
│       └── deploy.yml                # GitHub Actions CI/CD deployment workflow
│
├── src/                              # Main application source code
│   │
│   ├── app/                          # Next.js App Router (pages & layouts)
│   │   ├── layout.tsx                # Root layout: metadata, fonts, global config
│   │   ├── page.tsx                  # Home page (/)
│   │   ├── globals.css               # Global Tailwind CSS
│   │   │
│   │   ├── [locale]/                 # Internationalized routing (EN/TH)
│   │   │   ├── layout.tsx            # Locale-specific layout wrapper
│   │   │   ├── page.tsx              # Localized home page (/en/, /th/)
│   │   │   └── projects/
│   │   │       └── [slug]/
│   │   │           └── page.tsx      # Localized project detail page
│   │   │
│   │   ├── projects/
│   │   │   └── [slug]/
│   │   │       └── page.tsx          # Non-localized project detail fallback
│   │   │
│   │   ├── toolkit/
│   │   │   └── page.tsx              # Tools & technology showcase page
│   │   │
│   │   └── api/                      # Next.js API routes (backend)
│   │       ├── contact/
│   │       │   └── route.ts          # POST /api/contact (email submission)
│   │       └── analytics/
│   │           ├── visit/
│   │           │   └── route.ts      # POST /api/analytics/visit (log visitor)
│   │           ├── logs/
│   │           │   └── route.ts      # GET /api/analytics/logs (retrieve logs)
│   │           └── summary/
│   │               └── route.ts      # GET /api/analytics/summary (stats)
│   │
│   ├── components/                   # React UI components
│   │   ├── Navbar.tsx                # Navigation header with language toggle
│   │   ├── Hero.tsx                  # Landing hero section with typing animation
│   │   ├── About.tsx                 # Personal introduction section
│   │   ├── WhyAI.tsx                 # AI expertise value proposition
│   │   ├── Skills.tsx                # Technical skills showcase
│   │   ├── Toolkit.tsx               # Tools & technology proficiency matrix
│   │   ├── Timeline.tsx              # Career roadmap (2022-2026) with animations
│   │   ├── Projects.tsx              # Featured projects grid
│   │   ├── Certificates.tsx          # Awards & certifications display
│   │   ├── Contact.tsx               # Contact form popup + social links
│   │   ├── Footer.tsx                # Footer with metadata & links
│   │   ├── PageTransition.tsx        # Page animation transitions (Framer Motion)
│   │   ├── LanguageProvider.tsx      # i18n context provider (EN/TH switcher)
│   │   ├── VisitLogger.tsx           # Logs visitor to analytics endpoint
│   │   ├── VisitSummary.tsx          # Displays visitor statistics
│   │   │
│   │   ├── ui/                       # Reusable UI components
│   │   │   ├── CertificateCard.tsx   # Individual certificate card
│   │   │   ├── CertificateModal.tsx  # Certificate details popup
│   │   │   ├── GlowHeading.tsx       # Styled glowing heading
│   │   │   └── ToolIcon.tsx          # Tool icon with proficiency indicator
│   │   │
│   │   └── project/                  # Project-specific components
│   │       ├── CompareGallery.tsx    # Before/after comparison gallery
│   │       └── SystemArchitecture.tsx # Technical architecture diagram
│   │
│   ├── data/                         # Static data & content
│   │   ├── projects.ts               # Array of project objects (problem, solution, media, impact)
│   │   ├── certificatesData.ts       # Array of certificates/awards with metadata
│   │   └── toolsData.ts              # Tool proficiency data with categories & icons
│   │
│   ├── locales/                      # Internationalization translations
│   │   ├── en.json                   # English UI text & strings
│   │   └── th.json                   # Thai UI text & strings
│   │
│   ├── lib/                          # Utility functions & helpers
│   │   ├── analytics.ts              # GA4 & PostHog integration functions
│   │   ├── visitorStore.ts           # Visitor tracking & storage logic
│   │   └── [other utilities]         # Additional helper functions
│   │
│   ├── types/                        # TypeScript type definitions
│   │   └── [type files]              # Global types & interfaces
│   │
│   └── middleware.ts                 # Next.js request middleware (language detection, etc.)
│
├── public/                           # Static assets (images, videos, etc.)
│   ├── certs/                        # Certificate images
│   ├── profile/                      # Profile pictures
│   └── projects/                     # Project media by folder
│       ├── 3DCart/                   # Project-specific assets
│       ├── dj-mes-smart-utility-dashboard/
│       ├── factory/
│       ├── line-stop/                # Project demo videos, before/after images
│       │   ├── gallery/
│       │   └── videos/
│       └── vision/                   # AI Vision project assets
│           ├── gallery/
│           └── videos/
│
├── docs/                             # Project documentation (AI-readable)
│   ├── PROJECT_OVERVIEW.md           # High-level project description
│   ├── ARCHITECTURE.md               # System design & component relationships
│   ├── FOLDER_STRUCTURE.md           # This file - directory reference
│   ├── COMPONENTS.md                 # UI component inventory
│   ├── API_DOCUMENTATION.md          # REST API endpoints reference
│   ├── DATA_FLOW.md                  # How data flows through the app
│   ├── SETUP_DEPLOYMENT.md           # Development & deployment instructions
│   ├── GLOSSARY.md                   # Project-specific terminology
│   └── deploy-guide.md               # VPS deployment guide (existing)
│
├── deploy/                           # Deployment configuration files
│   ├── docker-compose.yml            # Docker container orchestration
│   ├── Dockerfile                    # Docker image build configuration
│   ├── start.bat                     # Windows batch script to start app
│   ├── install.bat                   # Windows batch script to install deps
│   ├── install.sh                    # Linux shell script to install deps
│   └── [deployment utilities]
│
├── deploy-node/                      # Node.js deployment package (VPS)
│   └── package/                      # Deployed application directory
│       ├── .next/                    # Next.js build output (generated)
│       ├── node_modules/             # Installed dependencies (generated)
│       ├── [app files]               # Application code in production
│
├── storage/                          # Persistent data storage
│   └── visits.json                   # Visitor logs JSON file (analytics data)
│
├── Configuration Files (Root)
│   ├── package.json                  # NPM dependencies & scripts
│   ├── package-lock.json             # Dependency lock file
│   ├── tsconfig.json                 # TypeScript configuration
│   ├── next.config.ts                # Next.js build configuration
│   ├── tailwind.config.ts            # Tailwind CSS customization (if exists)
│   ├── postcss.config.mjs            # PostCSS configuration
│   ├── eslint.config.mjs             # ESLint linting rules
│   ├── middleware.ts                 # Next.js request middleware
│   ├── ecosystem.config.cjs          # PM2 process manager configuration
│   ├── Dockerfile                    # Docker container image
│   ├── docker-compose.yml            # Docker services composition
│   └── .env.example                  # Environment variable template
│
├── .env.local                        # Local environment variables (NOT committed)
├── .env.example                      # Template for .env files
├── .gitignore                        # Git ignore rules
├── .dockerignore                     # Docker ignore rules
├── next-env.d.ts                     # Next.js TypeScript definitions (auto-generated)
├── README.md                         # Project README (root-level docs)
└── [Git files]                       # .git/, .github/, etc.
```

---

## Key Directory Purposes

### `/src/app/`
**Next.js App Router - All pages and API routes**
- Contains page files that map to URL routes
- `layout.tsx` applies to all child routes
- `page.tsx` serves as the route's content
- `[dynamic]` segments create dynamic routes
- `api/` folder defines REST endpoints

### `/src/components/`
**Reusable React UI Components**
- `*.tsx` files are functional React components
- Exported as named/default exports
- Organized into subdirectories by type:
  - Root level: Page section components
  - `ui/`: Generic reusable UI elements
  - `project/`: Project-specific complex components
- All use TypeScript + styled with Tailwind CSS

### `/src/data/`
**Statically Defined Content**
- TypeScript files exporting arrays/objects
- NOT fetched from databases
- Manually updated when content changes
- Examples: `projects.ts`, `certificatesData.ts`, `toolsData.ts`

### `/src/locales/`
**Internationalization Translation Files**
- JSON files with key-value pairs
- Keys: translation identifiers (e.g., `navbar.home`)
- Values: localized text (English or Thai)
- Loaded dynamically based on route/user preference

### `/src/lib/`
**Utility Functions & Helper Code**
- Non-component code
- Shared logic (analytics, storage, validation, etc.)
- Exported as named functions/classes

### `/public/`
**Static Assets (Images, Videos, Documents)**
- Served directly by Next.js at root URL
- Reference in code: `/image.png` → `public/image.png`
- Subdirectories organize by content type/project

### `/docs/`
**Project Documentation for AI & Developers**
- Markdown files explaining architecture, setup, etc.
- Designed to be read by both humans and AI models
- This enables LLMs to understand project from scratch

### `/deploy/` & `/deploy-node/`
**Deployment Configuration & Runtime**
- Docker files for containerization
- Batch/shell scripts for Windows/Linux setup
- `deploy-node/` is the actual VPS deployment directory

### `/storage/`
**Persistent Data Storage**
- `visits.json`: Visitor analytics data
- File-based, no database
- Updated by API endpoints
- Read by analytics components

---

## File Type Reference

### TypeScript/JSX Files (`.tsx`, `.ts`)
- **`.tsx`**: React component files (HTML-like JSX syntax)
- **`.ts`**: Utility & library files (pure TypeScript/JavaScript)

### Configuration Files
- **`next.config.ts`**: Next.js build & runtime behavior
- **`tsconfig.json`**: TypeScript compiler options
- **`postcss.config.mjs`**: CSS transformation pipeline
- **`eslint.config.mjs`**: Linting rules & configuration
- **`ecosystem.config.cjs`**: PM2 process manager config

### Data Files
- **`.ts` in `/src/data/`**: Exported arrays/objects of structured data
- **`.json` in `/src/locales/`**: Translated strings by language
- **`.json` in `/storage/`**: Persistent application data

### Markdown (`.md`)
- **Documentation files**: Readable by humans & LLMs

### YAML / JSON
- **`.yml` in `.github/workflows/`**: GitHub Actions workflow definitions
- **`.json` in root**: Important metadata files (package.json, tsconfig.json)

---

## How Files Are Loaded/Executed

### Page Request Flow
```
URL: /en/projects/line-stop
    │
    ▼ Next.js Router
app/[locale]/projects/[slug]/page.tsx
    │
    ├─ Loads: layout.tsx hierarchy
    ├─ Loads: locales/en.json (translations)
    ├─ Loads: data/projects.ts (project details)
    ├─ Loads: components/** (UI components)
    │
    ▼ Renders HTML
Return page to browser
```

### API Request Flow
```
POST /api/contact (body: {name, email, message})
    │
    ▼ Next.js Router
app/api/contact/route.ts
    │
    ├─ Imports: lib/email.ts (if exists)
    ├─ Reads: process.env.SMTP_HOST, etc.
    ├─ Uses: nodemailer package
    │
    ▼ Sends email via SMTP
Return JSON response
```

### Component Render Flow
```
<HomePage />  (renders page.tsx)
    │
    ├─ <LanguageProvider>  (wraps app, provides i18n context)
    │   ├─ <Navbar />        (imports from components/Navbar.tsx)
    │   ├─ <Hero />          (imports from components/Hero.tsx)
    │   ├─ <Projects />      (imports from components/Projects.tsx)
    │   │   ├─ <ProjectCard /> × N  (from components/ProjectCard.tsx)
    │   │   └─ Data loaded from: data/projects.ts
    │   │
    │   └─ <Contact />       (imports from components/Contact.tsx)
    │       └─ Uses locales/[lang].json for text
    │
    ▼ Browser renders HTML + applies CSS + runs animations
```

---

## Import Path Aliases

### TypeScript Path Configuration (`tsconfig.json`)
```typescript
// Configured alias:
"@/*": ["./src/*"]

// Usage examples:
import { Hero } from '@/components/Hero'           // ✓ Resolves to src/components/Hero.tsx
import { analytics } from '@/lib/analytics'        // ✓ Resolves to src/lib/analytics.ts
import { projects } from '@/data/projects'         // ✓ Resolves to src/data/projects.ts
import { useLanguage } from '@/components/LanguageProvider'  // ✓
```

This avoids relative imports like `../../components/Hero` and makes refactoring easier.

---

## Environment Files

### `.env.example` (Template)
```env
# SMTP Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
CONTACT_TO_EMAIL=recipient@example.com

# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Deployment (GitHub Actions only)
HOST=your-vps-ip
USERNAME=Administrator
PASSWORD=your-password
PORT=22
```

### `.env.local` (Local Development)
- **NOT committed to git** (in `.gitignore`)
- Copy from `.env.example`
- Fill with development/test values
- Next.js loads automatically

### `.env.production` (Production Deployment)
- Handled via GitHub secrets
- VPS uses secrets injected by GitHub Actions
- Database/API credentials stored securely

---

## Build Output Directories (Generated)

### `.next/`
- **Auto-generated by `npm run build`**
- Contains: compiled JavaScript, optimized assets, SSR functions
- **Not committed** (in `.gitignore`)
- Deleted on rebuild

### `node_modules/`
- **Auto-generated by `npm install`**
- Contains: all NPM packages & dependencies
- **Not committed** (in `.gitignore`)
- Reproducible from `package.json` + `package-lock.json`

### `dist/` or `out/` (if generated)
- May be created by build scripts
- Contains: final deployment bundle
- **Typically not committed**

---

## Related Documentation
- [PROJECT_OVERVIEW.md](PROJECT_OVERVIEW.md) - High-level project description
- [ARCHITECTURE.md](ARCHITECTURE.md) - System design & component relationships
- [COMPONENTS.md](COMPONENTS.md) - UI component inventory & usage
- [API_DOCUMENTATION.md](API_DOCUMENTATION.md) - REST API endpoints
- [SETUP_DEPLOYMENT.md](SETUP_DEPLOYMENT.md) - Development & deployment guide
