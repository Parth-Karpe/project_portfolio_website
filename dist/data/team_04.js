/**
 * Static Data File for Team B-04
 * Project: Multi-Process Search Engine with Persistent Index (PaperLens)
 * Source documents: Gate0-M.docx & GATE1.docx
 * Faculty Guide: Ms. Umadevi F M
 */

window.STATIC_TEAMS_DATA = window.STATIC_TEAMS_DATA || {};

const team04Data = {
  "id": "B-04",
  "theme": "Data Storage and Retrieval Systems",
  "title": "Multi-Process Search Engine with Persistent Index",
  "guide": "Ms. Umadevi F M",
  "academicYear": "2026–27",
  "repo": "https://github.com/topics/multi-process-search-engine",
  "members": [
    {
      "name": "Aditya Gavimath",
      "usn": "01FE24BCI120",
      "role": "Team Member",
      "skills": "Operating Systems · IPC · Multiprocessing",
      "contribution": "Multi-process coordination, reader worker supervision, and inter-process message pipeline.",
      "github": "https://github.com"
    },
    {
      "name": "Arun Hadimani",
      "usn": "01FE24BCI106",
      "role": "Team Member",
      "skills": "DBMS · Durability · Write-Ahead Logging",
      "contribution": "Persistent on-disk index layout, atomic commit diary, and crash recovery routines.",
      "github": "https://github.com"
    },
    {
      "name": "Kartik Hegde",
      "usn": "01FE24BCI107",
      "role": "Team Member",
      "skills": "Data Structures · Information Retrieval · BM25",
      "contribution": "Inverted index tokenization, BM25 ranking algorithm, and top-k heap retrieval.",
      "github": "https://github.com"
    },
    {
      "name": "Prajwal V B",
      "usn": "01FE25BCI701",
      "role": "Team Member",
      "skills": "Algorithms · Graph Theory · PageRank",
      "contribution": "Citation graph modeling, personalized PageRank reranking, and evaluation benchmarks.",
      "github": "https://github.com"
    }
  ],
  "stage0": {
    "problem": "In today's digital world, large volumes of information are generated and stored in documents, files, and databases. Retrieving relevant information efficiently from this growing data is a major challenge. Traditional search systems often perform indexing and searching sequentially within a single process. As the volume of data increases, this approach can lead to higher execution time, inefficient resource utilization, and slower query responses.\n\nA Multi-Process Search Engine with Persistent Indexing aims to overcome these limitations by using multiple independent processes to perform indexing and searching concurrently.\n\nOur project, PaperLens, applies this idea to computer-science research papers: parallel reader processes prepare papers and citations, a persistent index stays consistent even after a crash, and search combines keyword, semantic and citation signals.",
    "objectives": [
      "1. Build a multi-process pipeline that collects paper records and citations and prepares them in parallel.",
      "2. Design a persistent on-disk index that survives crashes and restarts without being left half-written.",
      "3. Use process synchronization and logging so several reader processes and one writer update the index safely.",
      "4. Create a search component that combines keyword, semantic and citation signals to return top-k results.",
      "5. Set up a process manager that recovers worker crashes automatically, and evaluate search quality."
    ],
    "coursesTable": [
      {
        "sl": "1",
        "course": "Operating Systems",
        "concepts": "Multi-process design, inter-process communication (shared memory, queues), synchronization, process supervision and restart, file durability (fsync)",
        "role": "Dominant"
      },
      {
        "sl": "2",
        "course": "Database Management Systems",
        "concepts": "Write-ahead logging, atomic commit, crash recovery, on-disk index organisation, consistent reads during writes, compaction",
        "role": "Dominant"
      },
      {
        "sl": "3",
        "course": "Data Structures and Algorithms",
        "concepts": "Inverted index, tokenization, BM25 ranking, heaps for top-k retrieval, hashing (Bloom filter, MinHash), graph ranking (PageRank)",
        "role": "Dominant"
      },
      {
        "sl": "4",
        "course": "Computer Networks",
        "concepts": "HTTP communication with arXiv and OpenAlex, request rate limiting and retries, politeness towards public services",
        "role": "Supporting"
      },
      {
        "sl": "5",
        "course": "Discrete Mathematics",
        "concepts": "Graph theory (citation graph), set similarity (near-duplicate detection), probability behind hashing and ranking",
        "role": "Supporting"
      },
      {
        "sl": "6",
        "course": "Software Engineering",
        "concepts": "Modular multi-engine design, sprint-based delivery, requirement traceability, integration and crash testing",
        "role": "Supporting"
      }
    ],
    "conceptualFlowImage": "assets/team04_conceptual_workflow.png",
    "conceptualFlowCaption": "Figure: Conceptual Workflow and System Architecture — PaperLens Multi-Process Search Engine",
    "scopeInTable": [
      {
        "num": "1",
        "item": "Harvesting CS papers from arXiv and citations from OpenAlex for a bounded subject"
      },
      {
        "num": "2",
        "item": "Persistent on-disk index with logging and crash recovery"
      },
      {
        "num": "3",
        "item": "Parallel readers with synchronized single-writer updates"
      },
      {
        "num": "4",
        "item": "Keyword, semantic and citation ranking with top-k query and evaluation"
      }
    ],
    "scopeOutTable": [
      {
        "num": "1",
        "item": "Full text of millions of papers",
        "reason": "Too heavy for one semester; titles and abstracts are used."
      },
      {
        "num": "2",
        "item": "Production-grade UI/UX",
        "reason": "The project focuses on core system design and algorithms, so a command-line interface is enough."
      },
      {
        "num": "3",
        "item": "Distributed multi-machine processing",
        "reason": "The theme targets multi-process design on a single system rather than multi-machine networking."
      }
    ],
    "feasibilityTable": [
      {
        "aspect": "Feasibility within 3-credit scope",
        "assessment": "Feasible with controlled scope: a bounded set of CS papers (one subject area and date range) and a few reader processes. Multi-process ingestion, crash-safe persistence, indexing and hybrid ranking can be demonstrated without large-scale deployment."
      },
      {
        "aspect": "Required computing / resources",
        "assessment": "Student laptop/PC with 8+ GB RAM, enough disk space and internet access; Python 3.10+, a free local embedding model, and open data from arXiv and OpenAlex."
      },
      {
        "aspect": "Prerequisite knowledge",
        "assessment": "Basic Operating Systems, DBMS, Data Structures and Algorithms, Computer Networks, Discrete Mathematics and Python; processes, IPC, logging and recovery, hashing, graphs and basic information retrieval."
      },
      {
        "aspect": "Major constraints / limitations",
        "assessment": "Limited computing power and bandwidth cap the number of papers and processes; arXiv and OpenAlex rate limits apply; abstracts alone may limit ranking quality; crash behaviour needs deliberate fault-injection tests."
      },
      {
        "aspect": "Use of existing libraries / tools",
        "assessment": "Libraries may be used for HTTP, parsing, embeddings and arrays. Multi-process coordination, logging and recovery, index storage, BM25, rank fusion and citation ranking will be implemented by the students."
      },
      {
        "aspect": "Overall feasibility",
        "assessment": "Feasible"
      }
    ]
  },
  "stage1": {
    "frTable": [
      {
        "id": "FR1",
        "desc": "The system shall collect paper records and citation links from arXiv and OpenAlex for chosen categories, within the sources' limits (at most one arXiv request per 3 seconds) and resumable after a stop. [E1]",
        "priority": "Mandatory",
        "sourceNeed": "Objectives (§2): 1 In scope (§5.1): 1 Constraints (§6): arXiv and OpenAlex rate limits; limited bandwidth caps the number of papers Libraries (§6): HTTP and parsing libraries allowed Out of scope (§5.2): 1 (titles and abstracts only)"
      },
      {
        "id": "FR2",
        "desc": "The system shall process papers in parallel reader processes and store them through a single writer; crashed or hung workers are restarted so that every paper is stored exactly once. [E1]",
        "priority": "Mandatory",
        "sourceNeed": "Objectives (§2): 1, 3, 5 In scope (§5.1): 1, 3 Constraints (§6): limited bandwidth and computing power cap papers and processes; crash behaviour needs fault-injection tests Libraries (§6): multi-process coordination written by the team Out of scope (§5.2): 3 (single machine only)"
      },
      {
        "id": "FR3",
        "desc": "The system shall store each acknowledged paper durably (diary, immutable segments, atomic MANIFEST), recover automatically after a crash without loss or duplicates, and merge small segments in the background without affecting queries. [E2]",
        "priority": "Mandatory",
        "sourceNeed": "Objectives (§2): 2, 3 In scope (§5.1): 2 Constraints (§6): crash behaviour needs fault-injection tests; limited computing power caps index size Libraries (§6): logging, recovery and index storage written by the team Out of scope (§5.2): 3 (single machine only)"
      },
      {
        "id": "FR4",
        "desc": "The system shall rank papers for a query by keyword search (BM25 over an inverted index) and by semantic search (compressed meaning vectors). [E3, vector storage by E2]",
        "priority": "Mandatory",
        "sourceNeed": "Objectives (§2): 4 In scope (§5.1): 4 Constraints (§6): limited computing power caps papers; abstracts alone may limit ranking quality Libraries (§6): embedding library allowed; BM25 and compressed vector search written by the team Out of scope (§5.2): 1 (titles and abstracts only)"
      },
      {
        "id": "FR5",
        "desc": "The system shall merge the keyword and semantic results with reciprocal rank fusion and rerank the top results with citation scores (PageRank), with optional category and year filters. [E3]",
        "priority": "Mandatory",
        "sourceNeed": "Objectives (§2): 4 In scope (§5.1): 4 Constraints (§6): OpenAlex rate limits; abstracts alone may limit ranking quality Libraries (§6): rank fusion and citation ranking written by the team"
      },
      {
        "id": "FR6",
        "desc": "The system shall show each result with title, authors, year, snippet and a plain-language reason, with near-duplicate papers removed (MinHash), through a command-line interface. [E3, all engines]",
        "priority": "Mandatory",
        "sourceNeed": "Objectives (§2): 4 In scope (§5.1): 4 Out of scope (§5.2): 2 (command line only, no production UI)"
      },
      {
        "id": "FR7",
        "desc": "The system shall provide a one-command evaluation reporting nDCG@10, Recall@100, latency and index size for each search setup. [E3]",
        "priority": "Mandatory",
        "sourceNeed": "Objectives (§2): 5 In scope (§5.1): 4 Constraints (§6): limited computing power caps the size of the evaluation"
      },
      {
        "id": "FR8",
        "desc": "The system may rerank the top ~100 candidates with word-level vectors and offer “Key papers” and “More like this” views. [E3]",
        "priority": "Challenge",
        "sourceNeed": "Objectives (§2): 4 In scope (§5.1): 4 Constraints (§6): limited computing power (only the top ~100 candidates are reranked) Libraries (§6): embedding library allowed"
      }
    ],
    "nfrTable": [
      {
        "id": "NFR1",
        "desc": "Every acknowledged paper is preserved without loss, duplication, or partial storage, even if any process is terminated at any stage of execution.",
        "cat": "Durability and consistency — E2 DBMS (with E1)",
        "target": "0 lost and 0 duplicated papers after a kill at each of 6 write steps, 12 random SIGKILLs and a writer kill mid-ingest; fsck reports 0 errors"
      },
      {
        "id": "NFR2",
        "desc": "Ingestion finishes correctly while worker processes are being killed.",
        "cat": "Fault tolerance — E1 OS",
        "target": "With a reader killed every 0.25 s and the writer killed twice, every paper ends up stored once; a dead worker is replaced within 5 s"
      },
      {
        "id": "NFR3",
        "desc": "Ingestion throughput grows with the number of reader processes.",
        "cat": "Scalability — E1 OS",
        "target": "At least 70% parallel efficiency at 4 readers on a machine with 4 or more cores; speed-up curve for 1, 2, 4 and 8 readers reported"
      },
      {
        "id": "NFR4",
        "desc": "A hybrid query answers fast on a laptop.",
        "cat": "Performance — E3 Retrieval (storage by E2)",
        "target": "95th-percentile latency <= 500 ms at 50,000 papers, measured over 300 queries (without the optional word-level rerank)"
      },
      {
        "id": "NFR5",
        "desc": "Compressed vectors save memory without hurting search.",
        "cat": "Resource efficiency — E3 Retrieval (with E2)",
        "target": "Stored codes <= 1/8 of float32 size; recall@10 of compressed-plus-rescored search >= 95% of exact search"
      }
    ],
    "userStoryTable": [
      {
        "id": "UC1",
        "actor": "Index Operator",
        "desc": "Operator harvests new papers for chosen arXiv categories.",
        "mainFlow": "Operator starts the harvester with categories and a start date -> system requests pages politely (3 s apart, one connection) -> records are saved to a file -> progress is saved so the run can resume",
        "exceptionFlow": "Server asks to wait (503 + Retry-After) -> wait and retry; resumption token expires -> restart from newest saved datestamp"
      },
      {
        "id": "UC2",
        "actor": "Index Operator",
        "desc": "Operator ingests harvested papers into the index.",
        "mainFlow": "Operator starts ingest with N readers -> supervisor sends papers to readers -> readers analyse and build vectors -> the single writer logs, commits and acknowledges -> buffer flushed to a segment and MANIFEST updated",
        "exceptionFlow": "Same paper arrives twice -> second copy is ignored; index directory already in use -> start refused"
      },
      {
        "id": "UC3",
        "actor": "System (OS)",
        "desc": "A reader process crashes or hangs.",
        "mainFlow": "Supervisor notices (process dead or no heartbeat) -> respawns the reader -> puts its unfinished papers back in line",
        "exceptionFlow": "One paper keeps crashing workers -> parked after N attempts, all other papers continue"
      },
      {
        "id": "UC4",
        "actor": "System",
        "desc": "The writer process crashes during ingestion.",
        "mainFlow": "Supervisor respawns the writer -> it recovers from its diary -> papers not yet acknowledged are sent again -> duplicates are ignored",
        "exceptionFlow": "Too many restarts -> run stops with a clear error; the diary stays safe"
      },
      {
        "id": "UC5",
        "actor": "System (DBMS)",
        "desc": "Index is reopened after a crash or power cut.",
        "mainFlow": "Read MANIFEST -> delete segment folders it does not list -> replay diary entries after the last safe number -> start serving searches",
        "exceptionFlow": "Diary tail is torn -> cut at last good record; MANIFEST damaged -> checksum error is reported instead of trusting it"
      },
      {
        "id": "UC6",
        "actor": "Researcher",
        "desc": "Researcher searches in natural language, with optional category and year filters.",
        "mainFlow": "Query analysed -> keyword and meaning searches run -> lists merged with RRF -> citation support reranks -> results shown with reasons",
        "exceptionFlow": "No matches -> clear “no results” message; meaning model unavailable -> keyword-only results"
      },
      {
        "id": "UC7",
        "actor": "Researcher",
        "desc": "Researcher asks for key papers or papers like a chosen one.",
        "mainFlow": "System takes the paper or topic -> finds vector neighbours and runs personalized PageRank -> shows the list with reasons",
        "exceptionFlow": "Paper has no citation data -> only text similarity is used"
      },
      {
        "id": "UC8",
        "actor": "Index Operator",
        "desc": "The citation graph is updated.",
        "mainFlow": "Fetch references from OpenAlex within the credit budget -> build graph -> compute PageRank and clusters -> publish the new graph version through the MANIFEST",
        "exceptionFlow": "Credits used up -> stop, keep the old version, resume later"
      },
      {
        "id": "UC9",
        "actor": "System (DBMS)",
        "desc": "Small segments are merged in the background.",
        "mainFlow": "Choose small segments -> merge, drop replaced papers, rebuild vector structure -> publish by MANIFEST swap -> delete old segments when no query uses them",
        "exceptionFlow": "Crash during merge -> unlisted new segment deleted at restart, old segments untouched"
      },
      {
        "id": "UC10",
        "actor": "Index Operator",
        "desc": "Operator checks index health.",
        "mainFlow": "Run fsck and stats -> every file checksum verified -> report of counts, segments and diary state",
        "exceptionFlow": "Checksum mismatch -> the damaged file is named in the report and the index is not trusted until fixed"
      },
      {
        "id": "UC11",
        "actor": "Index Operator",
        "desc": "Operator runs the quality evaluation.",
        "mainFlow": "Load BEIR dataset and own queries -> index them -> run keyword, meaning, hybrid and reranked setups -> print table of nDCG, Recall, latency",
        "exceptionFlow": "Dataset folder missing -> clear message with download steps"
      }
    ],
    "useCaseImage": "assets/team04_use_case_diagram.png",
    "useCaseCaption": "Figure: Complete Use Case Diagram — PaperLens Multi-Process Search Engine",
    "acceptanceTable": [
      {
        "req": "FR1",
        "criteria": "A 1,000-record run stores 1,000 valid records and resumes after a stop with no duplicates; arXiv requests are at least 3 s apart and a 503 with Retry-After is waited out.",
        "method": "tests/test_harvester.py; tests/test_coord.py; request-log check on a short live run"
      },
      {
        "req": "FR2",
        "criteria": "With readers killed at random and the writer killed twice, no paper is lost or duplicated; a paper that always crashes workers is parked; a second writer is refused.",
        "method": "tests/test_pipeline.py; tests/test_index.py"
      },
      {
        "req": "FR3",
        "criteria": "After a kill at each of 6 write steps and 12 random SIGKILLs every acknowledged paper is present; reopening removes incomplete segments and replays the diary; a merge does not change query results and a crash during a merge recovers.",
        "method": "tests/test_crash.py; tests/test_index.py; Phase 5 compaction tests (planned)"
      },
      {
        "req": "FR4",
        "criteria": "BM25 scores equal a brute-force implementation to 1e-9; compressed vector search recovers at least 95% of the exact top-10 with codes at most 1/8 of float32 size.",
        "method": "tests/test_tokenizer.py; tests/test_index.py; Phase 3 recall-versus-bits experiment (planned)"
      },
      {
        "req": "FR5",
        "criteria": "The hybrid list equals the reciprocal-rank fusion of the two lists; filters return only matching papers; PageRank matches a reference library within 1e-6; an ablation reports the citation rerank effect on nDCG@10.",
        "method": "Phase 3 to 5 tests and ablation (planned)"
      },
      {
        "req": "FR6",
        "criteria": "For 20 sampled results the matched words, meaning score and citation support are correct; MinHash estimates are within 0.05 of exact overlap; ingest, search, stats and fsck work from a clean checkout following the README.",
        "method": "Manual check plus CLI tests; Phase 4 tests (planned)"
      },
      {
        "req": "FR7",
        "criteria": "One command reproduces the table of nDCG@10, Recall@100, latency and size for every setup.",
        "method": "tools/eval_beir.py; metric unit tests in tests/test_index.py"
      },
      {
        "req": "FR8",
        "criteria": "The reranker can be switched on and off with an ablation; reranking 100 candidates takes at most 300 ms; “Key papers” lists the highest-PageRank papers of the topic.",
        "method": "Phase 6 ablation (planned)"
      }
    ]
  },
  "systemDesign": {}
};

window.STATIC_TEAMS_DATA['B-04'] = team04Data;
