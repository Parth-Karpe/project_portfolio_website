/**
 * Static Data File for Team A-01
 * Project: Mini RDBMS Engine with Query Processing & Transaction Support
 * Source documents: Review 1 & Review 2 - Mini RDBMS Engine
 * Faculty Mentor: Ms. Jyothi Patil
 */

window.STATIC_TEAMS_DATA = window.STATIC_TEAMS_DATA || {};

const team01Data = {
  "id": "A-01",
  "theme": "Data Storage and Retrieval Systems",
  "title": "Mini RDBMS Engine with Query Processing & Transaction Support",
  "guide": "Ms. Jyothi Patil",
  "academicYear": "2026–27",
  "repo": "https://github.com/topics/mini-rdbms-engine",
  "members": [
    {
      "name": "Bhoomi Bankapur",
      "usn": "01FE24BCI044",
      "role": "Team Member",
      "skills": "Relational Storage • Query Processing • ACID Transactions",
      "contribution": "Parser AST design, B-tree index management, ACID logging, and transaction concurrency.",
      "github": "https://github.com"
    },
    {
      "name": "Sneha Shettar",
      "usn": "01FE24BCI061",
      "role": "Team Member",
      "skills": "Relational Storage • Query Processing • ACID Transactions",
      "contribution": "Parser AST design, B-tree index management, ACID logging, and transaction concurrency.",
      "github": "https://github.com"
    },
    {
      "name": "Shubham Mishra",
      "usn": "01FE24BCI083",
      "role": "Team Member",
      "skills": "Relational Storage • Query Processing • ACID Transactions",
      "contribution": "Parser AST design, B-tree index management, ACID logging, and transaction concurrency.",
      "github": "https://github.com"
    },
    {
      "name": "Soumya Patil",
      "usn": "01FE24BCI005",
      "role": "Team Member",
      "skills": "Relational Storage • Query Processing • ACID Transactions",
      "contribution": "Parser AST design, B-tree index management, ACID logging, and transaction concurrency.",
      "github": "https://github.com"
    }
  ],
  "stage0": {
    "problem": "In real-world applications, databases handle data creation, queries, modifications and security, but internal processes such as query processing, optimization, concurrency control and crash recovery often remain a black box to students. The proposed Mini RDBMS Engine with Query Processing & Transaction Support aims to demonstrate these processes by implementing a SQL-like query processor, semantic validation, indexing, query execution and transaction management with commit, rollback and simulated crash recovery. The project integrates concepts from Principles of Compiler Design (lexical analysis and parsing), Design & Analysis of Algorithms (indexing and searching), Operating System Principles (locking and concurrency control), and Database Management Systems (relational models, constraints and ACID properties).",
    "objectives": [
      "To implement a lexer, parser and semantic checker that convert SQL text into a validated parse tree and reject invalid queries with clear, position-aware error messages.",
      "To design a storage engine that supports DML commands on the stored tables.",
      "To build a query-execution engine that chooses an choosing algorithm for each query and returns correct results.",
      "To implement transaction management with BEGIN, COMMIT and ROLLBACK, backed by an undo log, so that a failed or interrupted transaction leaves zero partial changes.",
      "To demonstrate, through a command-line interface, how a single SQL statement moves from parsing through optimization and execution to a transactionally safe result."
    ],
    "coursesTable": [
      {
        "sl": "1",
        "course": "Design & Analysis of Algorithms (DAA)",
        "concepts": "Time-complexity (Big-O) analysis, searching, hashing and indexing structures used to compare and choose a query's access path  Hash indexing, B-Tree range indexing, binary search, Big-O comparison of scan vs index-lookup cost",
        "role": "Dominant"
      },
      {
        "sl": "2",
        "course": "Operating System Principles",
        "concepts": "Process/thread synchronization, locking (mutex/semaphore) for concurrent sessions, deadlock avoidance, file I/O, buffering, and crash recovery",
        "role": "Dominant"
      },
      {
        "sl": "3",
        "course": "Principles of Compiler Design (POCD)",
        "concepts": "Lexical analysis, grammar (CFG), recursive-descent parsing, syntax-tree (AST) construction, and semantic analysis of SQL statements",
        "role": "Dominant"
      },
      {
        "sl": "4",
        "course": "Database Management Systems",
        "concepts": "Relational model, tables/tuples/attributes, primary/foreign keys and constraints, ACID properties, catalog management and normalization",
        "role": "Dominant"
      }
    ],
    "conceptualFlowImage": "assets/team01_conceptual_workflow.jpg",
    "conceptualFlowCaption": "Fig 1. Conceptual Workflow of Mini RDBMS Engine with Query Processing & Transaction Support",
    "scopeInTable": [
      {
        "num": "1",
        "item": "Build a lexer, parser and semantic checker that reject invalid queries with clear, beginner-friendly error messages (what is wrong, where, and a suggested fix)."
      },
      {
        "num": "2",
        "item": "Parse and execute a bounded SQL-like subset — CREATE TABLE (typed columns, PRIMARY KEY, NOT NULL), INSERT, SELECT with WHERE, UPDATE and DELETE — on tables stored by the engine."
      },
      {
        "num": "3",
        "item": "Create and use a hash or range index on a column, and choose between index lookup, index range scan and full table scan for each query."
      },
      {
        "num": "4",
        "item": "Support BEGIN / COMMIT / ROLLBACK transactions with undo logging, safe-preview confirmation for UPDATE/DELETE, and recovery after a simulated crash."
      }
    ],
    "scopeOutTable": [
      {
        "num": "1",
        "item": "Full ANSI SQL standard support (multi-table joins, subqueries, stored procedures, triggers)",
        "reason": "A complete SQL standard is too large for a Mini Project, a bounded, documented grammar keeps parsing and semantic analysis achievable."
      },
      {
        "num": "2",
        "item": "Distributed database execution, replication and cloud deployment",
        "reason": "This would introduce multi-node networking and distributed-consistency complexity beyond the project's single-node scope."
      },
      {
        "num": "3",
        "item": "Advanced concurrency (MVCC, multiple isolation levels) and a cost-based query optimizer",
        "reason": "The project uses a simpler locking and undo-log model, a full cost-based optimizer and multi-version concurrency need sophistication beyond this timeline."
      }
    ],
    "feasibilityTable": [
      {
        "aspect": "Feasibility within 3-credit scope",
        "assessment": "The project is achievable as a 3-credit Mini Project if the SQL grammar is bounded, execution stays single-node, and the transaction model uses simple locking with undo-log based recovery rather than a full production RDBMS."
      },
      {
        "aspect": "Required computing / resources",
        "assessment": "Standard laptops, a general-purpose programming language with file-handling support, and local file storage for tables, the catalog and the transaction log. No special hardware or paid database services are required."
      },
      {
        "aspect": "Prerequisite knowledge",
        "assessment": "Basic programming, Database Management Systems, Design & Analysis of Algorithms (indexing/searching), Operating System Principles (concurrency/file I/O), and Principles of Compiler Design (lexing/parsing)."
      },
      {
        "aspect": "Major constraints / limitations",
        "assessment": "Correctness of a hand-built parser and recovery mechanism, and the performance limits of a single-node, in-process engine."
      },
      {
        "aspect": "Use of existing libraries / tools",
        "assessment": "Standard language and file-I/O libraries may be used for peripheral tasks such as the command-line interface, but the core lexer, parser, query executor, indexing and transaction/recovery logic will be designed and implemented by the team rather than using an existing database engine."
      },
      {
        "aspect": "Overall feasibility",
        "assessment": "Feasible with scope modification"
      }
    ]
  },
  "stage1": {
    "frTable": [
      {
        "id": "FR-01",
        "desc": "Tokenize & parsing: The system shall split each query into tokens and build a parse tree (AST) using a fixed grammar, and reject any query that breaks the grammar.",
        "priority": "Mandatory",
        "sourceNeed": "SN-1, SN-3"
      },
      {
        "id": "FR-02",
        "desc": "Semantic checking: The system shall check that every table and column exists and every value matches its column type before any data is touched.",
        "priority": "Mandatory",
        "sourceNeed": "SN-4"
      },
      {
        "id": "FR-03",
        "desc": "Query error reporting: For every rejected query, the system shall show what went wrong, where (token / position) and a hint to fix it.",
        "priority": "Mandatory",
        "sourceNeed": "SN-4"
      },
      {
        "id": "FR-04",
        "desc": "Table Management, Data Manipulation and Indexing: The system shall support table creation, validated record insertion, retrieval using SELECT and WHERE conditions, updating and deleting records, and creating and maintaining hash and sorted indexes consistently across INSERT, UPDATE, DELETE and ROLLBACK operations.",
        "priority": "Mandatory",
        "sourceNeed": "SN-2, SN-3, SN-7"
      },
      {
        "id": "FR-05",
        "desc": "Choose access path: For each SELECT / UPDATE / DELETE, the system shall choose index lookup, index range or full scan, picking the option that reads the fewest rows.",
        "priority": "Mandatory",
        "sourceNeed": "SN-7"
      },
      {
        "id": "FR-06",
        "desc": "EXPLAIN (learning mode): When the user types EXPLAIN <query>, the system shall show the tokens, parse tree, chosen plan and the reason for the choice, without changing any data.",
        "priority": "Mandatory",
        "sourceNeed": "SN-1"
      },
      {
        "id": "FR-07",
        "desc": "Safe UPDATE / DELETE preview: Before an UPDATE or DELETE runs, the system shall show how many rows will be affected and ask for Y/N confirmation, with an extra warning when there is no WHERE clause.",
        "priority": "Mandatory",
        "sourceNeed": "SN-5"
      },
      {
        "id": "FR-08",
        "desc": "BEGIN / COMMIT / ROLLBACK: The system shall support BEGIN, COMMIT and ROLLBACK, a single statement outside BEGIN shall run as its own transaction (auto-commit).",
        "priority": "Mandatory",
        "sourceNeed": "SN-6"
      },
      {
        "id": "FR-09",
        "desc": "Undo log & rollback: The system shall record the old value of every change before applying it, and on ROLLBACK or any error shall restore all of them so no partial change remains.",
        "priority": "Mandatory",
        "sourceNeed": "SN-6"
      },
      {
        "id": "FR-10",
        "desc": "Saving & reloading data: The system shall save committed tables to files on disk and load them again when it starts.",
        "priority": "Mandatory",
        "sourceNeed": "SN-8, SN-9"
      },
      {
        "id": "FR-11",
        "desc": "Crash recovery: If the program stops in the middle of a transaction, on restart the system shall keep only committed data and discard unfinished changes.",
        "priority": "Challenge",
        "sourceNeed": "SN-8"
      },
      {
        "id": "FR-12",
        "desc": "Concurrency control: The system shall use shared / exclusive table locks so two sessions cannot corrupt the same table, and shall detect a deadlock (or 2 s timeout) and abort one transaction.",
        "priority": "Challenge",
        "sourceNeed": "SN-8"
      },
      {
        "id": "FR-13",
        "desc": "Command-line interface: The system shall accept queries ending with ';' (also multi-line), show results as a table with row count and time taken, and show errors without crashing.",
        "priority": "Mandatory",
        "sourceNeed": "SN-1, SN-9"
      }
    ],
    "nfrTable": [
      {
        "id": "NFR-01",
        "desc": "Efficient query processing",
        "cat": "Performance",
        "target": "Indexed equality lookup on 10,000 rows ≤ 1 ms; full scan ≤ 50 ms; parse and plan ≤ 10 ms."
      },
      {
        "id": "NFR-02",
        "desc": "Efficient handling of larger datasets",
        "cat": "Scalability",
        "target": "Support up to 100,000 rows per table; peak memory ≤ 3× raw data size."
      },
      {
        "id": "NFR-03",
        "desc": "Atomic and reliable transactions",
        "cat": "Reliability",
        "target": "Zero partial changes in 50/50 rollback and failure-injection tests."
      },
      {
        "id": "NFR-04",
        "desc": "Consistent and accurate data handling",
        "cat": "Correctness",
        "target": "Index and full-scan results identical in 100% of test queries; 100% of rule violations rejected."
      },
      {
        "id": "NFR-04",
        "desc": "Secure input handling",
        "cat": "Security",
        "target": "Queries exceeding 1,000 characters rejected; identifiers validated; no eval/exec of user input; 20/20 negative tests pass."
      },
      {
        "id": "NFR-05",
        "desc": "Safe concurrent access by multiple sessions",
        "cat": "Concurrency",
        "target": "0 lost updates with 4 sessions × 100 updates; deadlocks resolved within 2 seconds."
      },
      {
        "id": "NFR-06",
        "desc": "Clear and beginner-friendly error messages",
        "cat": "Usability",
        "target": "100% of error messages indicate what went wrong, where and provide a hint; at least 8/10 student testers resolve errors using only the message."
      },
      {
        "id": "NFR-07",
        "desc": "Portable and lightweight execution",
        "cat": "Portability",
        "target": "Python 3.10+ standard library only; runs on Windows and Linux; setup ≤ 5 minutes."
      }
    ],
    "userStoryTable": [
      {
        "id": "UC-01",
        "actor": "Student",
        "desc": "User wants to create a table with typed columns and rules so the data has structure.",
        "mainFlow": "Types CREATE TABLE students(id INT PRIMARY KEY, name TEXT NOT NULL, age INT) → query parsed and checked → table saved in catalog → 'Table students created'.",
        "exceptionFlow": "Table already exists or unknown type → error with hint, nothing created."
      },
      {
        "id": "UC-02",
        "actor": "Student",
        "desc": "User wants to add a record and be sure it follows the table rules.",
        "mainFlow": "Types INSERT INTO students VALUES (1,'Asha',19) → types and rules checked → row stored, index updated → '1 row inserted'.",
        "exceptionFlow": "Duplicate id / NULL name / text in INT column → row rejected, nothing stored, clear message."
      },
      {
        "id": "UC-03",
        "actor": "Student",
        "desc": "User wants to get only the rows needed, using WHERE conditions.",
        "mainFlow": "Types SELECT name FROM students WHERE age >= 18 → planner picks index or scan → matching rows shown with count and time.",
        "exceptionFlow": "Empty table or no match → '0 rows', unknown column → error 'Did you mean age?'."
      },
      {
        "id": "UC-04",
        "actor": "Student",
        "desc": "User wants to change data but see what will change first.",
        "mainFlow": "Types UPDATE students SET age=20 WHERE id=5 → preview '1 row will change. Continue? (Y/N)' → Y → row changed, '1 row updated'.",
        "exceptionFlow": "N → nothing changes, no WHERE → extra warning 'EVERY row will change'."
      },
      {
        "id": "UC-05",
        "actor": "Student",
        "desc": "User wants to delete only what is meant to be deleted.",
        "mainFlow": "Types DELETE FROM students WHERE age < 18 → preview count and confirm → rows removed, count shown.",
        "exceptionFlow": "N → nothing deleted, no WHERE → extra warning, 0 matches → '0 rows deleted'."
      },
      {
        "id": "UC-06",
        "actor": "Student",
        "desc": "User wants several changes saved together, or undone together if something goes wrong.",
        "mainFlow": "BEGIN → runs 2-3 INSERT / UPDATE statements → COMMIT → all changes saved to disk together, or ROLLBACK → table exactly as before BEGIN.",
        "exceptionFlow": "COMMIT / ROLLBACK without BEGIN → 'No active transaction', a statement fails inside the transaction → whole transaction rolled back automatically."
      },
      {
        "id": "UC-07",
        "actor": "Developer",
        "desc": "Developer wants to see how a query runs and to speed up frequent searches with an index.",
        "mainFlow": "Types EXPLAIN SELECT * FROM students WHERE id = 7 → sees tokens, parse tree, chosen plan and reason, no data changed, or types CREATE INDEX ON students(age) USING SORTED → index built from existing rows.",
        "exceptionFlow": "Invalid query → shows the exact step (lexer / parser / checker) where it failed; column does not exist → error, nothing built."
      },
      {
        "id": "UC-08",
        "actor": "Developer",
        "desc": "Developer wants to know exactly why a query was rejected.",
        "mainFlow": "Types SELEC * FROM students → sees 'Error at position 1: unknown keyword SELEC. Did you mean SELECT?' → fixes and re-runs.",
        "exceptionFlow": "Several mistakes in one query → first one reported with position, CLI keeps running (no crash)."
      },
      {
        "id": "UC-09",
        "actor": "System Admin",
        "desc": "Admin needs only committed data to remain after a crash, and two sessions on the same table must not corrupt data.",
        "mainFlow": "System restarts → finds unfinished transaction → discards it → loads last committed data → 'Recovered', Session A updates students (exclusive lock) → Session B waits → A commits, lock released → B continues.",
        "exceptionFlow": "Data file damaged → load last good copy, report affected table, deadlock (A waits for B, B waits for A) → detected, one transaction aborted and rolled back, message shown."
      }
    ],
    "useCaseImage": "assets/team01_use_case_diagram.jpg",
    "useCaseCaption": "Fig 2. System Use Case Diagram",
    "acceptanceTable": [
      {
        "req": "FR-04",
        "criteria": "CREATE TABLE students(id INT PRIMARY KEY, name TEXT NOT NULL, age INT) adds the table with 3 typed columns to the catalog, running it again gives a 'table exists' error.",
        "method": "Unit test + CLI demo"
      },
      {
        "req": "FR-04",
        "criteria": "A valid INSERT increases row count by 1. Duplicate id, NULL name and 'abc' into INT are each rejected (3 / 3) and the row count does not change.",
        "method": "Unit test (pytest)"
      },
      {
        "req": "FR-04",
        "criteria": "20 SELECT test queries return exactly the same rows as the expected answers (checked against SQLite as reference): 20 / 20.",
        "method": "Comparison test vs SQLite"
      },
      {
        "req": "FR-01",
        "criteria": "40 valid queries produce a parse tree; 20 invalid queries are rejected: 60 / 60 correct.",
        "method": "Parser test suite"
      },
      {
        "req": "FR-04",
        "criteria": "After 1,000 random INSERT / UPDATE / DELETE / ROLLBACK operations, index results = full-scan results for every key.",
        "method": "Randomised consistency test"
      },
      {
        "req": "FR-08",
        "criteria": "BEGIN; execute 3 INSERTs; COMMIT → all 3 rows are successfully committed. A single statement outside BEGIN runs as its own transaction",
        "method": "Integration test"
      },
      {
        "req": "FR-10",
        "criteria": "Committed tables are saved to disk and successfully reloaded after restart. A single statement outside BEGIN is also saved immediately.",
        "method": "Persistence and restart test"
      },
      {
        "req": "FR-09",
        "criteria": "BEGIN; INSERT, UPDATE, DELETE; ROLLBACK → table checksum equals the value before BEGIN in 50 / 50 runs.",
        "method": "Failure-injection test"
      },
      {
        "req": "NFR-01",
        "criteria": "Benchmark on 10,000 rows: indexed lookup ≤ 1 ms, full scan ≤ 50 ms.",
        "method": "benchmark.py"
      }
    ]
  },
  "systemDesign": {}
};

window.STATIC_TEAMS_DATA['A-01'] = team01Data;
