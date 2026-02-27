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
      "Previously, recording machine downtime relied entirely on manual daily reports and hourly whiteboards by line leaders. This caused low data accuracy, missing records of momentary micro-stoppages (which skewed MES data), and delayed investigations into the root causes of non-working time. Manual Excel data entry was time-consuming and prone to human error.",

    solution:
      "Developed a real-time Line Stop Monitoring System accessible via Web and Mobile. By connecting Mitsubishi PLCs through a V-Box IoT Gateway directly to a PostgreSQL database, the system captures momentary stops with second-level precision, eliminating manual recording errors and enabling instant visual management.",

    lessonsLearned: `- Signal Noise (Hardware): Encountered false 'STOP' signals due to electrical noise from old relays. Solved by implementing a software debouncing logic (signal must hold for >2s) before logging.
- User Adoption (People): Operators initially resisted the system, feeling they were being 'watched'. I resolved this by designing a dashboard that actively helped them call maintenance faster, turning them into system advocates.`,

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
      "Real-time monitoring system utilizing V-Box and Mitsubishi PLCs to track machine stoppages with second-level accuracy.",
    impact: "Data Accuracy Up 100% | Manual Reporting Time Down 100%",

    content: `
This project transformed a manual, paper-based top cover assembly line into a digitized, data-driven operation with perfect visual management.

System Architecture:
1. Machine Layer: Mitsubishi PLCs capture instantaneous machine status and momentary stop button activations.
2. Edge Gateway: A V-Box IoT Gateway acts as the bridge, reliably collecting PLC memory data and transmitting it over the network.
3. Database: A robust PostgreSQL database stores the high-frequency, time-series data.
4. Visualization: A Next.js dashboard provides real-time monitoring accessible via standard Internet Browsers and Mobile devices.

Key Features:
- Second-Level Tracking: Accurately aggregates loss time down to the exact second, fixing previous MES inaccuracies caused by manual scan errors.
- Cross-Platform Accessibility: Real-time line status, stop counts, and process times can be checked instantly via PC and mobile applications.
- Automated Aggregation: Completely replaces the need for end-of-shift manual Excel reporting, streamlining weekly D1/D2 operational meetings.
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
  // PROJECT 3: Factory Utility Monitoring (Water, Air) - DJ MES
  // =====================================================================
  {
    slug: "dj-mes-smart-utility-dashboard",
    title: "DJ MES: Smart Factory Control Room",
    image: "/projects/dj-mes-smart-utility-dashboard/1.jpg",
    tech: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Python Backend",
      "PLC (Mitsubishi/LS)",
      "LINE Notify API",
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
      "At DongJin Electronics, injection molding machines require constant cooling water to prevent catastrophic overheating, and robotic arms rely on highly stable pneumatic air pressure to operate. Previously, operators relied on manual daily patrols to check analog gauges. The critical flaw was 'Silent Failures'—a sudden drop in air pressure or a dry cooling pit went unnoticed until robots halted or injection machines overheated, causing massive production delays.",

    solution:
      "Developed a centralized Next.js MES Dashboard with a robust 'Omnichannel Alert System' specifically designed to protect these critical utilities. The system continuously aggregates PLC data from cooling pits and main air compressors. Upon detecting dangerous thresholds, it triggers local audio/visual sirens in the control room and instantly dispatches LINE Notify alerts to the engineering team's mobile devices.",

    lessonsLearned: `- Omnichannel Alerting (Web + Mobile): Bridged the gap between local factory networks and cloud communications. By integrating the LINE Notify API into the Python backend, I created a fail-safe notification loop. Even if no one is in the control room, the maintenance team receives instant mobile alerts detailing the exact sensor value, location, and timestamp.
- Multi-Tier Alarm & UI/UX Design: Implemented a 3-state alarm lifecycle on the dashboard: 'Normal' (Green) -> 'Unacknowledged Alarm' (Red Pulse + Audio Siren) -> 'Acknowledged' (Solid Amber). This prevents alarm fatigue while ensuring issues are actively managed.
- Network Reliability (Watchdog Algorithm): Engineered a strict 15-second 'Watchdog' algorithm. If the API timestamp fails to update, the dashboard instantly forces a 'SYSTEM OFFLINE' visual pulse, preventing operators from trusting frozen data.`,
    compareImages: [
      {
        before: "/projects/dj-mes-smart-utility-dashboard/11.png",
        after: "/projects/dj-mes-smart-utility-dashboard/3.png",
        label: "Monitoring Interface",
      },
      {
        before: "/projects/dj-mes-smart-utility-dashboard/9.png",
        after: "/projects/dj-mes-smart-utility-dashboard/2.png",
        label: "Critical Alerting System",
      },
      {
        before: "/projects/dj-mes-smart-utility-dashboard/10.png",
        after: "/projects/dj-mes-smart-utility-dashboard/12.png",
        label: "Critical Alerting System",
      },
      {
        before: "/projects/dj-mes-smart-utility-dashboard/5.png",
        after: "/projects/dj-mes-smart-utility-dashboard/13.png",
        label: "sensor inspection ",
      },
      {
        before: "/projects/dj-mes-smart-utility-dashboard/15.png",
        after: "/projects/dj-mes-smart-utility-dashboard/14.png",
        label: "Data Management & historical traceability",
      },
    ],
    videoDemo:
      "/projects/dj-mes-smart-utility-dashboard/videos/senserAlarm.mp4",

    description:
      "A centralized Next.js MES Dashboard featuring Digital Twin mapping, Historical Reports, and an Omnichannel Alarm System to protect critical injection molding cooling water and robotic air pressure.",

    impact:
      "Zero Cooling/Air-Related Downtime | 100% Alarm Response Tracking | Instant Mobile Notifications",

    content: `
