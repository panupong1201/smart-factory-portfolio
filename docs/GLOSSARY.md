# Smart Factory Portfolio - Glossary

## Project-Specific Terminology & Abbreviations

This glossary defines key terms, acronyms, and concepts used throughout the Smart Factory Portfolio project.

---

## Technology & Framework Terms

### **Next.js**
Modern React framework for production applications. Provides features like:
- Server-Side Rendering (SSR)
- Static Generation (SSG)
- API Routes
- File-based routing (App Router)
- Automatic code splitting

*Usage*: "We're using Next.js 16 for the portfolio framework."

### **React**
JavaScript library for building user interfaces using component-based architecture.

*Context*: "React components are reusable, stateful UI elements."

### **App Router**
Next.js file-based routing system (modern, replaces older Pages Router).

*Example*: `src/app/page.tsx` automatically serves `/`

### **Server Component / Client Component**
- **Server Component**: Rendered on server, sends HTML to browser
- **Client Component**: Rendered in browser, uses `'use client'` directive

*Usage*: "This component needs interactivity, so mark it with 'use client'."

### **TypeScript (TS)**
Superset of JavaScript that adds static typing, enabling better IDE support and error prevention.

*Example*: `const name: string = "Ton"` ensures name is always a string.

### **Tailwind CSS**
Utility-first CSS framework. Instead of writing custom CSS, use predefined classes.

*Example*: `<div className="flex items-center justify-center">` for centering.

---

## Domain-Specific Terms

### **Smart Factory / Industry 4.0**
Concept of fully automated, data-driven manufacturing using IoT, AI, and real-time monitoring.

*Owner Context*: Ton specializes in bridging Operational Technology (OT) and Information Technology (IT) in manufacturing.

### **OT (Operational Technology)**
Technology focused on controlling physical devices and machines in industrial settings.

*Example*: PLCs, industrial sensors, manufacturing equipment, SCADA systems.

### **IT (Information Technology)**
Technology for processing, transmitting, and storing digital data. Bridges OT with business systems.

*Example*: Cloud platforms, data analytics, web applications, cybersecurity.

### **PLC (Programmable Logic Controller)**
Industrial computer used to control manufacturing processes and equipment.

*Ton's Expertise*: Mitsubishi PLC programming for factory automation.

### **HMI (Human-Machine Interface)**
Software/hardware for human operators to monitor and control industrial equipment.

*Example*: Dashboard displaying production line status.

### **AI Vision / Computer Vision**
Technology using artificial intelligence to interpret visual data from cameras.

*Use Case*: Quality control, defect detection, object recognition in manufacturing.

### **IoT (Internet of Things)**
Network of physical devices connected to the internet, collecting and sharing data.

*Factory Context*: Sensors on production lines sending real-time data to monitoring system.

### **SCADA (Supervisory Control and Data Acquisition)**
System software for monitoring and controlling industrial processes using real-time data.

### **V-Box**
Terminal/device mentioned in project tech stack (specific hardware for factory data collection).

### **Line Stop Monitoring**
System that detects and alerts when a production line stops unexpectedly.

*Project Context*: One of Ton's featured projects using PLC + Next.js integration.

---

## Project-Specific Terms

### **Portfolio**
Website showcasing professional work, skills, and projects. (This application is a portfolio site.)

### **Project Detail Page**
Dynamic page showing full information about a specific project.

*Example*: `/projects/line-stop-monitoring` with problem, solution, images, videos, architecture.

### **Compare Gallery / Before-After Gallery**
Interactive gallery showing transformation or improvement (before vs. after).

*Use Case*: Demonstrating project improvements or system implementations.

### **System Architecture**
Visual diagram showing components of a technical system and how they interact.

*Example*: Diagram showing PLC → Data Collector → Dashboard → Cloud connection.

---

## Data & Analytics Terms

### **Visitor**
Unique browser session accessing the portfolio website.

*Tracking*: Uses `visitor_id` stored in localStorage to avoid duplicate counting per browser.

### **Visit Log**
Record of a visitor session including timestamp, user agent, language, IP, location.

*Storage*: `storage/visits.json` (file-based JSON).

### **Analytics Summary**
Aggregated visitor statistics grouped by time period.

*Data*: Today, week, month, year unique visitor counts.

### **Session**
One continuous browsing experience by a single visitor on the website.

*Duration*: Typically one visit per browser session (cleared when browser closed).

### **Unique Visitor**
Individual counted once per time period (not duplicated even if visits multiple times).

*Calculation*: Unique count of visitor IDs per period.

---

## Internationalization (i18n) Terms

### **i18n**
Abbreviation for "internationalizat[i]o[n]" (18 letters between i and n).

*Means*: Supporting multiple languages in one application.

### **Locale**
Represents a language and regional variant.

*Examples*: 
- `en` = English (generic)
- `en-US` = English (United States)
- `th` = Thai (generic)
- `th-TH` = Thai (Thailand)

