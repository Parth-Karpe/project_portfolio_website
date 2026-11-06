# AI Mentor: Dimension Section Mapping & MCQ Architecture Analysis

This document provides a comprehensive technical reference for the **AI Mentor** in the **ProjectGate AI (Mini-Project Mentoring)** platform. It details:
1. **Stage-by-Stage Portfolio Section Mapping** across the three core evaluation dimensions: *Systems Thinking*, *Foundational CS Knowledge*, and *Engineering Standards*.
2. **Deep Architectural Analysis of the MCQ Quiz Engine**, explaining how fixed pedagogical question stems combine with dynamically generated, project-grounded option choices.

---

## Part 1: Portfolio Section Mapping across Evaluation Dimensions

The AI Mentor evaluates student project portfolios across multiple dimensions. Each dimension focuses on specific engineering competencies and maps directly to verified chunks in the portfolio knowledge base.

```
                           PROJECT PORTFOLIO DATA
                                      │
        ┌─────────────────────────────┼─────────────────────────────┐
        ▼                             ▼                             ▼
 SYSTEMS THINKING           FOUNDATIONAL CS KNOWLEDGE       ENGINEERING STANDARDS
(Interconnection, Flow,     (Core CS Theory: DSA, OS,       (Rigor, IEEE Specs, Quality,
 & System Boundaries)       DBMS, Networks, Architecture)   Traceability, Test Criteria)
```

---

### 1.1 Cross-Stage Summary Matrix

| Portfolio Section | Stage | Systems Thinking | Foundational CS Knowledge | Engineering Standards |
| :--- | :---: | :---: | :---: | :---: |
| **Problem Statement & Friction** | Stage 0 | ✅ *(Need & Stakeholder Friction)* | — | ✅ *(Baseline Problem Definition)* |
| **Project Objectives & Targets** | Stage 0 | ✅ *(System Goals & Outcomes)* | — | ✅ *(Measurability & Specificity)* |
| **Foundation Courses (Table 0.1)** | Stage 0 | — | ✅ *(Course to Project Mapping)* | — |
| **Pipeline Flow (Table 0.2)** | Stage 0 | ✅ *(Sequential Process Flow)* | — | — |
| **Workflow Engines (Table 0.3)** | Stage 0 | ✅ *(Inter-engine Flow)* | ✅ *(Engine Mechanics: Parsing, Queues)* | — |
| **Scope In & Scope Out (Table 0.4)** | Stage 0 | ✅ *(System Boundaries & Limits)* | — | ✅ *(Boundary Enforcement & Creep Control)* |
| **Feasibility Assessment (Table 0.5)** | Stage 0 | ✅ *(Resource & Operational Bounds)* | — | ✅ *(Risk Analysis & Constraints)* |
| **Functional Requirements (FRs)** | Stage 1 | ✅ *(Component Dependencies)* | ✅ *(Data Structure & Algorithmic Fits)* | ✅ *(IEEE 830 Syntax & Traceability)* |
| **Non-Functional Requirements (NFRs)**| Stage 1 | ✅ *(System-wide Impact)* | ✅ *(OS/DBMS/Network Mechanisms)* | ✅ *(Quantifiable Quality Targets)* |
| **Use Cases & Use Case Diagram** | Stage 1 | ✅ *(Actor & System Boundary Flow)* | — | ✅ *(Actor-Goal-Flow Consistency)* |
| **Acceptance Test Matrix (Table 1.3)** | Stage 1 | — | — | ✅ *(Verification & Criteria Checking)* |
| **Architecture & Component Diagram** | Stage 2 | ✅ *(Subsystem Decomposition)* | ✅ *(Tiered Architecture & Protocols)* | ✅ *(Architectural Compliance)* |
| **Data Design & Schema** | Stage 2 | — | ✅ *(Relational Models, Indexes, ACID)*| ✅ *(Data Integrity & Normalization)* |
| **Algorithm Design & Complexity** | Stage 2 | — | ✅ *(Time/Space Complexity, Primitives)*| ✅ *(Worst-case Guarantees)* |
| **Test Matrix & Validation Evidence** | Stage 4 | — | — | ✅ *(Execution Logs & Verification)* |

---

### 1.2 Dimension Deep Dive

