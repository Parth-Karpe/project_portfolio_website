/**
 * Static Data File for Team B-12
 * Project: HTTP Proxy Server with In-Memory Caching
 * Source documents: Team_12_Review_1_HTTP_Proxy_Problem_Formulation & Team12_Review 2-HTTP_Proxy_Requirements
 * Faculty Mentor: Ms. Sadaf Anjum Savanur
 */

window.STATIC_TEAMS_DATA = window.STATIC_TEAMS_DATA || {};

const team12Data = {
  "id": "B-12",
  "theme": "Networked Systems and Tools",
  "title": "HTTP Proxy Server with In-Memory Caching",
  "guide": "Ms. Sadaf Anjum Savanur",
  "academicYear": "2026–27",
  "repo": "https://github.com/topics/http-proxy-cache",
  "members": [
    {
      "name": "Krish Janagekar",
      "usn": "01FE24BCI097",
      "role": "Team Member",
      "skills": "E1: Request Handling • TCP Sockets • HTTP Parsing",
      "contribution": "TCP listening endpoint, request parser, and client session management.",
      "github": "https://github.com"
    },
    {
      "name": "Vivek Raikar",
      "usn": "01FE25BCI704",
      "role": "Team Member",
      "skills": "E2: Cache Management • In-Memory Store • Replacement Policy",
      "contribution": "In-memory cache indexing, hash lookups, and cache eviction/expiration.",
      "github": "https://github.com"
    },
    {
      "name": "Akash",
      "usn": "01FE24BCI123",
      "role": "Team Member",
      "skills": "E3: Origin Communication • Upstream Sockets • Response Streaming",
      "contribution": "Origin server connection forwarding, response stream relay, and cache population.",
      "github": "https://github.com"
    },
    {
      "name": "Adarsh MR",
      "usn": "01FE24BCI011",
      "role": "Team Member",
      "skills": "E4: Concurrency & Reliability • Thread Pools • Mutual Exclusion",
      "contribution": "Concurrent request handling, thread safety for shared cache, and benchmark metrics.",
      "github": "https://github.com"
    }
  ],
  "stage0": {
    "problem": "When several users on the same network access the same web resource, each request may travel to the origin server even when the resource has not changed. This repeated communication increases response time and uses network bandwidth unnecessarily. In places such as college labs, hostels and shared networks, many users may request the same pages or static resources.\n\nOur proposed HTTP Proxy Server with In-Memory Caching is intended to reduce this repetition by placing a proxy between the client and the origin server. The proxy receives a request and checks whether a suitable, fresh response is already available in its memory. If it is available, the response can be returned to the client without contacting the origin server again. If it is not available or is no longer fresh, the proxy contacts the origin server and forwards the response to the client.",
    "objectives": [
      "To study how repeated requests for unchanged web resources affect response time and network bandwidth.",
      "To develop an HTTP proxy that accepts client requests and communicates with the required origin server.",
      "To reuse suitable cached responses for repeated requests while ensuring that only fresh responses are served.",
      "To reduce unnecessary communication with origin servers and study the effect of caching on response time and bandwidth usage.",
      "To apply Computer Networks, algorithm design and Operating Systems concepts in a practical networking system and evaluate its behaviour under multiple client requests."
    ],
    "coursesTable": [
      {
        "sl": "1",
        "course": "Computer Networks",
        "concepts": "Client-server communication, TCP sockets, ports, HTTP request-response flow and proxy communication.",
        "role": "Dominant"
      },
      {
        "sl": "2",
        "course": "Design & Analysis of Algorithms (DAA)",
        "concepts": "Efficient searching, average-case lookup, cache replacement decisions and time/space complexity.",
        "role": "Dominant"
      },
      {
        "sl": "3",
        "course": "Operating System Principles",
        "concepts": "Processes and threads, concurrent request handling, synchronization, shared resources and resource management.",
        "role": "Dominant"
      },
      {
        "sl": "4",
        "course": "Software Engineering",
        "concepts": "Requirement analysis, modular development, testing, benchmarking, documentation and version control.",
        "role": "Supporting"
      }
    ],
    "conceptualFlowImage": "assets/team12_conceptual_workflow.jpg",
    "conceptualFlowCaption": "Fig 1. Conceptual Workflow of HTTP Proxy Server with In-Memory Caching",
    "scopeInTable": [
      {
        "num": "1",
        "item": "Accept client HTTP GET requests and forward supported requests to the intended destination server."
      },
      {
        "num": "2",
        "item": "Check whether a requested resource has a suitable response available in the proxy's memory."
      },
      {
        "num": "3",
        "item": "Return a valid cached response when available, and contact the origin server when the cache cannot satisfy the request."
      },
      {
        "num": "4",
        "item": "Manage stored responses, their freshness and the removal of less recently used entries when the cache reaches its limit."
      },
      {
        "num": "5",
        "item": "Handle multiple client requests and evaluate request handling, cache reuse and response-time behaviour."
      }
    ],
    "scopeOutTable": [
      {
        "num": "1",
        "item": "HTTPS interception or decryption.",
        "reason": "The project focuses on controlled HTTP caching; decrypting HTTPS would introduce certificate and security complexity."
      },
      {
        "num": "2",
        "item": "Distributed or multi-server proxy caching.",
        "reason": "The approved scope is a single-node proxy and does not require coordination between multiple proxy servers."
      },
      {
        "num": "3",
        "item": "AI/ML-based caching or traffic prediction.",
        "reason": "The main focus is to demonstrate request handling and cache reuse using foundational Computer Science concepts."
      },
      {
        "num": "4",
        "item": "Production-scale deployment for unrestricted public traffic.",
        "reason": "A production deployment would require extensive security, monitoring and infrastructure work beyond the mini-project scope."
      }
    ],
    "feasibilityTable": [
      {
        "aspect": "Feasibility within 3-credit scope",
        "assessment": "The project is achievable within the mini-project duration by limiting the implementation to a single-node HTTP proxy, supported GET requests and an in-memory cache. The team can demonstrate the complete request flow using a controlled HTTP origin server."
      },
      {
        "aspect": "Required computing / resources",
        "assessment": "Standard laptops, a C/C++ development environment, local or controlled HTTP origin server, browser or curl for sending requests, and tools for basic load and performance testing. No special hardware is required."
      },
      {
        "aspect": "Prerequisite knowledge",
        "assessment": "Basic networking, TCP sockets, HTTP request-response concepts, data structures, algorithm analysis, threads, synchronization and software testing."
      },
      {
        "aspect": "Major constraints / limitations",
        "assessment": "HTTPS traffic is outside the project scope; only supported HTTP requests and cacheable responses will be handled. Cache memory, worker threads and concurrent connections must be bounded. Origin-server availability and network conditions may affect measurements."
      },
      {
        "aspect": "Use of existing libraries / tools",
        "assessment": "Common development and testing tools may be used for compilation, request generation and benchmarking. The core proxy request flow, cache management and concurrency handling will be implemented and understood by the team."
      },
      {
        "aspect": "Overall feasibility",
        "assessment": "Feasible within the mini-project scope, with the implementation restricted to a single-node HTTP proxy and controlled test conditions."
      }
    ]
  },
  "stage1": {
    "frTable": [
      {
        "id": "FR ID-01",
        "desc": "The system shall accept client HTTP GET requests through a TCP listening endpoint.",
        "priority": "Mandatory",
        "sourceNeed": "Client access through an intermediary"
      },
      {
        "id": "FR ID-02",
        "desc": "The system shall parse supported requests and identify the method, host and path.",
        "priority": "Mandatory",
        "sourceNeed": "Correct request processing"
      },
      {
        "id": "FR ID-03",
        "desc": "The system shall create a request key and check the in-memory cache for a matching response.",
        "priority": "Mandatory",
        "sourceNeed": "Reuse of responses for repeated requests"
      },
      {
        "id": "FR ID-04",
        "desc": "The system shall serve a fresh cached response without contacting the origin server.",
        "priority": "Mandatory",
        "sourceNeed": "Reduced origin traffic and latency"
      },
      {
        "id": "FR ID-05",
        "desc": "The system shall fetch a cache MISS from the origin, return it to the client and cache it if eligible.",
        "priority": "Mandatory",
        "sourceNeed": "Completion of requests not in cache"
      },
      {
        "id": "FR ID-06",
        "desc": "The system shall maintain LRU ordering and evict the least recently used entry at capacity.",
        "priority": "Mandatory",
        "sourceNeed": "Bounded in-memory cache capacity"
      },
      {
        "id": "FR ID-07",
        "desc": "The system shall handle invalid requests, disconnections, origin failures and timeouts without crashing or leaking resources.",
        "priority": "Mandatory",
        "sourceNeed": "Controlled failure behaviour"
      }
    ],
    "nfrTable": [
      {
        "id": "NFR ID-01",
        "desc": "The system shall respond faster to fresh cache hits than to origin-forwarded requests.",
        "cat": "Performance",
        "target": "HIT response time ≥50% lower than MISS."
      },
      {
        "id": "NFR ID-02",
        "desc": "The system shall manage cache memory and lookups efficiently as entries grow.",
        "cat": "Resource Efficiency",
        "target": "≤100 MB memory; lookup <10 ms for 10,000 entries."
      },
      {
        "id": "NFR ID-03",
        "desc": "The system shall handle concurrent requests and failures without crashing or corrupting the cache.",
        "cat": "Reliability",
        "target": "≥100 concurrent requests; failure rate <1%; no deadlocks."
      },
      {
        "id": "NFR ID-04",
        "desc": "The system shall sustain increasing request loads with repeatable measurements.",
        "cat": "Scalability",
        "target": "≥500 req/s; p95 <200 ms; HIT ratio ≥70%."
      }
    ],
    "userStoryTable": [
      {
        "id": "UC-01",
        "actor": "Client",
        "desc": "The client shall send an HTTP GET request through the proxy.",
        "mainFlow": "Configure proxy and send GET → proxy accepts TCP connection → request received → method, host, path parsed.",
        "exceptionFlow": "Connection refused or request incomplete/malformed → reject and clean up safely."
      },
      {
        "id": "UC-02",
        "actor": "Client / Proxy",
        "desc": "The client shall receive a resource that is fresh in the cache.",
        "mainFlow": "Build request key → check cache → fresh entry found → update recent-use position → return cached response.",
        "exceptionFlow": "Entry expired or invalid → treat as MISS and continue to origin."
      },
      {
        "id": "UC-03",
        "actor": "Proxy / Origin Server",
        "desc": "The client shall obtain a resource that is not in the cache.",
        "mainFlow": "Cache MISS → connect to origin → forward GET → receive response → return to client → store eligible response.",
        "exceptionFlow": "Origin unreachable, times out or incomplete → controlled error response and cleanup."
      },
      {
        "id": "UC-04",
        "actor": "Proxy",
        "desc": "The proxy shall free space when the cache reaches capacity.",
        "mainFlow": "New eligible response → check capacity → evict LRU entry → store new entry.",
        "exceptionFlow": "Cache operation fails or concurrent access → shared state protected, handled safely."
      },
      {
        "id": "UC-05",
        "actor": "Client / Proxy",
        "desc": "The proxy shall handle an invalid request or client disconnect.",
        "mainFlow": "Validate request → detect invalid input or disconnect → return error where possible → release resources.",
        "exceptionFlow": "Malformed request, missing host or unsupported method → reject without crashing."
      },
      {
        "id": "UC-06",
        "actor": "Multiple Clients",
        "desc": "Multiple clients shall use the proxy at the same time.",
        "mainFlow": "Accept connections → worker threads process requests → synchronized cache access → responses returned.",
        "exceptionFlow": "Worker/resource limit reached → excess work handled gracefully; no cache corruption."
      }
    ],
    "useCaseImage": "",
    "useCaseCaption": "",
    "acceptanceTable": [
      {
        "req": "FR ID-01",
        "criteria": "The proxy accepts client TCP connections and receives HTTP GET requests on its listening port.",
        "method": "Send GET requests with curl or a browser configured to use the proxy; verify receipt."
      },
      {
        "req": "FR ID-02",
        "criteria": "Method, host and path are identified correctly; invalid or incomplete requests are rejected safely.",
        "method": "Send valid and malformed GET requests; verify parsed values and controlled rejection."
      },
      {
        "req": "FR ID-03",
        "criteria": "Each request produces a request key and a cache lookup that returns HIT or MISS correctly.",
        "method": "Request the same and different URLs; verify lookup outcomes in logs."
      },
      {
        "req": "FR ID-04",
        "criteria": "A fresh cached entry is returned without any connection to the origin server.",
        "method": "Request a cacheable resource twice; verify the origin sees only the first request."
      },
      {
        "req": "FR ID-05",
        "criteria": "On a MISS the proxy fetches from the origin, returns the response and caches it if eligible.",
        "method": "Request an uncached resource; verify client response, origin contact and new cache entry."
      },
      {
        "req": "FR ID-06",
        "criteria": "At configured capacity the LRU entry is evicted and the new entry stored.",
        "method": "Set a small capacity, access entries in a known order, insert a new one; verify LRU eviction."
      },
      {
        "req": "FR ID-07",
        "criteria": "Malformed requests, disconnects, origin failures and timeouts do not crash the proxy; resources are released.",
        "method": "Send malformed requests, stop the origin, disconnect mid-request; verify handling and no leaked sockets."
      },
      {
        "req": "NFR ID-01",
        "criteria": "HIT response time is at least 50% lower than MISS response time.",
        "method": "Measure average HIT and MISS latency under identical conditions."
      },
      {
        "req": "NFR ID-02",
        "criteria": "Memory ≤100 MB and average lookup <10 ms with 10,000 entries.",
        "method": "Populate 10,000 entries; measure memory and lookup time."
      },
      {
        "req": "NFR ID-03",
        "criteria": "≥100 concurrent requests, failure rate <1%, no corruption or deadlock.",
        "method": "Run a concurrent load test; verify failure rate and cache consistency."
      },
      {
        "req": "NFR ID-04",
        "criteria": "≥500 req/s, p95 <200 ms and HIT ratio ≥70% on a repeated workload.",
        "method": "Run a controlled repeated-request benchmark; compute throughput, p95 and HIT ratio."
      }
    ]
  },
  "systemDesign": {}
};

window.STATIC_TEAMS_DATA['B-12'] = team12Data;
window.STATIC_TEAMS_DATA['HTTP Proxy Server with In-Memory Caching'] = team12Data;
window.STATIC_TEAMS_DATA['HTTP Proxy Server with Caching'] = team12Data;
