# Smart Factory Portfolio - Data Flow Guide

## Data Flow Diagrams & Explanations

This document illustrates how data moves through the Smart Factory Portfolio application at various levels of detail.

---

## 1. User Session Lifecycle

### Visitor's First Load

```
User Opens Browser → smart-factory-portfolio.com
│
├─ Browser makes GET request to root /
│
▼
Next.js Server
├─ Loads layout.tsx (root)
├─ Loads page.tsx (home)
├─ Applies LanguageProvider context
├─ Renders all components
│  ├─ Navbar
│  ├─ Hero
│  ├─ About
│  ├─ ...
│  └─ VisitLogger (mounts and runs)
│
▼
VisitLogger Component Executes
├─ Checks localStorage.getItem('visitor_id')
│
├─ If NOT found:
│  ├─ Call lib/visitorStore.createVisitorId()
│  │  ├─ Hash browser fingerprint (device info)
│  │  └─ Generate unique hash
│  ├─ Store in localStorage
│  └─ POST to /api/analytics/visit
│     ├─ Include: visitor ID, user agent, language, timestamp
│     └─ Server logs to storage/visits.json
│
└─ If found:
   └─ Skip (already logged this session)

▼ Seconds Later
HTML Hydration
├─ CSS applies (Tailwind)
├─ JavaScript interactive
└─ Framer Motion animations start

▼ Minutes Later
User Sees Full Page
├─ All components rendered
├─ All sections visible (Hero, Projects, etc.)
└─ User ready to interact
```

### Key Data Points Captured
```json
{
  "visitorId": "hash-based-on-fingerprint",
  "timestamp": "2026-03-23T10:15:30Z",
  "userAgent": "browser-and-os-info",
  "language": "en-US",
  "ip": "192.168.1.100",
  "country": "TH",
  "city": "Bangkok"
}
```

---

## 2. Contact Form Submission Data Flow

### User Interaction → Email Delivery

```
User clicks "Contact Me" button
│
├─ Analytics Event Logged
│  ├─ GA4: gtag('event', 'contact_click', {channel: 'send_message'})
│  ├─ PostHog: posthog.capture('contact_click', {channel: 'send_message'})
│  └─ Internal: logContactClick()
│
▼
Contact Modal Opens
│
User Fills Form
├─ Name: "John Smith"
├─ Email: "john@example.com"
├─ Subject: "Project Inquiry"
└─ Message: "I want to discuss..."
│
▼
User Clicks Submit Button
│
Form Validation (Client-Side)
├─ Check all fields not empty ✓
├─ Check email format valid ✓
└─ Show loading state
│
▼
HTTP Request Sent
POST /api/contact
Headers: {
  "Content-Type": "application/json"
}
Body: {
  "name": "John Smith",
  "email": "john@example.com",
  "subject": "Project Inquiry",
  "message": "I want to discuss..."
}
│
▼
Server Receives Request
│
Validation (Server-Side)
├─ Verify all fields present ✓
├─ Verify email format ✓
├─ Scan for spam/injection ✓
└─ Load environment variables:
   ├─ SMTP_HOST
   ├─ SMTP_PORT
   ├─ SMTP_USER
   ├─ SMTP_PASS (from .env.local or secrets)
   └─ CONTACT_TO_EMAIL
│
▼
Nodemailer Sends Email
│
├─ Connect to SMTP server (Gmail)
├─ Authenticate with credentials
├─ Build email:
│  ├─ To: sender.email@gmail.com
│  ├─ From: contact-form@smart-factory-portfolio.com
│  ├─ Subject: "New Contact: Project Inquiry"
│  └─ Body: HTML formatted with all fields
└─ Send via SMTP protocol
│
▼
Response Sent to Client
│
├─ Success: {success: true, message: "Email sent!"}
│  ├─ Client shows success toast
│  ├─ Modal closes
│  └─ Form resets
│
└─ Failure: {success: false, message: "SMTP error: ..."}
   ├─ Client shows error toast
   ├─ Modal stays open
   └─ User can retry
│
▼
Email Delivered to Inbox
│
Ton Receives Email
├─ From: John Smith (john@example.com)
├─ Subject: Project Inquiry
└─ Message: Full inquiry text
```