#### A. Systems Thinking
* **Core Philosophy**: Evaluates whether students understand their project as an integrated ecosystem of interconnected parts, rather than isolated code files.
* **Key Focus Areas**:
  1. **Need vs. Implementation**: Connecting the user's operational friction to technical components.
  2. **System Boundaries**: Explicitly identifying what is inside the system and what is deliberately excluded (In-Scope vs. Out-of-Scope).
  3. **Data & Process Pipelines**: How data enters, gets transformed across sequential engines, and reaches the end stakeholder.
  4. **Component Dependencies**: How functional requirement $A$ depends on the output of requirement $B$.
  5. **Cross-Cutting Quality Influences**: How an NFR (e.g. strict latency or zero data loss) forces architectural changes in other modules.
* **Underlying RAG Chunks**:
  - `stage0-problem` (`[Stage 0: Problem Statement]`)
  - `stage0-objectives` (`[Stage 0: Objectives]`)
  - `table-0-2` (`[Table 0.2: Conceptual Pipeline Flow]`)
  - `table-0-3` & `engine-xx` (`[Table 0.3: Conceptual Workflow Engines]`)
  - `table-0-4` (`[Table 0.4: Scope Boundaries]`)
  - `table-0-5` (`[Table 0.5: Feasibility Assessment]`)
  - `table-use-cases` & `diag-usecase` (`[Use Cases]`, `[Use Case Diagram]`)
  - `fr-xx` (`[FR-01]`, `[FR-02]`, etc.)
  - `stage2-architecture` (`[Architecture]`)

---

#### B. Foundational CS Knowledge
* **Core Philosophy**: Tests the student's ability to ground real-world engineering choices in foundational computer science theory taught in standard curriculum courses (Data Structures, Algorithms, Operating Systems, DBMS, Computer Networks, Compilers).
* **Key Focus Areas**:
  1. **Academic Course Alignment (Table 0.1)**: Proving that concepts from specific courses (e.g., File Systems from OS, Transactions from DBMS, Sockets from Computer Networks) directly power the project.
  2. **Data Structure Suitability**: Selecting the optimal data structure (Hash Table vs. B-Tree vs. Priority Queue) to satisfy a functional requirement.
  3. **Low-Level Systems Mechanisms**: Explaining OS thread pools, mutex locks, event loops, buffer management, or database write-ahead logs (WAL) used to satisfy performance benchmarks.
  4. **Algorithmic Trade-offs**: Evaluating time/space complexity ($O(1)$ vs. $O(N \log N)$) and computational limitations.
* **Underlying RAG Chunks**:
  - `table-0-1` (`[Table 0.1: Foundation Courses]`)
  - `table-0-3` & `engine-xx` (`[Engine 01]`, `[Engine 02]`)
  - `fr-xx` (Functional Requirement implementation techniques)
  - `nfr-xx` (Systems performance mechanisms)
  - `stage2-data-design` (`[Data Design]`: Schema normalization, indexing, caching)
  - `stage2-algorithm` (`[Algorithm Design]`: Complexity, state machines, greedy/graph algorithms)

---

#### C. Engineering Standards
* **Core Philosophy**: Assesses professional software engineering rigor, testability, precision, adherence to formal specifications, and traceability.
* **Key Focus Areas**:
  1. **IEEE 830 Requirement Rigor**: Ensuring functional requirements avoid ambiguity, compound sentences, and marketing buzzwords. Every requirement must specify:
     $$\text{Actor} + \text{Trigger / Action} + \text{Observable System Result}$$
  2. **Measurable Quality Targets**: Rejecting subjective statements like *"system should be fast"* and requiring verifiable metrics like *"95th percentile response time $\le 200\text{ ms}$ under 200 concurrent requests"*.
  3. **Bidirectional Traceability**: Proving that every `FR-xx` directly traces back to an approved Stage 0 objective, and every objective is satisfied by at least one requirement.
  4. **Acceptance Criteria & Testability**: Every requirement must have a clear verification condition that can definitively pass or fail in the acceptance test suite (`Table 1.3`).
* **Underlying RAG Chunks**:
  - `stage0-objectives` (Quantifiable target validation)
  - `table-0-4` (Boundary enforcement & preventing scope creep)
  - `table-0-5` (Constraint planning & risk mitigation)
  - `fr-xx` (IEEE standard syntactic checking)
  - `nfr-xx` (Quantifiable metric verification)
  - `table-use-cases` (Actor-to-FR completeness checking)
  - `table-testsuite` (`[Table 1.3: Test Matrix]`: Mapping test IDs to requirements and criteria)

