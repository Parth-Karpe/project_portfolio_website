/**
 * Static Data File for Team A-06
 * Project: Constraint-Based Academic Timetable Scheduling
 * Source documents: Team_06_Review1_Problem_Formulation & Team_06_Review2_Requirements_Analysis
 * Faculty Mentor: Mr. Mallikarjun Akki
 */

window.STATIC_TEAMS_DATA = window.STATIC_TEAMS_DATA || {};

const team06Data = {
  "id": "A-06",
  "theme": "Algorithmic and Optimization Systems",
  "title": "Constraint-Based Academic Timetable Scheduling",
  "guide": "Mr. Mallikarjun Akki",
  "academicYear": "2026–27",
  "repo": "https://github.com/topics/academic-timetable-scheduler",
  "members": [
    {
      "name": "Srujana Patil",
      "usn": "01FE24BCI020",
      "role": "Team Member",
      "skills": "Constraint Satisfaction • Scheduling Algorithms • Backtracking",
      "contribution": "Timetable constraint modeling, conflict detection, and schedule optimization.",
      "github": "https://github.com"
    },
    {
      "name": "Yash Raj",
      "usn": "01FE24BCI064",
      "role": "Team Member",
      "skills": "Constraint Satisfaction • Scheduling Algorithms • Backtracking",
      "contribution": "Timetable constraint modeling, conflict detection, and schedule optimization.",
      "github": "https://github.com"
    },
    {
      "name": "Abhinav Raj",
      "usn": "01FE24BCI058",
      "role": "Team Member",
      "skills": "Constraint Satisfaction • Scheduling Algorithms • Backtracking",
      "contribution": "Timetable constraint modeling, conflict detection, and schedule optimization.",
      "github": "https://github.com"
    },
    {
      "name": "Yashwanth Reddy",
      "usn": "01FE24BCI010",
      "role": "Team Member",
      "skills": "Constraint Satisfaction • Scheduling Algorithms • Backtracking",
      "contribution": "Timetable constraint modeling, conflict detection, and schedule optimization.",
      "github": "https://github.com"
    }
  ],
  "stage0": {
    "problem": "Preparing an academic timetable involves coordinating courses, sections, faculty members, classrooms, laboratories and time slots while satisfying multiple interdependent constraints. Factors such as faculty and room availability, prescribed weekly teaching hours, fixed breaks and consecutive laboratory sessions make the scheduling process particularly complex.\n\nManual or iterative scheduling often requires repeated conflict checks, as resolving one conflict may introduce another. A faculty member may be assigned to overlapping classes, a section may receive two courses in the same time slot, or a room may be allocated to more than one class simultaneously. These conflicts can require repeated timetable revisions and make it difficult to maintain consistent schedules for all stakeholders.\n\nThe proposed Constraint-Based Academic Timetable Scheduling Engine aims to develop a structured system that models academic entities and scheduling rules, generates timetables that satisfy mandatory constraints, considers preferential requirements where feasible, and reports diagnostic information when no feasible schedule can be produced. The primary stakeholders are the Timetable Coordinator, Department Head (HoD), faculty members, and students/sections. Secondary stakeholders include room and laboratory coordinators and academic administration.",
    "objectives": [
      "To develop a structured data model for courses, sections, faculty members, classrooms, laboratories and scheduling time slots.",
      "To identify, classify and represent mandatory (hard) and preferential (soft) scheduling constraints.",
      "To generate academic timetables that satisfy all mandatory constraints and eliminate resource-allocation conflicts.",
      "To incorporate faculty availability and workload considerations into the scheduling process.",
      "To provide consistent and synchronized timetable views for classes, faculty members and rooms.",
      "To generate meaningful conflict information and diagnostic feedback when no feasible timetable can be produced."
    ],
    "coursesTable": [
      {
        "sl": "1",
        "course": "Data Structures and Algorithms",
        "concepts": "Backtracking, search strategies, conflict detection and optimization techniques.",
        "role": "Dominant"
      },
      {
        "sl": "2",
        "course": "Database Management Systems (DBMS)",
        "concepts": "Relational data modelling, SQL, CRUD operations, transaction management and scheduling records.",
        "role": "Dominant"
      },
      {
        "sl": "3",
        "course": "Discrete Mathematics",
        "concepts": "Sets, relations, propositional logic, combinatorial modelling and constraint satisfaction problems (CSPs).",
        "role": "Dominant"
      },
      {
        "sl": "4",
        "course": "Object-Oriented Programming (OOP)",
        "concepts": "Classes, objects, encapsulation, abstraction and modular software design.",
        "role": "Supporting"
      },
      {
        "sl": "5",
        "course": "Operating Systems",
        "concepts": "Scheduling principles, resource allocation and resource-conflict management.",
        "role": "Supporting"
      },
      {
        "sl": "6",
        "course": "Software Engineering",
        "concepts": "Requirements analysis, UML modelling, feasibility assessment and software testing.",
        "role": "Supporting"
      }
    ],
    "conceptualFlowImage": "assets/team06_conceptual_workflow.png",
    "conceptualFlowCaption": "Fig 1. Conceptual Workflow of Constraint-Based Academic Timetable Scheduling",
    "scopeInTable": [
      {
        "num": "1",
        "item": "Course and section management"
      },
      {
        "num": "2",
        "item": "Faculty allocation and availability management"
      },
      {
        "num": "3",
        "item": "Classroom and laboratory resource management"
      },
      {
        "num": "4",
        "item": "Working days, time slots and academic periods"
      },
      {
        "num": "5",
        "item": "Hard- and soft-constraint representation"
      },
      {
        "num": "6",
        "item": "Timetable generation"
      },
      {
        "num": "7",
        "item": "Conflict detection and validation"
      },
      {
        "num": "8",
        "item": "Faculty workload assessment and balancing"
      },
      {
        "num": "9",
        "item": "Synchronized timetable views"
      },
      {
        "num": "10",
        "item": "Conflict diagnostics"
      }
    ],
    "scopeOutTable": [
      {
        "num": "1",
        "item": "Student attendance management",
        "reason": "The project is focused on timetable preparation and constraint validation, not attendance recording."
      },
      {
        "num": "2",
        "item": "Examination timetable generation",
        "reason": "The supplied Gate 0 scope addresses academic/course timetables; examination scheduling is excluded."
      },
      {
        "num": "3",
        "item": "Payroll and employee administration",
        "reason": "Faculty records are used for allocation and availability only; payroll and broader HR functions are unrelated to the core objective."
      },
      {
        "num": "4",
        "item": "Comprehensive college ERP system",
        "reason": "The project is limited to timetable generation and associated academic resource management."
      },
      {
        "num": "5",
        "item": "Timetable scheduling across multiple universities",
        "reason": "The defined implementation is intended for department-level academic timetable preparation."
      }
    ],
    "feasibilityTable": [
      {
        "aspect": "Technical feasibility",
        "assessment": "The project can be implemented using established programming technologies such as Python or Java, a relational DBMS and appropriate scheduling algorithms. It applies DAA, DBMS, OOP, Discrete Mathematics, Operating Systems and Software Engineering concepts."
      },
      {
        "aspect": "Operational and resource feasibility",
        "assessment": "The system is intended to support routine, department-level timetable preparation using standard student laptops, commonly available development tools and representative academic scheduling data. Specialized hardware is not required."
      },
      {
        "aspect": "Time and scope constraints",
        "assessment": "The team has a 15-week semester and limited development resources. Priority should be given to feasible timetable generation, hard-constraint validation, conflict detection and consistent timetable views. Advanced optimization is secondary."
      },
      {
        "aspect": "Prerequisite knowledge",
        "assessment": "Data Structures and Algorithms, Database Management Systems, Discrete Mathematics, Object-Oriented Programming, Operating Systems and Software Engineering."
      },
      {
        "aspect": "Major project risks",
        "assessment": "Constraint combinations may produce no feasible solution; input data may be incomplete or inaccurate; resource mappings may be incorrect; scope expansion or development delays may occur."
      },
      {
        "aspect": "Risk mitigation",
        "assessment": "Use early feasibility checks, systematic input validation, prioritization of mandatory constraints and phased implementation."
      },
      {
        "aspect": "Overall feasibility",
        "assessment": "GO WITH MODIFICATIONS. The project is feasible provided its scope remains focused on essential timetable generation and constraint validation."
      }
    ]
  },
  "stage1": {
    "frTable": [
      {
        "id": "FR-01",
        "desc": "The system shall enable authorized users to create, import, and update academic scheduling data, including courses, faculty members, rooms, sections, batches, and related information.",
        "priority": "Mandatory",
        "sourceNeed": "Maintain academic data and the weekly calendar in a centralized location."
      },
      {
        "id": "FR-02",
        "desc": "The system shall allow users to configure working days, working hours, breaks, lunch periods, and time-slot rules before timetable generation.",
        "priority": "Mandatory",
        "sourceNeed": "Maintain academic data and the weekly calendar in a centralized location."
      },
      {
        "id": "FR-03",
        "desc": "The system shall validate all required input data before timetable generation and identify missing, inconsistent, or incompatible scheduling information.",
        "priority": "Mandatory",
        "sourceNeed": "Identify incomplete or invalid data before scheduling."
      },
      {
        "id": "FR-04",
        "desc": "The system shall represent and enforce all mandatory constraints, including faculty, room, section, and batch availability; room suitability and capacity; and time-continuity requirements.",
        "priority": "Mandatory",
        "sourceNeed": "Generate a clash-free timetable across faculty, rooms, sections, and batches."
      },
      {
        "id": "FR-05",
        "desc": "The system shall generate a timetable by assigning every required academic session to an eligible day, time slot, and room while satisfying all mandatory constraints.",
        "priority": "Mandatory",
        "sourceNeed": "Generate a clash-free timetable across faculty, rooms, sections, and batches."
      },
      {
        "id": "FR-06",
        "desc": "The system shall support laboratory scheduling at the batch level, allowing different batches within the same section to use separate, suitable rooms concurrently when permitted by the scheduling constraints.",
        "priority": "Mandatory",
        "sourceNeed": "Generate a clash-free timetable across faculty, rooms, sections, and batches."
      },
      {
        "id": "FR-07",
        "desc": "The system shall evaluate and rank feasible timetable alternatives using configurable soft constraints, such as minimizing student gaps, avoiding repeated scheduling of the same subject on a day, balancing faculty workload, and improving room utilization.",
        "priority": "Challenge / Stretch",
        "sourceNeed": "Improve timetable quality by reducing gaps and balancing workload."
      },
      {
        "id": "FR-08",
        "desc": "The system shall provide actionable diagnostic information when the scheduling problem is infeasible or constraints cannot be satisfied. It shall also independently validate each generated timetable before assigning it a valid status.",
        "priority": "Mandatory",
        "sourceNeed": "Identify the reasons when timetable generation is unsuccessful."
      },
      {
        "id": "FR-09",
        "desc": "The system shall provide master, faculty-wise, section-wise, and batch-wise timetable views and support the export or sharing of timetable information in a suitable format.",
        "priority": "Mandatory",
        "sourceNeed": "View and print timetables by section, faculty, and room."
      }
    ],
    "nfrTable": [
      {
        "id": "NFR-01",
        "desc": "Every timetable accepted by the system shall be free from violations of mandatory (hard) constraints.",
        "cat": "Correctness",
        "target": "All hard-constraint validation checks (100%) must pass before a timetable is marked feasible."
      },
      {
        "id": "NFR-02",
        "desc": "Timetable generation shall complete within a predefined execution limit for the agreed reference dataset.",
        "cat": "Performance",
        "target": "The system shall either generate a result or terminate with a diagnostic status within 30 seconds on the agreed reference dataset."
      },
      {
        "id": "NFR-03",
        "desc": "The system shall handle infeasible scheduling inputs without entering an indefinite execution state.",
        "cat": "Reliability",
        "target": "Every generation attempt shall terminate with one of the following statuses: feasible, infeasible, or execution limit reached."
      },
      {
        "id": "NFR-04",
        "desc": "The system shall support the agreed reference workload while preserving all academic and scheduling relationships.",
        "cat": "Scalability",
        "target": "The reference test dataset shall include at least 30 courses, 20 faculty members, 10 rooms, 4 sections, and their associated laboratory batches."
      },
      {
        "id": "NFR-05",
        "desc": "The system shall communicate input and scheduling errors clearly and consistently.",
        "cat": "Usability",
        "target": "Every rejected or unsuccessful operation shall return a specific error message or diagnostic category."
      },
      {
        "id": "NFR-06",
        "desc": "The system shall protect academic data and scheduling operations against unauthorized access or modification.",
        "cat": "Security",
        "target": "In the production environment, only authenticated and authorized users shall be permitted to modify configuration or timetable data."
      },
      {
        "id": "NFR-07",
        "desc": "The system architecture shall support independent testing and traceability of requirements and scheduling-engine responsibilities.",
        "cat": "Maintainability",
        "target": "Every mandatory functional requirement shall be mapped to at least one acceptance test and one primary responsible engine component."
      }
    ],
    "userStoryTable": [
      {
        "id": "UC-01",
        "actor": "Scheduler / Administrator",
        "desc": "Import or enter academic scheduling data.",
        "mainFlow": "Select the data source; enter or upload the required information; allow the system to parse and store the data; review the validation summary.",
        "exceptionFlow": "Missing, invalid, or duplicate records are identified and reported. Such records are not treated as valid input."
      },
      {
        "id": "UC-02",
        "actor": "Scheduler / Administrator",
        "desc": "Configure the academic calendar and time-slot rules.",
        "mainFlow": "Specify working days, working hours, breaks, and lunch periods; allow the system to derive the permitted time slots; review and confirm the configuration.",
        "exceptionFlow": "Invalid, overlapping, or out-of-range time rules are rejected with an appropriate explanation."
      },
      {
        "id": "UC-03",
        "actor": "Scheduler / Administrator",
        "desc": "Validate scheduling inputs before timetable generation.",
        "mainFlow": "Initiate validation; execute relationship, capacity, and configuration checks; display the validation status and any identified issues.",
        "exceptionFlow": "Any unresolved mandatory issue prevents timetable generation until the issue is corrected."
      },
      {
        "id": "UC-04",
        "actor": "Scheduler / Administrator",
        "desc": "Generate a timetable using validated input data.",
        "mainFlow": "Initiate timetable generation; evaluate candidate assignments against the constraints; return the generated timetable when a feasible solution is found.",
        "exceptionFlow": "If no feasible solution is found within the execution limit, return an infeasible or limit-reached status with relevant diagnostics."
      },
      {
        "id": "UC-05",
        "actor": "Scheduler / Administrator",
        "desc": "Review infeasibility and scheduling-conflict diagnostics.",
        "mainFlow": "Review the diagnostic report; identify the affected constraint or resource category; update the relevant academic data or configuration.",
        "exceptionFlow": "If the system cannot isolate the exact cause, it shall report the termination reason and the affected constraint or resource category."
      },
      {
        "id": "UC-06",
        "actor": "Faculty / Coordinator",
        "desc": "View the master timetable.",
        "mainFlow": "Select a validated timetable generation; open the master timetable view; review the overall academic schedule and assignments.",
        "exceptionFlow": "If no validated timetable is available, display a clear unavailable-state message."
      },
      {
        "id": "UC-07",
        "actor": "Faculty / Coordinator",
        "desc": "View an individual faculty timetable.",
        "mainFlow": "Select a faculty member; retrieve the corresponding validated assignments; display the faculty member's weekly schedule.",
        "exceptionFlow": "If the faculty member is unknown or has no assigned sessions, display an appropriate empty-state message."
      },
      {
        "id": "UC-08",
        "actor": "Faculty / Student / Coordinator",
        "desc": "View section-wise and batch-wise timetables.",
        "mainFlow": "Select a section or batch; retrieve the corresponding validated assignments; display theory and laboratory sessions at the appropriate level.",
        "exceptionFlow": "Laboratory sessions assigned to individual batches shall not be incorrectly represented as sessions for the entire section."
      },
      {
        "id": "UC-09",
        "actor": "Coordinator",
        "desc": "Export or share a validated timetable.",
        "mainFlow": "Select the required timetable view and export option; generate the corresponding shareable or downloadable representation.",
        "exceptionFlow": "If no validated timetable exists, the export operation shall be disabled or rejected with a clear message."
      },
      {
        "id": "UC-10",
        "actor": "Scheduler / Administrator",
        "desc": "Regenerate the timetable after modifying constraints or academic data.",
        "mainFlow": "Modify the relevant data or constraints; revalidate the inputs; initiate generation; retain or version the previously validated timetable.",
        "exceptionFlow": "A new infeasible generation attempt shall not overwrite or remove the previously validated timetable."
      }
    ],
    "useCaseImage": "assets/team06_use_case_diagram.png",
    "useCaseCaption": "Fig 2. System Use Case Diagram",
    "acceptanceTable": [
      {
        "req": "FR-01",
        "criteria": "Academic data can be created or imported successfully, and all required entities and their relationships are available for validation.",
        "method": "Perform create/import tests and verify entity counts, completeness, and relationships."
      },
      {
        "req": "FR-02",
        "criteria": "Valid calendar configurations generate only permitted time slots, while invalid, overlapping, or out-of-range rules are rejected.",
        "method": "Conduct boundary-value tests using valid, overlapping, and out-of-range time configurations."
      },
      {
        "req": "FR-03",
        "criteria": "The system identifies known missing or invalid inputs before generation and reports all mandatory validation issues.",
        "method": "Execute negative testing with deliberately incomplete, invalid, or inconsistent input data."
      },
      {
        "req": "FR-04",
        "criteria": "Every timetable accepted by the system has zero violations across all mandatory constraints.",
        "method": "Run automated validation against every defined hard constraint."
      },
      {
        "req": "FR-05",
        "criteria": "For a feasible reference dataset, each required academic session is assigned exactly once to a valid day, time slot, and room.",
        "method": "Perform end-to-end generation testing, followed by assignment-count and constraint-validation checks."
      },
      {
        "req": "FR-06",
        "criteria": "Different laboratory batches may be assigned simultaneously to separate suitable rooms, while a single batch is never assigned overlapping sessions.",
        "method": "Execute batch-level laboratory scheduling tests, including concurrent assignments and overlap checks."
      },
      {
        "req": "FR-07",
        "criteria": "When multiple feasible timetable alternatives are available, the system selects and ranks them using the configured soft-constraint scoring mechanism and makes the score available for review.",
        "method": "Compare controlled candidate timetables and verify the calculated scores and ranking."
      },
      {
        "req": "FR-08",
        "criteria": "Infeasible or execution-limit outcomes provide diagnostic information. Every generated timetable is independently validated before being marked valid.",
        "method": "Test with an infeasible dataset and verify post-generation validation and status handling."
      },
      {
        "req": "FR-09",
        "criteria": "The master, faculty, section, and batch views display consistent validated assignments, and exported data matches the selected timetable view.",
        "method": "Perform cross-view consistency checks and verify the exported timetable against the selected view."
      }
    ]
  },
  "systemDesign": {}
};

window.STATIC_TEAMS_DATA['A-06'] = team06Data;
window.STATIC_TEAMS_DATA['06'] = team06Data;
window.STATIC_TEAMS_DATA['6'] = team06Data;
