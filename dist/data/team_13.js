/**
 * Static Data File for Team B-13
 * Project: Resilient Multi-Peer File Distribution & Recovery Engine
 * Source documents: Team13_Review1_Problem_Formulation & Team13_Review2_Requirements_Analysis
 * Faculty Mentor: Ms. Pooja P Shettar
 */

window.STATIC_TEAMS_DATA = window.STATIC_TEAMS_DATA || {};

const team13Data = {
  "id": "B-13",
  "theme": "Networked Systems and Tools",
  "title": "Resilient Multi-Peer File Distribution & Recovery Engine",
  "guide": "Ms. Pooja P Shettar",
  "academicYear": "2026–27",
  "repo": "https://github.com/topics/p2p-file-distribution-engine",
  "members": [
    {
      "name": "Vineet S Kulkarni",
      "usn": "01FE24BCI093",
      "role": "Team Member",
      "skills": "P2P Protocols • Socket Programming • Chunk Distribution",
      "contribution": "Peer connection management, chunk distribution protocol, and fault-tolerant replica recovery.",
      "github": "https://github.com"
    },
    {
      "name": "Manasa B Vasare",
      "usn": "01FE24BCI113",
      "role": "Team Member",
      "skills": "P2P Protocols • Socket Programming • Chunk Distribution",
      "contribution": "Peer connection management, chunk distribution protocol, and fault-tolerant replica recovery.",
      "github": "https://github.com"
    },
    {
      "name": "Mahadev Pawar",
      "usn": "01FE24BCI116",
      "role": "Team Member",
      "skills": "P2P Protocols • Socket Programming • Chunk Distribution",
      "contribution": "Peer connection management, chunk distribution protocol, and fault-tolerant replica recovery.",
      "github": "https://github.com"
    },
    {
      "name": "Arihant A Narayankar",
      "usn": "01FE24BCI092",
      "role": "Team Member",
      "skills": "P2P Protocols • Socket Programming • Chunk Distribution",
      "contribution": "Peer connection management, chunk distribution protocol, and fault-tolerant replica recovery.",
      "github": "https://github.com"
    }
  ],
  "stage0": {
    "problem": "In a multi-peer file distribution environment, a file may be divided into smaller portions and distributed among multiple participating peers for storage and transfer. Successful retrieval of the complete file therefore depends on the availability and accessibility of the required portions across the participating peers.\n\nIn practical distributed environments, peers may become temporarily unavailable due to process termination, network interruption or other failures. Such unavailability can make required file portions inaccessible and may interrupt file retrieval or prevent successful reconstruction. Repeatedly depending on the same unavailable peer can further increase recovery time and communication overhead.\n\nThe proposed Resilient Multi-Peer File Distribution & Recovery Engine aims to study and develop a system that can continue file distribution and retrieval despite defined peer failures. The project focuses on identifying unavailable data, obtaining the required information from available participating peers, verifying recovered data and reconstructing the original file.\n\nThe project integrates foundational Computer Science concepts from Design & Analysis of Algorithms (DAA), Computer Networks, Operating Systems, Distributed Systems, Database Management Systems (DBMS) and Object-Oriented Programming (OOP) into a practical fault-tolerant computing problem.",
    "objectives": [
      "To develop a multi-peer file distribution system capable of dividing and distributing file data among participating peers.",
      "To enable the system to identify unavailable or failed peers and determine the impact on ongoing file retrieval.",
      "To provide a recovery mechanism that can retrieve missing file data from available surviving replicas on participating peers and reconstruct the original file.",
      "To verify recovered data and successfully reconstruct the requested file after supported peer failures.",
      "To study the behaviour of the system under different controlled peer availability and failure conditions."
    ],
    "coursesTable": [
      {
        "sl": "1",
        "course": "Design & Analysis of Algorithms (DAA)",
        "concepts": "Chunking, distribution strategy, replica/source selection, searching, ordering and reconstruction.",
        "role": "Supporting"
      },
      {
        "sl": "2",
        "course": "Computer Networks",
        "concepts": "Peer communication, data transfer, addressing, connection management and network failures.",
        "role": "Dominant"
      },
      {
        "sl": "3",
        "course": "Operating Systems",
        "concepts": "Processes, process lifecycle, file handling, resource management and process failure.",
        "role": "Dominant"
      },
      {
        "sl": "4",
        "course": "Distributed Systems",
        "concepts": "Peer-based resource sharing, replication, fault tolerance, availability and failure handling.",
        "role": "Dominant"
      },
      {
        "sl": "5",
        "course": "Database Management Systems (DBMS)",
        "concepts": "Metadata storage, chunk-to-peer mapping, peer status and efficient metadata lookup.",
        "role": "Supporting"
      },
      {
        "sl": "6",
        "course": "Object-Oriented Programming (OOP)",
        "concepts": "Modular system design using components such as Peer, Chunk, Transfer and Recovery.",
        "role": "Supporting"
      }
    ],
    "conceptualFlowImage": "assets/team13_conceptual_workflow.png",
    "conceptualFlowCaption": "Fig 1. Conceptual Workflow of Resilient Multi-Peer File Distribution & Recovery Engine",
    "scopeInTable": [
      {
        "num": "1",
        "item": "File chunking"
      },
      {
        "num": "2",
        "item": "Multi-peer distribution"
      },
      {
        "num": "3",
        "item": "Peer discovery / communication"
      },
      {
        "num": "4",
        "item": "Peer failure simulation"
      },
      {
        "num": "5",
        "item": "Missing-chunk detection"
      },
      {
        "num": "6",
        "item": "Chunk recovery + retry"
      },
      {
        "num": "7",
        "item": "Integrity + reconstruction"
      },
      {
        "num": "8",
        "item": "Recovery / performance evaluation"
      }
    ],
    "scopeOutTable": [
      {
        "num": "1",
        "item": "Advanced Erasure Coding",
        "reason": "Reed-Solomon and other coding-based recovery techniques are proposed for future enhancement but are not implemented in the current prototype."
      },
      {
        "num": "2",
        "item": "Dynamic Peer Scaling",
        "reason": "The prototype uses a predefined number of peers for controlled distribution, failure and recovery experiments."
      },
      {
        "num": "3",
        "item": "Resumable Partial-Chunk Transfer",
        "reason": "Interrupted transfers are handled by retrying the complete chunk rather than resuming from the interrupted byte position."
      },
      {
        "num": "4",
        "item": "Multiple Simultaneous Peer Failures Beyond Defined Scenarios",
        "reason": "Testing is limited to controlled failure scenarios so recovery behaviour can be measured consistently."
      },
      {
        "num": "5",
        "item": "Advanced Security and Access Control",
        "reason": "Authentication, authorization, encryption and enterprise-level security mechanisms are outside the core file distribution and recovery problem."
      },
      {
        "num": "6",
        "item": "Graphical / Mobile User Interface",
        "reason": "The project focuses on the underlying distribution, failure detection, recovery, verification and reconstruction engines rather than interface development."
      }
    ],
    "feasibilityTable": [
      {
        "aspect": "Feasibility within scope",
        "assessment": "Feasible with controlled scope and a limited number of participating peers."
      },
      {
        "aspect": "Required computing / resources",
        "assessment": "Student laptops/PCs, local network connectivity, file storage, development environment, version-control facility and multiple peer processes or systems for controlled experimentation."
      },
      {
        "aspect": "Prerequisite knowledge",
        "assessment": "Design & Analysis of Algorithms (DAA), Computer Networks, Operating Systems, Distributed Systems, DBMS and Object-Oriented Programming (OOP) concepts."
      },
      {
        "aspect": "Major constraints / limitations",
        "assessment": "Limited project duration, limited number of available machines/peers, controlled laboratory environment, bounded failure scenarios and the need to keep the implementation manageable within a mini-project."
      },
      {
        "aspect": "Use of existing libraries / tools",
        "assessment": "Existing libraries and tools may be used for peripheral functions such as basic file handling, communication support and data verification. The core peer distribution, failure handling, recovery and reconstruction logic will be designed and studied by the team."
      },
      {
        "aspect": "Overall feasibility",
        "assessment": "Feasible with controlled scope and a limited number of participating peers."
      }
    ]
  },
  "stage1": {
    "frTable": [
      {
        "id": "FR-01",
        "desc": "The system shall allow a user to select a file for storage or transfer.",
        "priority": "Mandatory",
        "sourceNeed": "File upload / distribution"
      },
      {
        "id": "FR-02",
        "desc": "The system shall divide the selected file into smaller fixed-size chunks for distributed storage.",
        "priority": "Mandatory",
        "sourceNeed": "Manageable distributed transfer"
      },
      {
        "id": "FR-03",
        "desc": "The system shall assign a unique identifier and sequence number to each generated chunk.",
        "priority": "Mandatory",
        "sourceNeed": "Chunk identification and correct reconstruction"
      },
      {
        "id": "FR-04",
        "desc": "The system shall generate and store a hash for each chunk to verify data integrity.",
        "priority": "Mandatory",
        "sourceNeed": "Detect corruption"
      },
      {
        "id": "FR-05",
        "desc": "The system shall maintain membership information for participating peers.",
        "priority": "Mandatory",
        "sourceNeed": "Know available storage / transfer nodes"
      },
      {
        "id": "FR-06",
        "desc": "The system shall enable peers to communicate using TCP-based request and response messages.",
        "priority": "Mandatory",
        "sourceNeed": "Reliable peer communication"
      },
      {
        "id": "FR-07",
        "desc": "The system shall distribute file chunks across available peers.",
        "priority": "Mandatory",
        "sourceNeed": "Multi-peer file distribution"
      },
      {
        "id": "FR-08",
        "desc": "The system shall create and maintain replicas of chunks on multiple peers for fault tolerance.",
        "priority": "Mandatory",
        "sourceNeed": "Survive supported peer failures"
      },
      {
        "id": "FR-09",
        "desc": "The system shall detect peer failures using heartbeat responses and timeout conditions.",
        "priority": "Mandatory",
        "sourceNeed": "Detect unavailable peers"
      },
      {
        "id": "FR-10",
        "desc": "The system shall select an eligible surviving replica as the source for chunk recovery.",
        "priority": "Mandatory",
        "sourceNeed": "Recover data after a peer failure"
      },
      {
        "id": "FR-11",
        "desc": "The system shall identify chunks that are unavailable, corrupted, or affected by a peer failure.",
        "priority": "Mandatory",
        "sourceNeed": "Locate affected data"
      },
      {
        "id": "FR-12",
        "desc": "The system shall recover an affected chunk from a valid surviving replica.",
        "priority": "Mandatory",
        "sourceNeed": "Replica-based recovery"
      },
      {
        "id": "FR-13",
        "desc": "The system shall detect interrupted transfers, discard incomplete data, and retry the affected chunk transfer.",
        "priority": "Mandatory",
        "sourceNeed": "Handle transfer interruption"
      },
      {
        "id": "FR-14",
        "desc": "The system shall verify each recovered chunk by comparing its computed hash with the stored hash.",
        "priority": "Mandatory",
        "sourceNeed": "Validate recovered data"
      },
      {
        "id": "FR-15",
        "desc": "The system shall reject invalid or corrupted recovery results and retry using another eligible source when available.",
        "priority": "Mandatory",
        "sourceNeed": "Prevent acceptance of corrupt chunks"
      },
      {
        "id": "FR-16",
        "desc": "The system shall reconstruct the original file by ordering verified chunks according to sequence numbers and concatenating them.",
        "priority": "Mandatory",
        "sourceNeed": "Correct file retrieval"
      },
      {
        "id": "FR-17",
        "desc": "The system shall report an unrecoverable condition when no valid surviving source is available.",
        "priority": "Mandatory",
        "sourceNeed": "Explicitly handle unrecoverable data"
      },
      {
        "id": "FR-18",
        "desc": "The system shall record system events, failure detection, recovery activity, integrity results, retries, and performance metrics.",
        "priority": "Mandatory",
        "sourceNeed": "Evaluate reliability and performance"
      }
    ],
    "nfrTable": [
      {
        "id": "NFR-01",
        "desc": "The system shall preserve successfully stored file data within the configured replication and supported peer-failure model. If no valid copy survives, it shall report the file/chunk as unrecoverable rather than silently claiming success.",
        "cat": "Reliability",
        "target": "100% of tested unrecoverable cases are explicitly reported; no failed recovery is reported as successful."
      },
      {
        "id": "NFR-02",
        "desc": "The system shall verify every received/recovered chunk against its stored integrity hash before accepting it.",
        "cat": "Integrity",
        "target": "100% of accepted chunks pass hash verification; a deliberately modified chunk is rejected in the hash-mismatch test."
      },
      {
        "id": "NFR-03",
        "desc": "The system shall recover affected chunks after supported peer failures when at least one valid replica remains reachable.",
        "cat": "Fault tolerance",
        "target": "Initial target: successful recovery in ≥95% of eligible test cases. Exclude cases where no valid replica survives; validate with repeated controlled trials."
      },
      {
        "id": "NFR-04",
        "desc": "The system shall mark an unresponsive peer unavailable within the specified detection target under the agreed test configuration.",
        "cat": "Performance",
        "target": "Initial target: ≤2 seconds from simulated peer failure to unavailable-state notification. Record heartbeat interval, timeout, peer count and network conditions."
      },
      {
        "id": "NFR-05",
        "desc": "The system shall measure recovery latency and report it by file size and peer count; a fixed pass threshold shall be set after baseline experiments.",
        "cat": "Performance",
        "target": "Record elapsed time from failure/missing-chunk detection to verified chunk restoration for every trial. Report median and 95th percentile; approve a pass threshold only after baseline experiments."
      },
      {
        "id": "NFR-06",
        "desc": "The system shall maintain modular interfaces so each of the six engines can be tested independently and integrated through defined inputs/outputs.",
        "cat": "Maintainability / modularity",
        "target": "E1–E6 each pass component tests; integration tests verify the documented engine interfaces."
      },
      {
        "id": "NFR-07",
        "desc": "The system shall produce repeatable outcomes for the same input files, configuration and peer-state sequence.",
        "cat": "Repeatability",
        "target": "Across repeated runs with the same configuration, chunk boundaries, sequence ordering and correctness outcome are identical. Placement is deterministic when peer order is unchanged."
      },
      {
        "id": "NFR-08",
        "desc": "The system shall reconstruct a file without missing, duplicated or reordered verified chunks.",
        "cat": "Correctness",
        "target": "100% byte-for-byte equality between original and reconstructed files for every successful reconstruction test, verified by file hash and/or byte comparison."
      }
    ],
    "userStoryTable": [
      {
        "id": "UC-01",
        "actor": "User",
        "desc": "Upload file for distribution",
        "mainFlow": "Select file; system chunks it, assigns IDs/sequences, hashes chunks and starts distribution.",
        "exceptionFlow": "Invalid/unreadable file: reject with an error; do not mark upload successful."
      },
      {
        "id": "UC-02",
        "actor": "Peer",
        "desc": "Join/register in network",
        "mainFlow": "Peer supplies IP/port and joins; membership information is updated.",
        "exceptionFlow": "Duplicate/unreachable peer: reject or mark unavailable; retain accurate membership state."
      },
      {
        "id": "UC-03",
        "actor": "Peer",
        "desc": "Announce availability",
        "mainFlow": "Peer announces it can participate; status is reflected in peer metadata.",
        "exceptionFlow": "No response or disconnect: E4 eventually marks peer unavailable after timeout."
      },
      {
        "id": "UC-04",
        "actor": "System / Peer",
        "desc": "Distribute and store chunks",
        "mainFlow": "E3 selects peers using round-robin placement and stores configured replicas.",
        "exceptionFlow": "Target peer unavailable: do not record successful placement; retry or report placement failure."
      },
      {
        "id": "UC-05",
        "actor": "User",
        "desc": "Request file for retrieval",
        "mainFlow": "User requests file; system finds chunk metadata and requests chunks from peers.",
        "exceptionFlow": "Chunk missing or peer unavailable: invoke recovery from another eligible replica."
      },
      {
        "id": "UC-06",
        "actor": "System",
        "desc": "Verify chunk integrity",
        "mainFlow": "Compute hash of received chunk and compare with stored hash.",
        "exceptionFlow": "Hash mismatch: reject chunk and try another eligible source."
      },
      {
        "id": "UC-07",
        "actor": "System / Peer",
        "desc": "Handle missing chunk",
        "mainFlow": "Identify affected chunk, look up replicas, request from a surviving peer and verify.",
        "exceptionFlow": "No valid surviving replica: report unrecoverable condition."
      },
      {
        "id": "UC-08",
        "actor": "System",
        "desc": "Reconstruct file",
        "mainFlow": "Order verified chunks by sequence number and concatenate them.",
        "exceptionFlow": "Missing/duplicate sequence or incomplete set: do not report successful reconstruction."
      },
      {
        "id": "UC-09",
        "actor": "System / Maintainer",
        "desc": "Review monitoring and evaluation",
        "mainFlow": "Record detection/recovery events, integrity results, retries, bytes and timings.",
        "exceptionFlow": "Logging failure: report the limitation; do not silently claim metrics were captured."
      }
    ],
    "useCaseImage": "assets/team13_use_case_diagram.png",
    "useCaseCaption": "Fig 2. System Use Case Diagram",
    "acceptanceTable": [
      {
        "req": "FR-01",
        "criteria": "A supported test file can be selected; unreadable or missing input is rejected with a clear error.",
        "method": "Manual/UI test; valid and invalid file cases."
      },
      {
        "req": "FR-02",
        "criteria": "Chunks cover the input bytes exactly once; all chunks except possibly the last have the configured fixed size.",
        "method": "Chunk-size and byte-coverage test."
      },
      {
        "req": "FR-03",
        "criteria": "Every chunk has a unique ID within the file and a sequence number that reflects original order.",
        "method": "Metadata uniqueness/order assertion."
      },
      {
        "req": "FR-04",
        "criteria": "A hash is stored for every generated chunk and is reproducible for unchanged chunk bytes.",
        "method": "Hash recomputation test."
      },
      {
        "req": "FR-05",
        "criteria": "Joining and leaving peers updates membership state accurately.",
        "method": "Peer registration/membership test."
      },
      {
        "req": "FR-06",
        "criteria": "Peers can exchange a framed request and response over TCP; connection errors/timeouts are surfaced.",
        "method": "TCP communication test."
      },
      {
        "req": "FR-07",
        "criteria": "Every chunk is assigned to an eligible peer and the placement map records the assignment.",
        "method": "Normal distribution test."
      },
      {
        "req": "FR-08",
        "criteria": "Each chunk has the configured number of distinct replicas when enough eligible peers are available.",
        "method": "Replica-count and placement test."
      },
      {
        "req": "FR-09",
        "criteria": "Under the agreed test configuration, a peer that stops responding is marked unavailable within the initial ≤2-second target.",
        "method": "Heartbeat/timeout test; record elapsed time, heartbeat interval, timeout and network conditions."
      },
      {
        "req": "FR-10",
        "criteria": "Recovery selects a source whose peer is available and whose metadata identifies a replica of the required chunk.",
        "method": "Source-selection test."
      },
      {
        "req": "FR-11",
        "criteria": "The system identifies chunks on failed peers and detects missing chunks or hash mismatches.",
        "method": "Peer-failure and hash-mismatch tests."
      },
      {
        "req": "FR-12",
        "criteria": "For a chunk with a valid surviving replica, the recovered bytes match the stored chunk hash.",
        "method": "Single-peer failure/recovery test."
      },
      {
        "req": "FR-13",
        "criteria": "After a transfer is interrupted, partial temporary data is discarded and a complete chunk transfer is retried.",
        "method": "Interrupt transfer mid-chunk; inspect retry and output."
      },
      {
        "req": "FR-14",
        "criteria": "No recovered chunk is accepted unless its computed hash matches the stored hash.",
        "method": "Hash-mismatch test; accepted corrupt chunks = 0."
      },
      {
        "req": "FR-15",
        "criteria": "A bad source is rejected; another eligible source is attempted; if none exists, unrecoverable status is reported.",
        "method": "Corrupt first replica / exhaust sources test."
      },
      {
        "req": "FR-16",
        "criteria": "Successful reconstruction is byte-for-byte identical to the original file.",
        "method": "Compare original and reconstructed files by bytes/hash."
      },
      {
        "req": "FR-17",
        "criteria": "When no valid source survives, the system reports unrecoverable status and does not claim success.",
        "method": "No-surviving-source test."
      },
      {
        "req": "FR-18",
        "criteria": "Logs include events, failure detection, recovery, integrity, retries, bytes transferred and relevant timings.",
        "method": "Inspect logs against generated test events."
      }
    ]
  },
  "systemDesign": {}
};

window.STATIC_TEAMS_DATA['B-13'] = team13Data;
window.STATIC_TEAMS_DATA['13'] = team13Data;