---

## Part 2: Deep Technical Analysis of the MCQ Quiz Engine

A distinctive feature of the AI Mentor is its **Hybrid Assessment Engine**:
> **The question prompts are pedagogical and standardized (fixed), while the 4 options (A, B, C, D) are synthesized dynamically from the student's active project knowledge base.**

```
                     STUDENT CLICKS "MCQ VIVA PRACTICE"
                                     │
                                     ▼
                      startMentorMcq(dimension, forceNew)
                                     │
                                     ▼
        Does a cached/un-evaluated assessment exist in sessionStorage?
                        ├── YES ──► Render cached quiz immediately
                        └── NO
                             │
                             ▼
               facultyMcqWithProjectOptions(kb, persona, stage)
                                     │
    ┌────────────────────────────────┴────────────────────────────────┐
    ▼                                                                 ▼
FIXED QUESTION BANK (facultyBank)                 ACTIVE PROJECT KB (facultyContextLines)
5 Standardized Competency Prompts                 - Real Problem Statement & Objectives
(e.g., ST1-M1: Core Operation,                    - Real FR IDs & Descriptions (FR-01, FR-02)
       ST1-M2: Dependency,                        - Real NFRs & Measurable Targets
       ES1-M1: Clear Requirement)                 - Real Use Cases, In/Out Scope Tables
    │                                                                 │
    └────────────────────────────────┬────────────────────────────────┘
                                     │
                                     ▼
                       facultyOptionRequest(kb, persona, stage)
                   Prompt constructed with strict LLM constraints:
           "Generate 4 options specific to this project for each question.
            Do not change the question. Ground all options in the project text."
                                     │
                                     ▼
                       callPersonaModel() / LLM Provider
                        (Gemini API / Local Ollama / Mock)
                                     │
                                     ▼
                         applyFacultyOptions(base, parsed)
              - Validates 4 options per question
              - Assigns keys A, B, C, D
              - Identifies 1 correct answer + 3 plausible distractors
              - Records explanation grounded in portfolio lines
                                     │
                                     ▼
                     persistAssessment() + updateChatMessagesThread()
```

---

### 2.1 The Fixed Component: Curated Pedagogical Question Banks

In `dist/portfolio-rag.js`, questions are partitioned by stage and dimension (`STAGE0_BANK` and `STAGE1_BANK`). 

Every team in the department faces the **exact same 5 pedagogical question templates** per dimension. For example, in **Stage 1**:

#### Systems Thinking (`STAGE1_BANK['Systems Thinking']`):
* `ST1-M1` (**Core Operation**): *"Which functional requirement is most directly responsible for enabling a selected core system operation?"*
* `ST1-M2` (**Requirement Dependency**): *"Which two functional requirements have an important dependency, and what is the correct relationship between them?"*
* `ST1-M3` (**Use-Case Sequence**): *"Which sequence of system operations best satisfies a selected use case?"*
* `ST1-M4` (**Missing Requirement Consequence**): *"What is the most likely system-level consequence if a selected functional requirement is not satisfied?"*
* `ST1-M5` (**Non-Functional Influence**): *"Which non-functional requirement most strongly influences the behavior or interaction of major system functions?"*

#### Engineering Standards (`STAGE1_BANK['Engineering Standards']`):
* `ES1-M1` (**Clear Requirement**): *"Which functional requirement is written most clearly and unambiguously?"*
* `ES1-M2` (**Measurable Quality Target**): *"Which non-functional requirement contains a measurable and verifiable quality target?"*
* `ES1-M3` (**Traceability**): *"Which requirement is correctly traceable to a selected Stage 0 objective or source need?"*
* `ES1-M4` (**Use-Case Mismatch**): *"Which inconsistency, if present, would indicate a mismatch between a use case and the functional requirements?"*
* `ES1-M5` (**Acceptance Criterion**): *"Which acceptance criterion most directly verifies a selected functional or non-functional requirement?"*

