/**
 * Static Data File for Team 03
 * Specialization Theme: Intelligent Systems & Optimization
 * Project: Adaptive Academic Timetable Optimization
 *
 * HOW TO EDIT OR PROVIDE NEW CONTENT:
 * 1. Modify the fields or table arrays below to match your Word document or slides.
 * 2. To change or add images, place your image file in `dist/assets/` and set the path in `useCaseImage` or `archImage`.
 * 3. All tables below will automatically render as clean, formatted HTML tables matching academic templates.
 */

window.STATIC_TEAMS_DATA = window.STATIC_TEAMS_DATA || {};

window.STATIC_TEAMS_DATA['03'] = {
  id: '03',
  theme: 'Intelligent Systems & Optimization',
  title: 'Adaptive Academic Timetable Optimization',
  guide: 'Amit K',
  academicYear: '2026–27',
  repo: 'https://github.com/topics/timetable-scheduling',
  members: [
    {
      name: 'Parth Karpe',
      usn: '01FE23BCS101',
      role: 'Team Lead · Full-stack & Solver Integration',
      skills: 'Full-stack · OR-Tools',
      contribution: 'Lead architecture modeling, CP-SAT solver integration, and dashboard realization.',
      github: 'https://github.com'
    },
    {
      name: 'Nupur Bagave',
      usn: '01FE23BCS102',
      role: 'Core Member · Constraint Formulation',
      skills: 'DAA · CSP Algorithms',
      contribution: 'Constraint satisfaction formulation, boolean clause modeling, and clash screening.',
      github: 'https://github.com'
    },
    {
      name: 'Vedant Khot',
      usn: '01FE23BCS103',
      role: 'Core Member · Backend & Data Modeling',
      skills: 'APIs · Relational DB',
      contribution: 'Room inventory modeling, faculty availability matrices, and REST API routing.',
      github: 'https://github.com'
    },
    {
      name: 'Sachi Aarati',
      usn: '01FE23BCS104',
      role: 'Core Member · Evaluation & Verification',
      skills: 'Testing · Benchmarking',
      contribution: 'Test suite assertion design, stress benchmark testing, and report generation.',
      github: 'https://github.com'
    }
  ],

  // ==========================================
  // STAGE 0: PROBLEM IDENTIFICATION (Stage 0)
  // ==========================================
  stage0: {
    problem: 'Manual academic timetable preparation is labor-intensive, error-prone, and leads to widespread faculty clashes, overlapping room bookings, and uncoordinated student elective slots across the department.',
    targetUsers: 'Department coordinators, faculty mentors, and enrolled semester students.',
    baselineFriction: 'Over 40+ manual coordination hours per semester with unavoidable human scheduling conflicts.',
    objectives: 'Automate conflict-free timetable generation; reduce scheduling coordination time by 80%; guarantee 100% adherence to hard room and faculty capacity constraints; provide coordinator manual override capabilities.',
    success1: 'Zero Hard Conflicts: Strict constraint satisfaction with zero double-booked rooms or faculty slots.',
    success2: 'Runtime Optimization: Generate verifiable cohort timetables in under 30 seconds on standard compute.',

    // Image for Stage 0 (Use Case Diagram)
    useCaseImage: '', // Put path here (e.g. 'assets/team03_usecase.png'), or leave empty for default diagram
    useCaseCaption: 'Figure 0.1: Contextual Use Case Diagram for Adaptive Academic Timetable Optimization.',

    // Word Table 2: Foundation Course Integration
    coursesTable: [
      { sl: '1', course: 'Design & Analysis of Algorithms (DAA)', concepts: 'Constraint satisfaction modeling, backtracking algorithms, and search optimization', role: 'Dominant' },
      { sl: '2', course: 'Operating Systems (OS)', concepts: 'Resource scheduling, concurrency, time-slice allocation, and deadlocks', role: 'Dominant' },
      { sl: '3', course: 'Database Management Systems (DBMS)', concepts: 'Relational schema for room inventories, course credits, and faculty availability', role: 'Supporting' },
      { sl: '4', course: 'Software Engineering (SE)', concepts: 'Requirement engineering, modular pipeline architecture, and verification assertions', role: 'Supporting' }
    ],

    // Word Table 3: Conceptual Pipeline Flow
    pipelineTable: [
      { input: 'Faculty availability, room capacities, course lists', assessment: 'CP-SAT solver executes boolean constraint satisfaction passes', userAction: 'Review slot allocations and adjust preferences / manual overrides', output: 'Validated conflict-free multi-cohort timetable' }
    ],

    // Word Table 4: Conceptual Engines
    enginesTable: [
      { id: 'E1', engine: 'E1 – Ingestion & Availability Parser', desc: 'Ingests faculty availability matrices, room capacities, course hours, and student cohorts.' },
      { id: 'E2', engine: 'E2 – CP-SAT Constraint Engine', desc: 'Translates scheduling policies into boolean constraints and solves for zero hard clashes.' },
      { id: 'E3', engine: 'E3 – Conflict Resolution & Override', desc: 'Validates manual slot overrides and dynamically computes conflict boundaries in real time.' },
      { id: 'E4', engine: 'E4 – Multi-Format Publication Engine', desc: 'Exports conflict-free timetables in PDF, Excel, and interactive web calendar views.' }
    ],

    // Word Table 5: Broad In-Scope Items
    scopeInTable: [
      { num: '1', item: 'Single department automated multi-section timetable generation.' },
      { num: '2', item: 'Strict hard constraint satisfaction (zero double-booked rooms or faculty).' },
      { num: '3', item: 'Soft preference optimization (morning preferences, minimized student idle gaps).' },
      { num: '4', item: 'Interactive coordinator manual override interface with live clash detection.' }
    ],

    // Word Table 6: Out-of-Scope Items
    scopeOutTable: [
      { num: '1', item: 'University-wide multi-campus bus transportation scheduling', reason: 'Beyond single-department 3-credit academic scope.' },
      { num: '2', item: 'Real-time biometric attendance hardware integration', reason: 'Hardware dependency outside algorithmic solver scope.' },
      { num: '3', item: 'Automated campus electricity / HVAC load scheduling', reason: 'Facility management outside academic scheduling scope.' }
    ],

    // Word Table 7: Feasibility Assessment
    feasibilityTable: [
      { aspect: 'Feasibility within 3-credit scope', assessment: 'Achievable within 15 weeks utilizing standard open-source CP-SAT constraint solvers.' },
      { aspect: 'Required computing / resources', assessment: 'Runs locally on standard university computer lab systems (4GB RAM, dual-core CPU).' },
      { aspect: 'Prerequisite knowledge', assessment: 'DAA (Constraint Satisfaction Problems), OS (Scheduling), Python 3, HTML/CSS.' },
      { aspect: 'Major constraints / limitations', assessment: 'Zero cloud budget; operates 100% offline in browser and local runtime environment.' },
      { aspect: 'Overall feasibility', assessment: 'High academic feasibility supported by deterministic unit tests and measurable solver metrics.' }
    ],

    // Primary Actors & User Stories
    userStoryTable: [
      { id: '01', actor: 'Coordinator', desc: 'Upload semester course catalog, faculty availability, and room capacity matrices.', mainFlow: 'Upload CSV/JSON → Validate dimensions and capacities → Confirm catalog.', exceptionFlow: 'Corrupted format → Display validation errors and highlight missing data.' },
      { id: '02', actor: 'Faculty', desc: 'Submit preferred teaching slots, lab hours, and designated unavailable periods.', mainFlow: 'Select preferred slots → Submit preference matrix → Acknowledge submission.', exceptionFlow: 'Clashing mandatory slots → Alert faculty of scheduling conflicts.' },
      { id: '03', actor: 'Coordinator', desc: 'Execute constraint solver to generate conflict-free timetable across sections.', mainFlow: 'Click Generate → CP-SAT computes optimal assignment → Render weekly matrix.', exceptionFlow: 'Unsatisfiable constraints → Highlight bottleneck rooms or faculty overloads.' },
      { id: '04', actor: 'Student', desc: 'View weekly cohort class schedule with classroom numbers and instructor names.', mainFlow: 'Select cohort section → Render weekly schedule → Download PDF / Excel.', exceptionFlow: 'Unapproved timetable → Display draft watermark banner.' }
    ]
  },

  // ==========================================
  // STAGE 1: REQUIREMENT ENGINEERING (Stage 1)
  // ==========================================
  stage1: {
    // Word Table 2: Functional Requirements
    frTable: [
      { id: 'FR-01', desc: 'The system shall ingest faculty availability matrices, room capacities, course lists, and student cohort rosters from structured CSV / JSON files.', prio: 'Mandatory', source: 'Automated Ingestion' },
      { id: 'FR-02', desc: 'The system shall execute a constraint-based solver modeling hard limits (zero overlap) and optimizing preferred morning time slots.', prio: 'Mandatory', source: 'Constraint Satisfaction Engine' },
      { id: 'FR-03', desc: 'The system shall provide interactive conflict resolution and manual coordinator slot overrides with real-time clash validation.', prio: 'Mandatory', source: 'Interactive Verification' },
      { id: 'FR-04', desc: 'The system shall export finalized conflict-free timetables in PDF, Excel, and interactive web calendar formats.', prio: 'Mandatory', source: 'Multi-Format Publication' },
      { id: 'FR-05', desc: 'The system shall balance faculty teaching loads across the 5-day academic week to avoid instructor fatigue.', prio: 'Challenge', source: 'Workload Optimization' }
    ],

    // Word Table 3: Non-Functional Requirements
    nfrTable: [
      { id: 'NFR-01', desc: 'The system shall generate a valid schedule for 120 course sections in under 30 seconds on benchmark compute.', cat: 'Performance', target: 'Sub-30s solver execution latency' },
      { id: 'NFR-02', desc: 'The system shall enforce 100% hard constraints with zero simultaneous clashes for faculty or classrooms.', cat: 'Reliability', target: '0 double-booked faculty or room slots' },
      { id: 'NFR-03', desc: 'The system shall restrict schedule modification to authorized department coordinators via role-based access.', cat: 'Security', target: 'Unauthorized slot modification rejected' },
      { id: 'NFR-04', desc: 'The system shall operate completely offline without external cloud dependencies in standard university labs.', cat: 'Usability / Portability', target: 'Zero external cloud API dependency' }
    ],

    // Architecture & Workflow
    archDesc: 'Web Dashboard Presentation Tier → Scheduling API Gateway → Google OR-Tools CP-SAT Constraint Engine → Timetable Local Repository.',
    archImage: '', // Put path here (e.g. 'assets/team03_architecture.png'), or leave empty for default diagram
    archCaption: 'Figure 1.1: System Architecture & Constraint Satisfaction Pipeline for Team 03.',

    workflow: [
      'Phase 01: Catalog & Availability Ingestion',
      'Phase 02: Boolean Constraint Matrix Setup',
      'Phase 03: CP-SAT Optimization Solver Iteration',
      'Phase 04: Clash Verification & Override Audit',
      'Phase 05: Final Schedule Export & Publication'
    ],
    workflowDesc: [
      'Reads course catalog, room capacity matrices, and faculty blackout preferences.',
      'Constructs boolean decision variables and hard capacity clauses for every timeslot.',
      'Solves constraint satisfaction problem and minimizes soft objective penalties.',
      'Asserts zero double-booking and validates manual adjustments with clash alerts.',
      'Renders weekly interactive timetable visualizer and exports PDF/Excel schedules.'
    ],

    techStack: 'Frontend: HTML5 Semantic, Vanilla JavaScript ES2022, CSS3 Design Tokens, SVG Timetable Visualizer.\nBackend/Engine: Python 3.11, Google OR-Tools (CP-SAT), FastAPI Router, NumPy.\nStorage: LocalStorage JSON State, Browser IndexedDB, UTF-8 CSV Timetable Exporter.\nVerification: Deterministic Assertion Suite, Local Ollama Mentor (Qwen 3:4b).',
    constraints: 'Hardware: Standard commodity computer with min 4GB RAM and dual-core CPU. Software: Modern browser with ES2022 support; Python 3.10+ runtime. Operational: Zero external cloud reliance; runs 100% offline in college labs.'
  }
};
