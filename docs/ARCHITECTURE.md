# Smart Factory Portfolio - System Architecture

## High-Level System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    CLIENT (Web Browser)                         │
│                    React 19 + Next.js 16                        │
│  - Navbar, Hero, About, Skills, Timeline, Projects, Contact    │
└────────────┬────────────────────────────────────────────────────┘
             │ HTTP/HTTPS
             ▼
┌─────────────────────────────────────────────────────────────────┐
│              NEXT.JS SERVER (SSR + API Routes)                  │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Pages & Components                                     │   │
│  │  - /                      (Root home page)              │   │
│  │  - /[locale]/             (Localized pages EN/TH)       │   │
│  │  - /projects/[slug]       (Project detail pages)        │   │
│  │  - /toolkit               (Tools showcase)              │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  API Routes                                             │   │
│  │  - POST /api/contact       (Email submission)           │   │
│  │  - POST /api/analytics/visit   (Log visitor)            │   │
│  │  - GET  /api/analytics/summary (Get stats)              │   │
│  │  - GET  /api/analytics/logs    (Retrieve logs)          │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Libraries & Utilities                                  │   │
│  │  - /lib/analytics.ts       (GA4 & PostHog integration)  │   │
│  │  - /lib/visitorStore.ts    (Visitor tracking logic)     │   │
│  │  - /middleware.ts          (Request middleware)         │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└────┬─────────────────────────┬────────────────┬────────────────┘
     │                         │                │
     ▼                         ▼                ▼
