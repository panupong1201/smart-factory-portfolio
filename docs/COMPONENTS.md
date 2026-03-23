# Smart Factory Portfolio - Component Reference

## UI Component Inventory & Usage Guide

This document provides a complete reference for all React components in the portfolio application. Each component is documented with its purpose, props, dependencies, and typical usage.

---

## Page-Level Components (Main Sections)

### 1. **Navbar** (`src/components/Navbar.tsx`)
**Purpose**: Navigation header displayed at top of every page.

**Features**:
- Responsive: collapses to mobile menu on small screens
- Language toggle button (EN ↔ TH)
- Brand logo and navigation links
- Sticky/fixed positioning

**Props** (if any):
- None typically - uses global context for language

**Dependencies**:
- `lucide-react` - Icons (menu, close, language icons)
- `next/link` - Client-side navigation

**Usage Context**:
- Rendered at top of all pages
- Wrap entire page content below navbar

**Mobile Behavior**:
- Can collapse into hamburger menu
- Drawer/modal navigation on small screens

---

### 2. **Hero** (`src/components/Hero.tsx`)
**Purpose**: Landing section with main headline and call-to-action.

**Features**:
- Animated typing effect (React Type Animation)
- Large headline with visual hierarchy
- Subtitle/description text
- CTA buttons (e.g., "View Projects", "Contact Me")
- Gradient or color-coded backgrounds
- Hero image or video (optional)

**Props** (if any):
- `title?`: Main headline text
- `subtitle?`: Subtitle/description
- `actionText?`: Button label

**Dependencies**:
- `react-type-animation` - Text typing animation
- `framer-motion` - Fade-in animations
- `lucide-react` - Arrow icons for CTAs

**Usage Context**:
- First section after navbar on home page
- Immediately below navbar, above fold

---

### 3. **About** (`src/components/About.tsx`)
**Purpose**: Personal bio and professional background.

**Features**:
- Profile introduction
- Mission statement (e.g., "Bridging OT & IT...")
- Background context with icons/badges

**Props**:
- None (uses locales for text)

**Dependencies**:
- `lucide-react` - Decorative icons
- Locales: `locales/[lang].json`

**Usage Context**:
- After Hero section on home page

---

### 4. **WhyAI** (`src/components/WhyAI.tsx`)
**Purpose**: AI expertise and differentiation messaging.

**Features**:
- Highlights AI/ML capabilities
- Value proposition statements
- Icons representing AI expertise

**Props**:
- None (static content)

**Dependencies**:
- `lucide-react` - Icons (brain, chip, etc.)

**Usage Context**:
- Middle section on home page
- Bridges hard skills (Skills) and certifications

---

### 5. **Skills** (`src/components/Skills.tsx`)
**Purpose**: Technical proficiency showcase.

**Features**:
- Grid or list of skill categories
- Proficiency levels (if applicable)
- Icons or badges per skill
- Grouped by domain (e.g., "PLC Programming", "AI Vision")

**Props**:
- None

**Dependencies**:
- Data from `data/toolsData.ts`
- `lucide-react` or `simple-icons`

**Usage Context**:
- Section on home page between About and Timeline

---

### 6. **Toolkit** (`src/components/Toolkit.tsx`)
**Purpose**: Technology stack matrix with proficiency levels.

**Features**:
- Grid of tools/technologies
- Brand logos (SimpleIcons)
- Proficiency percentage or level
- Hover effects showing tooltips
- Organized by category (hardware, software, database, etc.)

**Props**:
- None

**Dependencies**:
- `data/toolsData.ts` - Tool definitions
- `simple-icons` - Brand logos
- `framer-motion` - Hover animations

**Usage Context**:
- Home page, after Skills section

---

### 7. **Timeline** (`src/components/Timeline.tsx`)
**Purpose**: Career/learning roadmap visualization (2022-2026).

**Features**:
- **Desktop**: Horizontal circuit-like timeline with nodes
- **Mobile**: Vertical stacked timeline
- Milestone titles, descriptions, icons
- Animated rocket icon for current position
- Hover-expand card effect
- Framer Motion animations

**Props**:
- None (data hardcoded in component or from data file)

**Dependencies**:
- `framer-motion` - Animations & transitions
- `lucide-react` - Rocket, check icons
- Tailwind CSS for responsive layout

**Usage Context**:
- Home page, mid-section
- Large focal point showing career evolution

---

### 8. **Projects** (`src/components/Projects.tsx`)
**Purpose**: Featured projects gallery with links to detail pages.

**Features**:
- Grid of project cards
- Filters by category (optional)
- Clickable cards linking to project detail pages
- Project image thumbnails

**Props**:
- None

**Dependencies**:
- `data/projects.ts` - Project metadata
- `components/ProjectCard.tsx` - Individual card component
- `next/link` - Navigation to project details

**Usage Context**:
- Home page, lower section
- Grid or carousel layout

---

### 9. **ProjectCard** (`src/components/ProjectCard.tsx`)
**Purpose**: Individual project preview card.