### Data Transformation Path
```
Form Input
   ↓ (JSON stringify)
Network Request
   ↓ (HTTP Body)
Server Route Handler
   ↓ (Parse JSON)
JavaScript Object
   ↓ (Nodemailer formats)
SMTP Email
   ↓ (Email protocol)
Gmail Server
   ↓ (Delivery)
Ton's Inbox
```

---

## 3. Project Data Loading & Display

### Static Data → Component Rendering

```
App Starts
│
▼
Import data/projects.ts
│
data/projects.ts (Hardcoded Array)
├─ Project 1:
│  ├─ slug: "line-stop-monitoring"
│  ├─ title: "Line Stop Monitoring System"
│  ├─ year: 2024
│  ├─ problem: "Detection delays in production line..."
│  ├─ solution: "Real-time monitoring with PLC..."
│  ├─ tech: ["Mitsubishi PLC", "V-Box", "Next.js"]
│  ├─ gallery: ["/projects/line-stop/gallery/1.jpg", ...]
│  ├─ compareImages: {before: "...", after: "..."}
│  └─ videoDemo: "/projects/line-stop/videos/demo.mp4"
│
├─ Project 2: {...}
├─ Project 3: {...}
└─ ...
│
▼
Home Page Loads (/)
│
<Projects /> Component Mounts
├─ Import { projects } from '@/data/projects'
├─ Map over projects array
│  └─ For each project:
│     ├─ Create <ProjectCard> component instance
│     ├─ Pass project data as prop
│     └─ Render card with:
│        ├─ Image: project.gallery[0]
│        ├─ Title: project.title
│        ├─ Description: project.solution.slice(0, 100) + "..."
│        └─ Tech badges: project.tech.map(tag => <Badge>{tag}</Badge>)
│
└─ Cards Rendered in Grid
   ├─ Desktop: 3 columns
   ├─ Tablet: 2 columns
   └─ Mobile: 1 column
│
▼
User Clicks Project Card
│
<ProjectCard onClick>
├─ Navigation triggered
└─ Router to /projects/[slug]
   where [slug] = "line-stop-monitoring"
│
▼
Dynamic Project Detail Page Loads
│
/projects/[slug]/page.tsx
├─ Get slug from URL params
├─ Find matching project:
│  project = projects.find(p => p.slug === slug)
│
▼
Detail Page Components Mount
│
Render:
├─ Navbar
├─ Hero with project title
├─ Problem Statement section
│  └─ Text: project.problem
├─ Solution section
│  └─ Text: project.solution
├─ <CompareGallery>
│  ├─ Load: project.compareImages
│  └─ Interactive comparison slider
├─ <SystemArchitecture>
│  └─ Render: project.architecture diagram
├─ Video Demo (if exists)
│  └─ Embed: project.videoDemo
├─ Tech Stack section
│  └─ Badges: project.tech
└─ Results/Impact
   └─ Text: project.impact
```

### Data Structure Flow
```
Disk: data/projects.ts
   ↓ (import at build time)
JavaScript: Array<Project>
   ↓ (prop drilling)
Components: <Projects> → <ProjectCard>
   ↓ (onClick router)
URL: /projects/[slug]
   ↓ (params)
Page Component: /projects/[slug]/page.tsx
   ↓ (find matching project)
Template: Detail page components
   ↓ (display data)
Browser: Rendered HTML
```

---

## 4. Internationalization (Language) Data Flow

### Language Selection → UI Translation