### **Translation / String Localization**
Process of converting UI text to different languages.

*Storage*: `src/locales/en.json`, `src/locales/th.json`

### **Language Context**
React Context providing current language and toggle function to all components.

*Provider*: `<LanguageProvider>` wraps entire app.

### **useLanguage Hook**
Custom React hook to access language context within components.

*Usage*: `const { language, toggleLanguage } = useLanguage()`

---

## Deployment & DevOps Terms

### **Deployment**
Process of moving application from development to production environment.

*Portfolio*: Automatically deployed to Windows VPS via GitHub Actions.

### **CI/CD (Continuous Integration / Deployment)**
Automated workflow for testing and deploying code changes.

*Platform*: GitHub Actions
*Trigger*: Push to `main` branch

### **GitHub Actions**
Automation platform by GitHub for running workflows on code events.

*File*: `.github/workflows/deploy.yml`

### **SSH (Secure Shell)**
Secure protocol for remotely connecting to and controlling servers.

*Usage*: GitHub Actions SSH into VPS to run deployment script.

### **VPS (Virtual Private Server)**
Virtualized server rented from hosting provider, dedicated to single client.

*Portfolio*: Windows-based VPS with Node.js and PM2 running production app.

### **PM2**
Process manager for Node.js applications, handles restart, monitoring, and clustering.

*Commands*: `pm2 start`, `pm2 stop`, `pm2 restart`, `pm2 logs`

### **Docker**
Container platform for packaging applications with dependencies.

*Portfolio*: Optional containerization via `Dockerfile` and `docker-compose.yml`.

### **Standalone Build**
Next.js build mode that creates self-contained bundle without requiring node_modules.

*Configuration*: `output: "standalone"` in `next.config.ts`

---

## API & Backend Terms

### **API (Application Programming Interface)**
Set of endpoints/rules for software to communicate with each other.

*Portfolio*: REST API endpoints for contact form, analytics, etc.

### **REST (Representational State Transfer)**
Architecture style for APIs using HTTP methods (GET, POST, etc.).

*Endpoints*: `/api/contact`, `/api/analytics/visit`, etc.

### **HTTP Methods**
Verbs specifying action on resource:
- **GET**: Retrieve data
- **POST**: Create/submit data
- **PUT**: Update data
- **DELETE**: Remove data

### **Status Code**
Numeric response indicating request result:
- **200**: OK (success)
- **400**: Bad Request (client error)
- **500**: Internal Server Error (server error)

### **Payload**
Data sent in request body (usually JSON format).

*Example*: Contact form data sent to `/api/contact`.

### **SMTP (Simple Mail Transfer Protocol)**
Protocol for sending emails via mail server.

*Configuration*: `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` in environment.

### **API Route / Route Handler**
File in `src/app/api/` that handles incoming HTTP requests.

*Example*: `src/app/api/contact/route.ts` handles POST requests to `/api/contact`

---

## Frontend & UI Terms

### **Component**
Reusable piece of UI, typically defined as React functional component.

*Example*: `<Navbar />`, `<Hero />`, `<ProjectCard />`

### **Props (Properties)**
Input parameters passed to a component for customization.

*Example*: `<ProjectCard project={projectData} />`

### **State**
Data stored within a component or context that can change over time.

*Example*: `const [language, setLanguage] = useState('en')`

### **Hook**
Function starting with `use` that provides React features in functional components.

*Examples*: `useState`, `useEffect`, `useContext`, `useLanguage`

### **Framer Motion**
Animation library for React providing smooth, performant motion.

*Usage*: Timeline animations, page transitions, hover effects.

### **Lucide React**
Icon library providing SVG icons as React components.

*Usage*: `<Settings />`, `<Menu />`, `<ChevronRight />` icons throughout UI.

### **Responsive Design**
UI that adapts to different screen sizes (mobile, tablet, desktop).

*Tool*: Tailwind CSS breakpoints (sm, md, lg, xl)

### **Modal / Popup**
Overlay dialog that appears on top of main content, typically for specific user action.

*Example*: Certificate details modal, contact form modal

### **Hover Effect**
Visual change when user hovers mouse over element.

*Examples*: Color change, scale, shadow, border highlight

---

## Development Workflow Terms

### **Branch**
Parallel version of code repository for independent work.

*Main*: `main` branch is production-ready code.

### **Commit**
Snapshot of code changes with descriptive message.

*Example*: `git commit -m "Add project detail page for Line Stop project"`

### **Push**
Upload commits to remote repository (GitHub).

*Example*: `git push origin main`

### **Pull Request (PR)**
Proposed changes submitted for review before merging to main branch.

*Process*: Create branch → Make changes → Submit PR → Review → Merge

### **Merge**
Combining changes from one branch into another (typically PR into main).

*Action*: GitHub "Merge pull request" button combines feature branch into main.

### **Build**
Process of compiling/bundling code for deployment.

