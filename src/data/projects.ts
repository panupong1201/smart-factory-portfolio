export const projects = [
  // =====================================================================
  // PROJECT 1: Line Stop Monitoring System
  // =====================================================================
  {
    slug: "line-stop-monitoring",
    title: "Line Stop Monitoring System",
    image: "/projects/line-stop/line-stop.jpg",
    tech: [
      "Mitsubishi PLC",
      "V-Box",
      "Next.js",
      "PostgreSQL",
      "Mobile Responsive",
    ],
    gallery: [
      "/projects/line-stop/gallery/1.png",
      "/projects/line-stop/gallery/2.png",
      "/projects/line-stop/gallery/3.png",
      "/projects/line-stop/gallery/4.png",
      "/projects/line-stop/gallery/5.png",
      "/projects/line-stop/gallery/6.png",
      "/projects/line-stop/gallery/7.png",
    ],
    role: "Full Stack IoT Engineer",
    year: "2025",
    duration: "3 Months",

    problem:
      "Before this project, line stop recording depended on manual whiteboard notes every hour and end-of-shift Excel summaries prepared by line leaders. This workflow created major blind spots: micro-stoppages lasting only a few seconds were often missed, stop categories were inconsistently recorded across shifts, and investigation data was usually available only after production had already ended. As a result, MES reports were frequently inaccurate, root-cause analysis was delayed, and maintenance teams had no real-time visibility into recurring downtime patterns.",

    solution:
      "I developed a real-time Line Stop Monitoring System accessible from web and mobile devices. Mitsubishi PLC machine-state signals are collected through a V-Box IoT gateway and streamed into PostgreSQL with timestamp-level precision. The dashboard provides live line status, stop duration, stop frequency, and process-level loss visibility, while automated data aggregation replaces manual Excel consolidation. This architecture eliminates human logging errors and gives production, maintenance, and management teams a single real-time source of truth for downtime performance.",

    lessonsLearned: `- Signal Noise (Hardware): I encountered false 'STOP' triggers caused by electrical noise from aging relays. I fixed this by implementing a debouncing rule where the signal must remain stable for more than 2 seconds before being recorded.
  - Data Standardization (Process): Different shifts used different stop naming conventions, which reduced report quality. I introduced standardized stop reason mapping and validation rules so all records could be compared consistently.
  - User Adoption (People): Operators initially resisted the system, feeling they were being monitored. I redesigned the interface to focus on quick action (clear alarm state and maintenance call flow), which shifted perception from "monitoring people" to "helping teams recover faster."`,

    compareImages: [
      {
        before: "/projects/line-stop/line-stop-1.jpg",
        after: "/projects/line-stop/line-stop-31.jpg",
        label: "Data Tracking Method",
      },
      {
        before: "/projects/line-stop/line-stop-22.jpg",
        after: "/projects/line-stop/line-stop-32.jpg",
        label: "Data Accuracy (MES)",
      },
      {
        before: "/projects/line-stop/line-stop-36.jpg",
        after: "/projects/line-stop/line-stop-34.jpg",
        label: "Reporting Efficiency",
      },
      {
        before: "/projects/line-stop/line-stop-35.jpg",
        after: "/projects/line-stop/line-stop.jpg",
        label: "Issue Investigation",
      },
    ],
    videoDemo: "/projects/line-stop/videos/line_stop.mp4",

    description:
      "Real-time downtime intelligence platform using Mitsubishi PLC + V-Box + PostgreSQL to capture every line stop at second-level precision and replace manual reporting.",
    impact:
      "Data Accuracy Up 100% | Manual Reporting Time Down 100% | Real-Time Downtime Visibility Across Web/Mobile",

    content: `
  This project transformed a manual, paper-based top cover assembly line into a real-time digital operation with actionable downtime intelligence.

  Project Scope:
  - Replaced hourly whiteboard tracking and end-of-shift Excel consolidation with automatic data capture.
  - Connected Mitsubishi PLC stop/run signals to a centralized PostgreSQL database through a V-Box IoT gateway.
  - Delivered a responsive Next.js dashboard for production leaders, maintenance teams, and management.

  System Architecture:
  1. Machine Layer: Mitsubishi PLCs expose machine run/stop states and momentary stop events from production equipment.
  2. Edge Gateway: V-Box continuously reads PLC memory and securely forwards event data to the central backend.
  3. Database Layer: PostgreSQL stores time-series stop events, durations, and categorized reason codes for historical analysis.
  4. Application Layer: Next.js dashboard presents live status, trend summaries, and shift-based stop analytics on web/mobile.

  Key Features:
  - Second-Level Tracking: Captures and aggregates loss time down to the second, including short micro-stoppages that manual logs missed.
  - Live Andon Visibility: Displays current line state, active stop duration, and process bottlenecks in real time.
  - Stop Reason Analytics: Supports categorized downtime analysis for faster root-cause discussion in D1/D2 meetings.
  - Automated Reporting: Eliminates manual end-of-shift Excel preparation with system-generated summaries.
  - Cross-Platform Access: Enables supervisors and engineers to monitor line health from both PC and mobile.

  Business Impact:
  - Improved data credibility for MES and management review by removing manual entry errors.
  - Reduced reporting workload for line leaders and enabled faster maintenance response cycles.
  - Shifted problem-solving from reactive end-of-day review to real-time operational control.
  `,
    architecture: [
      { name: "PLC", detail: "Mitsubishi", icon: "Cpu" },
      { name: "IoT Gateway", detail: "V-Box Edge", icon: "Wifi" },
      { name: "Database", detail: "PostgreSQL", icon: "Database" },
      { name: "Dashboard", detail: "Next.js Web/Mobile", icon: "Monitor" },
    ],
  },
  // =====================================================================
  // PROJECT 2: AI Vision Inspection & Monitoring System
  // =====================================================================
  {
    slug: "vision-ai",
    title: "AI Vision Inspection & Monitoring System",
    image: "/projects/vision/1.png",
    tech: ["AI Vision IV4", "Next.js", "React", "PLC", "Database Integration"],
    gallery: [
      "/projects/vision/1.png",
      "/projects/vision/3.png",
      "/projects/vision/4.png",
      "/projects/vision/8.png",
      "/projects/vision/9.png",
      "/projects/vision/12.png",
      "/projects/vision/11.png",
      "/projects/vision/16.jpeg",
      "/projects/vision/17.jpeg",
      "/projects/vision/18.png",
      "/projects/vision/19.png",
      "/projects/vision/20.png",
    ],
    role: "Full Stack Industrial Developer",
    year: "2025",
    duration: "4 Months",

    problem:
      "The existing rule-based vision inspection system caused frequent micro line stops, averaging 230 stops and 16.5 minutes of downtime per day. It suffered from low inspection stability, high false NG rates, and a high dependency on vendor services for any model changes, which resulted in continuous extra costs and production instability.",

    solution:
      "Replaced the legacy system with a new AI-based Vision IV4 system integrated with a custom Next.js Real-Time Monitoring Dashboard. This allows flexible, in-house AI model training and provides instant visual feedback, historical image galleries, and live yield rate tracking directly from the production line.",

    lessonsLearned: `- Data Verification vs Dashboard Reality: During live monitoring, the dashboard displayed 4 NGs out of 1640 scans (Yield Rate 99.8 percent). Upon cross-checking with the activity history, I found that only 2 were actual camera-detected NGs, while the other 2 were manually forced NGs made by QC for system testing. This taught me the importance of building detailed activity logs to verify actual production quality versus system test data.
- Eliminating Vendor Bottlenecks: The shift from a closed, rule-based system to an AI learning model enabled our internal team to handle model changes and expansions independently, saving significant time and recurring vendor service fees.`,

    compareImages: [
      {
        before: "/projects/vision/2.png",
        after: "/projects/vision/3.png",
        label: "Inspection Stability",
      },
      {
        before: "/projects/vision/7.jpg",
        after: "/projects/vision/4.png",
        label: "Yield Rate",
      },
      {
        before: "/projects/vision/15.jpg",
        after: "/projects/vision/12.png",
        label: "System Flexibility",
      },
      {
        before: "/projects/vision/10.jpg",
        after: "/projects/vision/8.png",
        label: "Inspection Logic",
      },
      {
        before: "/projects/vision/13.png",
        after: "/projects/vision/11.png",
        label: "Data Traceability",
      },
    ],
    videoDemo: "/projects/vision/videos/IV4.mp4",

    description:
      "AI-based vision inspection upgrade with a custom real-time monitoring dashboard, recovering 65 hours of production time annually.",
    impact: "Line Stops Reduced 89.6 Percent | Recovered 65 Hours/Year",

    content: `
Based on the Vision System Improvement Report, this project completely overhauled the quality control process for washing machine component assembly.

System Architecture:
1. Inspection Layer: AI Vision IV4 smart cameras capture and analyze components (checking wires, screws, and assembly points) using advanced machine learning models.
2. Data Processing: The camera communicates directly with the PLC for reject logic and sends scan data to the centralized database.
3. Real-Time Dashboard: A Next.js application visualizes live data, showing total production (over 24,000 items), yield rates, and a detailed image gallery of every scanned part with exact timestamp tracking.

Key Improvements and Business Value:
- Massive Downtime Reduction: Slashed line stop frequency by 89.6 percent (from 230 to 24 times per day), reducing daily downtime from 16.5 minutes to just 1.7 minutes.
- Production Time Recovery: The efficiency gain translates to approximately 65 hours of recovered production capacity per year.
- Strategic Independence: Transitioned from a closed, vendor-dependent system to a highly flexible, in-house manageable solution, perfectly aligning with the smart factory roadmap.
`,
    architecture: [
      { name: "Camera", detail: "AI Vision IV4", icon: "Camera" },
      { name: "Controller", detail: "PLC", icon: "Cpu" },
      { name: "Database", detail: "PostgreSQL", icon: "Database" },
      { name: "Dashboard", detail: "Next.js Web App", icon: "Monitor" },
    ],
  },

  // =====================================================================
  // PROJECT 3: Smart Factory Operations Control Center - DJ MES
  // =====================================================================
  {
    slug: "dj-mes-smart-utility-dashboard",
    title: "DJ MES: Smart Factory Operations Control Center",
    image: "/projects/dj-mes-smart-utility-dashboard/1.jpg",
    tech: [
      "Next.js",
      "TypeScript",
      "React Native",
      "Python Backend",
      "PLC (Mitsubishi/LS)",
      "PostgreSQL",
      "LINE Messaging API",
    ],
    gallery: [
      "/projects/dj-mes-smart-utility-dashboard/1.jpg",
      "/projects/dj-mes-smart-utility-dashboard/2.png",
      "/projects/dj-mes-smart-utility-dashboard/3.png",
      "/projects/dj-mes-smart-utility-dashboard/4.png",
      "/projects/dj-mes-smart-utility-dashboard/14.png",
      "/projects/dj-mes-smart-utility-dashboard/7.png",
      "/projects/dj-mes-smart-utility-dashboard/16.png",
      "/projects/dj-mes-smart-utility-dashboard/12.png",
      "/projects/dj-mes-smart-utility-dashboard/13.png",
      "/projects/dj-mes-smart-utility-dashboard/17.png",
      "/projects/dj-mes-smart-utility-dashboard/18.png",
      "/projects/dj-mes-smart-utility-dashboard/8.png",
    ],
    role: "Full Stack Automation & Digitalization Developer",
    year: "2025 - 2026",
    duration: "3 Months",

    problem:
      "As plant operations expanded at DongJin Electronics, critical utility status, alarm response, CCTV verification, and incident follow-up were spread across manual patrols, isolated screens, and chat-based communication. Teams could see individual signals, but they lacked a true control center to confirm abnormal conditions, coordinate response, and review what happened afterward. This created delayed decision-making, weak cross-shift visibility, and a real risk that frozen data, missed alarms, or unresolved abnormal conditions would impact molding and robotic processes before engineering teams reacted.",

    solution:
      "Built DJ MES into a Smart Factory Operations Control Center that combines a Next.js web command dashboard, mobile field access, a Python PLC backend, CCTV integration, historical reporting, and omnichannel alerting. The platform centralizes live plant signals, alarm workflows, camera snapshots and recordings, parameter settings, and audit-friendly operational history in one system, allowing engineers and leaders to detect, verify, and respond to incidents faster from either the control room or the factory floor.",

    lessonsLearned: `- Control Center UX & Alarm Workflow: A monitoring screen alone was not enough. I redesigned the product around an operations workflow with KPI status, alarm banners, ACK actions, camera access, and rapid drill-down paths so users could move from detection to action without switching systems.
- Incident Traceability Across Channels: Real operational value came from linking alarms with camera evidence, mobile access, and historical reports. This created a clearer incident timeline for engineering teams and improved cross-shift handover, follow-up, and accountability.
- Reliability & Distributed Response: I engineered a strict watchdog and offline-detection flow so the team would not trust frozen data. Combined with mobile access and LINE alerts, the system evolved from a fixed utility dashboard into a distributed response platform for plant operations.`,
    compareImages: [
      {
        before: "/projects/dj-mes-smart-utility-dashboard/11.png",
        after: "/projects/dj-mes-smart-utility-dashboard/3.png",
        label: "Operations Visibility",
      },
      {
        before: "/projects/dj-mes-smart-utility-dashboard/9.png",
        after: "/projects/dj-mes-smart-utility-dashboard/2.png",
        label: "Alarm Response Workflow",
      },
      {
        before: "/projects/dj-mes-smart-utility-dashboard/10.png",
        after: "/projects/dj-mes-smart-utility-dashboard/12.png",
        label: "Incident Investigation",
      },
      {
        before: "/projects/dj-mes-smart-utility-dashboard/5.png",
        after: "/projects/dj-mes-smart-utility-dashboard/13.png",
        label: "Field Access & Inspection",
      },
      {
        before: "/projects/dj-mes-smart-utility-dashboard/15.png",
        after: "/projects/dj-mes-smart-utility-dashboard/14.png",
        label: "Historical Traceability",
      },
    ],
    videoDemo:
      "/projects/dj-mes-smart-utility-dashboard/videos/senserAlarm.mp4",

    description:
      "Smart factory operations control center unifying real-time monitoring, camera investigation, historical reporting, mobile field access, and omnichannel alarms in one platform.",

    impact:
      "Zero Utility-Related Downtime | Centralized Incident Response | Historical Traceability | Instant Mobile Notifications",

    content: `
A comprehensive Smart Factory Operations Control Center built to serve as the digital command layer for plant operations at DongJin Electronics. While water level and air pressure remained core monitored utilities, the system expanded far beyond utility checking into a unified platform for live visibility, incident response, camera verification, historical reporting, and field collaboration.

Project Scope:
- Consolidated PLC-based plant signals, alarm states, and status KPIs into a central web dashboard for real-time operations visibility.
- Extended the same operational view to mobile devices so engineers could review alarms, check plant status, and react from the factory floor.
- Integrated camera workflows, snapshots, and recordings to support faster incident verification and post-event investigation.
- Added reporting, settings management, and audit-friendly history so the platform could support daily operations, not just live monitoring.

System Capabilities:
- Operations Control Dashboard: Unified water, air, alarm, and plant-status monitoring into one control center with clear status cues and rapid response actions.
- Omnichannel Incident Response: Combined on-screen alarm states, audio alerts, mobile access, and LINE messaging to ensure abnormal conditions reached the right people immediately.
- Camera & Evidence Layer: Connected incidents with CCTV snapshots, recordings, and visual review workflows so teams could verify problems faster and investigate them later with context.
- Reports & Traceability: Added historical reports, event history, and audit visibility to support shift review, engineering analysis, and operational accountability.
- Reliability Safeguards: Implemented watchdog and offline-detection logic so operators are warned when live data stops updating and cannot mistakenly trust frozen screens.

Business Impact:
- Shifted operations from fragmented monitoring to one centralized command workflow for live plant visibility and faster decision-making.
- Reduced dependence on manual patrols by giving engineering teams immediate alarm context, mobile access, and historical evidence in one system.
- Strengthened traceability across detection, acknowledgment, investigation, and reporting, turning the platform into an active control center rather than a passive dashboard.
`,
    architecture: [
      {
        name: "Plant Signals",
        detail: "PLC + Sensors + CCTV",
        icon: "Cpu",
      },
      {
        name: "Operations Backend",
        detail: "Python API + Database",
        icon: "Settings",
      },
      {
        name: "Control Interfaces",
        detail: "Web Control Room + Mobile",
        icon: "Monitor",
      },
      {
        name: "Incident Response",
        detail: "Alerts + Reports + Audit Trail",
        icon: "FileText",
      },
    ],
  },

  // =====================================================================
  // PROJECT 4: PE Dashboard - Production Engineering & Maintenance Intelligence Platform
  // =====================================================================
  {
    slug: "pe-dashboard",
    title: "PE Dashboard: Production Engineering & Maintenance Intelligence Platform",
    image:
      "https://placehold.co/1920x1080/0f172a/f8fafc?text=PE+Dashboard+Main",
    tech: [
      "Next.js",
      "TypeScript",
      "Prisma ORM",
      "PostgreSQL",
      "Tailwind CSS",
      "AI Insights",
      "Telegram Notifications",
    ],
    gallery: [
      "https://placehold.co/1920x1080/0f172a/f8fafc?text=Machine+Dashboard",
      "https://placehold.co/1920x1080/1e293b/f8fafc?text=Maintenance+Workflow",
      "https://placehold.co/1920x1080/334155/f8fafc?text=Spare+Inventory",
      "https://placehold.co/1920x1080/475569/f8fafc?text=AI+Analytics",
    ],
    role: "Full Stack Production Engineering Developer",
    year: "2025 - 2026",
    duration: "Ongoing",

    problem:
      "Factory maintenance operations were fragmented across spreadsheets, isolated forms, and manual follow-ups. Machine history, repair requests, preventive maintenance schedules, and spare-part usage were not connected in one workflow, making it difficult to prioritize risk, trace recurring failures, or give management a real-time view of plant reliability.",

    solution:
      "I built PE Dashboard, a full-stack maintenance intelligence platform that unifies machine asset management, repair request workflows, preventive maintenance, spare-parts inventory, and AI-assisted analytics in a single Next.js application. The system combines role-based access control, QR/PDF operational flows, Telegram notifications, and structured risk insights so technicians, leaders, and requesters can work from one source of truth.",

    lessonsLearned: `- Workflow Coupling: Maintenance, machine history, and spare-part reservations cannot be designed as isolated modules. I linked these workflows so teams can trace each request from machine issue to repair action and part consumption without losing context.
- Permission Design: Real factory users do not fit into a simple admin/user split. I implemented a finer-grained RBAC model so requesters, technicians, leaders, and managers each see the right actions without exposing the entire system.
- AI Reliability: AI summaries are useful only when paired with deterministic fallbacks. I designed the analytics flow so dashboards can still return structured operational summaries even when the external AI provider is unavailable or misconfigured.`,

    compareImages: [
      {
        before:
          "https://placehold.co/800x600/64748b/ffffff?text=Before:+Scattered+Tracking",
        after:
          "https://placehold.co/800x600/0f172a/f8fafc?text=After:+Unified+Dashboard",
        label: "Operational Visibility",
      },
      {
        before:
          "https://placehold.co/800x600/64748b/ffffff?text=Before:+Manual+Requests",
        after:
          "https://placehold.co/800x600/1e293b/f8fafc?text=After:+Digital+Workflow",
        label: "Maintenance Workflow",
      },
      {
        before:
          "https://placehold.co/800x600/64748b/ffffff?text=Before:+Separate+Inventory",
        after:
          "https://placehold.co/800x600/334155/f8fafc?text=After:+Linked+Spare+Control",
        label: "Inventory Traceability",
      },
      {
        before:
          "https://placehold.co/800x600/64748b/ffffff?text=Before:+Reactive+Review",
        after:
          "https://placehold.co/800x600/475569/f8fafc?text=After:+AI+Risk+Insights",
        label: "Decision Support",
      },
    ],
    videoDemo:
      "https://placehold.co/1920x1080/0f172a/f8fafc?text=PE+Dashboard+Demo",

    description:
      "Unified production engineering platform for machine reliability, maintenance workflows, spare inventory control, and AI-assisted operational insight.",
    impact:
      "Centralized Maintenance Workflows | Real-Time Asset Visibility | AI-Assisted Risk Prioritization | QR/PDF Operational Tracking",

    content: `
  PE Dashboard is a factory-focused production engineering platform designed to connect maintenance execution, machine history, and spare-parts control into one operational system.

  Project Scope:
  - Built a centralized web application for machine assets, maintenance requests, preventive maintenance, work orders, and spare inventory.
  - Connected operational workflows with role-based permissions for requesters, technicians, leaders, and managers.
  - Added analytics and AI-assisted summaries to help teams identify high-risk machines, overdue PM tasks, and inventory pressure earlier.

  Key Features:
  - Machine Management: Tracks machine master data, criticality, warranty, downtime history, and repair linkage.
  - Maintenance Workflow: Handles request intake, approval flow, comments, attachments, and status progression.
  - Preventive Maintenance: Supports PM scheduling, task execution, and overdue visibility.
  - Spare Parts Control: Manages part master data, stock transactions, reservations, suppliers, and reorder logic.
  - Digital Operations: Includes QR-based tracking, PDF document generation, import/export utilities, and audit-friendly records.
  - AI & Alerts: Generates dashboard insights, predictive summaries, and notification flows for faster maintenance response.

  Technical Highlights:
  1. Frontend: Built with Next.js App Router, TypeScript, Tailwind CSS, and reusable UI components.
  2. Backend: Uses Prisma and PostgreSQL for strongly structured operational data and workflow relationships.
  3. Intelligence Layer: Implements risk scoring, structured AI summaries, and cached analytics endpoints.
  4. Notification Layer: Integrates Telegram-based alerts for maintenance and operational events.

  Business Value:
  - Replaced fragmented maintenance tracking with a single source of truth.
  - Improved traceability between machine failures, repair execution, and spare-part usage.
  - Gave production engineering teams faster visibility into risk, backlog, and reliability priorities.
  `,
    architecture: [
      { name: "Frontend", detail: "Next.js + TypeScript", icon: "Monitor" },
      { name: "Backend", detail: "Prisma + PostgreSQL", icon: "Database" },
      { name: "Operations", detail: "Maintenance + Spare + PM", icon: "Settings" },
      { name: "Intelligence", detail: "AI Insights + Alerts", icon: "Cpu" },
    ],
  },

   // PROJECT 5: AI Production Planning System
  // =====================================================================
  {
    slug: "dongjin-planning-system",
    title: "AI Production Planning System",
    image:
      "https://placehold.co/1920x1080/0b1220/f3f4f6?text=AI+Production+Planning+System",
    tech: [
      "Next.js",
      "React",
      "TypeScript",
      "Excel Parsing (XLSX)",
      "AI Planning Copilot",
      "Zustand",
      "Multi-language UI",
    ],
    gallery: [
      "https://placehold.co/1920x1080/0b1220/f3f4f6?text=Upload+and+Auto+Mapping",
      "https://placehold.co/1920x1080/122033/f3f4f6?text=Planning+Workspace",
      "https://placehold.co/1920x1080/1c2d44/f3f4f6?text=Dashboard+Analytics",
      "https://placehold.co/1920x1080/273a54/f3f4f6?text=Master+Data+Control",
    ],
    role: "Full Stack Planning Developer",
    year: "2026",
    duration: "Ongoing",

    problem:
      "Before this project, whenever a customer sent a new washing machine planning file, the planning team had to manually copy, paste, and reformat spreadsheet data into internal planning sheets before any real analysis could begin. Column positions were not always consistent, BOM references had to be cross-checked by hand, and matching customer demand with internal process planning consumed several hours per day. This manual workflow slowed decision-making, increased the risk of mapping mistakes, and made it difficult to respond quickly when planning priorities changed.",

    solution:
      "I built an AI-assisted production planning platform that allows planners to upload customer and internal Excel files directly, automatically detect key planning columns, parse daily production schedules, and connect the data with BOM and process master data in one interface. The system combines dashboard analytics, planning tables, master-data management, and AI-generated planning summaries so the team can move from raw demand files to actionable production plans in a few minutes instead of spending hours on manual spreadsheet preparation.",

    lessonsLearned: `- Parser Robustness (Data Integration): Customer and internal planning files do not keep perfectly fixed column layouts. I designed the parser to scan for real header labels and column aliases so the system can keep working even when spreadsheet structures shift.
- Planning Visibility (UX): A large planning table alone is not enough for fast decisions. I added dashboard summaries, BOM match coverage views, line/tool filters, and exception indicators so planners can detect mismatches and capacity risks much faster.
- AI Decision Support (Operations): AI suggestions are only useful when planners can verify the reason behind them. I paired AI summaries with demand, capacity, and BOM evidence so the team can validate each exception before acting on it.`,

    compareImages: [
      {
        before:
          "https://placehold.co/800x600/6b7280/ffffff?text=Before:+Manual+Excel+Preparation",
        after:
          "https://placehold.co/800x600/0b1220/f3f4f6?text=After:+Upload+and+Auto+Mapping",
        label: "Planning Workflow",
      },
      {
        before:
          "https://placehold.co/800x600/6b7280/ffffff?text=Before:+Manual+Column+Matching",
        after:
          "https://placehold.co/800x600/122033/f3f4f6?text=After:+Auto+Detected+Columns",
        label: "Column Mapping",
      },
      {
        before:
          "https://placehold.co/800x600/6b7280/ffffff?text=Before:+Disconnected+Planning+Sheets",
        after:
          "https://placehold.co/800x600/1c2d44/f3f4f6?text=After:+Unified+Planning+View",
        label: "Demand Visibility",
      },
      {
        before:
          "https://placehold.co/800x600/6b7280/ffffff?text=Before:+Scattered+Master+Data",
        after:
          "https://placehold.co/800x600/273a54/f3f4f6?text=After:+Centralized+Master+Data",
        label: "Master Data Control",
      },
    ],
    videoDemo:
      "https://placehold.co/1920x1080/0b1220/f3f4f6?text=AI+Planning+Demo",

    description:
      "AI-assisted production planning platform that automates customer Excel intake, BOM/process mapping, and daily schedule management for appliance operations.",
    impact:
      "Planning Cycle Reduced from Hours to Minutes | AI Risk Summaries for Load and Material Issues | Unified Demand, Process, and BOM Visibility",

    content: `
  AI Production Planning System is a production planning workspace designed to turn incoming customer Excel files into actionable internal production plans without the usual manual spreadsheet preparation.

  Project Scope:
  - Built a centralized web application for uploading customer demand files, internal process plans, and BOM reference files.
  - Automated the parsing of variable Excel structures into typed planning data for lines, models, tools, due dates, and daily quantities.
  - Combined dashboard analytics, planning review, master-data maintenance, and AI-assisted exception handling into one responsive interface.

  System Workflow:
  1. Upload Layer: Planners upload customer demand files and internal planning files directly through the web interface.
  2. Parsing Layer: The application auto-detects key headers, maps daily quantity columns, and normalizes spreadsheet data into structured planning records.
  3. Planning Layer: Users filter by line, tool, color, and status to review schedule quantities, demand IDs, and process matching in one place.
  4. Master Data Layer: BOM mappings, capacities, inventory data, and working calendars are maintained directly in the application.
  5. Decision Layer: The AI planning copilot summarizes overload risks, BOM gaps, unmapped demand, and recommended next actions for faster daily planning decisions.

  Key Features:
  - Auto Column Detection: Identifies relevant fields from changing customer Excel layouts without requiring repetitive manual remapping.
  - Daily Schedule Parsing: Converts date-based spreadsheet columns into structured daily production quantities for analysis and review.
  - BOM and Process Linking: Connects customer model demand with internal part mapping and process planning logic across Top, Outer, Plan LID, and Vibration stages.
  - AI Planning Copilot: Generates planning summaries, shortage warnings, capacity imbalance alerts, and recommended next checks for planners.
  - Master Data Management: Supports maintenance of part mappings, capacities, inventory, and working calendars in one system.
  - Multi-Language Access: Provides a localized interface for English, Korean, and Thai users.
  - Persistent Planning Workspace: Keeps uploaded data and planning state available for continued review across sessions.

  Business Impact:
  - Reduced the planning team's daily preparation work from several hours to just a few minutes.
  - Lowered the risk of spreadsheet copy/paste errors during demand-to-plan translation.
  - Improved visibility between customer demand, internal process planning, and BOM readiness in one operational screen.
  - Added earlier warning signals for overload, shortage, and mapping exceptions before daily planning meetings.
  `,
    architecture: [
      { name: "Input", detail: "Customer/Internal Excel Upload", icon: "FileText" },
      { name: "Parsing", detail: "Smart Header Mapping + XLSX", icon: "Cpu" },
      { name: "Planning", detail: "Dashboard + AI Planning Copilot", icon: "Monitor" },
      { name: "Control", detail: "BOM + Capacity + Calendar", icon: "Settings" },
    ],
  },

  // =====================================================================
  // PROJECT 6: 3D Factory Digital Twin
  // =====================================================================
  {
    slug: "3d-factory-simulation",
    title: "3D Factory Digital Twin",
    image: "/projects/factory/factory-3d.jpg",
    tech: ["SketchUp", "AutoCAD", "Rendering", "Process Simulation"],
    gallery: [
      "/projects/factory/factory-3d.jpg",
      "/projects/factory/3.jpg",
      "/projects/factory/6.png",
      "/projects/factory/5.jpg",
      "/projects/factory/7.png",
      "/projects/factory/8.jpg",
      "/projects/factory/1.jpg",
      "/projects/factory/4.jpg",
    ],
    role: "Simulation Specialist",
    year: "2024",
    duration: "2 Months",

    problem:
      "Machine relocation and new line installation projects frequently suffered costly delays due to physical clashes—machines colliding with structural pillars, overhead cable trays, or utility piping—that were invisible in traditional 2D AutoCAD drawings. Planning relied on paper floor plans and manual tape measurements, making it nearly impossible to verify vertical clearances, forklift turning radii, or maintenance access corridors. Each on-site clash discovery forced unplanned rework, extending production downtime by an average of 3 days per relocation project.",

    solution:
      "Built a 1:1 Scale 3D Digital Twin of the entire factory floor using SketchUp and AutoCAD, covering over 5,000 square meters across multiple production zones. The model includes structural elements (columns, beams, mezzanines), utility infrastructure (cable trays, piping, HVAC ducts), and accurate machine footprints with height envelopes. This enabled the cross-functional team to 'Virtually Relocate' machines, simulate forklift logistics paths, verify overhead clearances, and validate maintenance access before any physical work began. Rendered fly-through videos were presented to executives for rapid layout approval.",

    lessonsLearned: `- Heavy Model Performance: The initial 3D models had too many polygons (including every nut and bolt), which caused the simulation software to crash. I learned to apply LOD (Level of Detail) optimization—keeping high-detail meshes only where needed for collision boundaries while using simplified geometry elsewhere—to maintain smooth 60 FPS walkthroughs.
- Stakeholder Communication: I found that executives preferred visual walkthrough videos over technical CAD files. By rendering animated fly-throughs with annotations, I reduced layout approval time from several weeks to just a few hours.
- Measurement Accuracy: Discovered a 50 mm discrepancy between legacy 2D drawings and actual site conditions during ground-truth surveys. This reinforced the importance of physical site verification before modeling and led me to establish a mandatory survey-first protocol for all future projects.`,

    compareImages: [
      {
        before: "/projects/factory/224648.png",
        after: "/projects/factory/232.png",
        label: "Visualization",
      },
      {
        after: "/projects/factory/4.jpg",
        before: "/projects/factory/IMG_4933.jpg",
        label: "Planning",
      },
      {
        before: "/projects/factory/IMG_3900.jpg",
        after: "/projects/factory/1.jpg",
        label: "Site Assessment",
      },
      {
        before: "/projects/factory/factory-3d.jpg",
        after: "/projects/factory/3.jpg",
        label: "3D Modeling",
      },
      {
        before: "/projects/factory/6.png",
        after: "/projects/factory/5.jpg",
        label: "Collision Detection",
      },
      {
        before: "/projects/factory/7.png",
        after: "/projects/factory/8.jpg",
        label: "Final Layout",
      },
    ],
    videoDemo: "/projects/factory/videos/3df.mp4",

    description:
      "High-fidelity 1:1 scale 3D Digital Twin covering 5,000+ sqm of factory floor, enabling clash-free machine relocation and cutting setup time by 3 days per project.",
    impact:
      "Zero Layout Clashes | Setup Time Reduced 3 Days | Approval Time Cut from Weeks to Hours",

    content: `Bridging the gap between design and reality with a High-Fidelity 3D Digital Twin, covering the full factory floor at a 1:1 scale to eliminate costly relocation errors.

Project Scope:
- Modeled 5,000+ sqm of factory floor across multiple production zones.
- Included structural elements (columns, beams, mezzanines), utility infrastructure (cable trays, piping, HVAC ducts), and machine footprints with accurate height envelopes.
- Total of 6 major machine relocation projects validated through the Digital Twin before physical execution.

[ Workflow ]
1. Site Survey: Conducted ground-truth measurements of building columns, cable trays, piping, and floor elevations using laser distance meters. Identified 50 mm discrepancies from legacy 2D drawings.
2. 3D Modeling: Converted verified dimensions and 2D AutoCAD layouts into detailed SketchUp 3D models with LOD (Level of Detail) optimization for performance.
3. Virtual Validation: Simulated machine placement to detect collisions, verified forklift turning radii and logistics paths, and checked overhead clearance for cranes and HVAC.
4. Stakeholder Review: Rendered animated fly-through walkthrough videos for executive presentations, replacing static CAD file reviews.
5. Execution: Provided construction teams with validated 3D reference models, ensuring zero surprises on move day.

Key Features:
- Collision Detection: Automatically identifies physical clashes between machines and structural elements before any equipment is moved.
- Clearance Verification: Validates vertical clearance for overhead cranes, cable trays, and HVAC ducts against machine height envelopes.
- Logistics Path Simulation: Tests forklift routes, AGV paths, and material flow corridors within the 3D environment.
- Maintenance Access Audit: Ensures adequate space around each machine for routine maintenance, part replacement, and safety egress.

Business Impact:
- Eliminated all layout-related rework across 6 relocation projects, saving an estimated 18 days of cumulative downtime.
- Cut executive layout approval time from 2-3 weeks to under 4 hours through visual fly-through presentations.
- Established a reusable Digital Twin asset that serves as the single source of truth for all future factory expansion and layout planning.`,
    architecture: [
      { name: "Survey", detail: "Laser Measurement", icon: "PenTool" },
      { name: "Modeling", detail: "SketchUp + AutoCAD", icon: "Box" },
      { name: "Simulation", detail: "Clash & Path Check", icon: "Play" },
      { name: "Execution", detail: "Validated Build", icon: "Hammer" },
    ],
  },

  // =====================================================================
  // PROJECT 6: Cart Part Design & Engineering Development
  // =====================================================================
  {
    slug: "cart-part-design",
    title: "Cart Part Design & Engineering Development",
    image: "https://placehold.co/1920x1080/636/FFF?text=Cart+Design+Main",
    tech: [
      "AutoCAD",
      "SketchUp 3D",
      "Structural Analysis",
      "DFM",
      "Ergonomics",
    ],
    gallery: [
      "https://placehold.co/1920x1080/333/FFF?text=3D+Model+Structure",
      "https://placehold.co/1920x1080/333/FFF?text=2D+Technical+Drawing",
      "https://placehold.co/1920x1080/333/FFF?text=Fabrication+Assembly",
    ],
    role: "Mechanical Design Engineer",
    year: "2024",
    duration: "3 Months",

    problem:
      "Previous carts lacked standardization, causing storage inefficiencies and workflow delays. Structural instability posed safety risks, while poor design led to a high rate of part defects (scratches) during transport. High repair costs and frequent downtime were major pain points.",

    solution:
      "Executed a complete engineering workflow: from conceptual design to 2D technical drawings in AutoCAD and 3D visualization in SketchUp 3D. The new design focuses on structural integrity, user ergonomics, and optimized material usage to ensure durability and safety.",

    lessonsLearned: `- Weight vs. Strength Dilemma: A highly durable cart was initially too heavy for operators to push safely. I utilized structural analysis principles to identify low-stress areas, safely reducing frame material thickness (Lightweighting) while maintaining the structural safety factor.
- DFM (Design for Manufacturing): The initial prototype had complex welding joints which increased fabrication costs. I redesigned the joints in AutoCAD to use standard modular extrusions, cutting fabrication time and costs by 20 percent.`,

    compareImages: [
      {
        before:
          "https://placehold.co/800x600/777/FFF?text=BEFORE:+Rusty+Old+Cart",
        after:
          "https://placehold.co/800x600/228/FFF?text=AFTER:+New+Engineered+Cart",
        label: "Overall Design",
      },
      {
        before:
          "https://placehold.co/800x600/777/FFF?text=BEFORE:+Damaged+Parts",
        after:
          "https://placehold.co/800x600/228/FFF?text=AFTER:+Protective+Lining",
        label: "Quality Control",
      },
      {
        before:
          "https://placehold.co/800x600/777/FFF?text=BEFORE:+Hard+to+Push",
        after:
          "https://placehold.co/800x600/228/FFF?text=AFTER:+Ergonomic+Wheels",
        label: "Usability",
      },
      {
        before:
          "https://placehold.co/800x600/777/FFF?text=BEFORE:+Unsafe+Stacking",
        after:
          "https://placehold.co/800x600/228/FFF?text=AFTER:+Structural+Stability",
        label: "Safety",
      },
      {
        before: "https://placehold.co/800x600/777/FFF?text=BEFORE:+Mixed+Sizes",
        after: "https://placehold.co/800x600/228/FFF?text=AFTER:+Standardized",
        label: "Efficiency",
      },
    ],
    videoDemo: "/projects/3DCart/videos/cart3d.mp4",

    description:
      "End-to-end engineering development of a customized cart system, optimizing durability, safety, and workflow efficiency.",
    impact:
      "Defects Down 80 Percent | Lifespan Up 50 Percent | Saving 40k THB/yr",

    content: `
Designed and developed a customized Cart Part System for production and maintenance use. The project covered the complete engineering workflow, starting from design concept, 2D technical drawing, 3D modeling, load calculation, material selection, and fabrication support, ensuring that the cart meets durability, safety, and ergonomic requirements for factory operations.

[ Key Features ]
- Full conceptual design based on user requirements.
- 2D technical drawings with accurate dimensions and tolerances using AutoCAD.
- 3D visualization for structure clarity and assembly understanding using SketchUp 3D.
- Material selection based on load-bearing capacity and safety standards.
- Weight and strength calculation for structural integrity.

[ Impact & Improvements ]
- Improved safety and stability through proper structure analysis.
- Standardized cart size, improving workflow and storage efficiency.
- Enhanced durability resulting in lifespan increased by 30 to 50 percent.
- Reduced handling time by 20 to 40 percent.
- Improved part protection resulting in 80 percent fewer scratches and defects.

[ Cost Saving & Business Value ]
- Reduced repair and replacement costs by 15,000 to 40,000 THB per year.
- Optimized materials led to 10 to 20 percent lower fabrication cost.
- Reduced downtime from damaged carts.
- Improved workflow efficiency resulting in a 5 to 15 percent productivity gain.
`,
    architecture: [
      { name: "Requirement", detail: "User Needs", icon: "FileText" },
      { name: "Design", detail: "AutoCAD & SketchUp", icon: "PenTool" },
      { name: "Analysis", detail: "Load Calculation", icon: "Cpu" },
      { name: "Fabrication", detail: "Production", icon: "Settings" },
    ],
  },
];