```
App Loads with Default Language
│
├─ Check URL: /en/... or /th/...
├─ Check localStorage: language_preference
├─ Check browser: navigator.language
└─ Default: English (en)
│
▼
<LanguageProvider> Wraps App
│
const [language, setLanguage] = useState('en')
│
Provides context:
├─ language: 'en' | 'th'
└─ toggleLanguage: () => setLanguage(opposite)
│
▼
Components Access Translations
│
<Hero />
├─ Call useLanguage() hook
├─ Get: { language, toggleLanguage }
├─ Get language translation file:
│  ├─ If 'en': import locales/en.json
│  └─ If 'th': import locales/th.json
│
▼
Translation File Structure
locales/en.json:
{
  "navbar": {
    "home": "Home",
    "projects": "Projects",
    "contact": "Contact"
  },
  "hero": {
    "title": "Smart Factory Engineer",
    "subtitle": "Bridging OT & IT..."
  },
  "projects": {
    "featured": "Featured Projects"
  }
  ...
}

locales/th.json:
{
  "navbar": {
    "home": "หน้าแรก",
    "projects": "โปรเจค",
    "contact": "ติดต่อ"
  },
  "hero": {
    "title": "วิศวกรโรงงานอัจฉริยะ",
    "subtitle": "เชื่อมต่อ OT & IT..."
  },
  ...
}

│
▼
Component Renders Text
│
const text = translations[language]['navbar']['home']
// Returns: "Home" (en) or "หน้าแรก" (th)
│
<p>{text}</p>

│
▼
User Sees Translated UI
│
Navbar displays in current language
All sections display in current language
│
▼
User Clicks Language Toggle Button (EN ↔ TH)
│
Navbar onClick handler
├─ Call toggleLanguage()
├─ Update context state
├─ Router navigates: /en/... → /th/... (or vice versa)
│
▼
Page Reloads with New Language
│
URL changes: /en/projects/xyz → /th/projects/xyz
│
All components re-render
├─ useLanguage() returns new language
├─ Load appropriate translation file
└─ All text displays in new language
```

### Translation Data Sample
```typescript
// locales/en.json
{
  "navbar": {
    "home": "Home",
    "projects": "Projects"
  }
}

// In component
const { language } = useLanguage()
const t = translations[language]

return <p>{t.navbar.home}</p> // Renders: "Home" or "หน้าแรก"
```

---

## 5. Analytics Data Pipeline

### Visitor Tracking → Statistics Aggregation

```
User Session Starts
│
VisitLogger Component Mounts
│
├─ Check localStorage['visitor_id']
│
├─ If new session:
│  ├─ Generate visitor ID
│  │  ├─ Hash device fingerprint
│  │  ├─ Salt with timestamp
│  │  └─ Create unique hash
│  │
│  ├─ Store in localStorage
│  │  └─ localStorage.setItem('visitor_id', hash)
│  │
│  └─ POST /api/analytics/visit
│     ├─ Send payload:
│     │  {
│     │    visitorId: "hash-123",
│     │    timestamp: "2026-03-23T10:15:30Z",
│     │    userAgent: "Mozilla/5.0...",
│     │    language: "en-US"
│     │  }
│     │
│     ├─ Server receives & processes
│     │  ├─ Validate payload
│     │  ├─ Call lib/visitorStore.logVisit()
│     │  │  ├─ Add IP address (from request)
│     │  │  ├─ Lookup geolocation (country, city)
│     │  │  └─ Create visitor object
│     │  │
│     │  ├─ Append to storage/visits.json
│     │  │  └─ File-based append (no database)
│     │  │
│     │  └─ Return 200 OK
│     │
│     └─ Client receives response ✓
│
└─ If returning visitor:
   └─ Skip logging (already recorded this session)

─────────────────────────────────

Later: Admin Requests Analytics

GET /api/analytics/summary
│
Server processes:
├─ Read storage/visits.json (entire file)
│
├─ Parse JSON into array
│  └─ visitorArray = [visitor1, visitor2, ...]
│
├─ Group by date range:
│  ├─ today: visitorArray.filter(v => v.timestamp >= TODAY_START)
│  ├─ week: visitorArray.filter(v => v.timestamp >= WEEK_START)
│  ├─ month: visitorArray.filter(v => v.timestamp >= MONTH_START)
│  └─ year: visitorArray.filter(v => v.timestamp >= YEAR_START)
│
├─ Get unique IDs per period:
│  ├─ todayCount = new Set(todayVisitors.map(v => v.visitorId)).size
│  ├─ weekCount = new Set(weekVisitors.map(v => v.visitorId)).size
│  └─ ...
│
├─ Format response:
│  {
│    success: true,
│    summary: {
│      today: 5,
│      week: 23,
│      month: 87,
│      year: 342,
│      updatedAt: "2026-03-23T23:59:59Z"
│    }
│  }
│
└─ Return to client

client/VisitSummary component:
├─ Fetch /api/analytics/summary
├─ Update state with summary data
└─ Display statistics:
   Today: 5 visitors
   Week: 23 visitors
   Month: 87 visitors
   Year: 342 visitors
```