*Command*: `npm run build` creates optimized production bundle in `.next/`

### **Dev Server**
Local development server for testing changes in real-time.

*Command*: `npm run dev` starts on `http://localhost:3000`

### **Production Build**
Optimized, minified code ready for deployment to live server.

*Differences*: Smaller bundle, better performance, no debug info.

### **ESLint**
Code quality tool that flags suspicious patterns and enforces style rules.

*Configuration*: `eslint.config.mjs`

### **TypeScript Compilation**
Process of checking types and compiling TypeScript to JavaScript.

*Error*: Type mismatch prevents build.

### **Environment Variable**
Configuration value loaded from `.env.local` at runtime.

*Example*: `SMTP_USER` contains email address for SMTP authentication.

---

## Performance Terms

### **Bundle Size**
Total file size of all JavaScript sent to browser.

*Optimization*: Code splitting, tree shaking, minification reduce bundle size.

### **First Contentful Paint (FCP)**
Time until first content visible on screen (Core Web Vital).

*Target*: < 1.8 seconds

### **Largest Contentful Paint (LCP)**
Time until largest content element visible (Core Web Vital).

*Target*: < 2.5 seconds

### **Cumulative Layout Shift (CLS)**
Measure of unexpected layout changes during page load (Core Web Vital).

*Target*: < 0.1

### **Minification**
Removing unnecessary characters (whitespace, comments) from code.

*Effect*: Reduces file size without changing functionality.

### **Code Splitting**
Breaking bundle into smaller chunks that load on-demand.

*Benefit*: Faster initial page load.

### **React Compiler**
Tool that optimizes React component rendering (Babel plugin).

*Configuration*: Enabled in `next.config.ts`

---

## Security Terms

### **Environment Secret**
Sensitive value (API key, password) stored separately from code.

*Storage*: `.env.local` (local), GitHub secrets (production)

### **Rate Limiting**
Restricting number of API requests per time period to prevent abuse.

*Status*: Not currently implemented (recommended for production).

### **CORS (Cross-Origin Resource Sharing)**
Mechanism allowing requests from different domains.

*Portfolio*: Uses default Next.js CORS (same-origin allowed).

### **SSL/TLS (Secure Socket Layer/Transport Layer Security)**
Encryption protocol for HTTPS connections.

*Status*: Recommended for production deployment.

### **Input Validation**
Verifying data meets expected format before processing.

*Example*: Contact form checks name, email, message not empty.

---

## User Experience Terms

### **UX (User Experience)**
Overall experience user has when interacting with application.

*Factors*: Speed, usability, design, responsiveness.

### **On-screen CTA (Call-to-Action Button)**
Button encouraging user to perform specific action.

*Examples*: "View Projects", "Contact Me", "Learn More"

### **Hero Section**
Large, visually prominent section at top of page introducing main message.

*Portfolio*: Large headline with typing animation and CTA buttons.

### **Sticky Navigation**
Navigation bar that remains visible when scrolling.

*Portfolio*: Navbar stays at top when scrolling down.

### **Animation**
Motion effect applied to UI elements for visual feedback and polish.

*Library*: Framer Motion

---

## Project Management Terms

### **Milestone**
Key goal or checkpoint in project development.

*Portfolio*: Timeline shows milestones from 2022-2026.

### **Deliverable**
Tangible project output (website, API, documentation).

*Example*: This documentation set is a deliverable.

### **Sprint**
Fixed time period (usually 1-2 weeks) for focused development work.

*Agile Methodology*: Teams work in sprints toward larger goals.

### **Backlog**
List of features, fixes, improvements waiting to be scheduled.

*Example*: "Future features: rate limiting, admin dashboard, real-time analytics"

---

## General Software Terms

### **Bug**
Error or flaw in code causing incorrect behavior.

*Report*: Create GitHub Issue with reproduction steps.

### **Feature**
New functionality or capability added to application.

*Example*: "Add language toggle feature"

### **Refactoring**
Restructuring code without changing external behavior to improve quality.

*Purpose*: Better readability, performance, maintainability.

### **Documentation**
Written explanations of code structure, usage, and concepts.

*This File*: Part of comprehensive documentation for AI/ML understanding.

### **Repository (Repo)**
Version-controlled storage of project files.

*URL*: https://github.com/panupong1201/smart-factory-portfolio

### **Package / Dependency**
Reusable code library installed via npm.

*Examples*: `react`, `next`, `tailwindcss`, `framer-motion`

### **Monorepo / Single Repo**
Single repository containing entire project codebase.

*Portfolio*: Single repo with app, docs, config files.

---

## Related Documentation
- [PROJECT_OVERVIEW.md](PROJECT_OVERVIEW.md) - Overall project info
- [ARCHITECTURE.md](ARCHITECTURE.md) - System design
- [COMPONENTS.md](COMPONENTS.md) - UI component reference
- [API_DOCUMENTATION.md](API_DOCUMENTATION.md) - API endpoints
