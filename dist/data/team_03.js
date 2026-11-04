/**
 * Static Data File for Team 03
 * Source documents provided by user:
 * 1. Stage_0_Smart_Campus_Lab_Resource_Optimizer.docx
 * 2. Team_3_Gate_1_Smart_Campus_Lab_Resource_Optimizer.docx
 * 3. System Design.docx
 * Project: Smart Campus Lab and Resource Optimizer
 * Theme: Concurrent and Transactional Systems (Theme 22)
 * Mentor: Mr. Amit Kachavimath
 */

window.STATIC_TEAMS_DATA = window.STATIC_TEAMS_DATA || {};

const team03Data = {
  id: '03',
  theme: 'Concurrent and Transactional Systems',
  title: 'Smart Campus Lab and Resource Optimizer',
  guide: 'Mr. Amit Kachavimath',
  academicYear: '2026–27',
  repo: 'https://github.com/topics/campus-resource-optimizer',
  members: [
    {
      name: 'Nupur Bagave',
      usn: '01FE24BCI029',
      role: 'Team Leader',
      skills: 'Operating Systems · Concurrency · Mutual Exclusion',
      contribution: 'Scheduling, queue management, synchronization, and concurrent shared-resource coordination.',
      github: 'https://github.com'
    },
    {
      name: 'Vedant Khot',
      usn: '01FE24BCI028',
      role: 'Team Member',
      skills: 'Web Technologies · Client-Server Communication · REST',
      contribution: 'User interaction, role-based workflows, dashboards, and system communication (Engine E4).',
      github: 'https://github.com'
    },
    {
      name: 'Sachi Aratti',
      usn: '01FE24BCI003',
      role: 'Team Member',
      skills: 'Data Structures & Algorithms · Interval Trees · Ranking',
      contribution: 'Efficient search, conflict detection, ranking, allocation decision logic, and alternative recommendation (Engine E2).',
      github: 'https://github.com'
    },
    {
      name: 'Parth Karpe',
      usn: '01FE24BCI062',
      role: 'Team Member',
      skills: 'Database Management Systems · Relational Modeling · ACID',
      contribution: 'Persistent, consistent, and traceable academic, resource, request, allocation, and audit data management (Engine E3).',
      github: 'https://github.com'
    }
  ],

  // ==========================================
  // STAGE 0: PROBLEM STATEMENT & NEED IDENTIFICATION
  // Source: Stage_0_Smart_Campus_Lab_Resource_Optimizer.docx
  // ==========================================
  stage0: {
    problem: 'In many colleges, academic timetables and resource allocation are still managed manually, making it difficult to handle sudden changes, additional classes, and faculty unavailability. These challenges often result in scheduling conflicts, underutilized classrooms and laboratories, and uneven faculty workloads. Managing multiple scheduling requests is also complicated due to the lack of a systematic approach to prioritizing requests, ensuring fairness, and considering resource availability. Therefore, an efficient system is needed to simplify timetable management, optimize the use of existing resources, and ensure smooth academic activities with minimal disruption.',
    objectives: [
      'To detect overlapping booking requests and resource conflicts accurately.',
      'To allocate resources while following capacity, time-slot and eligibility rules.',
      'To improve resource utilization and fairness compared with first-come-first-served allocation.',
      'To identify and report requests that cannot be fulfilled when resources are limited.',
      'To generate reports on resource utilization, fairness and conflicts.',
      'To test the system with increasing numbers of booking requests.'
    ],

    // 3. Foundation Course Integration Table
    coursesTable: [
      { sl: '1', course: 'Design & Analysis of Algorithms', concepts: 'Greedy algorithms, Dynamic Programming and Backtracking', role: 'Core' },
      { sl: '2', course: 'Data Structures & Algorithms', concepts: 'Trees, heaps, graphs and interval-based conflict detection', role: 'Core' },
      { sl: '3', course: 'Operating Systems', concepts: 'Concurrency, process scheduling, locks and resource coordination', role: 'Core' },
      { sl: '4', course: 'Discrete Mathematical Structures', concepts: 'Sets, relations, graphs and constraint modelling', role: 'Supporting' },
      { sl: '5', course: 'Software Engineering', concepts: 'Modular design, requirements and system testing', role: 'Supporting' },
      { sl: '6', course: 'Database Management Systems', concepts: 'Booking records, data storage, transactions and data consistency', role: 'Core' }
    ],

    // 4. Conceptual Workflow Diagram & Tables
    conceptualFlowImage: 'assets/team03_conceptual_flow.jpg',
    conceptualFlowCaption: 'Conceptual Flow - Smart Campus Lab & Resource Optimizer',
    // 4. Conceptual Workflow Tables
    pipelineTable: [
      {
        input: 'Booking request with resource, date, time and requirements',
        processing: 'Check availability, capacity, eligibility and time conflicts',
        userAction: 'Confirm request, select an alternative or join waiting queue',
        output: 'Confirmed allocation or conflict/waiting status'
      }
    ],

    enginesTable: [
      { id: 'E1', name: 'Scheduling & Concurrency Controller', desc: 'Manages simultaneous requests using queues, priorities and locks.' },
      { id: 'E2', name: 'Search, Conflict & Allocation Engine', desc: 'Finds available resources, detects clashes and selects suitable allocations.' },
      { id: 'E3', name: 'Data Management & Integrity Engine', desc: 'Stores booking and resource data and maintains accurate, consistent records.' },
      { id: 'E4', name: 'Control & Monitoring Dashboard', desc: 'Provides user dashboards to submit requests, view schedules and monitor resource usage.' }
    ],

    // 5. Project Scope Tables
    scopeInTable: [
      { num: '1', item: 'Model resources and booking rules such as capacity, time slots and eligibility.' },
      { num: '2', item: 'Detect time-slot conflicts efficiently using interval-based algorithms.' },
      { num: '3', item: 'Allocate resources using constraint-based or utilization-focused algorithms.' },
      { num: '4', item: 'Report unavoidable conflicts, resource utilization and allocation fairness.' }
    ],

    scopeOutTable: [
      { num: '1', item: 'Real-time IoT integration with cameras, RFID or occupancy sensors.', reason: 'Hardware integration is outside the project scope.' },
      { num: '2', item: 'Full campus-wide deployment across multiple buildings.', reason: 'A pilot-scale software demonstration is sufficient.' },
      { num: '3', item: 'Payment and billing integration.', reason: 'Not required for resource allocation.' }
    ],

    // 6. Feasibility & Constraints Table
    feasibilityTable: [
      { aspect: 'Technical Feasibility', assessment: 'Achievable using standard algorithms, data structures and open-source tools.' },
      { aspect: 'Operational Feasibility', assessment: 'The system can be tested using sample booking requests and simulated resource availability.' },
      { aspect: 'Time Feasibility', assessment: 'The project is achievable within the 15-week semester.' },
      { aspect: 'Resource Feasibility', assessment: 'A team of four can develop and test the system using standard laptops; no special hardware is required.' },
      { aspect: 'Constraints', assessment: 'Limited access to real booking data; testing will use synthetic datasets. The team has a 15-week timeline and must ensure correct conflict detection and fair allocation.' },
      { aspect: 'Overall Feasibility', assessment: 'Go – the software-based project is achievable within the available time, team size and resources.' }
    ]
  },

  // ==========================================
  // STAGE 1: REQUIREMENT ANALYSIS
  // Source: Team_3_Gate_1_Smart_Campus_Lab_Resource_Optimizer.docx
  // ==========================================
  stage1: {
    // 1. Functional Requirements Table (Source: Smart_Campus_FRs_NFRs.docx)
    frTable: [
      { id: 'FR-01', desc: 'Allow coordinators to upload existing college timetables.', priority: 'Mandatory', sourceNeed: 'Reduce manual timetable preparation and updating.' },
      { id: 'FR-02', desc: 'Extract subjects, faculty, classrooms, laboratories, and time slots from uploaded timetables.', priority: 'Mandatory', sourceNeed: 'Organize timetable information in a usable form.' },
      { id: 'FR-03', desc: 'Detect overlapping classes, faculty conflicts, and room conflicts.', priority: 'Mandatory', sourceNeed: 'Prevent scheduling conflicts and booking clashes.' },
      { id: 'FR-04', desc: 'Check whether the required lecture, tutorial, and practical (L:T:P) hours are followed.', priority: 'Mandatory', sourceNeed: 'Ensure academic hour requirements are met.' },
      { id: 'FR-05', desc: 'Allow students and faculty to view timetables and available time slots.', priority: 'Mandatory', sourceNeed: 'Provide clear timetable information and reduce confusion.' },
      { id: 'FR-06', desc: 'Allow faculty to request extra classes, schedule changes, or report unavailability.', priority: 'Mandatory', sourceNeed: 'Handle additional classes and faculty unavailability.' },
      { id: 'FR-07', desc: 'Handle incoming requests based on priority, fairness, and resource availability.', priority: 'Mandatory', sourceNeed: 'Manage competing requests fairly and efficiently.' },
      { id: 'FR-08', desc: 'Suggest available classrooms, laboratories, and suitable faculty members.', priority: 'Mandatory', sourceNeed: 'Improve use of available rooms, labs, and faculty time.' },
      { id: 'FR-09', desc: 'Allow HODs to approve or reject scheduling requests.', priority: 'Mandatory', sourceNeed: 'Support controlled approval of scheduling changes.' },
      { id: 'FR-10', desc: 'Update the timetable after approved changes.', priority: 'Mandatory', sourceNeed: 'Keep the timetable accurate after approved changes.' },
      { id: 'FR-11', desc: 'Generate reports showing classroom usage, laboratory usage, and faculty workload.', priority: 'Mandatory', sourceNeed: 'Monitor resource utilization and faculty workload.' },
      { id: 'FR-12', desc: 'Notify affected students and faculty about timetable changes.', priority: 'Challenge', sourceNeed: 'Keep students and faculty informed about schedule changes.' }
    ],

    // 2. Non Functional Requirements Table (Source: Smart_Campus_FRs_NFRs.docx)
    nfrTable: [
      { id: 'NFR-01', desc: 'Timetables should load quickly.', cat: 'Performance', target: 'Within 3 seconds.' },
      { id: 'NFR-02', desc: 'Avoid overlapping faculty and room allocations.', cat: 'Accuracy', target: 'Zero conflicts in approved schedules.' },
      { id: 'NFR-03', desc: 'Scheduling requests should not be lost.', cat: 'Reliability', target: '100% of accepted requests saved.' },
      { id: 'NFR-04', desc: 'Requests should be handled fairly without unnecessary delays.', cat: 'Fairness', target: 'Track waiting time for every request.' },
      { id: 'NFR-05', desc: 'System should be simple and easy to use.', cat: 'Usability', target: 'Basic tasks completed without training.' },
      { id: 'NFR-06', desc: 'Only authorized users can modify schedules.', cat: 'Security', target: 'Access based on user roles.' },
      { id: 'NFR-07', desc: 'System should support multiple semesters.', cat: 'Scalability', target: 'Initially support 1st, 3rd, and 5th semesters.' },
      { id: 'NFR-08', desc: 'Scheduling rules should be easy to update.', cat: 'Maintainability', target: 'Change rules without modifying core code.' },
      { id: 'NFR-09', desc: 'New scheduling requests should be processed quickly.', cat: 'Responsiveness', target: 'Suggest allocation within 5 seconds.' },
      { id: 'NFR-10', desc: 'Original timetable information should remain safe.', cat: 'Data Integrity', target: 'Maintain original and updated timetable versions.' }
    ],

    // 3. Use Cases Table & Diagram
    useCaseImage: 'assets/team03_usecase_diagram_doc.png',
    useCaseCaption: 'Fig : Use case diagram',
    userStoryTable: [
      { id: '01', actor: 'Student / Project Team', desc: 'User wants to view available labs, rooms or equipment.', mainFlow: 'Log in → Open resource list → Select date and time → System displays available resources.', exceptionFlow: 'No matching resource → System displays that no resource is available.' },
      { id: '02', actor: 'Student / Project Team', desc: 'User wants to request a resource.', mainFlow: 'Select resource → Enter time slot, group size and requirements → Submit request.', exceptionFlow: 'Missing or invalid details → System asks the user to correct them.' },
      { id: '03', actor: 'System', desc: 'System wants to validate a booking request.', mainFlow: 'Check time availability → Check capacity and eligibility → Check existing bookings.', exceptionFlow: 'Constraint not satisfied → System rejects the request or shows the reason.' },
      { id: '04', actor: 'System', desc: 'System wants to detect conflicts between requests.', mainFlow: 'Compare time windows and resource usage → Identify overlapping requests → Mark conflict.', exceptionFlow: 'Booking data unavailable → System reports the validation failure.' },
      { id: '05', actor: 'System', desc: 'System wants to allocate resources fairly.', mainFlow: 'Rank eligible requests → Apply priority and fairness rules → Select suitable resource → Confirm allocation.', exceptionFlow: 'Resource taken by another request → System retries allocation or places request in waiting queue.' },
      { id: '06', actor: 'Student / Project Team', desc: 'User wants an alternative when the requested resource is unavailable.', mainFlow: 'System searches suitable alternatives → Displays available resources/time slots → User selects an option.', exceptionFlow: 'No suitable alternative → User may join the waiting queue or leave the request unresolved.' },
      { id: '07', actor: 'Faculty / Lab Instructor', desc: 'Faculty wants to review and manage booking requests.', mainFlow: 'View requests → Check details and availability → Approve or reject request.', exceptionFlow: 'Request violates resource rules → System displays the reason and does not confirm it.' },
      { id: '08', actor: 'Lab / Facility Administrator', desc: 'Administrator wants to manage resource and booking information.', mainFlow: 'View resource records → Add or update resource details and constraints → Save changes.', exceptionFlow: 'Invalid details or conflicting update → System rejects the change.' },
      { id: '09', actor: 'HOD / Administrator', desc: 'HOD or administrator wants to monitor resource usage.', mainFlow: 'Open dashboard → View utilization, waiting requests, conflicts and fairness reports.', exceptionFlow: 'Report data unavailable → System displays an appropriate status message.' }
    ],

    // 4. Acceptance Criteria Table
    acceptanceTable: [
      { req: '01', criteria: 'The system displays resources that are available for the selected date and time.', method: 'Create resource records with known availability and verify the displayed list.' },
      { req: '02', criteria: 'The system accepts valid booking requests containing resource, time slot and group size details.', method: 'Submit valid and invalid booking requests and verify the response.' },
      { req: '03', criteria: 'The system checks capacity, eligibility and time-window constraints before confirming a booking.', method: 'Test requests that satisfy and violate each constraint.' },
      { req: '04', criteria: 'The system detects overlapping requests and does not confirm conflicting allocations.', method: 'Submit requests for the same resource and overlapping time slots.' },
      { req: '05', criteria: 'The system allocates resources using the defined priority and fairness rules.', method: 'Run a set of competing requests and compare the allocation with the defined rules.' },
      { req: '06', criteria: 'The system suggests suitable alternatives or places an unallocated request in the waiting queue.', method: 'Test requests when the preferred resource is unavailable and then free a resource.' },
      { req: '07', criteria: 'The system stores confirmed bookings correctly, including when multiple requests are submitted at the same time.', method: 'Run simultaneous booking tests and verify stored booking records.' },
      { req: '08', criteria: 'The system generates reports showing resource utilization, fairness and unresolved conflicts.', method: 'Compare dashboard and report values with the test booking data.' }
    ]
  },

  // ==========================================
  // SYSTEM DESIGN
  // Source: System Design.docx
  // ==========================================
  systemDesign: {
    // 1. Architecture
    architecturePoints: [
      '1. The Smart Campus Lab and Resource Optimizer uses a Layered Architecture with Microservices (Hybrid).',
      '2. Presentation Layer: Provides the user interface for students, faculty, HODs, and administrators.',
      '3. It includes features like timetable viewing, booking requests, reports, and admin approvals.',
      '4. API/Controller Layer: Handles REST API requests, request validation, routing, authentication, and role-based access.',
      '5. Business Layer: Contains eight microservices that handle the main operations of the system.',
      '6. These services include timetable import, conflict detection, L-T-P validation, request scheduling, and resource recommendation.',
      '7. It also includes approval workflow, reporting and analytics, and notification services.',
      '8. Data Access Layer: Manages the storage and retrieval of system data.',
      '9. It uses Supabase/PostgreSQL for permanent storage and an In-Memory Store for fast caching and session management.',
      '10. All four layers work together to provide efficient resource booking, conflict-free allocation, and better resource utilization.'
    ],
    architectureImage: 'assets/team03_architecture_doc.png',
    architectureCaption: 'Fig 1. Architecture Diagram',

    // 2. Data Design
    dataDesignPoints: [
      '1. This data design organizes the Smart Campus Lab and Resource Optimizer into four connected areas.',
      '2. Academic Structure represents departments, divisions, students, and enrollment records.',
      '3. Programs connect departments to divisions, while enrollment links students to their divisions.',
      '4. Shared Resources represents buildings, resource types, rooms, and available facilities.',
      '5. Resource Facility connects each resource to its facilities without duplicating facility records.',
      '6. Teaching Assignment links faculty members, subjects, and divisions.',
      '7. Timetable Entry records recurring teaching activities, while Activity Occurrence represents dated sessions.',
      '8. Timetable Change tracks modifications to scheduled activities through related change records.',
      '9. Usage Request records a user’s request, while Allocation identifies the resource assigned.',
      '10. Presence records are linked to allocations and users, separating actual attendance from planned usage.',
      '11. Approval supports decisions requiring authorization, while supporting tables hold additional academic and operational data.',
      '12. Primary keys identify records, foreign keys connect them, and relationship labels indicate how records are associated.'
    ],
    dataDesignImage: 'assets/team03_datadesign_doc.jpeg',
    dataDesignCaption: 'Fig 2. Data Design',

    // 3. Algorithm Design
    algorithmDesignPoints: [
      'The process starts with Validation, where the booking request is checked for valid time, resource and type.',
      'The Interval Tree checks whether the requested time slot overlaps with existing bookings.',
      'It helps identify conflicting bookings efficiently without checking every booking.',
      'The Sweep-Line Algorithm calculates the maximum number of bookings happening at the same time.',
      'It checks whether the resource capacity is sufficient for the requests.',
      'Priority and Aging assigns priority to requests based on importance and waiting time.',
      'The Greedy Algorithm makes the final decision by accepting or rejecting a booking request.',
      'If the request satisfies all conditions, it is accepted; otherwise, it is rejected.',
      'If rejected, the system provides a list of ranked alternative resources or time slots.',
      'Dynamic Programming (DP) runs separately to find the best allocation when multiple pending requests need to be optimized together.',
      'Jain\'s Fairness Index is calculated later to measure how fairly resources are distributed among users.'
    ],
    algorithmDesignImage: 'assets/team03_algorithmdesign_new.jpeg',
    algorithmDesignCaption: 'Fig 3. Algorithm Design'

    // 4. Security Design: Not provided in document, intentionally left empty per instructions.
  }
};

window.STATIC_TEAMS_DATA['03'] = team03Data;
window.STATIC_TEAMS_DATA['3'] = team03Data;
window.STATIC_TEAMS_DATA['A-03'] = team03Data;