### Storage Format
```json
// storage/visits.json
[
  {
    "visitorId": "hash-abc123",
    "timestamp": "2026-03-23T10:15:30.000Z",
    "userAgent": "Mozilla/5.0...",
    "language": "en-US",
    "ip": "192.168.1.100",
    "country": "TH",
    "city": "Bangkok"
  },
  {
    "visitorId": "hash-def456",
    "timestamp": "2026-03-23T09:45:20.000Z",
    "userAgent": "Mozilla/5.0...",
    "language": "th-TH",
    "ip": "203.146.255.255",
    "country": "TH",
    "city": "Chiang Mai"
  },
  // ... more visits
]
```

---

## 6. Deployment & Server Sync Data Flow

### Code Push → VPS Update

```
Developer Pushes to main Branch
│
git push origin main

│
▼ GitHub Webhook
GitHub Actions Triggered
│
.github/workflows/deploy.yml executes
│
├─ Event: push to main
├─ Runner: ubuntu-latest
├─ Job: deploy
│
▼
SSH Connection to VPS
│
├─ Auth: secrets.HOST, secrets.USERNAME, secrets.PASSWORD, secrets.PORT
│
├─ Execute deployment script:
│  cd 'C:\Users\Administrator\Desktop\deploy-node\package'
│  git fetch --all
│  git reset --hard origin/main
│  git clean -fd
│  npm install
│  pm2 reload smart-factory-portfolio || pm2 start npm --name 'smart-factory-portfolio' -- start
│
▼ VPS Server Execution
│
1. cd to deploy directory
   └─ Current working directory: C:\Users\Administrator\Desktop\deploy-node\package
│
2. git fetch --all
   ├─ Download latest changes from remote
   └─ Update local refs
│
3. git reset --hard origin/main
   ├─ Discard any local changes
   ├─ Reset working tree to remote/main
   └─ Handles conflicts by force-syncing
│
4. git clean -fd
   ├─ Remove untracked files (-f)
   └─ Remove untracked directories (-d)
│
5. npm install
   ├─ Install dependencies from package.json
   ├─ Use package-lock.json for consistency
   └─ Update node_modules/
│
6. pm2 reload or pm2 start
   ├─ If process already running:
   │  └─ Gracefully reload (restart with 0 downtime)
   │
   └─ If process not running:
      └─ Start new process named 'smart-factory-portfolio'
      └─ Run: npm start

│
▼
Node.js Application Running
│
├─ Next.js server listens on port 3000
├─ PM2 manages process lifecycle
├─ Application serves new code
│
└─ Live site has latest updates ✓

─────────────────────────────────

Verification:

1. Visit website: https://smart-factory-portfolio.com
2. Verify latest changes are live
3. Check console logs for errors
4. Monitor PM2 process status:
   pm2 status
   pm2 logs smart-factory-portfolio
```

---

## 7. Component Mount → Render → Display Cycle

