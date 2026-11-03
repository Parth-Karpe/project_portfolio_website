/**
 * Static Data File for Team 03
 * Source documents provided by user:
 * 1. Stage_0_Smart_Campus_Lab_Resource_Optimizer.docx
 * 2. Team_3_Gate_1_Smart_Campus_Lab_Resource_Optimizer.docx
 * 3. System Design.docx
 * Project: Smart Campus Lab and Resource Optimizer
 * Theme: Concurrent and Transactional Systems (Theme 22)
 * Guide: Mr. Amit K
 */

window.STATIC_TEAMS_DATA = window.STATIC_TEAMS_DATA || {};

const team03Data = {
  id: '03',
  theme: 'Concurrent and Transactional Systems',
  title: 'Smart Campus Lab and Resource Optimizer',
  guide: 'Mr. Amit K',
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
    // 1. Functional Requirements Table
    frTable: [
      { id: '01', desc: 'The system shall allow students and project teams to submit booking requests by selecting a resource, date, time slot and required capacity.', priority: 'Mandatory', sourceNeed: 'Online resource booking' },
      { id: '02', desc: 'The system shall display available labs, project rooms and shared equipment for the selected time slot.', priority: 'Mandatory', sourceNeed: 'Visibility of resource availability' },
      { id: '03', desc: 'The system shall check resource capacity, time-window and eligibility rules before accepting a booking.', priority: 'Mandatory', sourceNeed: 'Capacity and eligibility validation' },
      { id: '04', desc: 'The system shall detect overlapping bookings and prevent the same resource from being allocated more than once for the same time slot.', priority: 'Mandatory', sourceNeed: 'Automated conflict detection' },
      { id: '05', desc: 'The system shall compare competing requests and allocate resources based on availability, priority and fairness.', priority: 'Mandatory', sourceNeed: 'Fair resource allocation' },
      { id: '06', desc: 'The system shall suggest suitable alternative resources or time slots when the requested resource is unavailable.', priority: 'Mandatory', sourceNeed: 'Alternative resource suggestions' },
      { id: '07', desc: 'The system shall place eligible unallocated requests in a waiting queue and recheck them when a resource becomes available.', priority: 'Mandatory', sourceNeed: 'Waiting queue management' },
      { id: '08', desc: 'The system shall store booking requests, allocation decisions and updates while maintaining correct records during simultaneous requests.', priority: 'Mandatory', sourceNeed: 'Reliable booking and data integrity' },
      { id: '09', desc: 'The system shall generate reports showing resource utilization, allocation fairness and unresolved conflicts.', priority: 'Mandatory', sourceNeed: 'Utilization and conflict reporting' }
    ],

    // 2. Non Functional Requirements Table
    nfrTable: [
      { id: '01', desc: 'The system shall prevent overlapping confirmed bookings for the same resource and time slot.', cat: 'Accuracy', target: 'Zero conflicting confirmed allocations in test cases' },
      { id: '02', desc: 'The system shall process simultaneous requests without allocating the same resource more than once.', cat: 'Concurrency', target: 'Only one request receives a resource when requests compete for the same slot' },
      { id: '03', desc: 'The system shall save every confirmed booking and its allocation details.', cat: 'Reliability', target: '100% of confirmed bookings are present in stored records' },
      { id: '04', desc: 'The system shall handle booking requests according to the defined priority and fairness rules.', cat: 'Fairness', target: 'Waiting time and allocation results are recorded for each request' },
      { id: '05', desc: 'The system shall provide a simple interface to view availability and submit or track requests.', cat: 'Usability', target: 'Users can complete a booking request using the displayed steps' },
      { id: '06', desc: 'The system shall allow only authorized users to approve or modify bookings.', cat: 'Security', target: 'Unauthorized booking changes are rejected' },
      { id: '07', desc: 'The system shall preserve existing confirmed bookings when a request fails or an allocation is retried.', cat: 'Data Integrity', target: 'No previously confirmed booking is changed by a failed request' }
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
    algorithmDesignImage: 'assets/team03_algorithmdesign_doc.png',
    algorithmDesignCaption: 'Fig 3. Algorithm Design'

    // 4. Security Design: Not provided in document, intentionally left empty per instructions.
  }
};

window.STATIC_TEAMS_DATA['03'] = team03Data;
window.STATIC_TEAMS_DATA['3'] = team03Data;
window.STATIC_TEAMS_DATA['A-03'] = team03Data;
