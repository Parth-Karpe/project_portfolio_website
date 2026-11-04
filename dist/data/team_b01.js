/**
 * Static Data File for Team B-01
 * Project: Incremental Build & Dependency Resolution Tool
 * Source documents: Incremental_Build_Gate_0_Reference_Format (1).docx & Incremental_Build_Gate_1_Reference_Format (1).docx
 * Faculty Mentor: Mr. Dheerajkumar
 */

window.STATIC_TEAMS_DATA = window.STATIC_TEAMS_DATA || {};

const teamB01Data = {
  "id": "B-01",
  "theme": "System Software and Development Tools",
  "title": "Incremental Build & Dependency Resolution Tool",
  "guide": "Mr. Dheerajkumar",
  "academicYear": "2026–27",
  "repo": "https://github.com/topics/incremental-build-system",
  "members": [
    {
      "name": "Sankalp Prakash Patil",
      "usn": "01FE24BCI095",
      "role": "Team Lead / Member",
      "skills": "File Fingerprinting • SHA-256 Hashing • Change Detection • Manifest Parser",
      "contribution": "Manifest parsing, SHA-256 file fingerprinting, file-change classification, and input adapter development.",
      "github": "https://github.com"
    },
    {
      "name": "Abdul Khadar I",
      "usn": "01FE24BCI102",
      "role": "Team Member",
      "skills": "Directed Graphs • Cycle Detection • Topological Sorting • Impact Analysis",
      "contribution": "Directed dependency-graph representation, cycle detection, topological execution planning, and downstream affected-action identification.",
      "github": "https://github.com"
    },
    {
      "name": "Pranav Naik",
      "usn": "01FE24BCI100",
      "role": "Team Member",
      "skills": "Process Orchestration • Task Scheduling • Artifact Caching • SQLite State Store",
      "contribution": "Bounded-concurrency task scheduling, OS process execution logging, content-addressed artifact cache validation, and SQLite persistence.",
      "github": "https://github.com"
    },
    {
      "name": "Saiprasad B J",
      "usn": "01FE24BCI014",
      "role": "Team Member",
      "skills": "Computer Networks • TCP Sockets • Worker Coordination • Artifact Protocol",
      "contribution": "Coordinator-worker TCP socket protocol, worker registration, heartbeat tracking, timeout handling, and artifact network transmission.",
      "github": "https://github.com"
    }
  ],
  "stage0": {
    "problem": "Software projects often contain multiple build actions that depend on one another. When a source file changes, running every build action again can repeat work that is not required. Developers need a reliable way to identify the affected actions, respect dependency order and reuse previously generated outputs only when those outputs are still valid.\n\nThe proposed Incremental Build and Dependency Resolution Tool addresses this problem through file fingerprinting, dependency-graph analysis, build planning, task execution and artifact caching. The extended prototype also explores controlled execution of suitable independent actions on trusted computers connected through a local-area network (LAN). The project provides practical integration of algorithms, operating-system concepts, database management, networking and object-oriented design.",
    "objectives": [
      "To create a project manifest describing build actions, commands, inputs, outputs and dependencies.",
      "To detect added, modified, deleted and unchanged files using SHA-256 fingerprints, and identify the build actions affected by those changes.",
      "To represent build actions as a directed dependency graph, detect dependency cycles and determine a valid execution order.",
      "To schedule and execute eligible actions as operating-system processes with bounded local parallelism, and investigate controlled TCP-based execution on trusted LAN workers.",
      "To reuse cached artifacts only when the complete declared action identity and expected outputs are valid, while persistently maintaining file state, artifact metadata and build history.",
      "To evaluate correctness and performance by comparing clean builds, incremental builds, cache reuse, and local versus networked execution."
    ],
    "coursesTable": [
      {
        "sl": "1",
        "course": "Data Structures and Algorithms / Design and Analysis of Algorithms",
        "concepts": "Directed graphs, adjacency lists, hash maps/sets, BFS/DFS, topological sorting and cycle detection",
        "role": "Dominant"
      },
      {
        "sl": "2",
        "course": "Operating Systems",
        "concepts": "File and process operations, process exit codes, worker pools, synchronization, concurrency limits and task-state management",
        "role": "Dominant"
      },
      {
        "sl": "3",
        "course": "Database Management Systems",
        "concepts": "SQLite tables, keys, CRUD operations, transactions, build history and persistent metadata",
        "role": "Supporting"
      },
      {
        "sl": "4",
        "course": "Computer Networks",
        "concepts": "TCP client-server communication, message framing, worker registration, heartbeats, timeouts, task dispatch and artifact transfer",
        "role": "Supporting"
      },
      {
        "sl": "5",
        "course": "Object-Oriented Programming",
        "concepts": "Interfaces and classes for adapters, actions, scheduler, cache, state repository, coordinator and workers",
        "role": "Supporting"
      }
    ],
    "conceptualFlowImage": "assets/team_b01_conceptual_workflow.png",
    "conceptualFlowCaption": "Fig 1. Conceptual Workflow of Incremental Build and Dependency Resolution Tool",
    "enginesTable": [
      {
        "id": "E1",
        "name": "Change Detection and Adapter Engine",
        "desc": "Load and validate the project manifest; scan configured files, calculate SHA-256 fingerprints and classify file changes."
      },
      {
        "id": "E2",
        "name": "Dependency and Impact Analysis Engine",
        "desc": "Represent build actions as a directed graph, identify affected actions, detect dependency cycles and determine a valid execution order."
      },
      {
        "id": "E3",
        "name": "Scheduling, Execution, Cache and State Engine",
        "desc": "Schedule ready actions, execute build commands locally, validate and reuse eligible cached artifacts, and persist build state and results."
      },
      {
        "id": "E4",
        "name": "Networked Worker Coordination Engine",
        "desc": "Register trusted LAN workers, dispatch eligible independent actions over TCP, transfer artifacts and validate returned results."
      }
    ],
    "scopeInTable": [
      { "num": "1", "item": "Command-line interface and documented project manifest." },
      { "num": "2", "item": "File scanning and SHA-256 fingerprints without requiring Git." },
      { "num": "3", "item": "Dependency graph construction, impact analysis, cycle detection and execution planning." },
      { "num": "4", "item": "Task scheduler with local process execution and bounded parallelism." },
      { "num": "5", "item": "Validated content-addressed artifact store or equivalent keyed cache." },
      { "num": "6", "item": "SQLite persistence for metadata and build history; artifact bytes stored separately on disk." },
      { "num": "7", "item": "Coordinator and a small number of trusted LAN workers communicating over TCP, subject to guide approval." },
      { "num": "8", "item": "Limited, documented language adapters or build-command examples for simple reproducible test projects." },
      { "num": "9", "item": "Logs and reports for changed files, selected actions, cache hits/misses, execution location, timing and failures." },
      { "num": "10", "item": "Correctness tests and controlled performance benchmarks." }
    ],
    "scopeOutTable": [
      {
        "num": "1",
        "item": "Universal support for every programming language, compiler, package manager or build configuration",
        "reason": "Beyond the manageable scope of the academic prototype."
      },
      {
        "num": "2",
        "item": "Cloud-scale execution, public worker pools or internet-facing distributed execution",
        "reason": "Requires infrastructure and security controls outside the controlled LAN prototype."
      },
      {
        "num": "3",
        "item": "Replacement for production build tools, package managers, CI platforms or source-control systems",
        "reason": "The project demonstrates selected build-system concepts, not a complete ecosystem replacement."
      },
      {
        "num": "4",
        "item": "Execution of arbitrary tasks on untrusted worker machines",
        "reason": "The proposed worker model assumes explicitly configured trusted machines."
      },
      {
        "num": "5",
        "item": "Guaranteeing that every workload becomes faster when distributed",
        "reason": "Communication and transfer overhead may make small tasks slower."
      },
      {
        "num": "6",
        "item": "Perfect automatic discovery of dynamic or hidden dependencies",
        "reason": "The supported prototype relies on declared manifest inputs and dependencies."
      }
    ],
    "feasibilityTable": [
      {
        "aspect": "Feasibility within mini-project scope",
        "assessment": "Feasible with staged implementation. Graph algorithms, hashing, process execution, SQLite and TCP sockets are established techniques; local correctness should be completed before network execution."
      },
      {
        "aspect": "Required computing / resources",
        "assessment": "One coordinator computer and, if available, one or two additional computers connected to a controlled LAN are sufficient for a demonstrator. Local storage and a supported compiler/toolchain are required."
      },
      {
        "aspect": "Prerequisite knowledge",
        "assessment": "Basic knowledge of data structures, graph algorithms, operating systems, databases, computer networks, object-oriented programming and command-line execution."
      },
      {
        "aspect": "Major constraints / limitations",
        "assessment": "Limited development time; dependency declarations must be explicit; supported languages and action types must remain limited; LAN worker availability may vary."
      },
      {
        "aspect": "Use of existing libraries / tools",
        "assessment": "Libraries may support parsing, hashing, database access and networking, while the core dependency analysis, build planning, cache-validation and scheduling logic must be implemented and studied by the team."
      },
      {
        "aspect": "Overall feasibility",
        "assessment": "Feasible with scope control. The LAN execution extension requires project-guide approval before architecture freeze."
      }
    ]
  },
  "stage1": {
    "frTable": [
      {
        "id": "FR-01",
        "desc": "Load and validate manifests with targets, actions, commands, inputs, outputs and dependencies.",
        "priority": "Mandatory",
        "sourceNeed": "Project manifest and build definitions."
      },
      {
        "id": "FR-02",
        "desc": "Use SHA-256 to classify files as added, modified, deleted or unchanged.",
        "priority": "Mandatory",
        "sourceNeed": "Detect changes from the saved state."
      },
      {
        "id": "FR-03",
        "desc": "Build the dependency graph: detect missing dependencies/cycles and select affected actions plus downstream dependencies.",
        "priority": "Mandatory",
        "sourceNeed": "Dependency analysis and action selection."
      },
      {
        "id": "FR-04",
        "desc": "Schedule actions after prerequisites pass, within the configured concurrency limit.",
        "priority": "Mandatory",
        "sourceNeed": "Safe, bounded scheduling."
      },
      {
        "id": "FR-05",
        "desc": "Run actions as OS processes: record exit codes, logs and duration.",
        "priority": "Mandatory",
        "sourceNeed": "Build execution and results."
      },
      {
        "id": "FR-06",
        "desc": "Reuse artifacts only when the full action key matches and outputs validate.",
        "priority": "Mandatory",
        "sourceNeed": "Safe cache reuse."
      },
      {
        "id": "FR-07",
        "desc": "Persist file, action and artifact metadata and build history across runs in SQLite.",
        "priority": "Mandatory",
        "sourceNeed": "Consistent build state and history."
      },
      {
        "id": "FR-08",
        "desc": "Support LAN-worker registration, dispatch, heartbeat/timeouts and artifact fingerprint checks.",
        "priority": "Challenge",
        "sourceNeed": "Proposed controlled-LAN extension; guide approval required."
      },
      {
        "id": "FR-09",
        "desc": "Report changed files, affected actions, cache activity, execution location, timings and failures.",
        "priority": "Mandatory",
        "sourceNeed": "Traceable build outcomes."
      }
    ],
    "nfrTable": [
      {
        "id": "NFR-01",
        "desc": "Change classifications and affected-action sets must match expected test results.",
        "cat": "Correctness",
        "target": "All defined file-change and graph tests match expected results."
      },
      {
        "id": "NFR-02",
        "desc": "Incremental builds must match clean-build outputs for deterministic projects.",
        "cat": "Reliability / Correctness",
        "target": "All defined output comparisons pass."
      },
      {
        "id": "NFR-03",
        "desc": "Cache reuse must reject stale or mismatched artifacts.",
        "cat": "Cache safety",
        "target": "Any cache-key change causes a miss; hits require matching keys and valid outputs."
      },
      {
        "id": "NFR-04",
        "desc": "Execution must respect dependencies and concurrency limits.",
        "cat": "Dependency safety / Performance",
        "target": "Prerequisites pass before start; active actions never exceed the limit."
      },
      {
        "id": "NFR-05",
        "desc": "Metadata and transferred artifacts must remain consistent and verifiable.",
        "cat": "Integrity / Fault tolerance",
        "target": "Restart tests preserve state; corrupt, incomplete or timed-out results are rejected."
      },
      {
        "id": "NFR-06",
        "desc": "Build activity and module interfaces must be traceable and documented.",
        "cat": "Observability / Maintainability",
        "target": "Each action records state, result and duration; core module interfaces are documented."
      }
    ],
    "userStoryTable": [
      {
        "id": "UC-01",
        "actor": "Developer",
        "desc": "Load a project and request a target build.",
        "mainFlow": "Select project/target → Load and validate manifest → Accept request.",
        "exceptionFlow": "Invalid manifest or target → Show error; stop build."
      },
      {
        "id": "UC-02",
        "actor": "Developer",
        "desc": "Identify source-file changes.",
        "mainFlow": "Scan files → Hash with SHA-256 → Compare saved state → Classify changes.",
        "exceptionFlow": "Unreadable file or missing input → Report path; never mark unchanged."
      },
      {
        "id": "UC-03",
        "actor": "Developer",
        "desc": "Find valid actions affected by changes.",
        "mainFlow": "Map changed files → Analyse dependencies → Select downstream closure → Validate graph.",
        "exceptionFlow": "Missing dependency or cycle → Report error; reject plan."
      },
      {
        "id": "UC-04",
        "actor": "Developer",
        "desc": "Reuse valid outputs from earlier builds.",
        "mainFlow": "Create action key → Check cache → Validate outputs → Reuse or schedule execution.",
        "exceptionFlow": "Key mismatch or invalid/missing output → Cache miss; execute action."
      },
      {
        "id": "UC-05",
        "actor": "Developer / LAN Worker",
        "desc": "Execute eligible actions locally or on an approved worker.",
        "mainFlow": "Check prerequisites/limit → Run or dispatch task → Capture and verify result.",
        "exceptionFlow": "Action failure blocks dependants; worker timeout/invalid result is rejected."
      },
      {
        "id": "UC-06",
        "actor": "Developer",
        "desc": "Inspect build results and execution history.",
        "mainFlow": "Record results → Show changes, actions, cache, location, timings and failures.",
        "exceptionFlow": "Incomplete report or interrupted build → Show available status and errors."
      }
    ],
    "useCaseImage": "assets/team_b01_use_case_diagram.png",
    "useCaseCaption": "Fig 2. System Use Case Diagram",
    "acceptanceTable": [
      {
        "req": "FR-01",
        "criteria": "Valid manifests load; invalid or incomplete definitions are rejected with diagnostics.",
        "method": "Test valid, malformed and incomplete manifests."
      },
      {
        "req": "FR-02",
        "criteria": "SHA-256 correctly classifies added, modified, deleted and unchanged files.",
        "method": "Test each change type against expected results."
      },
      {
        "req": "FR-03",
        "criteria": "The graph detects missing dependencies/cycles and selects the complete affected-action closure.",
        "method": "Test valid, unresolved and cyclic graphs; compare selected actions."
      },
      {
        "req": "FR-04",
        "criteria": "Actions start only after prerequisites pass and never exceed the concurrency limit.",
        "method": "Run dependent/independent tasks; inspect states and timestamps."
      },
      {
        "req": "FR-05",
        "criteria": "Each process records exit code, output/error logs and elapsed time.",
        "method": "Run successful and failing commands; verify recorded results."
      },
      {
        "req": "FR-06",
        "criteria": "Cache hits require a matching full action key and validated outputs.",
        "method": "Repeat unchanged build; alter inputs/configuration to test invalidation."
      },
      {
        "req": "FR-07",
        "criteria": "File, action and artifact metadata and history persist consistently after restart.",
        "method": "Run builds, restart application and inspect stored records."
      },
      {
        "req": "FR-08",
        "criteria": "Approved workers register, receive tasks and return only verified artifacts; failures/timeouts are handled.",
        "method": "Test registration, dispatch, heartbeat, timeout and altered/incomplete transfers."
      },
      {
        "req": "FR-09",
        "criteria": "Reports accurately show changes, affected actions, cache activity, execution location, timings and failures.",
        "method": "Compare reports with logs for cache, local/remote runs and failures."
      }
    ]
  },
  "systemDesign": {}
};

window.STATIC_TEAMS_DATA['B-01'] = teamB01Data;
