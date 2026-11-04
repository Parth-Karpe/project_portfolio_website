/**
 * Static Data File for Team B-05
 * Project: Persistent Key-Value Storage Engine
 * Source documents: Gate0_new_corrected & Gate1_team5_corrected
 * Faculty Mentor: Ms. Shrushti Gani
 */

window.STATIC_TEAMS_DATA = window.STATIC_TEAMS_DATA || {};

const team05Data = {
  "id": "B-05",
  "theme": "Data Storage and Retrieval Systems",
  "title": "Persistent Key-Value Storage Engine",
  "guide": "Ms. Shrushti Gani",
  "academicYear": "2026–27",
  "repo": "https://github.com/topics/persistent-key-value-engine",
  "members": [
    {
      "name": "Sakshi D Suryavanshi",
      "usn": "01FE24BCI109",
      "role": "Team Member",
      "skills": "Key-Value Store • In-Memory Indexing • Persistent Storage",
      "contribution": "Command parsing, hash-indexed in-memory cache, and append-only disk persistence.",
      "github": "https://github.com"
    },
    {
      "name": "Pooja K D",
      "usn": "01FE24BCI105",
      "role": "Team Member",
      "skills": "Key-Value Store • In-Memory Indexing • Persistent Storage",
      "contribution": "Command parsing, hash-indexed in-memory cache, and append-only disk persistence.",
      "github": "https://github.com"
    },
    {
      "name": "Keerthana K",
      "usn": "01FE24BCI118",
      "role": "Team Member",
      "skills": "Key-Value Store • In-Memory Indexing • Persistent Storage",
      "contribution": "Command parsing, hash-indexed in-memory cache, and append-only disk persistence.",
      "github": "https://github.com"
    },
    {
      "name": "Sukanya M S",
      "usn": "01FE24BCI108",
      "role": "Team Member",
      "skills": "Key-Value Store • In-Memory Indexing • Persistent Storage",
      "contribution": "Command parsing, hash-indexed in-memory cache, and append-only disk persistence.",
      "github": "https://github.com"
    }
  ],
  "stage0": {
    "problem": "The proposed project is a Persistent Key-Value Storage System for storing and retrieving data using key-value pairs. Unlike temporary storage, the system aims to preserve stored data even after the application is closed or restarted. It provides a practical understanding of data storage, retrieval, and persistence.",
    "objectives": [
      "To design and implement suitable data structures for organizing and efficiently accessing key-value pairs.",
      "To develop a command interface with parsing and validation for handling basic key-value operations such as insertion, retrieval, updating, and deletion.",
      "To develop a persistent storage mechanism that preserves key-value data across application restarts.",
      "To implement mechanisms for maintaining data consistency and recovering from basic storage or application failures.",
      "To integrate the developed components into a functional key-value storage engine and validate its correctness and performance."
    ],
    "coursesTable": [
      {
        "sl": "1",
        "course": "Operating Systems",
        "concepts": "File Management, Storage Management, Process Management",
        "role": "Dominant"
      },
      {
        "sl": "2",
        "course": "Data Structures",
        "concepts": "Data Organization, Searching, Efficient Access",
        "role": "Dominant"
      },
      {
        "sl": "3",
        "course": "Design and Analysis of Algorithms",
        "concepts": "Searching, Updating, Operation Efficiency, Complexity Analysis",
        "role": "Supporting"
      },
      {
        "sl": "4",
        "course": "Database Management System",
        "concepts": "CRUD Operations",
        "role": "Supporting"
      }
    ],
    "conceptualFlowImage": "assets/team05_conceptual_workflow.png?v=20261104",
    "conceptualFlowCaption": "Fig 1. Conceptual Workflow of Persistent Key-Value Storage Engine",
    "scopeInTable": [
      {
        "num": "1",
        "item": "Storing key-value data persistently"
      },
      {
        "num": "2",
        "item": "Retrieving and accessing stored data"
      },
      {
        "num": "3",
        "item": "Updating and managing existing key-value information"
      },
      {
        "num": "4",
        "item": "Maintaining data availability and consistency during storage and retrieval"
      }
    ],
    "scopeOutTable": [
      {
        "num": "1",
        "item": "Large-scale distributed storage",
        "reason": "Beyond the scope of a mini project"
      },
      {
        "num": "2",
        "item": "Cloud-scale deployment and management",
        "reason": "Requires infrastructure beyond the current project scope"
      },
      {
        "num": "3",
        "item": "Support for complex database operations",
        "reason": "The project focuses on the key-value storage model"
      }
    ],
    "feasibilityTable": [
      {
        "aspect": "Aspect",
        "assessment": "Assessment"
      },
      {
        "aspect": "Feasibility within 3-credit scope",
        "assessment": "The proposed system has a manageable scope for a 3-credit Mini Project and can be developed incrementally while studying the underlying storage and retrieval concepts."
      },
      {
        "aspect": "Required computing / resources",
        "assessment": "A standard computer, development environment, local storage, and basic testing resources are sufficient for the proposed project."
      },
      {
        "aspect": "Prerequisite knowledge",
        "assessment": "Basic knowledge of Data Structures, Operating Systems, OOP, Algorithms, and programming fundamentals is required."
      },
      {
        "aspect": "Major constraints / limitations",
        "assessment": "Limited development time and storage capacity."
      },
      {
        "aspect": "Use of existing libraries / tools",
        "assessment": "Existing libraries and tools may be used for supporting or peripheral tasks, while the core storage and retrieval concepts will be implemented and studied by the team."
      },
      {
        "aspect": "Overall feasibility",
        "assessment": "Feasible with scope modification."
      }
    ]
  },
  "stage1": {
    "frTable": [
      {
        "id": "FR ID-01",
        "desc": "The system shall accept and validate custom NoSQL commands (SET, GET, UPDATE, DELETE) using the Parsing Engine.",
        "priority": "Mandatory",
        "sourceNeed": "Simple mechanism to manage and access key-value information (S0 Objective 3)"
      },
      {
        "id": "FR ID-02",
        "desc": "The system shall create, update and delete key-value pairs using the SET, UPDATE and DELETE commands.",
        "priority": "Mandatory",
        "sourceNeed": "Store and update key-value data (S0 In-Scope 1, 3)"
      },
      {
        "id": "FR ID-03",
        "desc": "The system shall retrieve the value associated with a key using the GET command.",
        "priority": "Mandatory",
        "sourceNeed": "Retrieve and access stored data (S0 In-Scope 2)"
      },
      {
        "id": "FR ID-04",
        "desc": "The system shall maintain an index mapping keys to storage locations for faster retrieval.",
        "priority": "Mandatory",
        "sourceNeed": "Efficient retrieval (S0 Objective 4)"
      },
      {
        "id": "FR ID-05",
        "desc": "The system shall permanently store key-value records in local storage.",
        "priority": "Mandatory",
        "sourceNeed": "Store key-value data persistently (S0 In-Scope 1)"
      },
      {
        "id": "FR ID-06",
        "desc": "The system shall recover stored data and rebuild the index when the application restarts.",
        "priority": "Mandatory",
        "sourceNeed": "Data availability and consistency (S0 In-Scope 4)"
      },
      {
        "id": "FR ID-07",
        "desc": "The system shall detect invalid commands and display appropriate error messages.",
        "priority": "Mandatory",
        "sourceNeed": "Reliability and consistency (S0 Objective 4)"
      },
      {
        "id": "FR ID-08",
        "desc": "The system shall report an error when a requested key does not exist.",
        "priority": "Mandatory",
        "sourceNeed": "Retrieve and access stored data (S0 In-Scope 2)"
      },
      {
        "id": "FR ID-09",
        "desc": "The system shall provide a web interface for performing database operations and viewing results.",
        "priority": "Mandatory",
        "sourceNeed": "Simple mechanism to access stored information (S0 Objective 3)"
      },
      {
        "id": "FR ID-10",
        "desc": "The system shall identify and remove obsolete records through compaction to improve storage efficiency.",
        "priority": "Challenge",
        "sourceNeed": "Limited storage capacity (S0 constraint)"
      }
    ],
    "nfrTable": [
      {
        "id": "NFR ID-01",
        "desc": "The system shall respond to standard database operations within 2 seconds under normal workload.",
        "cat": "Performance",
        "target": "≤ 2 s per operation"
      },
      {
        "id": "NFR ID-02",
        "desc": "The system shall retrieve a key-value record within 1 second for a database containing up to 10,000 records.",
        "cat": "Performance",
        "target": "≤ 1 s at 10,000 records"
      },
      {
        "id": "NFR ID-03",
        "desc": "The system shall support at least 10 concurrent user requests without crashing.",
        "cat": "Reliability",
        "target": "≥ 10 concurrent requests; 0 crashes"
      },
      {
        "id": "NFR ID-04",
        "desc": "The system shall keep all successfully stored records available after a normal restart.",
        "cat": "Reliability",
        "target": "100% of stored records available after restart"
      },
      {
        "id": "NFR ID-05",
        "desc": "The system shall recover stored data and rebuild the index within 10 seconds for up to 10,000 records.",
        "cat": "Recoverability",
        "target": "≤ 10 s at 10,000 records"
      },
      {
        "id": "NFR ID-06",
        "desc": "The system shall support at least 10,000 key-value records without requiring changes to the application architecture.",
        "cat": "Scalability",
        "target": "≥ 10,000 records; no architecture change"
      }
    ],
    "userStoryTable": [
      {
        "id": "UC-01",
        "actor": "User",
        "desc": "Insert a key-value record (SET)",
        "mainFlow": "Enter SET command in web interface → parser validates (includes UC-09) → record stored and index updated → success shown within 2 s",
        "exceptionFlow": "Invalid command, empty key/value, or key already exists → error message within 1 s; stored data unchanged"
      },
      {
        "id": "UC-02",
        "actor": "User",
        "desc": "Retrieve a record using its key (GET)",
        "mainFlow": "Enter GET command → index gives record location → value read and shown within 1 s (up to 10,000 records)",
        "exceptionFlow": "Key not found → \"Key not found\" error"
      },
      {
        "id": "UC-03",
        "actor": "User",
        "desc": "Update an existing record (UPDATE)",
        "mainFlow": "Enter UPDATE with key and new value → validated (includes UC-09) → new value stored → GET returns new value",
        "exceptionFlow": "Key does not exist, or invalid value → error; old value unchanged"
      },
      {
        "id": "UC-04",
        "actor": "User",
        "desc": "Delete a record (DELETE)",
        "mainFlow": "Enter DELETE with key → validated (includes UC-09) → record removed → GET returns \"Key not found\"",
        "exceptionFlow": "Key does not exist → error message"
      },
      {
        "id": "UC-05",
        "actor": "User",
        "desc": "View all records",
        "mainFlow": "Open records view on web interface → all active key-value pairs listed (up to 10,000 records)",
        "exceptionFlow": "No records stored → \"No records\" message"
      },
      {
        "id": "UC-06",
        "actor": "User",
        "desc": "Compact the database",
        "mainFlow": "Trigger compaction → obsolete records identified and removed → index rebuilt (includes UC-08) → storage size reduced; ≤ 30 s for 10,000 records",
        "exceptionFlow": "Interruption or storage error → old storage kept, compaction aborted"
      },
      {
        "id": "UC-07",
        "actor": "System",
        "desc": "Recover data after restart",
        "mainFlow": "Application restarts → stored records loaded → index rebuilt (includes UC-08) → system ready; ≤ 10 s for 10,000 records",
        "exceptionFlow": "Storage file missing or last record incomplete → incomplete record skipped, error reported"
      },
      {
        "id": "UC-08",
        "actor": "System",
        "desc": "Rebuild index (included use case)",
        "mainFlow": "Scan stored records → keep latest location for each key → index ready for lookup",
        "exceptionFlow": "Unreadable record → skipped and reported"
      },
      {
        "id": "UC-09",
        "actor": "System",
        "desc": "Validate input (included use case)",
        "mainFlow": "Lexical check → syntax check → semantic check → structured instruction produced within 100 ms",
        "exceptionFlow": "Unknown command, missing key or bad syntax → command rejected with error"
      }
    ],
    "useCaseImage": "assets/team05_use_case_diagram.png?v=20261104",
    "useCaseCaption": "Fig 2. System Use Case Diagram",
    "acceptanceTable": [
      {
        "req": "FR ID-01",
        "criteria": "A valid SET, GET, UPDATE or DELETE command is accepted and converted into a structured instruction in ≤ 100 ms.",
        "method": "Parser test with at least 10 valid commands of each type; measure parse time"
      },
      {
        "req": "FR ID-02",
        "criteria": "SET adds a new record; UPDATE changes the value returned for that key; DELETE makes the key return \"Key not found\". SET on a key that already exists is rejected with an error and the old value is kept. Each operation completes in ≤ 2 s.",
        "method": "SET → GET, UPDATE → GET, DELETE → GET, duplicate SET; measure time"
      },
      {
        "req": "FR ID-03",
        "criteria": "GET returns the current value of an existing key in ≤ 1 s with up to 10,000 records stored.",
        "method": "GET test on datasets of 100, 1,000 and 10,000 records; record latency"
      },
      {
        "req": "FR ID-04",
        "criteria": "Every stored key has exactly one index entry pointing to its current record; index lookup takes ≤ 10 ms.",
        "method": "Index check after SET / UPDATE / DELETE; timing test on 10,000 keys"
      },
      {
        "req": "FR ID-05",
        "criteria": "Every successfully written record is present in local storage and can be read back (100%).",
        "method": "Store → close application → reopen → retrieve"
      },
      {
        "req": "FR ID-06",
        "criteria": "After restart, all stored records are readable and the index is rebuilt in ≤ 10 s for 10,000 records.",
        "method": "Restart test with a 10,000-record dataset; timed"
      },
      {
        "req": "FR ID-07",
        "criteria": "Unknown commands, missing keys or wrong syntax are rejected with a clear error message within 1 s, and no stored data changes.",
        "method": "Invalid-command test with at least 10 cases"
      },
      {
        "req": "FR ID-08",
        "criteria": "GET, UPDATE or DELETE on a missing key returns \"Key not found\" within 1 s.",
        "method": "Missing-key test for each command"
      },
      {
        "req": "FR ID-09",
        "criteria": "All four commands can be run and their results viewed in the web interface, and all stored records can be listed (UC-05); each result appears within 2 s of submission.",
        "method": "UI functional test of every command; measure response time"
      },
      {
        "req": "FR ID-10",
        "criteria": "After compaction, 100% of superseded and deleted records are removed, storage size is reduced, and every current value is still retrievable. Compaction takes ≤ 30 s for 10,000 records.",
        "method": "Many UPDATE / DELETE operations → compact → compare file size before and after → GET all keys"
      },
      {
        "req": "NFR ID-01",
        "criteria": "Each standard operation responds in ≤ 2 s under normal workload (one user, up to 10,000 records).",
        "method": "Timed run of SET, GET, UPDATE and DELETE; report maximum and average"
      },
      {
        "req": "NFR ID-02",
        "criteria": "GET for a record completes in ≤ 1 s with 10,000 records stored.",
        "method": "100 GET requests on a 10,000-record dataset; report maximum and average"
      },
      {
        "req": "NFR ID-03",
        "criteria": "At least 10 requests sent at the same time are all handled with no crash and no corrupted record.",
        "method": "Concurrency script with 10 parallel requests; check results and stored data"
      },
      {
        "req": "NFR ID-04",
        "criteria": "100% of records stored successfully are still available after a normal restart.",
        "method": "Store 1,000 records → restart → compare all records"
      },
      {
        "req": "NFR ID-05",
        "criteria": "Recovery of stored data and index rebuild finish in ≤ 10 s for up to 10,000 records.",
        "method": "Timed restart with 10,000 records"
      },
      {
        "req": "NFR ID-06",
        "criteria": "10,000 records can be stored and used with no change to the application architecture, and NFR ID-01 / NFR ID-02 still hold.",
        "method": "Load 10,000 records; rerun operation timing tests"
      }
    ]
  },
  "systemDesign": {}
};

window.STATIC_TEAMS_DATA['B-05'] = team05Data;
