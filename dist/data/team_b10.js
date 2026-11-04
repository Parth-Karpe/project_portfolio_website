/**
 * Static Data File for Team B-10
 * Project: Large-Scale Log Processing & Analytics Engine
 * Source documents: Gate 0 Document Changed.docx & Review 2-Requirements Analysis Changed.docx
 * Faculty Mentor: Ms. Umadevi F M
 */

window.STATIC_TEAMS_DATA = window.STATIC_TEAMS_DATA || {};

const teamB10Data = {
  "id": "B-10",
  "theme": "Data Processing and Analytics Systems",
  "title": "Large-Scale Log Processing & Analytics Engine",
  "guide": "Ms. Umadevi F M",
  "academicYear": "2026–27",
  "repo": "https://github.com/topics/log-analytics-engine",
  "members": [
    {
      "name": "Ananya Bhat",
      "usn": "01FE24BCI117",
      "role": "Team Lead / Member",
      "skills": "Memory-Mapped I/O · POSIX mmap · Chunking · Ingestion Engine",
      "contribution": "Chunked memory-mapped file reading, newline boundary alignment, virtual memory and page cache optimization.",
      "github": "https://github.com"
    },
    {
      "name": "Priya Kshirsagar",
      "usn": "01FE24BCI110",
      "role": "Team Member",
      "skills": "Regex Parsing · Field Validation · Error Handling · Quarantine Store",
      "contribution": "Regular-expression parser development, field format validation, and quarantined records store with line tracking and error reasons.",
      "github": "https://github.com"
    },
    {
      "name": "Gurusiddeshwar N",
      "usn": "01FE25BCI710",
      "role": "Team Member",
      "skills": "Sliding Window · Fingerprinting · Hash Sets & Queues · Deduplication",
      "contribution": "Bounded sliding-window duplicate detector, 64-bit fingerprinting, FIFO queue eviction, and memory bound enforcement.",
      "github": "https://github.com"
    },
    {
      "name": "Amit K",
      "usn": "01FE24BCI090",
      "role": "Team Member",
      "skills": "PostgreSQL · Micro-batching · REST API · Web Analytics Dashboard",
      "contribution": "PostgreSQL bulk ingestion pipeline, micro-batch buffer management, REST API endpoints, and live interactive analytics dashboard.",
      "github": "https://github.com"
    }
  ],
  "stage0": {
    "problem": "Modern applications and servers generate log files that grow to many gigabytes. Each line is unstructured text, and the files often contain malformed lines and repeated entries. Because of this, the logs cannot be searched or analysed directly, and loading such a file fully into memory is not practical on an ordinary machine.\n\nThis project builds a single-machine pipeline that reads one massive log file efficiently, converts raw lines into structured records, removes bad and duplicate data, stores the clean records in a database and presents analytics on a web dashboard.",
    "objectives": [
      "Read a very large single log file in newline-aligned chunks using memory mapping, without loading the whole file into RAM.",
      "Parse each raw line into structured fields (timestamp, level, IP address, error code, message) and validate them, sending malformed lines to a quarantine store with a reason.",
      "Remove duplicate records with a bounded sliding-window fingerprint set so that memory use stays flat.",
      "Store clean records in PostgreSQL through in-memory micro-batches and bulk inserts, with retry on failed writes.",
      "Provide aggregate analytics (counts by level, error code and time) through a REST API with time-range and log-level filters, shown on a live web dashboard."
    ],
    "coursesTable": [
      {
        "sl": 1,
        "course": "Operating Systems",
        "concepts": "Memory-mapped files (mmap), virtual memory and page cache, file descriptors, system calls, chunked I/O",
        "role": "Dominant"
      },
      {
        "sl": 2,
        "course": "Data Structures & Algorithms",
        "concepts": "Regular-expression parsing, hashing and fingerprints, hash sets, queues, sliding-window eviction, complexity analysis",
        "role": "Dominant"
      },
      {
        "sl": 3,
        "course": "Database Management Systems",
        "concepts": "Relational schema design, bulk insert, transactions, indexing, aggregate SQL, query tuning",
        "role": "Dominant"
      },
      {
        "sl": 4,
        "course": "Web Technologies",
        "concepts": "REST API design, HTTP and JSON, client-side charts, filtering through query parameters",
        "role": "Dominant"
      }
    ],
    "conceptualFlowImage": "assets/team_b10_conceptual_workflow.png",
    "conceptualFlowCaption": "Fig 1. Single-Machine Log Processing Pipeline Conceptual Workflow",
    "enginesTable": [
      {
        "id": "E1",
        "name": "Chunked Ingestion Engine",
        "desc": "Memory-mapped, chunked reading of a single large log file on one machine without loading the full file into RAM."
      },
      {
        "id": "E2",
        "name": "Parsing & Quarantine Engine",
        "desc": "Regex-based parsing into structured fields, validation, and quarantine of malformed lines with line number and reason."
      },
      {
        "id": "E3",
        "name": "De-duplication & Batching Engine",
        "desc": "Bounded sliding-window duplicate removal using fingerprints, a hash set and a queue, followed by micro-batch buffering."
      },
      {
        "id": "E4",
        "name": "Storage & Analytics Engine",
        "desc": "Bulk storage in PostgreSQL, aggregate SQL analytics, and a REST API with a web dashboard showing live charts with time-range and log-level filters."
      }
    ],
    "scopeInTable": [
      {
        "sl": 1,
        "item": "Memory-mapped, chunked reading of a single large log file on one machine (E1 Ingestion Engine)."
      },
      {
        "sl": 2,
        "item": "Regex-based parsing into structured fields, validation, and quarantine of malformed lines with line number and reason."
      },
      {
        "sl": 3,
        "item": "Bounded sliding-window duplicate removal using fingerprints, a hash set and a queue, followed by micro-batch buffering."
      },
      {
        "sl": 4,
        "item": "Bulk storage in PostgreSQL, aggregate SQL analytics, and a REST API with a web dashboard showing live charts with time-range and log-level filters."
      }
    ],
    "scopeOutTable": [
      {
        "sl": 1,
        "item": "Multi-source, distributed or real-time streaming ingestion",
        "reason": "The project is scoped to one log file on one machine; distributed systems would be complex."
      },
      {
        "sl": 2,
        "item": "Machine-learning anomaly detection, alerting and log-based security analytics",
        "reason": "Analytics are limited to aggregate counts and trends; advanced analytics is a separate research area."
      },
      {
        "sl": 3,
        "item": "User authentication, multi-user access control and production deployment or cloud hosting",
        "reason": "Not part of the core mechanisms being studied; the dashboard runs locally for demonstration."
      }
    ],
    "feasibilityTable": [
      {
        "aspect": "Feasibility within 3-credit scope",
        "detail": "Achievable as a 3-credit mini project. The pipeline has four small, well-defined engines (ingestion, parsing and de-duplication, storage, dashboard) that can be split across four team members and integrated step by step."
      },
      {
        "aspect": "Required computing / resources",
        "detail": "One laptop or desktop (8 cores, 16 GB RAM), a multi-GB sample log file, PostgreSQL, and a web browser. No special hardware or cloud service is needed."
      },
      {
        "aspect": "Prerequisite knowledge",
        "detail": "Operating systems (memory mapping, file I/O), data structures (hashing, queues, regex), PostgreSQL, REST/HTTP basics, and a programming language such as C++."
      },
      {
        "aspect": "Major constraints / limitations",
        "detail": "Single machine and single log source only; limited by 16 GB RAM, so memory must stay bounded; duplicates are detected only within a fixed window; throughput is limited by disk speed and database write speed."
      },
      {
        "aspect": "Use of existing libraries / tools",
        "detail": "Libraries are used only for peripheral work: the regex module, a PostgreSQL driver, a web framework and a charting library. The core mechanisms (chunked mmap reading, parsing, windowed de-duplication, micro-batching and aggregate queries) are implemented by the team."
      },
      {
        "aspect": "Overall feasibility",
        "detail": "High. The scope is bounded, the technology is familiar from the foundation courses, and every part can be tested with measurable targets."
      }
    ]
  },
  "stage1": {
    "frTable": [
      {
        "id": "FR ID-01",
        "desc": "The system shall open the single log file read-only and read it through memory mapping (mmap) in newline-aligned chunks of configurable size (default 64 MB), without loading the whole file into RAM.",
        "priority": "Mandatory",
        "source": "Handle a massive single log file on one machine"
      },
      {
        "id": "FR ID-02",
        "desc": "The system shall parse every raw log line with a regular expression into timestamp, level, IP address, error code and message.",
        "priority": "Mandatory",
        "source": "Turn raw text logs into structured fields"
      },
      {
        "id": "FR ID-03",
        "desc": "The system shall validate parsed fields and send malformed or incomplete lines to a quarantine file with line number and reason.",
        "priority": "Mandatory",
        "source": "Bad data must not crash the pipeline or vanish silently"
      },
      {
        "id": "FR ID-04",
        "desc": "The system shall drop duplicate records by computing a fingerprint of the key fields and checking it against a bounded hash set.",
        "priority": "Mandatory",
        "source": "Avoid duplicate entries inflating counts, with flat memory"
      },
      {
        "id": "FR ID-05",
        "desc": "The system shall hold clean records in an in-memory queue and flush them as one micro-batch when the batch-size limit is reached and stored in PostgreSQL.",
        "priority": "Mandatory",
        "source": "Efficient writes instead of row-by-row inserts and persistent, consistent storage"
      },
      {
        "id": "FR ID-06",
        "desc": "The system shall expose the analytics through a REST API returning JSON, with aggregate SQL analytics time-range and log-level filters and display them on a web dashboard.",
        "priority": "Mandatory",
        "source": "View results in a browser"
      }
    ],
    "nfrTable": [
      {
        "id": "NFR ID-01",
        "desc": "Ingestion-to-storage throughput on a single machine.",
        "category": "Performance",
        "target": "At least 1000 lines/sec end to end on a 4-core, 8 GB machine with a 5 GB test file."
      },
      {
        "id": "NFR ID-02",
        "desc": "Aggregate analytics queries must be fast on large tables.",
        "category": "Performance",
        "target": "Each dashboard query completes in under 1 second on a table of 1000 rows."
      },
      {
        "id": "NFR ID-03",
        "desc": "A bad line or a failed batch write must not stop the pipeline.",
        "category": "Reliability",
        "target": "0 crashes in fault-injection tests; a failed batch is retried up to 3 times before being logged."
      },
      {
        "id": "NFR ID-04",
        "desc": "Every input line must be accounted for and no duplicate inside the window may be stored.",
        "category": "Data integrity",
        "target": "lines read = valid + duplicate + quarantined for every run; 0 in-window duplicates in the database."
      }
    ],
    "userStoryTable": [
      {
        "id": "UC-01",
        "actor": "System Operator",
        "story": "As an operator, I want to start an ingestion run for a log file with chosen settings so that the file is processed into the database.",
        "mainFlow": "1. Operator gives file path, chunk size, window size N and batch size. 2. System checks the file can be opened. 3. System starts the run: the file is read, parsed, de-duplicated and stored.",
        "boundaryFlow": "Empty file: the run completes with zero records. File smaller than one chunk: processed as a single chunk.",
        "exceptionFlow": "File missing or unreadable: show error, no run is created."
      },
      {
        "id": "UC-02",
        "actor": "System Operator",
        "story": "As an operator, I want each line parsed and validated so that only structured, correct records move forward.",
        "mainFlow": "1. Match the line against the regex. 2. Extract timestamp, level, IP address, error code and message. 3. Validate the fields. 4. Pass the valid record to duplicate removal.",
        "boundaryFlow": "A line with an optional field missing: fallback value used where one is defined.",
        "exceptionFlow": "Line does not match or has missing required fields: write it to the quarantine file with line number and reason, then continue."
      },
      {
        "id": "UC-03",
        "actor": "System Operator",
        "story": "As the operator, I want duplicate records removed so that the counts are not inflated.",
        "mainFlow": "1. Compute the fingerprint of the key fields. 2. If it is not in the hash set, add it, push it to the window queue and pass the record on. 3. If the window already holds N fingerprints, evict the oldest first.",
        "boundaryFlow": "A repeat that arrives after more than N records: accepted as new. Window not yet full: nothing is evicted.",
        "exceptionFlow": "Duplicate found: drop the record and count it as a duplicate."
      },
      {
        "id": "UC-04",
        "actor": "System Operator",
        "story": "As an operator, I want to review the quarantined lines so that I can see which log lines were rejected and why.",
        "mainFlow": "1. Operator opens the quarantine file after a run. 2. System lists each rejected line with its reason. 3. Operator checks the reasons.",
        "boundaryFlow": "Quarantine file is empty: show 'no rejected lines'.",
        "exceptionFlow": "Quarantine file missing or unreadable: show an error message."
      },
      {
        "id": "UC-05",
        "actor": "System Operator",
        "story": "As the operator, I want clean records saved in micro-batches so that the database is written to efficiently.",
        "mainFlow": "1. Records collect in the in-memory queue. 2. When the batch-size limit is reached, bulk insert the batch into PostgreSQL. 3. Commit and record the batch statistics. 4. Clear the queue.",
        "boundaryFlow": "Final batch smaller than the limit: flushed at the end of the run.",
        "exceptionFlow": "Database unavailable or the write fails: keep the batch, retry up to 3 times, then log the error and stop cleanly."
      },
      {
        "id": "UC-06",
        "actor": "SOC Analyst",
        "story": "As an analyst, I want to see error trends and event frequency so that I can understand what is happening in the logs.",
        "mainFlow": "1. Open dashboard. 2. Dashboard calls the REST API. 3. System runs aggregate SQL. 4. Charts are drawn from the JSON response.",
        "boundaryFlow": "Only one record stored: the charts show a single point.",
        "exceptionFlow": "No data for the period: show 'no data' message. Database unreachable: show error, keep last chart."
      },
      {
        "id": "UC-07",
        "actor": "SOC Analyst",
        "story": "As an analyst, I want to filter by time range and log level so that I can focus on the data I care about.",
        "mainFlow": "1. Analyst selects time range and level. 2. Dashboard sends them as query parameters. 3. Charts refresh with the filtered results.",
        "boundaryFlow": "Range covers a single minute or a single log level: the charts show only that slice.",
        "exceptionFlow": "Invalid or reversed range: API returns HTTP 400 with a JSON message and the charts stay unchanged."
      }
    ],
    "useCaseImage": "assets/team_b10_use_case_diagram.png",
    "useCaseCaption": "Fig 2. System Use Case Diagram - Large-Scale Log Processing & Analytics Engine",
    "acceptanceTable": [
      {
        "req": "FR ID-01",
        "criteria": "For a file larger than RAM the engine maps it read-only and yields chunks of the configured size; every chunk ends on a newline; joined chunks are byte-identical to the source file.",
        "method": "Unit test with mock offsets; checksum comparison of joined chunks with the original file."
      },
      {
        "req": "FR ID-02",
        "criteria": "For a sample of 1,000 well-formed lines, 100% are parsed with correct timestamp, level, IP, error code and message.",
        "method": "Unit test comparing parsed fields with the labelled expected values."
      },
      {
        "req": "FR ID-03",
        "criteria": "Every injected malformed or incomplete line appears in the quarantine file with line number and reason.",
        "method": "Test file with known bad lines; count quarantine entries and database rows."
      },
      {
        "req": "FR ID-04",
        "criteria": "Duplicates inside the window are dropped; assert set size <= N.",
        "method": "Unit tests: assert set size <= N."
      },
      {
        "req": "FR ID-05",
        "criteria": "A batch is flushed when it reaches the batch-size limit; stored row count equals the valid unique records sent.",
        "method": "Unit test with a synthetic stream; bulk-insert test compared with SELECT COUNT(*)."
      },
      {
        "req": "FR ID-06",
        "criteria": "Aggregate queries return correct counts by level, error code and minute on a dataset; the endpoint returns valid JSON with HTTP 200 and HTTP 400 for invalid ones; the dashboard draws charts from the response.",
        "method": "Run SQL on dataset and compare with expected values; API test (Postman); manual dashboard check."
      },
      {
        "req": "NFR ID-01",
        "criteria": "Throughput of at least 1000 lines/sec on a 4-core, 8 GB machine with a 5 GB file.",
        "method": "Timed run: lines read divided by elapsed time."
      },
      {
        "req": "NFR ID-02",
        "criteria": "Each dashboard aggregate query finishes in under 1 second on 1000 rows.",
        "method": "EXPLAIN ANALYZE and timed runs, repeated 10 times."
      },
      {
        "req": "NFR ID-03",
        "criteria": "Bad lines and a stopped database cause no crash; a failed batch is retried up to 3 times and then logged.",
        "method": "Fault injection: malformed input and database shutdown during a run."
      },
      {
        "req": "NFR ID-04",
        "criteria": "For every run lines read = valid + duplicate + quarantined, and no in-window duplicate fingerprint exists in the database.",
        "method": "Compare run counters; SQL query for repeated fingerprints."
      }
    ]
  },
  "systemDesign": {}
};

window.STATIC_TEAMS_DATA['B-10'] = teamB10Data;
window.STATIC_TEAMS_DATA['10'] = teamB10Data;
