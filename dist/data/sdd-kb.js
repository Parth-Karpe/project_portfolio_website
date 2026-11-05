window.SDD_KB = {
  "source": "https://github.com/jam01/SDD-Template",
  "license": "CC0-1.0",
  "chunks": [
    {
      "id": "sdd-1-introduction",
      "label": "1. Introduction",
      "citation": "[SDD 1. Introduction]",
      "type": "SDD Template",
      "text": "1. Introduction\n💬 _Provides an overview of the document and orients the reader to the system being designed._"
    },
    {
      "id": "sdd-1-1",
      "label": "1.1 Document Purpose",
      "citation": "[SDD 1.1 Document Purpose]",
      "type": "SDD Template",
      "text": "1.1 Document Purpose\n💬 _Clarifies why this SDD exists, what it describes, and who should use it._\n\n➥ State the purpose of this SDD in 2–4 sentences. Identify its intended audiences (e.g., developers, architects, maintainers, operators) and how they use it across the lifecycle.\n\n💡 Tips: \n- Mention related documents (vision/scope, BRD, SRS, roadmap, contracts) if relevant."
    },
    {
      "id": "sdd-1-2",
      "label": "1.2 Subject Scope",
      "citation": "[SDD 1.2 Subject Scope]",
      "type": "SDD Template",
      "text": "1.2 Subject Scope\n💬 _Defines the scope, purpose, and boundaries of the design._\n\n➥ Identify the system being designed by name and version/release. In 3–5 sentences, describe its primary purpose, key capabilities, and intended outcomes. Clearly list inclusions and exclusions when this SDD covers part of a larger system.\n\n💡 Tips:\n- Connect capabilities to business objectives and reference a separate vision/scope document if relevant.\n- Include a simple diagram if it clarifies boundaries within a larger system."
    },
    {
      "id": "sdd-1-3",
      "label": "1.3 Definitions, Acronyms, and Abbreviations",
      "citation": "[SDD 1.3 Definitions, Acronyms, and Abbreviations]",
      "type": "SDD Template",
      "text": "1.3 Definitions, Acronyms, and Abbreviations\n➥ Help readers understand specialized terms and notation by providing a glossary of domain terms, acronyms, and abbreviations used in the SDD.\n\n💡 Tips:\n- Keep entries alphabetized and consistent across the document set.\n\n| Term | Definition                                                                                                               |\n|------|--------------------------------------------------------------------------------------------------------------------------|\n| API  | Application Programming Interface - A set of definitions and protocols for building and integrating application software |\n| SDD  | Software Design Document - A document that describes the intended purpose, requirements, and nature of a software        |"
    },
    {
      "id": "sdd-1-4",
      "label": "1.4 References",
      "citation": "[SDD 1.4 References]",
      "type": "SDD Template",
      "text": "1.4 References\n💬 _Lists external sources that are normative or informative for this SDD._\n\n➥ Cite standards, contracts, policies, interface specs, UX style guides, use-case docs, architectural decisions, or a vision/scope document. For each reference, include title, author/owner, version, date, and location/URL. Indicate whether each reference is normative (binding) or informative (guidance).\n\n💡 Tips:\n- Prefer stable links or repository paths over volatile URLs."
    },
    {
      "id": "sdd-1-5",
      "label": "1.5 Document Overview",
      "citation": "[SDD 1.5 Document Overview]",
      "type": "SDD Template",
      "text": "1.5 Document Overview\n💬 _Brief guide to the structure of the SDD so readers can quickly find what they need._\n\n➥ Summarize what each major section covers (Design, Decisions, Appendixes), note any document conventions, and mention how updates and revision history are managed.\n\n💡 Tips:\n- Keep to 3–5 sentences focusing on navigation and conventions."
    },
    {
      "id": "sdd-2-design-overview",
      "label": "2. Design Overview",
      "citation": "[SDD 2. Design Overview]",
      "type": "SDD Template",
      "text": "2. Design Overview\n💬 _Describes the nature and approach of the system architecture and design._"
    },
    {
      "id": "sdd-2-1",
      "label": "2.1 Stakeholder Concerns",
      "citation": "[SDD 2.1 Stakeholder Concerns]",
      "type": "SDD Template",
      "text": "2.1 Stakeholder Concerns\n💬 _Defines key stakeholders and their design-related interests._\n\n➥ Identify stakeholder types (e.g., users, developers, operators), their main concerns (e.g., availability, maintainability, risk mitigation) and the viewpoints or design elements of this document that address them."
    },
    {
      "id": "sdd-2-2",
      "label": "2.2 Selected Viewpoints",
      "citation": "[SDD 2.2 Selected Viewpoints]",
      "type": "SDD Template",
      "text": "2.2 Selected Viewpoints\n💬 _Defines the perspectives used to represent and reason about the system’s design._\n\n➥ Identify and describe the viewpoints that were selected to address the stakeholders' concerns identified in Section 2.1. Each viewpoint addresses specific stakeholder concerns and utilizes visualization languages (e.g., UML, C4, sequence diagrams). Note which concerns each viewpoint addresses."
    },
    {
      "id": "sdd-2-2-1",
      "label": "2.2.1 Context",
      "citation": "[SDD 2.2.1 Context]",
      "type": "SDD Template",
      "text": "Viewpoint: 2.2.1 Context\n💬 _Defines the system as a black box, identifying its boundaries and its environment._\n\n**Addresses:** System boundaries, environment actors (users, external systems) and offered services (use cases).  \n**Typical Languages:** UML Use Case Diagram, C4 Context Diagram."
    },
    {
      "id": "sdd-2-2-2",
      "label": "2.2.2 Composition",
      "citation": "[SDD 2.2.2 Composition]",
      "type": "SDD Template",
      "text": "Viewpoint: 2.2.2 Composition\n💬 _Describes how the system is recursively assembled from major constituent parts (subsystems, components, or modules), and how those are organized and relate to one another_\n\n**Addresses:** Identify the major design elements; allocation of responsibilities, and localization of functionality; modularity (reuse, buy-vs-build) and integration.  \n**Typical Languages:** UML Component Diagram, Hierarchical Decomposition Diagram, UML Package (functional), Deployment (runtime) Diagram.\n\n💡 Tips:\n- Focus on how components fit together and where external, reused, or third-party components integrate.\n- Consider organizing into subcategories for clarity: Functional (logical) decomposition and Runtime (physical) decomposition."
    },
    {
      "id": "sdd-2-2-3",
      "label": "2.2.3 Logical",
      "citation": "[SDD 2.2.3 Logical]",
      "type": "SDD Template",
      "text": "Viewpoint: 2.2.3 Logical\n💬 _Captures the static design structure of the system in terms of types and their implementation (class, interface) and their relationships._\n\n**Addresses:** Development and reuse of appropriate abstractions and their implementations; encapsulation and dependencies among entities.  \n**Typical Languages:** UML Class Diagram, UML Object Diagram.\n\n💡 Tips: \n- Focus on the static and stable abstractions that collaborate to fulfill system goals. \n- Complements Composition (assembly) by clarifying the abstractions that underlie it."
    },
    {
      "id": "sdd-2-2-4",
      "label": "2.2.4 Physical",
      "citation": "[SDD 2.2.4 Physical]",
      "type": "SDD Template",
      "text": "Viewpoint: 2.2.4 Physical\n💬 _Depicts the tangible system infrastructure._\n\n**Addresses:** Hardware configuration, physical topology, and physical constraints.  \n**Typical Languages:** Hardware Block Diagram, Network Topology Diagram, Rack Layout, Cloud Infrastructure Diagram.\n\n💡 Tips:\n- Complements Deployment by showing the platform topology on which software is mapped."
    },
    {
      "id": "sdd-2-2-5",
      "label": "2.2.5 Structure",
      "citation": "[SDD 2.2.5 Structure]",
      "type": "SDD Template",
      "text": "Viewpoint: 2.2.5 Structure\n💬 _Documents internal organization of components and their parts, ports, and connectors_.\n\n**Addresses:** Internal composition of complex entities; reusability of fine-grained components.  \n**Typical Languages:** UML composite structure diagram, UML class diagram, UML package diagram, C4 Container diagram.\n\n💡 Tips: \n- Complements Composition by focusing on interfaces and connectors."
    },
    {
      "id": "sdd-2-2-6",
      "label": "2.2.6 Dependency",
      "citation": "[SDD 2.2.6 Dependency]",
      "type": "SDD Template",
      "text": "Viewpoint: 2.2.6 Dependency\n💬 _Shows how design elements interconnect and access each other, illustrating import, service, or build-time relationships._\n\n**Addresses:** Integration needs and prioritization; coupling and dependencies; root cause and change impact analysis.  \n**Typical Languages:** UML Package Diagram, Dependency Graph, UML Component Diagram\n\n💡 Tips: \n- Draw dependencies directionally (“uses”, “requires”, “provides”)."
    },
    {
      "id": "sdd-2-2-7",
      "label": "2.2.7 Information",
      "citation": "[SDD 2.2.7 Information]",
      "type": "SDD Template",
      "text": "Viewpoint: 2.2.7 Information\n💬 _Models the persistent data structure, its relationships, and the mechanisms for access and management._\n\n**Addresses:** Data structure and semantics; persistence; metadata; data integrity; data management and access schemes.  \n**Typical Languages:** Entity-Relationship Diagram, UML Class Diagram, Logical Data Model.\n\n💡 Tips: \n- Use consistent naming with the Logical viewpoint to maintain type alignment."
    },
    {
      "id": "sdd-2-2-8",
      "label": "2.2.8 Interface",
      "citation": "[SDD 2.2.8 Interface]",
      "type": "SDD Template",
      "text": "Viewpoint: 2.2.8 Interface\n💬 _Specifies the externally visible interfaces among components, subsystems, or with external systems._\n\n**Addresses:** Interoperability through contract definition; encapsulation, and integration risks.  \n**Typical Languages:** API specifications, IDLs, function/method signature, UML Component Diagram"
    },
    {
      "id": "sdd-2-2-9",
      "label": "2.2.9 Interaction",
      "citation": "[SDD 2.2.9 Interaction]",
      "type": "SDD Template",
      "text": "Viewpoint: 2.2.9 Interaction\n💬 _Illustrates how entities collaborate at runtime via messages: who talks to whom, in what order, and under which conditions._\n\n**Addresses:** Allocation of responsibilities; message sequencing, timing, and synchronization; error propagation; distributed components state transition logic and concurrency.  \n**Typical Languages:** UML Sequence Diagram, UML Collaboration Diagram, BPMN Process Flows.\n\n💡 Tips:\n- Provide representative “happy-path” and “failure-path” scenarios.\n- If concurrency affects ordering, annotate lifelines/regions and reference the Concurrency viewpoint."
    },
    {
      "id": "sdd-2-2-10",
      "label": "2.2.10 Algorithm",
      "citation": "[SDD 2.2.10 Algorithm]",
      "type": "SDD Template",
      "text": "Viewpoint: 2.2.10 Algorithm\n💬 _Details the internal processing logic of an operation: steps, decisions, loops, and error handling, emphasizing critical or novel algorithms within the design._\n\n**Addresses:** Computational complexity; time-space processing logic; performance, determinism, and reproducibility.  \n**Typical Languages:** Pseudocode, flowchart, Decision Table mathematical formulation.\n\n💡 Tips: \n- Tie each algorithm to its owning class/component.\n- Consider referencing Interface contracts to link invariants and pre/postconditions.\n- Consider referencing Resource impacts if performance or space is critical."
    },
    {
      "id": "sdd-2-2-11",
      "label": "2.2.11 State Dynamics",
      "citation": "[SDD 2.2.11 State Dynamics]",
      "type": "SDD Template",
      "text": "Viewpoint: 2.2.11 State Dynamics\n💬 _Details how system or component states evolve in response to events or stimuli over time._\n\n**Addresses:** Modes/states, transitions, events/triggers, guards, entry/exit effects, concurrency regions, synchronization.  \n**Typical Languages:** UML State Machine Diagram, State Transition Table, Automata, Petri Net.\n\n💡 Tips: \n- Complements Interaction/Algorithm when behavior differs by state."
    },
    {
      "id": "sdd-2-2-12",
      "label": "2.2.12 Concurrency",
      "citation": "[SDD 2.2.12 Concurrency]",
      "type": "SDD Template",
      "text": "Viewpoint: 2.2.12 Concurrency\n💬 _Describes how the design handles parallelism, synchronization, and coordination among concurrent entities._\n\n**Addresses:** Thread/process structure; synchronization and locking; concurrency control; event ordering; parallel execution and race conditions.  \n**Typical Languages:** UML Activity Diagram, UML Sequence and State Diagram, actor model.\n\n💡 Tips:\n- Complements other dynamic viewpoints when parallelism, synchronization, or ordering guarantees are first-class concerns that would clutter those views."
    },
    {
      "id": "sdd-2-2-13",
      "label": "2.2.13 Patterns",
      "citation": "[SDD 2.2.13 Patterns]",
      "type": "SDD Template",
      "text": "Viewpoint: 2.2.13 Patterns\n💬 _Identifies reusable design ideas and collaborations—design patterns, architectural styles, or framework templates—that guide or constrain the system’s structure and behavior._\n\n**Addresses:** Reuse of proven solutions; consistency of architectural style; collaboration roles and connectors; template-based component structures.  \n**Typical Languages:** UML Composite Structure Diagram, UML Package/Class Diagram, Architecture Description Language.\n\n💡 Tips: \n- Record which patterns are applied and where."
    },
    {
      "id": "sdd-2-2-14",
      "label": "2.2.14 Deployment",
      "citation": "[SDD 2.2.14 Deployment]",
      "type": "SDD Template",
      "text": "Viewpoint: 2.2.14 Deployment\n💬 _Describes how software entities are mapped onto the physical execution environment, what runs where and how nodes are connected_\n\n**Addresses:** Component-to-node allocation; deployment topology; communication mechanisms; distribution, replication, and scaling; operational constraints.  \n**Typical Languages:** UML Deployment Diagram, Infrastructure-as-Code topology, Network Diagram, CI/CD pipeline diagrams.\n\n💡 Tips: \n- Include environment tiers and deployment sequencing if relevant."
    },
    {
      "id": "sdd-2-2-15",
      "label": "2.2.15 Resources",
      "citation": "[SDD 2.2.15 Resources]",
      "type": "SDD Template",
      "text": "Viewpoint: 2.2.15 Resources\n💬 _Specifies use and management of shared or limited resources, such as memory, bandwidth, threads, or file handles._\n\n**Addresses:** Resource utilization and allocation; contention and availability; performance bottlenecks; locks and priorities; resource management strategies.  \n**Typical Languages:** UML Class Diagram (for resource entities), UML Real-Time Profile, UML Object Constraint Language (OCL), Resource Allocation Table.\n\n💡 Tips: \n- Cross-reference with Concurrency (timing) and Deployment (placement) views for a full runtime picture.."
    },
    {
      "id": "sdd-3-design-views",
      "label": "3. Design Views",
      "citation": "[SDD 3. Design Views]",
      "type": "SDD Template",
      "text": "3. Design Views\n💬 _Documents the main architectural and design elements that define the system._\n\n➥ Define design views to a level of detail sufficient to implement the system (prescriptive architecture) or to understand how to operate or maintain the existing product (descriptive architecture). Use unique identifiers, keep elements concise and modular, and include diagrams or links where applicable. Reference relevant design decisions from Section 4 that this view represents. Include applicable SRS requirement IDs that this element implements when available.\n\n📃 Template:\n```markdown\n- ID: [NNN]-{title}\n- Title: Short, descriptive name of the view.\n- Viewpoint: The viewpoint of which this view is an instance.\n- Representation: The design view representation per the viewpoint and language selected, e.g., natural language description or a diagram or a combination thereof.\n- More Information: Additional context. Links to related artifacts.\n```\n\n💡 Tips:\n- This section should contain enough information to implement the system (prescriptive architecture) or to understand how to operate or maintain the existing product (descriptive architecture).\n- If available, include references to the SRS requirement IDs that the design view implements. This demonstrates how requirements are addressed by the design.\n- Reference relevant design decisions from Section 4 that influenced or resulted from this design element."
    },
    {
      "id": "sdd-4-decisions",
      "label": "4. Decisions",
      "citation": "[SDD 4. Decisions]",
      "type": "SDD Template",
      "text": "4. Decisions\n💬 Captures significant architectural or design decisions and their rationale.\n\n➥ Document significant architectural decisions that have substantial long-term impact on the system's structure,\nbehavior, or quality attributes.\n\n```markdown\n- ID: [NNN]-{title}\n- Title: short title, representative of solved problem and found solution.\n- Context: Describe the context and problem statement.\n- Options: Enumerate considered alternatives.\n- Outcome: Chosen option: \"{title of option 1}\", because {justification}.\n- More Information: Additional context. Links to related artifacts.\n```\n\n💡 Tips:\n- Keep one decision per record.\n- Consider adopting MADR (Markdown Architecture Decision Record) pattern directly to document decisions."
    },
    {
      "id": "sdd-5-appendixes",
      "label": "5. Appendixes",
      "citation": "[SDD 5. Appendixes]",
      "type": "SDD Template",
      "text": "5. Appendixes\n💬 _Optional supporting material that aids understanding without being normative._\n\n➥ Include glossaries, data dictionaries, models/diagrams, sample datasets, or change-impact analyses that support the main sections. Reference rather than duplicate content when possible.\n\n💡 Tips:\n- Keep appendixes organized and referenced from the main text."
    },
    {
      "id": "sdd-view-1",
      "label": "Viewpoint",
      "citation": "[SDD View: Viewpoint]",
      "type": "SDD Template",
      "text": "Viewpoint\n➥ Identify the viewpoint of which this view is an instance."
    },
    {
      "id": "sdd-view-2",
      "label": "Representation",
      "citation": "[SDD View: Representation]",
      "type": "SDD Template",
      "text": "Representation\n➥ The design view representation per the viewpoint selected, e.g., natural language description or a diagram or a combination thereof."
    },
    {
      "id": "sdd-view-3",
      "label": "More Information",
      "citation": "[SDD View: More Information]",
      "type": "SDD Template",
      "text": "More Information\n➥ Provide supporting context, links, and references that help stakeholders understand the design view. Reference relevant design decisions from Section 4 that influenced or resulted from this design element. If available, include references to the SRS requirement IDs that the design view implements."
    }
  ]
};