**Features**:
- Project thumbnail image
- Title, description snippet
- Tech stack tags
- Link to detail page
- Hover effects (shadow, scale, overlay)

**Props**:
- `project`: Project object from `data/projects.ts`
  - Properties: `slug`, `title`, `description`, `tech`, `image`
- `onClick?`: Optional click handler

**Dependencies**:
- `next/link` or `next/router`
- `next/image` - Optimized image component

**Usage Context**:
- Used within `<Projects />` component
- Rendered in grid (typically 2-3 columns)

---

### 10. **Certificates** (`src/components/Certificates.tsx`)
**Purpose**: Display awards, achievements, and certifications.

**Features**:
- Grid of certificate cards
- Click to open modal with details
- Organized by year or category

**Props**:
- None

**Dependencies**:
- `data/certificatesData.ts`
- `components/ui/CertificateCard.tsx`
- `components/ui/CertificateModal.tsx`

**Usage Context**:
- Home page, lower section
- Before or after Contact section

---

### 11. **Contact** (`src/components/Contact.tsx`)
**Purpose**: Contact form and communication channels.

**Features**:
- Email form modal/popup
- Form validation
- Submit handler (POST to `/api/contact`)
- Social media links (LINE, email, LinkedIn)
- Analytics event logging on clicks
- Thank you message on successful submit

**Props**:
- None

**Dependencies**:
- `nodemailer` - Backend email handling
- `lucide-react` - Icons (mail, phone, etc.)
- `lib/analytics.ts` - Event tracking

**Usage Context**:
- Home page, near footer
- Often has a sticky/floating button or section link

---

### 12. **Footer** (`src/components/Footer.tsx`)
**Purpose**: Footer information and copyright.

**Features**:
- Copyright info
- Quick footer links
- Contact info or social links
- Possibly version/build info

**Props**:
- None

**Dependencies**:
- `lucide-react` - Social icons

**Usage Context**:
- Bottom of every page

---

### 13. **LanguageProvider** (`src/components/LanguageProvider.tsx`)
**Purpose**: Context provider for internationalization (i18n).

**Features**:
- Wraps entire app
- Provides `language`, `toggleLanguage()` context
- Manages current language state (EN/TH)
- Loads appropriate translation file

**Props**:
- `children`: React components to wrap

**Dependencies**:
- `React.createContext` - Context API
- `locales/*.json` - Translation files

**Usage Context**:
- Wraps the entire app (in `layout.tsx`)
- All child components can call `useLanguage()` hook

```typescript
// Usage in child components
const { language, toggleLanguage } = useLanguage()
```

---

### 14. **PageTransition** (`src/components/PageTransition.tsx`)
**Purpose**: Animated page transitions between routes.

**Features**:
- Fade-out animation when leaving page
- Fade-in animation when entering page
- Uses Framer Motion
- Smooth UX during route changes

**Props**:
- `children`: Page content to animate
- `duration?`: Animation duration in milliseconds

**Dependencies**:
- `framer-motion` - Motion effects
- `next/navigation` - Route detection

**Usage Context**:
- Wraps page content in individual `page.tsx` files
- Or wraps entire app for global page transitions

---

### 15. **VisitLogger** (`src/components/VisitLogger.tsx`)
**Purpose**: Tracks first visitor session automatically.

**Features**:
- Runs on component mount
- Checks `localStorage` for existing visitor ID
- If new visitor, generates ID and logs to `/api/analytics/visit`
- Silent operation (no UI)

**Props**:
- None

**Dependencies**:
- `lib/visitorStore.ts` - Visitor ID generation
- API route: `/api/analytics/visit`

**Usage Context**:
- Rendered once in root `layout.tsx` or main page
- Acts as side-effect trigger

---

### 16. **VisitSummary** (`src/components/VisitSummary.tsx`)
**Purpose**: Display visitor statistics dashboard (admin).

**Features**:
- Fetches from `/api/analytics/summary`
- Shows counts: today, week, month, year
- Formatted display of statistics

**Props** (if any):
- `refreshInterval?`: Auto-refresh frequency

**Dependencies**:
- `/api/analytics/summary` endpoint
- React hooks: `useEffect`, `useState`

**Usage Context**:
- May be in an admin dashboard (not on public pages)
- Used for portfolio owner to track traffic

---

## UI Utility Components

### 1. **CertificateCard** (`src/components/ui/CertificateCard.tsx`)
**Purpose**: Individual certificate card for display in grid.

**Features**:
- Certificate title, issuer, icon
- Color-coded by category
- Click to open modal details
- Hover animation

**Props**:
- `certificate`: Certificate object
  - Properties: `title`, `issuer`, `icon`, `color`, `year`
- `onClick`: Click handler to open modal

**Dependencies**:
- `lucide-react` - Icons
- Tailwind CSS

**Usage Context**:
- Used within `<Certificates />` component
- Rendered in grid (3+ columns)

---

### 2. **CertificateModal** (`src/components/ui/CertificateModal.tsx`)
**Purpose**: Modal popup showing certificate details.

**Features**:
- Title, description, issuer, date
- Close button (X)
- Backdrop click to close
- Animated entrance