### React Lifecycle with Data

```
User navigates to /en/projects/line-stop

│
▼
Next.js loads: /app/[locale]/projects/[slug]/page.tsx

│
├─ Extract params:
│  ├─ locale = "en"
│  └─ slug = "line-stop"

│
├─ Import: data/projects.ts
│
├─ Query: projects.find(p => p.slug === slug)
│
├─ Pass data to components:
│  ├─ <ProjectDetail project={projectData} />
│  ├─ <CompareGallery images={projectData.compareImages} />
│  └─ <SystemArchitecture schema={projectData.architecture} />

│
▼
Components Mount (useEffect hooks run)

│
├─ componentDidMount equivalent
│  ├─ Load external images
│  ├─ Fetch additional data (if needed)
│  └─ Set up event listeners

│
├─ Component state initialized:
│  ├─ selectedImage: 0
│  ├─ isModalOpen: false
│  └─ ...

│
▼
Components Render (JSX → React elements)

│
├─ Convert JSX to React element tree
├─ Apply Tailwind CSS classes
├─ Apply Framer Motion animations
│
└─ Produce VDOM (virtual DOM)

│
▼
React Reconciliation

│
├─ Compare new VDOM with previous VDOM
├─ Calculate minimal DOM changes
└─ Generate patch

│
▼
Browser DOM Update

│
├─ Apply patch to actual DOM
├─ Browser renders new HTML
└─ CSS layout/paint

│
▼
Page Displays to User

│
├─ Title: "Line Stop Monitoring System"
├─ Images loaded
├─ Animations playing
└─ Interactive ✓
```

---

## 8. Cross-Cutting Data Concerns

### Error Handling Data Flow

```
Error Occurs Somewhere
│
├─ Client-side:
│  ├─ try-catch blocks
│  ├─ Error boundaries (React)
│  └─ Browser console
│
├─ Server-side:
│  ├─ try-catch in API routes
│  ├─ Error object logged
│  └─ Safe error returned to client

│
▼
Error Response to Client

│
{
  success: false,
  message: "User-friendly error message",
  error: "Technical error details (dev only)"
}

│
▼
Client Displays Error

│
├─ Toast notification
├─ Alert dialog
└─ Form validation message
```

---

## 9. Data Persistence Layer

### Where Data Lives

| Data | Location | Type | Scope |
|------|----------|------|-------|
| Projects metadata | `src/data/projects.ts` | Static file | App-wide |
| Certificates | `src/data/certificatesData.ts` | Static file | App-wide |
| Tools/tech | `src/data/toolsData.ts` | Static file | App-wide |
| Translations | `src/locales/*.json` | Static files | App-wide |
| Visitor logs | `storage/visits.json` | Dynamic file | Growing |
| Environment vars | `.env.local` / secrets | Runtime vars | Runtime config |
| Session data | Browser localStorage | Client-side | Single browser |

### Data Mutations

```
Immutable (Read-Only):
├─ Projects data
├─ Certificates
├─ Tools
└─ Translations

Mutable (Written to):
├─ Visitor logs ← POST /api/analytics/visit
├─ Email archive ← POST /api/contact (external)
└─ localStorage ← visitor_id (client-side)
```

---

## 10. Real-Time Data Considerations

Currently, NO real-time data flow exists. All data is:
- **Static**: Loaded once at page render
- **Request-response**: Traditional HTTP polling
- **No WebSockets**: Not implemented

To add real-time in future:
```typescript
// Example: Live visitor count updates
import { io } from 'socket.io-client'

const socket = io('http://vps-server')
socket.on('visit_count', (count) => {
  setVisitorCount(count)
})
```

---

## Related Documentation
- [ARCHITECTURE.md](ARCHITECTURE.md) - System design overview
- [API_DOCUMENTATION.md](API_DOCUMENTATION.md) - API endpoint details
- [COMPONENTS.md](COMPONENTS.md) - Component structure