┌──────────────┐    ┌──────────────────┐  ┌─────────────────┐
│ SMTP Server  │    │ Storage Layer    │  │ External APIs   │
│ (Gmail)      │    │ /storage/visits  │  │ - GA4           │
│              │    │ - JSON file      │  │ - PostHog       │
│ Delivers     │    │ - Visitor logs   │  │ - Geolocation   │
│ contact      │    │ - Visit stats    │  │ - SimpleIcons   │
│ emails       │    │                  │  │                 │
└──────────────┘    └──────────────────┘  └─────────────────┘
```

---

## Component Hierarchy

### Page Tree Structure

```
App Root (layout.tsx)
│
├─ Root Pages
│  ├─ / 
│  │  └─ Renders: Navbar + Hero + About + WhyAI + Skills
│  │             + Toolkit + Timeline + Projects + Certificates
│  │             + Contact + Footer
│  │
│  ├─ /[locale]/**  (Internationalized Routes)
│  │  ├─ /en/
│  │  ├─ /th/
│  │  └─ Each renders localized versions
│  │
│  ├─ /projects/[slug]/
│  │  └─ Dynamic project detail page
│  │  └─ Renders: Navbar + ProjectHero + CompareGallery
│  │             + SystemArchitecture + Details + Footer
│  │
│  └─ /toolkit/
│     └─ Tools & technology showcase page
│
└─ API Routes
   ├─ /api/contact/route.ts
   ├─ /api/analytics/visit/route.ts
   ├─ /api/analytics/logs/route.ts
   └─ /api/analytics/summary/route.ts
```

---

## Component Composition (Home Page)

### Main Page Sections (render order)

```
<Page>
  <Navbar>
    - Logo / Brand
    - Navigation Links
    - Language Switcher (EN/TH)
  </Navbar>
  
  <Hero>
    - Main headline (with typing animation)
    - Subtitle
    - CTA buttons
  </Hero>
  
  <About>
    - Personal introduction
    - Mission statement
    - Background context
  </About>
  
  <WhyAI>
    - AI expertise section
    - Value proposition
    - DIfferentiator content
  </WhyAI>
  
  <Skills>
    - Professional competencies
    - Technical expertise areas
    - Skill badges/cards
  </Skills>
  
  <Toolkit>
    - Technology proficiency matrix
    - Tools grid with proficiency levels
    - Brand logos via SimpleIcons
  </Toolkit>
  
  <Timeline>
    - Career evolution (2022-2026)
    - Milestones & achievements
    - Desktop: horizontal circuit UI
    - Mobile: vertical stacked UI
  </Timeline>
  
  <Projects>
    - Featured projects grid
    - ProjectCard × N
    - Project links to detail pages
  </Projects>
  
  <Certificates>
    - Awards & certifications
    - CertificateCard × N
    - Modal popup for details
  </Certificates>
  
  <Contact>
    - Email contact form
    - Social media links (LINE, etc.)
    - Event tracking on click
  </Contact>
  
  <Footer>
    - Copyright
    - Links
    - Metadata
  </Footer>
  
  <VisitLogger>
    - Tracks first visit per session
    - Sends to /api/analytics/visit
  </VisitLogger>
</Page>
```

---

## Data Flow Diagrams

### 1. User Visit Flow

```
User lands on site
    │
    ▼
Page loads (browser)
    │
    ├─ Renders components
    ├─ Applies Tailwind styles
    └─ Loads animations (Framer Motion)
    │
    ▼
VisitLogger component mounts
    │
    ├─ Checks localStorage for visitor ID
    ├─ If new session:
    │  ├─ Generates new visitor ID
    │  └─ POST to /api/analytics/visit
    │     (captures: IP, user agent, language, geolocation)
    │
    └─ Response: visitor logged
```

### 2. Contact Form Flow

```
User clicks "Send Message"
    │
    ▼
Contact component triggers
    │
    ├─ Event tracking:
    │  ├─ GA4: gtag('event', 'contact_click', {channel: 'send_message'})
    │  ├─ PostHog: posthog.capture('contact_click', {channel: 'send_message'})
    │  └─ Internal: logEvent()
    │
    ▼
Contact form opens (modal)
    │
User fills form & submits
    │
    ▼
FormData packaged
    │
    ├─ POST /api/contact
    ├─ body: {name, email, subject, message}
    │
    ▼
Server processes (Node.js API Route)
    │
    ├─ Input validation
    ├─ Nodemailer configures SMTP
    ├─ Sends email to CONTACT_TO_EMAIL
    │
    ▼
Response to client
    │
    ├─ Success: "Email sent!"
    └─ Error: Display error message
```

### 3. Analytics Summary Flow

```
Frontend calls: GET /api/analytics/summary
    │
    ▼
Server reads: /storage/visits.json
    │
    ├─ Parse all visitor records
    ├─ Group by date (today, week, month, year)
    ├─ Count unique visitors per period
    │
    ▼
Return JSON summary
    │
    ├─ {
    │    today: 5,
    │    week: 23,
    │    month: 87,
    │    year: 342,
    │    updatedAt: "2026-03-23T10:00:00Z"
    │  }
    │
    ▼
Display on VisitSummary component
```

---

## Internationalization (i18n) Flow

```
LanguageProvider wraps entire app
    │
    ├─ Provides context: { language, toggleLanguage() }
    │
    ▼
Route detected: /[locale]/...
    │
    ├─ Query locale parameter (en or th)
    ├─ Load corresponding translation JSON
    │  ├─ /src/locales/en.json
    │  └─ /src/locales/th.json
    │
    ▼
Components access translations
    │
    ├─ useLanguage() hook retrieves current language
    ├─ Components render t('section.key')
    ├─ Text displays in current language
    │
    ▼
User toggles language (Navbar button)
    │
    ├─ Calls toggleLanguage()
    ├─ Updates context state
    ├─ Router navigates to /[new-locale]/...
    │
    ▼
Page re-renders with new language
```

---

## Deployment & CI/CD Flow

### GitHub Actions Workflow

```
Developer pushes to main branch
    │
    ▼
GitHub webhook triggers
    │
    ├─ Event: push to refs/heads/main
    │
    ▼
GitHub Actions workflow starts
    │
    ├─ File: .github/workflows/deploy.yml
    ├─ Trigger: name == "Deploy to Windows VPS"
    │
    ▼
SSH connection to VPS
    │
    ├─ Host: via secrets.HOST
    ├─ Auth: Username + Password (GitHub secrets)
    │
    ▼
Execute deployment script on VPS
    │
    ├─ cd C:\Users\Administrator\Desktop\deploy-node\package
    ├─ git fetch --all
    ├─ git reset --hard origin/main
    ├─ git clean -fd
    ├─ npm install
    ├─ pm2 reload smart-factory-portfolio || pm2 start npm --name ...
    │
    ▼
Application reloads/starts
    │
    ├─ PM2 manages Node.js process
    ├─ Server listens on port (default 3000)
    │
    ▼
Live site updated
```

---

## State Management Strategy

### Client-Side State

1. **Context API** (React Context)
   - `LanguageProvider`: Current language (EN/TH)
   - Used for: Component-wide translation switching

2. **localStorage**
   - `visitor_id`: Unique browser session ID
   - Used for: Not re-logging same visitor

3. **Component Local State** (useState)
   - Form inputs in Contact component
   - Modal open/close state
   - Animation triggers

### Server-Side State

1. **File System** (`/storage/visits.json`)
   - Persistent visitor logs
   - JSON format for portability
   - No database required

2. **Environment Variables** (secrets)
   - SMTP credentials
   - VPS credentials (GitHub Actions only)
   - Analytics IDs

---

## External Integrations

### 1. SMTP Email (Nodemailer)
- **Purpose**: Send contact form emails
- **Config**: Environment variables
- **Provider**: Gmail (or any SMTP server)
- **Endpoint**: `POST /api/contact`

### 2. Google Analytics 4
- **Purpose**: Track page views, events, user behavior
- **Integration**: Conditional gtag() calls
- **Event**: `contact_click` with channel metadata
- **Optional**: Set via `NEXT_PUBLIC_GA_ID`

### 3. PostHog Analytics
- **Purpose**: Product analytics & feature tracking
- **Integration**: Auto-capture if `window.posthog` exists
- **Event**: `contact_click` (same as GA4)
- **Optional**: 3rd-party script injection

### 4. Geolocation API
- **Purpose**: Determine visitor location
- **Used in**: /api/analytics/visit
- **Data**: City, country for visitor records

### 5. SimpleIcons
- **Purpose**: Brand logos for tech stack
- **Used in**: Toolkit component, project tech badges
- **Lookup**: Icon slug from toolsData

---

## Security Considerations

### Protected Secrets
- **SMTP credentials**: Never commit `.env.local`
- **VPS access**: Stored in GitHub secrets only
- **API keys**: Prefixed `NEXT_PUBLIC_*` only for client-safe data

### API Protection
- **Input Validation**: Contact form sanitization
- **CORS**: Next.js API routes inherit CORS policy
- **Rate Limiting**: Not currently implemented (consider for scaling)

### Deployment Security
- **SSH**: GitHub Actions uses SSH key auth to VPS
- **git reset --hard**: Prevents local file conflicts
- **git clean -fd**: Removes untracked files before deploy

---

## Performance Optimizations

1. **Next.js Compiler**: React bytecode optimization
2. **Tailwind JIT**: Only bundle used CSS classes
3. **Standalone Build**: Self-contained deployment (no node_modules)
4. **Image Optimization**: Next.js Image component for lazy loading
5. **Code Splitting**: Automatic route-based code splitting
6. **Framer Motion**: GPU-accelerated animations via transform/opacity

---

## Error Handling Flow

```
User Action
    │
    ▼
Try-Catch or Error Boundary?
    │
    ├─ Backend API Error
    │  ├─ Returns JSON: {error: "message"}
    │  └─ Client displays toast/modal
    │
    ├─ Frontend Component Error
    │  ├─ Caught by Error Boundary (if wrapped)
    │  └─ Displays fallback UI
    │
    └─ Network Error
       ├─ Timeout / 500 status
       └─ Retry mechanism (manual or automatic)
```

---

## Glossary of Key Concepts
See [GLOSSARY.md](GLOSSARY.md) for project-specific terminology.
