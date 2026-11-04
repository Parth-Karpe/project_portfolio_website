/**
 * Static Data File for Team A-07
 * Project: Network Traffic Monitoring & Protocol Analysis Tool (Mini-Shark)
 * Source documents: Mini_Shark_Gate0_Synopsis_team_07 & Mini_Shark_Requirements(1)
 * Faculty Mentor: Ms. Pooja P Shettar
 */

window.STATIC_TEAMS_DATA = window.STATIC_TEAMS_DATA || {};

const teamA07Data = {
  "id": "A-07",
  "theme": "Networked Systems and Tools",
  "title": "Network Traffic Monitoring & Protocol Analysis Tool",
  "guide": "Ms. Pooja P Shettar",
  "academicYear": "2026–27",
  "repo": "https://github.com/topics/network-traffic-monitoring",
  "members": [
    {
      "name": "M Janaki",
      "usn": "01FE24BCI067",
      "role": "Team Member",
      "skills": "Network Packet Capture • BLAKE2b Fingerprinting • Protocol Dissection",
      "contribution": "Probe packet capture, header dissection, telemetry streaming, and correlation delay analysis.",
      "github": "https://github.com"
    },
    {
      "name": "Hrishikesh Patil",
      "usn": "01FE24BCI043",
      "role": "Team Member",
      "skills": "Network Packet Capture • BLAKE2b Fingerprinting • Protocol Dissection",
      "contribution": "Probe packet capture, header dissection, telemetry streaming, and correlation delay analysis.",
      "github": "https://github.com"
    },
    {
      "name": "Chhavi Mishra",
      "usn": "01FE24BCI066",
      "role": "Team Member",
      "skills": "Network Packet Capture • BLAKE2b Fingerprinting • Protocol Dissection",
      "contribution": "Probe packet capture, header dissection, telemetry streaming, and correlation delay analysis.",
      "github": "https://github.com"
    },
    {
      "name": "Vaibhav Kumar",
      "usn": "01FE24BCI084",
      "role": "Team Member",
      "skills": "Network Packet Capture • BLAKE2b Fingerprinting • Protocol Dissection",
      "contribution": "Probe packet capture, header dissection, telemetry streaming, and correlation delay analysis.",
      "github": "https://github.com"
    }
  ],
  "stage0": {
    "problem": "Network administrators use packet-capture utilities, connectivity tests and interface statistics to understand network behaviour. However, a packet capture taken at only one location gives limited visibility into what happens along the complete network path. An observation at the sending point cannot by itself show whether the same traffic was delayed, changed or failed to appear at a later observation point. Synthetic tests such as ICMP ping may also not represent the behaviour of real application traffic. In addition, heavy traffic can make monitoring itself more difficult because capture and processing may not keep up with incoming packets.\n\nMini-Shark is proposed as a network traffic monitoring and protocol analysis tool that observes live traffic at more than one point in a controlled network, compares the observations and presents useful diagnostic information. It aims to help an operator investigate transit delay and unmatched observations while making clear that a missing observation may also result from capture or telemetry limitations, rather than automatically proving network-path loss.\n\nThis project is relevant to the Foundation Integration Mini Project because it applies Computer Networks concepts to packet communication and routing, Operating Systems concepts to live capture and concurrent processing, Data Structures and Algorithms to efficient comparison of observations, and DBMS concepts to storing monitoring results. The proposed work will be demonstrated in a controlled virtual laboratory.",
    "objectives": [
      "To study how network traffic can be observed at multiple points along a communication path.",
      "To develop a tool that captures and analyses selected live network traffic for monitoring purposes.",
      "To compare packet observations from different points and estimate transit delay where timestamps are comparable.",
      "To identify unmatched observations for further investigation without treating them automatically as confirmed network loss.",
      "To evaluate the monitoring tool under normal, concurrent, delayed and high-traffic test conditions."
    ],
    "coursesTable": [
      {
        "sl": "1",
        "course": "Computer Networks",
        "concepts": "Network communication, Ethernet and IP addressing, TCP/UDP, routing, packet behaviour and network performance.",
        "role": "Dominant"
      },
      {
        "sl": "2",
        "course": "Operating System Principles",
        "concepts": "Network interfaces, packet capture, processes and threads, producer-consumer concepts, buffering and resource management.",
        "role": "Dominant"
      },
      {
        "sl": "3",
        "course": "Data Structures & Algorithms",
        "concepts": "Efficient organization and comparison of packet observations, searching, matching and time-based processing concepts.",
        "role": "Dominant"
      },
      {
        "sl": "4",
        "course": "Database Management Systems",
        "concepts": "Organizing, storing and retrieving probe observations, monitoring events and diagnostic summaries.",
        "role": "Supporting"
      }
    ],
    "conceptualFlowImage": "assets/team_a07_conceptual_workflow.jpg",
    "conceptualFlowCaption": "Fig 1. Conceptual Workflow of Mini-Shark Network Traffic Monitoring & Protocol Analysis Tool",
    "scopeInTable": [
      {
        "num": "1",
        "item": "Set up a controlled virtual network environment for client-to-server traffic experiments."
      },
      {
        "num": "2",
        "item": "Observe selected live network traffic at two defined points in the communication path."
      },
      {
        "num": "3",
        "item": "Analyse supported packet/protocol information and compare observations from the two points."
      },
      {
        "num": "4",
        "item": "Present monitoring information such as observed traffic, transit-delay estimates and unmatched observations for investigation."
      }
    ],
    "scopeOutTable": [
      {
        "num": "1",
        "item": "Monitoring every protocol and every possible network technology",
        "reason": "The project is limited to a manageable set of protocols and a controlled laboratory environment."
      },
      {
        "num": "2",
        "item": "Deployment and monitoring of a large production or enterprise network",
        "reason": "The mini-project is intended to demonstrate the core concepts in a small, reproducible virtual lab."
      },
      {
        "num": "3",
        "item": "Guaranteeing detection of every packet loss event or identifying the exact faulty router",
        "reason": "An unmatched observation alone cannot prove network-path loss; capture, telemetry and path effects must also be considered."
      }
    ],
    "feasibilityTable": [
      {
        "aspect": "Feasibility within 3-credit scope",
        "assessment": "The project is feasible as a bounded demonstration using four Ubuntu virtual machines in VMware Workstation. The work can be divided into lab setup, traffic observation, packet analysis, comparison and presentation of results."
      },
      {
        "aspect": "Required computing / resources",
        "assessment": "A computer capable of running VMware Workstation and four Ubuntu VMs, isolated virtual networks, test client/server applications and ordinary network-testing utilities. No dedicated physical network appliance is required for the proposed virtual-lab demonstration."
      },
      {
        "aspect": "Prerequisite knowledge",
        "assessment": "Basic Computer Networks, Linux and Operating System concepts, programming, Data Structures and Algorithms, and introductory DBMS and software-development concepts."
      },
      {
        "aspect": "Major constraints / limitations",
        "assessment": "Available host CPU and memory, VM scheduling and virtual-network behaviour may affect measurements. Probe clocks must be comparable for transit-delay estimates. Packet fields can change across routing, and NAT, fragmentation, retransmissions, capture offloads or telemetry failures can complicate observation matching."
      },
      {
        "aspect": "Use of existing libraries / tools",
        "assessment": "Existing operating-system packet-capture facilities and standard network utilities may support capture and testing. The team should understand and implement the core observation comparison and diagnostic logic rather than treating a packet-analysis utility as the complete project."
      },
      {
        "aspect": "Overall feasibility",
        "assessment": "Feasible with a controlled four-VM scope and clearly documented measurement limitations."
      }
    ]
  },
  "stage1": {
    "frTable": [
      {
        "id": "FR-01",
        "desc": "The system shall capture live packets at both configured probes",
        "priority": "Mandatory",
        "sourceNeed": "Multi-point live packet capture"
      },
      {
        "id": "FR-02",
        "desc": "The system shall timestamp packets and extract supported protocol fields.",
        "priority": "Mandatory",
        "sourceNeed": "Timestamping and protocol analysis"
      },
      {
        "id": "FR-03",
        "desc": "The system shall generate deterministic 64-bit BLAKE2b packet fingerprints.",
        "priority": "Mandatory",
        "sourceNeed": "Packet fingerprint generation"
      },
      {
        "id": "FR-04",
        "desc": "The system shall send probe metadata to the Host VM over TCP port 9000.",
        "priority": "Mandatory",
        "sourceNeed": "Centralized probe telemetry"
      },
      {
        "id": "FR-05",
        "desc": "The system shall match probe observations using fingerprints within 500 ms.",
        "priority": "Mandatory",
        "sourceNeed": "Cross-probe packet matching"
      },
      {
        "id": "FR-06",
        "desc": "The system shall calculate transit delay and flag unmatched packets as suspected loss.",
        "priority": "Mandatory",
        "sourceNeed": "Delay and loss diagnosis"
      },
      {
        "id": "FR-07",
        "desc": "The system shall store results in SQLite and display them on the dashboard.",
        "priority": "Mandatory",
        "sourceNeed": "Persistent storage and monitoring"
      },
      {
        "id": "FR-08",
        "desc": "The system shall use bounded packet buffers and count queue overflows.",
        "priority": "Mandatory",
        "sourceNeed": "Bounded buffering and overload visibility"
      }
    ],
    "nfrTable": [
      {
        "id": "NFR-01",
        "desc": "The system shall sustain the specified traffic load.",
        "cat": "Throughput / Bandwidth",
        "target": "≥10 Mbps for 5 minutes."
      },
      {
        "id": "NFR-02",
        "desc": "The system shall process packets without unbounded queue growth..",
        "cat": "Processing Performance",
        "target": "≥1,000 packets/sec for 5 minutes."
      },
      {
        "id": "NFR-03",
        "desc": "The system shall deliver probe telemetry within the specified time.",
        "cat": "Telemetry Latency",
        "target": "≤100 ms one-way."
      },
      {
        "id": "NFR-04",
        "desc": "The system shall expire unmatched observations within the specified time.",
        "cat": "Correlation Latency",
        "target": "500 ms ± 50 ms."
      },
      {
        "id": "NFR-05",
        "desc": "The system shall update dashboard results promptly.",
        "cat": "Dashboard Latency",
        "target": "≤2 seconds."
      },
      {
        "id": "NFR-06",
        "desc": "The system shall maintain a fixed-capacity buffer per probe.",
        "cat": "Memory / Buffer Capacity",
        "target": "10,000 slots per probe."
      },
      {
        "id": "NFR-07",
        "desc": "The system shall maintain synchronized probe clocks for delay measurement.",
        "cat": "Timing Accuracy",
        "target": "Clock offset ≤1 ms."
      },
      {
        "id": "NFR-08",
        "desc": "The system shall support concurrent traffic and telemetry without crashing.",
        "cat": "Concurrency / Availability",
        "target": "30 minutes continuous operation."
      }
    ],
    "userStoryTable": [
      {
        "id": "UC-01",
        "actor": "Mini-Shark Operator",
        "desc": "The operator shall configure and start packet capture on the selected probe interfaces.",
        "mainFlow": "Select probe and interface → apply capture settings → start/stop capture → view capture status.",
        "exceptionFlow": "Invalid interface or insufficient privileges → display a capture error."
      },
      {
        "id": "UC-02",
        "actor": "Client VM (Client-A / Client-B)",
        "desc": "The client shall generate controlled TCP/HTTP traffic for monitoring across the virtual network.",
        "mainFlow": "Start test traffic → traffic traverses the Host VM routing function → Server VM receives traffic.",
        "exceptionFlow": "Server unreachable or test service stopped → report connectivity/test failure."
      },
      {
        "id": "UC-03",
        "actor": "Probe Agent (Client-A / Server)",
        "desc": "Each probe shall capture, timestamp, dissect and fingerprint packet observations.",
        "mainFlow": "Capture packet → timestamp → dissect supported headers → generate configured fingerprint → enqueue observation.",
        "exceptionFlow": "Unsupported/malformed packet or full buffer → record the applicable parse/overflow outcome."
      },
      {
        "id": "UC-04",
        "actor": "Central Mini-Shark Host",
        "desc": "The central service shall receive telemetry and correlate observations from both probes.",
        "mainFlow": "Receive telemetry → validate observation → correlate fingerprint → calculate delay or expire unmatched observation.",
        "exceptionFlow": "Telemetry missing/late or clocks unsynchronized → record telemetry issue or mark delay unreliable."
      },
      {
        "id": "UC-05",
        "actor": "Administrator / Analyst",
        "desc": "The administrator or analyst shall inspect monitoring status and diagnostic results.",
        "mainFlow": "Open dashboard/API → view probe status, packet matches, delay, unmatched observations and available counters → review stored results.",
        "exceptionFlow": "API/database unavailable → display a service/data error rather than stale status."
      }
    ],
    "useCaseImage": "assets/team_a07_use_case_diagram.png",
    "useCaseCaption": "Fig 2. System Use Case Diagram",
    "acceptanceTable": [
      {
        "req": "FR-01",
        "criteria": "Both configured probes capture live packets at their selected interfaces in the four-VM lab.",
        "method": "Generate client-to-server traffic and verify packet observations at Client-A and the Server VM."
      },
      {
        "req": "FR-02",
        "criteria": "Each captured observation includes a timestamp and correctly extracted fields for the supported protocols.",
        "method": "Generate Ethernet/IPv4 TCP, UDP, ICMP and DNS test traffic; compare extracted fields with an independent packet analyzer."
      },
      {
        "req": "FR-03",
        "criteria": "Identical configured packet-field inputs produce identical 64-bit BLAKE2b fingerprints at both probes.",
        "method": "Provide matching normalized field inputs to both probe implementations and compare the resulting fingerprints."
      },
      {
        "req": "FR-04",
        "criteria": "Both probes deliver observation metadata to the Host VM using TCP port 9000, and a telemetry failure is recorded if delivery is interrupted.",
        "method": "Verify delivery at the Host, then stop the telemetry receiver and verify that the probe/central service reports the failure."
      },
      {
        "req": "FR-05",
        "criteria": "Corresponding observations are matched by fingerprint within the 500 ms correlation window.",
        "method": "Replay paired observations with controlled arrival intervals and verify match decisions inside the configured window."
      },
      {
        "req": "FR-06",
        "criteria": "Matched observations produce T2 − T1 delay when clocks are synchronized; expired unmatched observations are labelled suspected loss.",
        "method": "Synchronize probe clocks, replay paired and unpaired observations, and verify delay and unmatched classifications."
      },
      {
        "req": "FR-07",
        "criteria": "SQLite retains diagnostic records and the dashboard/API displays probe status, matches, delay, unmatched observations and available drop counters.",
        "method": "Compare dashboard/API output with SQLite records and verify persistence after an application restart."
      },
      {
        "req": "FR-08",
        "criteria": "Each probe buffer is limited to 10,000 slots and application-level overflow is counted when the queue is full.",
        "method": "Run a producer/consumer overload test and verify the configured capacity and overflow counter."
      }
    ]
  },
  "systemDesign": {}
};

window.STATIC_TEAMS_DATA['A-07'] = teamA07Data;
