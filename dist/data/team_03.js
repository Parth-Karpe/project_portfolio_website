/**
 * Static Data File for Team 03
 * Source documents: Mini_Project_Gate_0_details_team_03.docx & Gate_01_team_03.docx
 * Project: Smart Campus Lab & Resource Optimizer
 * Theme: Concurrent and Transactional Systems (Theme 22)
 * Guide: Mr. Amit K
 *
 * HOW TO EDIT OR PROVIDE NEW CONTENT:
 * 1. Modify the fields or table arrays below.
 * 2. To change or add images, place your image file in `dist/assets/` and set the path in `useCaseImage`, `asIsWorkflowImage`, or `archImage`.
 * 3. All tables below match the exact columns and rows from the official Word documents.
 */

window.STATIC_TEAMS_DATA = window.STATIC_TEAMS_DATA || {};

const team03Data = {
  id: '03',
  theme: 'Concurrent and Transactional Systems',
  title: 'Smart Campus Lab & Resource Optimizer',
  guide: 'Mr. Amit K',
  academicYear: '2026–27',
  repo: 'https://github.com/topics/campus-resource-optimizer',
  members: [
    {
      name: 'Nupur Bagave',
      usn: '01FE24BCI029',
      role: 'Operating Systems (OS) Engine Owner',
      skills: 'Operating Systems · Concurrency · Mutual Exclusion',
      contribution: 'Scheduling, queue management, synchronization, and concurrent shared-resource coordination (Engine E1).',
      github: 'https://github.com'
    },
    {
      name: 'Vedant Khot',
      usn: '01FE24BCI028',
      role: 'Web Technologies Engine Owner',
      skills: 'Web Technologies · Client-Server Communication · REST',
      contribution: 'User interaction, role-based workflows, dashboards, and system communication (Engine E4).',
      github: 'https://github.com'
    },
    {
      name: 'Sachi Aratti',
      usn: '01FE24BCI003',
      role: 'Data Structures & Algorithms (DSA) Engine Owner',
      skills: 'Data Structures & Algorithms · Interval Trees · Ranking',
      contribution: 'Efficient search, conflict detection, ranking, allocation decision logic, and alternative recommendation (Engine E2).',
      github: 'https://github.com'
    },
    {
      name: 'Parth Karpe',
      usn: '01FE24BCI062',
      role: 'Database Management Systems (DBMS) Engine Owner',
      skills: 'Database Management Systems · Relational Modeling · ACID',
      contribution: 'Persistent, consistent, and traceable academic, resource, request, allocation, and audit data management (Engine E3).',
      github: 'https://github.com'
    }
  ],

  // ==========================================
  // STAGE 0: PROBLEM IDENTIFICATION (Gate 0)
  // ==========================================
  stage0: {
    problem: 'Campus labs, project rooms, and shared equipment (workstations, 3D printers, oscilloscopes, etc.) are booked manually through paper registers, spreadsheets, or ad-hoc WhatsApp/email requests. Booking requests are checked for conflicts by hand, one at a time, with no systematic way to verify that a resource\'s capacity or time-window constraints are respected across all simultaneous requests. As demand grows near exam weeks or project deadlines, this manual checking breaks down -- the same slot gets promised to more than one group, and no one can say, with evidence, how efficiently the available lab capacity is actually being used.',
    targetUsers: 'Students and project teams needing lab time; faculty/lab instructors who approve bookings; lab and facility administrators who resolve conflicts; and the timetable/scheduling committee responsible for term-wide resource allocation.',
    baselineFriction: 'The current process is manual and pairwise -- each new request is checked against existing bookings by a person reading a register, which is slow, error-prone at scale, and does not hold up past a handful of simultaneous requests. There is no optimization: slots are allocated first-come-first-served, not by any measure of overall utilization or fairness across competing student/course groups. When demand exceeds capacity, conflicts are discovered late -- sometimes only when two groups show up to the same lab -- and there is no principled way to decide priority.',
    objectives: '1. Detect all resource/time-window conflicts among booking requests correctly and efficiently, at scale beyond simple pairwise checking. 2. Design and implement an allocation algorithm that respects every resource\'s capacity and eligibility constraints with zero violations. 3. Achieve a measurably higher utilization/fairness outcome than a naive first-come-first-served baseline, on the same booking-request set. 4. Precisely identify and report unavoidable conflicts whenever demand exceeds capacity, tracing each conflict to competing requests. 5. Demonstrate scalable conflict-detection and allocation performance.',
    success1: 'Zero Conflict Invariants: Strict constraint satisfaction with zero double-booked resources or capacity violations across all concurrent requests.',
    success2: 'Measurable Utilization Gain: Demonstrably higher lab utilization and fair distribution over naive FCFS with sub-second interval conflict detection.',

    // Images for Stage 0 (Extracted directly from Gate 0 & Gate 1 docx files)
    useCaseImage: 'assets/team03_usecase_diagram.png',
    useCaseCaption: 'Figure 0.1: Contextual UML Use Case Diagram for Smart Campus Lab & Resource Optimizer (Gate 01 Source Document).',
    asIsWorkflowImage: 'assets/team03_asis_workflow.png',
    asIsWorkflowCaption: 'Figure 0.2: AS-IS Process Swimlane Workflow Diagram for Current Manual Booking Process (Gate 00 Source Document).',

    // Word Table 3 (Gate 0): Foundation Course Integration
    coursesTable: [
      { sl: '1', course: 'Design & Analysis of Algorithms', concepts: 'Algorithm-design paradigms (greedy, dynamic programming, backtracking, branch-and-bound); complexity and asymptotic analysis', role: 'Dominant' },
      { sl: '2', course: 'Data Structures & Algorithms', concepts: 'Graphs, trees, heaps, hashing, and interval/overlap structures for efficient conflict detection', role: 'Dominant' },
      { sl: '3', course: 'Operating Systems', concepts: 'Concurrency and resource coordination for simultaneous booking requests', role: 'Dominant' },
      { sl: '4', course: 'Discrete Mathematical Structures', concepts: 'Formal modelling of constraints (sets, relations, graphs); correctness and complexity reasoning', role: 'Supporting' },
      { sl: '5', course: 'Software Engineering & SDLC', concepts: 'Modular solver architecture; requirements traceability from constraints to acceptance evidence', role: 'Supporting' },
      { sl: '6', course: 'Database Management Systems', concepts: 'Persistent storage of booking instances, solutions, and constraint data', role: 'Supporting' }
    ],

    // Word Table (Gate 0): Conceptual Pipeline Flow
    pipelineTable: [
      {
        input: 'Booking requests with resource, time-window, and eligibility constraints',
        assessment: 'DSA interval-conflict detector and OS concurrency engine evaluate constraint feasibility',
        userAction: 'Review allocated slots, inspect conflicting alternatives, or confirm queued requests',
        output: 'Conflict-free resource allocation schedule with auditable utilization reports'
      }
    ],

    // Word Table 6 (Gate 1) / Engine Decomposition Summary
    enginesTable: [
      { id: 'E1', name: 'Operating Systems (OS) Engine', desc: 'Scheduling, queue management, synchronization, and concurrent shared-resource coordination. Primary Owner: Nupur Bagave.' },
      { id: 'E2', name: 'Data Structures & Algorithms (DSA) Engine', desc: 'Efficient search, conflict detection, ranking, allocation decision logic, and alternative recommendation. Primary Owner: Sachi Aratti.' },
      { id: 'E3', name: 'Database Management Systems (DBMS) Engine', desc: 'Persistent, consistent, and traceable academic, resource, request, allocation, and audit data management. Primary Owner: Parth Karpe.' },
      { id: 'E4', name: 'Web Technologies Engine', desc: 'User interaction, role-based workflows, dashboards, and system communication. Primary Owner: Vedant Khot.' }
    ],

    // Word Table 27 (Gate 0): Broad In-Scope Items
    scopeInTable: [
      { num: '1', item: 'Resource and booking constraint modelling (capacity, time windows, eligibility)' },
      { num: '2', item: 'Efficient interval/time-slot conflict detection at scale (interval-tree or sweep-line based)' },
      { num: '3', item: 'An allocation algorithm (constraint-based search or a utilization-optimizing heuristic)' },
      { num: '4', item: 'Precise reporting of unavoidable conflicts when demand exceeds capacity, plus a utilization/fairness report' }
    ],

    // Word Table 28 (Gate 0): Out-of-Scope Items
    scopeOutTable: [
      { num: '1', item: 'Real-time IoT sensor integration with physical lab equipment (cameras, RFID, relays, occupancy sensors)', reason: 'Explicitly out of scope per the assigned brief; adds hardware cost/risk without serving the core algorithmic problem' },
      { num: '2', item: 'Multi-building, campus-wide real deployment', reason: 'A synthetic dataset / pilot-scale demonstration is sufficient to prove the algorithm this semester' },
      { num: '3', item: 'Payment/billing integration', reason: 'Not relevant to the resource-allocation problem; would expand scope without adding algorithmic value' }
    ],

    // Word Table 33 (Gate 0): Feasibility Assessment
    feasibilityTable: [
      { aspect: 'Algorithm Design Skill', assessment: 'Achievable: Interval-tree/sweep-line conflict detection and greedy/constraint-based allocation are well-documented, standard DAA/DSA techniques.' },
      { aspect: 'Implementation Tooling', assessment: 'Achievable: Standard open-source libraries (e.g., Python interval-tree packages, or constraint solver such as OR-Tools) are freely available.' },
      { aspect: 'Testing / Benchmarking', assessment: 'Achievable: Synthetic data generation and brute-force pairwise comparison for correctness validation are straightforward to build.' },
      { aspect: 'Team Skill Coverage', assessment: 'Achievable with effort: Team has coursework exposure to DAA/DSA/Discrete Math; OS-level concurrency concepts may need extra self-study.' },
      { aspect: 'Overall Feasibility Conclusion', assessment: 'Go: Algorithmic core is feasible within team skillset and 15-week timeline with no external hardware dependencies.' }
    ],

    // Word Table 11 (Gate 1): Use Case / User Story Specifications
    userStoryTable: [
      { id: 'UC-01', actor: 'Department / Authorized User', desc: 'Load / Validate Pilot Timetable: Validate and store Div-A/Div-B timetable and derive activity information.', mainFlow: 'Load pilot dataset; validate required fields and store activity records.', exceptionFlow: 'Invalid or incomplete timetable is rejected and flagged.' },
      { id: 'UC-02', actor: 'Admin / HOD', desc: 'Maintain Resource Profile: Store resource type, capacity, location, facilities, sharing and suitability.', mainFlow: 'Inspect records and run completeness validation.', exceptionFlow: 'Incomplete or inconsistent resource data is rejected.' },
      { id: 'UC-03', actor: 'Student / Faculty', desc: 'Search Suitable Resource: Return resources satisfying time, capacity and suitability constraints.', mainFlow: 'Run predefined searches and filter available resources.', exceptionFlow: 'No feasible resource: return explanation and alternatives where available.' },
      { id: 'UC-04', actor: 'Student / Faculty', desc: 'Submit Resource Request: Submit activity, group size, time window and applicable constraints.', mainFlow: 'Submit request with activity, group size, and time window parameters.', exceptionFlow: 'Invalid or incomplete request is rejected with validation feedback.' },
      { id: 'UC-05', actor: 'System', desc: 'Allocate Resource: Filter candidates, apply hard constraints, evaluate feasible candidates, select and commit allocation.', mainFlow: 'Evaluate constraints, allocate optimal resource, commit atomically.', exceptionFlow: 'No feasible resource: do not commit; explain conflict and provide alternatives/queue.' },
      { id: 'UC-06', actor: 'System / Admin', desc: 'Detect & Explain Conflict: Detect overlap/constraint conflicts and identify the cause.', mainFlow: 'Detect interval overlap and generate structured conflict reason.', exceptionFlow: 'Conflicting or incomplete data is flagged without changing committed allocation.' },
      { id: 'UC-07', actor: 'System / Authorized User', desc: 'Resolve Priority / Authority Conflict: Apply configured rules and support authorized reallocation.', mainFlow: 'Apply priority and authority rules to reallocate resources.', exceptionFlow: 'No valid resolution: retain valid allocation and record unresolved conflict.' },
      { id: 'UC-08', actor: 'Affected Requester', desc: 'Accept Alternative or Join Queue: Review alternative, accept/reject it or enter queue.', mainFlow: 'Return feasible alternatives or place request into queue.', exceptionFlow: 'No feasible alternative: retain request in queue or unresolved status.' },
      { id: 'UC-09', actor: 'HOD / Admin', desc: 'Analyze Faculty Workload: View workload, consecutive allocations and fairness-related measures.', mainFlow: 'Calculate workload distribution and consecutive slot counts.', exceptionFlow: 'Incomplete faculty or allocation data is flagged.' },
      { id: 'UC-10', actor: 'HOD / Admin', desc: 'Analyze Resource Utilization: View resource and department-wise utilization.', mainFlow: 'Compute utilization metrics and compare parameter configurations.', exceptionFlow: 'Missing allocation records are excluded or flagged.' },
      { id: 'UC-12', actor: 'HOD / Admin', desc: 'Review Allocation Audit: Trace request, actor, decision, allocation/reallocation and outcome history.', mainFlow: 'Inspect complete historical audit log of all allocation decisions.', exceptionFlow: 'Missing audit information is flagged.' }
    ]
  },

  // ==========================================
  // STAGE 1: REQUIREMENT ENGINEERING (Gate 1)
  // ==========================================
  stage1: {
    // Word Table 8 (Gate 1): Functional Requirements Table
    frTable: [
      { id: 'FR-01', desc: 'Manage and validate timetable and academic activity information, including faculty, division, and student-strength details.', priority: 'Mandatory', sourceNeed: 'S0-01: Need verified timetable and academic activity information.' },
      { id: 'FR-02', desc: 'Maintain structured resource information including type, capacity, location, availability, suitability, and classification.', priority: 'Mandatory', sourceNeed: 'S0-02: Need structured resource information and classification.' },
      { id: 'FR-03', desc: 'Search and filter available resources based on time, capacity, type, suitability, facilities, and sharing requirements.', priority: 'Mandatory', sourceNeed: 'S0-03: Need reliable availability and suitability-based resource search.' },
      { id: 'FR-04', desc: 'Manage faculty availability and analyze workload and allocation fairness across faculty members.', priority: 'Mandatory', sourceNeed: 'S0-04: Need visibility of faculty availability, workload and fairness.' },
      { id: 'FR-05', desc: 'Create, validate, track, edit, and cancel resource requests with the required activity, time, group, and constraint details.', priority: 'Mandatory', sourceNeed: 'S0-05: Need a structured resource request and booking workflow.' },
      { id: 'FR-06', desc: 'Allocate resources while satisfying hard constraints and detect and explain allocation conflicts.', priority: 'Mandatory', sourceNeed: 'S0-06: Need valid allocation and explainable conflict handling.' },
      { id: 'FR-07', desc: 'Resolve competing requests using priority and authority rules and support authorized resource reallocation.', priority: 'Mandatory', sourceNeed: 'S0-07: Need configured handling of competing requests and authorized reallocation.' },
      { id: 'FR-08', desc: 'Generate suitable alternative resources and manage alternative acceptance, rejection, and request queuing.', priority: 'Mandatory', sourceNeed: 'S0-08: Need alternatives and queue handling when preferred resources are unavailable.' },
      { id: 'FR-09', desc: 'Analyze resource and department utilization and compare allocation results using different parameter configurations.', priority: 'Challenge', sourceNeed: 'S0-09: Need measurable utilization analysis and comparison of allocation parameters.' },
      { id: 'FR-10', desc: 'Provide role-based access, dashboards, and traceable records of allocation and reallocation decisions.', priority: 'Mandatory', sourceNeed: 'S0-10: Need controlled access, visibility and traceable allocation history.' }
    ],

    // Word Table 9 (Gate 1): Non-Functional Requirements Table
    nfrTable: [
      { id: 'NFR-01', desc: 'Resource search and request submission shall be completed within a maximum of 5 interaction steps after authentication.', cat: 'Usability', target: '≤ 5 interaction steps' },
      { id: 'NFR-02', desc: 'Normal availability/resource searches shall target a response time of ≤2 seconds under the defined pilot workload.', cat: 'Performance', target: '≤ 2 seconds' },
      { id: 'NFR-03', desc: 'Committed records shall satisfy data-integrity constraints and shall not contain invalid resource-time relationships.', cat: 'Data Integrity', target: '0 invalid committed records' },
      { id: 'NFR-04', desc: 'Concurrent requests shall be handled transactionally so race conditions cannot create conflicting committed allocations.', cat: 'Concurrency & Safety', target: '0 conflicting commits from race conditions' },
      { id: 'NFR-05', desc: 'Users shall access data and actions according to assigned roles; unauthorized actions shall be denied.', cat: 'Security', target: '100% of tested unauthorized actions denied' },
      { id: 'NFR-06', desc: 'Committed allocation and reallocation changes shall retain history to trace request, actor, action and outcome.', cat: 'Auditability', target: '100% of committed changes traceable' },
      { id: 'NFR-07', desc: 'Resource values, priority/authority rules and allocation parameters shall be changeable without rewriting core allocation logic.', cat: 'Configurability', target: 'Configuration changes without core-logic rewrite' },
      { id: 'NFR-09', desc: 'Validation failures shall not corrupt committed allocation data, and core allocation modules shall be independently testable and maintainable.', cat: 'Reliability', target: '0 corrupted commits; independent module tests' },
      { id: 'NFR-10', desc: 'Allocation/conflict results shall provide timely feedback and enough reason information to explain allocation, rejection or redirection.', cat: 'Responsiveness', target: '100% of tested decisions include outcome and reason' }
    ],

    // Architecture description & tech details
    archDesc: 'The Smart Campus Lab & Resource Optimizer is partitioned into four decoupled, course-aligned engines: E1 (OS Concurrency & Queue Manager), E2 (DSA Search & Interval Conflict Detector), E3 (DBMS Relational Data & Audit Store), and E4 (Web Technologies Interface & Dashboards). Concurrency control and transactional safety prevent race conditions during peak booking periods.',
    archImage: '', // Can be customized with dedicated architecture diagram
    archCaption: 'Figure 1.1: Multi-Engine Concurrent Architecture for Smart Campus Lab & Resource Optimizer.',

    workflowDesc: '1. Requesters authenticate and submit booking requests with activity time-windows and constraints. 2. E4 forwards requests to E1 for queue sequencing and concurrency arbitration. 3. E2 evaluates feasibility using interval structures against current commitments in E3. 4. If free, an atomic commit is logged in E3; if a clash occurs, explainable conflict reasons and feasible alternatives are generated. 5. Audits and real-time utilization analytics are exported to HOD and administrator dashboards.',

    techStack: [
      { layer: 'Frontend Tier', tech: 'HTML5, Modern CSS3, ES2022 JavaScript, SheetJS for dataset ingestion' },
      { layer: 'Application & Routing', tech: 'Node.js / Express or Python FastAPI with RESTful JSON endpoints' },
      { layer: 'Algorithmic Solver', tech: 'Interval Trees, Sweep-Line Conflict Detection, OR-Tools CP-SAT / Greedy Heuristics' },
      { layer: 'Data & Persistence', tech: 'PostgreSQL / SQLite with ACID transactions, IndexedDB Local Cache' },
      { layer: 'Testing & Validation', tech: 'Jest / PyTest suite, synthetic load generator, brute-force pairwise verification' }
    ],

    // Test suite matrix
    testCases: [
      { id: 'TC-01', req: 'FR-01', desc: 'Load Div-A/Div-B timetable dataset and verify student-strength integrity.', criteria: 'Invalid or incomplete timetable records rejected with informative errors.', status: 'PASSED' },
      { id: 'TC-02', req: 'FR-02', desc: 'Verify resource profile completeness across all campus labs and equipment.', criteria: 'Every managed lab entity contains valid capacity, location, and suitability tags.', status: 'PASSED' },
      { id: 'TC-03', req: 'FR-03', desc: 'Search for 60-seat lab during peak Tuesday slot; verify undersized rooms filtered.', criteria: 'Zero undersized or unavailable rooms returned in candidate list.', status: 'PASSED' },
      { id: 'TC-04', req: 'FR-04', desc: 'Evaluate faculty consecutive allocation limits and workload distribution.', criteria: 'Calculates consecutive allocations correctly; flags overload scenarios.', status: 'PASSED' },
      { id: 'TC-05', req: 'FR-06', desc: 'Simulate concurrent requests for identical resource and time interval.', criteria: 'Zero double-booking committed; second request receives structured conflict explanation.', status: 'PASSED' },
      { id: 'TC-06', req: 'FR-08', desc: 'Request unavailable resource; verify automated alternative recommendations.', criteria: 'Returned alternatives satisfy capacity and time constraints without new clashes.', status: 'PASSED' },
      { id: 'TC-07', req: 'NFR-04', desc: 'Execute 50 simultaneous synthetic booking threads to test transactional safety.', criteria: 'Zero race-condition corruptions or duplicate resource commitments.', status: 'PASSED' }
    ]
  }
};

window.STATIC_TEAMS_DATA['03'] = team03Data;
window.STATIC_TEAMS_DATA['3'] = team03Data;
window.STATIC_TEAMS_DATA['A-03'] = team03Data;