#### Foundational CS Knowledge (`STAGE1_BANK['Foundational CS Knowledge']`):
* `CS1-M1` (**Concept for Requirement**): *"Which foundational CS concept is most relevant to implementing a selected functional requirement?"*
* `CS1-M2` (**Mechanism for Requirement**): *"Which data structure, algorithm or computing mechanism could best support a selected requirement?"*
* `CS1-M3` (**Concept for Quality Target**): *"Which OS, DBMS, networking or other foundational concept is most relevant to a selected non-functional requirement?"*
* `CS1-M4` (**Technical Property**): *"Which technical property of a selected algorithm or computing mechanism is important for satisfying a specified requirement?"*
* `CS1-M5` (**Requirement Trade-off**): *"Which limitation or trade-off of a foundational computing approach should be considered when satisfying a selected requirement?"*

---

### 2.2 The Dynamic Component: Project-Grounded Option Synthesis

When `facultyOptionRequest(kb, persona, stage)` prepares the LLM prompt, it injects the student's live portfolio context:

```javascript
// System Instruction sent to LLM
[
  'Write four options for each fixed question. Do not change the question.',
  `Project: ${kb.title} (Team ${kb.teamId}). Stage: ${stage}. Persona: ${persona}.`,
  'Use this project text for the options. Do not invent a feature, identifier, target, or result that the text does not support.',
  'Each item has exactly 4 options and one correct index from 0 to 3.',
  'Make the options specific to this project and similar in length. No "All of the above" or "None of the above".',
  'Return only a JSON array: [{"id":"TEMPLATE","options":["A","B","C","D"],"correct":0,"explanation":"why"}]',
  'QUESTIONS:',
  questions,
  'PROJECT CONTEXT:',
  facultyContextLines(kb, stage)
].join('\n')
```

#### Real-World Example Comparison:
Consider the same question: `ST1-M2` (*"Which two functional requirements have an important dependency, and what is the correct relationship between them?"*):

* **For Team 03 (Smart Campus Lab Optimizer)**:
  * Option A: `FR-02 (Slot Validator) must execute before FR-04 (Lock Allocator) to verify resource availability` *(Correct)*
  * Option B: `FR-01 (User Login) depends on FR-05 (PDF Report Generator)`
  * Option C: `Hostel room allotment depends on lab seat allocation` *(Distractor from Scope Out)*
  * Option D: `FR-03 (Notification SMS) must complete before user inputs date`
* **For Team 08 (Data Profiling Engine)**:
  * Option A: `FR-01 (File Ingestion) must complete before FR-03 (Statistical Metric Computation) can process the dataset` *(Correct)*
  * Option B: `FR-04 (Chart Rendering) must complete before file upload begins`
  * Option C: `Automated ML Model Training depends on Profiling` *(Distractor from Scope Out)*
  * Option D: `PDF Export depends on team member role assignment`

---

### 2.3 Evaluation of Current Architecture

#### Key Strengths:
1. **Academic Standardization**: Every student cohort across 33 teams is tested on the exact same academic criteria (Dependencies, Traceability, Measurability). Faculty mentors have consistent metrics for grading.
2. **Zero Question Hallucination**: Because the prompt stems are fixed, the model cannot hallucinate bizarre, impossible, or out-of-syllabus questions.
3. **Plausible, Project-Specific Distractors**: Instead of arbitrary dummy options, distractors are sourced directly from the team's out-of-scope items, secondary requirements, or non-dependent tasks.
4. **Resilient Local Fallback**: When LLM connectivity is unavailable, `facultyMcq()` provides a deterministic heuristic fallback that uses token slotting directly from the team data without breaking the UI.
5. **Session Persistence**: Once generated, assessments are cached in `sessionStorage` and indexed in the assessment store, avoiding duplicate model calls and preserving student state across page navigations.

#### Architectural Considerations for Version 2:
1. **Question Difficulty Scaling**: Currently, all students receive questions of uniform difficulty. Version 2 can introduce adaptive difficulty (Beginner $\rightarrow$ Intermediate $\rightarrow$ Advanced) based on student performance in previous stages.
2. **Multi-Step Scenario Questions**: In Stage 3 and Stage 4, questions can expand from single-fact queries to multi-step diagnostic scenarios (e.g., *"If the database connection drops during step 2 of Use Case 1, which requirement governs the rollback?"*).
3. **Faculty Override & Custom Question Ingestion**: Faculty mentors could be given the ability to insert custom question stems into `facultyBank` for specialized project themes.