A comprehensive Smart Factory Utility Dashboard designed to act as the "Main Control Room" for plant operations at Dong Jin Electronics. Its primary mission is to protect highly sensitive injection molding machines from cooling failures and robotic arms from pneumatic air drops, bridging the gap between local SCADA systems and cloud-based mobile notifications.

System Features:
- Omnichannel Alert Workflow: Integrates on-screen visual pulsing, web-based audio sirens, and instant LINE Notify push notifications directly to the smartphones of the engineering team.
- Acknowledge (ACK) Protocol: A strict tracking system allowing operators to click "ACK" to mute the siren and log that the issue is currently being resolved.
- Intelligent Watchdog: Automatically detects PLC connection drops (15s timeout) and alerts operators immediately.
- Digital Twin Topology: Interactive factory map with animated pipe flows and liquid gauges that react in real-time to sensor data.

Business Impact:
- Proactive Incident Management: The integration of LINE Notify shifted the factory's maintenance strategy from reactive to highly proactive. Engineers now respond to pressure drops minutes before they stall robotic arms, and monitor cooling pits before injection machines overheat, achieving zero utility-related machine halts since deployment.
- Centralized Operations: Transformed raw machine data into an intelligent alerting hub, saving hundreds of manual patrol hours and eliminating silent pump and compressor failures.
`,
    architecture: [
      {
        name: "Field Devices",
        detail: "Level & Pressure Sensors",
        icon: "Cpu",
      },
      {
        name: "Edge & Backend",
        detail: "PLC -> Python API",
        icon: "Settings",
      },
      {
        name: "Control Room",
        detail: "Next.js + Audio/Visual",
        icon: "Monitor",
      },
      {
        name: "Mobile Alerts",
        detail: "LINE Notify API",
        icon: "Smartphone",
      },
    ],
  },

  // =====================================================================
  // PROJECT 4: 3D Factory Digital Twin
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
      "Machine relocation projects often faced delays due to physical clashes (e.g., machine hitting a pillar) that weren't visible in 2D CAD drawings. This resulted in on-site modifications and extended production downtime.",

    solution:
      "Created a 1:1 Scale 3D Digital Twin of the entire factory floor. This allowed the team to 'Virtually Move' machines, check vertical clearances, simulate forklift paths, and optimize layout before the actual move day.",

    lessonsLearned: `• Model Heavy Performance: Initial 3D models contained too many polygons (every nut and bolt), causing simulation software to crash. I learned to apply LOD (Level of Detail) optimization—keeping highly detailed meshes only for collision boundaries to ensure smooth 60FPS walkthroughs.
• Stakeholder Communication: Realized that executives prefer visual walkthrough videos over technical CAD files. Rendered animated fly-throughs which reduced layout approval time from weeks to just hours.`,

    compareImages: [
      {
        before: "/projects/factory/224648.png",
        after: "/projects/factory/232.png",
        label: "Visualization",
      },
      {
        before: "/projects/factory/IMG_4933.jpg",
        after: "/projects/factory/20250325_145055.jpg",
        label: "Planning",
      },
      {
        before: "/projects/factory/IMG_3900.jpg",
        after: "/projects/factory/20241204_090904.jpg",
        label: "Planning",
      },
      {
        before: "/projects/factory/factory-3d.jpg",
        after: "/projects/factory/20250726_194800.jpg",
        label: "Efficiency",
      },
      {
        before: "/projects/factory/255.png",
        after: "/projects/factory/20260103_091155.jpg",
        label: "Efficiency",
      },
      {
        before: "/projects/factory/343.png",
        after: "/projects/factory/20250411_141951.jpg",
        label: "Efficiency",
      },
    ],
    videoDemo: "/projects/factory/videos/3df.mp4",

    description:
      "Virtual 3D simulation of the factory floor used for precise layout planning and validation.",
    impact: "Zero Layout Errors | Setup time reduced by 3 days",

    content: `Bridging the gap between design and reality with High-Fidelity 3D Simulation.

[ Workflow ]
1. Site Survey: Measured actual dimensions of building columns, cable trays, and piping.
2. Modeling: Converted 2D layouts into 3D models.
3. Validation: Simulated machine placement for collision detection and maintenance access.`,
    architecture: [
      { name: "Survey", detail: "Measure Site", icon: "PenTool" },
      { name: "Modeling", detail: "SketchUp 3D", icon: "Box" },
      { name: "Simulation", detail: "Move & Validate", icon: "Play" },
      { name: "Construction", detail: "Actual Setup", icon: "Hammer" },
    ],
  },

  // =====================================================================
  // PROJECT 5: Cart Part Design & Engineering Development
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
    videoDemo: null,

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