**Props**:
- `certificate`: Full certificate object details
- `isOpen`: Boolean to show/hide modal
- `onClose`: Callback when closing

**Dependencies**:
- `framer-motion` - Modal entrance animation
- `lucide-react` - Close icon

**Usage Context**:
- Controlled by `<Certificates />` component
- Opens on certificate card click

---

### 3. **GlowHeading** (`src/components/ui/GlowHeading.tsx`)
**Purpose**: Styled heading with glow/highlight effect.

**Features**:
- Customizable text
- Glow/shadow effect around text
- Optional gradient background
- Used for section headers

**Props**:
- `children`: Heading text
- `level?`: Heading level (h1, h2, h3, etc.)
- `className?`: Additional Tailwind classes

**Dependencies**:
- Tailwind CSS

**Usage Context**:
- Section headers (e.g., "Featured Projects", "My Skills")

```typescript
<GlowHeading level="h2">Featured Projects</GlowHeading>
```

---

### 4. **ToolIcon** (`src/components/ui/ToolIcon.tsx`)
**Purpose**: Technology tool icon with proficiency indicator.

**Features**:
- Brand logo (SimpleIcons)
- Proficiency percentage or level badge
- Tooltip on hover
- Interactive sizing

**Props**:
- `tool`: Tool object
  - Properties: `name`, `icon`, `proficiency`, `category`
- `showProficiency?`: Show proficiency badge

**Dependencies**:
- `simple-icons` - Brand logos
- Tailwind CSS

**Usage Context**:
- Used within `<Toolkit />` component
- Rendered in grid of tools

---

## Project-Specific Components

### 1. **CompareGallery** (`src/components/project/CompareGallery.tsx`)
**Purpose**: Before/after image comparison gallery for projects.

**Features**:
- Side-by-side before/after comparison
- Draggable slider to reveal/hide
- Thumbnails below for navigation
- Full-screen mode (optional)

**Props**:
- `images`: Array of before/after image pairs
  - Example: `[{before: url, after: url, label: "Stage 1"}, ...]`
- `title?`: Gallery title

**Dependencies**:
- `react-compare-slider` - or custom implementation
- `next/image` - Optimized images
- Framer Motion - Animations

**Usage Context**:
- Project detail page component
- Shows project transformation/improvement

---

### 2. **SystemArchitecture** (`src/components/project/SystemArchitecture.tsx`)
**Purpose**: Visual architecture diagram for technical projects.

**Features**:
- Block diagram of system components
- Flow arrows between components
- Interactive tooltips on hover
- Mermaid diagram or custom SVG rendering

**Props**:
- `data`: Architecture data structure
  - Properties: `components`, `connections`, `title`

**Dependencies**:
- `mermaid` - Diagram rendering (if used)
- SVG or Canvas rendering library

**Usage Context**:
- Project detail page (Line Stop Monitoring, Factory, Vision systems)
- Explains technical system design

---

## Hook/Context Usage

### **useLanguage()** - Custom Hook
**Purpose**: Access language context in any component.

```typescript
const { language, toggleLanguage } = useLanguage()

// language: 'en' | 'th'
// toggleLanguage(): void - switches language and re-renders
```

**Dependencies**:
- `<LanguageProvider>` must wrap component tree

**Example**:
```typescript
function MyComponent() {
  const { language } = useLanguage()
  return <p>Current: {language}</p>
}
```

---

## Component Import Patterns

### Importing Components
```typescript
// Page-level components
import { Navbar } from '@/components/Navbar'
import { Hero } from '@/components/Hero'

// UI components
import { CertificateCard } from '@/components/ui/CertificateCard'
import { GlowHeading } from '@/components/ui/GlowHeading'

// Project components
import { CompareGallery } from '@/components/project/CompareGallery'
import { SystemArchitecture } from '@/components/project/SystemArchitecture'
```

### Importing Data & Types
```typescript
import { projects } from '@/data/projects'
import { certificatesData } from '@/data/certificatesData'
import { toolsData } from '@/data/toolsData'
```

---

## Component Styling

### CSS Approach
- **Tailwind CSS**: Utility classes for styling
- **CSS Modules**: `.module.css` if needed for scoped styles
- **Framer Motion**: For animations and transitions

### Example Tailwind Usage
```typescript
<div className="flex flex-col items-center justify-center gap-4">
  <h2 className="text-2xl font-bold text-white">Title</h2>
  <p className="text-gray-200">Description</p>
</div>
```

---

## Props Convention

### TypeScript Component Definition
```typescript
interface ComponentProps {
  title: string
  description?: string
  onClick?: () => void
  children?: React.ReactNode
}

export function MyComponent({
  title,
  description,
  onClick,
  children,
}: ComponentProps) {
  return (
    // JSX
  )
}
```

---

## Related Documentation
- [PROJECT_OVERVIEW.md](PROJECT_OVERVIEW.md) - High-level project info
- [ARCHITECTURE.md](ARCHITECTURE.md) - Component relationships & data flow
- [FOLDER_STRUCTURE.md](FOLDER_STRUCTURE.md) - File organization reference
