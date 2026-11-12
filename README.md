# ProjectGate AI — CS (AI) department demonstration

AI-Powered Interactive Mini-Project Portfolio & Mentoring System

Current behavior of the mentor, grading, model order, and file map is in [docs/PROJECT.md](docs/PROJECT.md). Sections below this note still describe the earlier demonstration (Gemini-first chat, two design-journey stages, Ollama viva). Where they differ, follow `docs/PROJECT.md`.

## Start

Run `python -m http.server 4174 --bind 127.0.0.1 --directory dist` from this folder, then open http://127.0.0.1:4174. Keep the server running. No installation or build is needed. Use HTTP rather than opening HTML directly for reliable file storage and API access.

## Three cases to present

Open the HOD panel, then Department. Three case cards open the corresponding review record.

| Case | Team | Demonstration state |
| --- | --- | --- |
| 1 | 03 — Adaptive Academic Timetable Optimization | Both stages approved. Ten submission-based viva questions have prepared team answers across Stages 1 and 2. |
| 2 | 07 — Plant Disease Detection with Explainable AI | Stage 1 submitted and returned for revision. Faculty comments appear beside problem, objectives and success-criteria fields and in HOD review. Stage 2 stays locked. |
| 3 | 12 — Multilingual Campus Helpdesk Assistant | Stage 1 approved by its guide. Stage 2 unlocked, partly drafted and not submitted. |

Team 18 is an extra dummy team with Stage 1 draft and Stage 2 locked. All teams have exactly four members and belong to CS (AI) under one department HOD and Faculty Admin.

Prepared reviews, results, questions and answers are clearly labeled demo material. They are not evidence of a real academic assessment or a live AI run. Cases are seeded once; later faculty decisions and submissions persist rather than resetting on reload.

## Your team

Parth Karpe (Team Lead), Nupur Bagave, Vedant Khot and Sachi Aarati. Amit K is the faculty guide, not a student. USNs remain placeholders until replaced. Contribution credits have been removed.

## Panels

- Admin imports the complete Excel roster, sets the CS (AI) HOD/Faculty Admin, manages guide allocations and exports CSV.
- HOD sees the whole CS (AI) department, team portfolios, stage progress, faculty comments, viva questions/responses and local discussions. Read-only academic oversight.
- Faculty Admin coordinates faculty and team-guide allocations under the HOD.
- Faculty selects a demo faculty identity and can access only its assigned teams. It reviews submitted stages, adds section-specific comments, approves or requests revision. Approving Stage 1 unlocks Stage 2 for that team only.
- Team Lead manages one shared workspace per team. Use Demo team account to demonstrate another team's perspective. No individual member login exists.

Panel/account selectors simulate access for the presentation. They are not production authentication or secure authorization.

## Excel import

In Admin Panel, download CS-AI-Roster-Template.xlsx, edit/add rows and choose it using Excel / CSV file. Read & validate, inspect the preview, then Import validated teams.

One row per team contains Department, HOD, Faculty Admin, Team ID, Faculty Name, Topic, Project Title, and Member 1–4 Name/USN pairs. Member 1 is Team Lead. The template includes four sample teams. Keep headers. All records must belong to CS (AI); blank department/ownership cells use current settings. Numeric team IDs are normalized to two digits.

Supports .xlsx, .xls and .csv, up to 10 MB and 2,000 teams. Reads sheets with recognized team headers; other sheets are reported as skipped. This supports the documented roster schema rather than arbitrary university workbook layouts. Macros/formulas are not executed. Invalid records, duplicate USNs or Team IDs, missing members, mixed departments and conflicting HOD/Faculty Admin names block the entire import. No partial write occurs.

Imports update matching team IDs and add new ones; unrelated teams remain. Existing per-team stage forms, reviews, chats and evidence are preserved. Imported member names/USNs, guide, topic and title update the roster. Files are parsed locally; no upload to a server occurs.

## Forms, evidence and mentoring

The nested Design Journey sidebar includes Stage 1 discovery/research/solution and Stage 2 functional requirements, non-functional requirements, architecture and validation/evidence. Drafts autosave. Official academic templates have not yet been supplied; these fields are illustrative.

Architecture images (PNG/JPG/WebP, up to 10 MB) and proof videos (MP4/WebM/Ogg, up to 100 MB) have required captions, previews and download links. Use WebM or H.264 MP4 for browser compatibility. Evidence URLs are also supported. Faculty/HOD can view evidence. Submissions become read-only during review or after approval.

AI Mentor's offline coach asks questions quoting the team's actual saved claims and shows the source fields. Regenerate after editing a submission. Ask your project mentor retrieves relevant submission sections and provides concrete next steps. This is a rule-based coaching demo. It does not analyze image/video contents; captions provide textual context.

Faculty/team Discussion persists locally and can demonstrate both sides by switching panels. HOD can read it. It is not live messaging across devices.

## Viva answer submission

Team Lead draft answers save locally while typing. Submit viva answers validates that every question is answered and that the saved source content still matches. A successful submission creates a fixed, read-only record visible in Faculty Review to the assigned Faculty and HOD. The records persist separately for each team; generating another question set preserves earlier submissions. Faculty cannot edit student answers.

## Optional Ollama

Only the Faculty panel can view or manage the AI connection settings and generation mode. These settings are absent from the Team Lead/student view. In the Faculty panel, save the local endpoint (default http://localhost:11434) and an installed model name in AI Mentor, then choose Ollama mode. Calls use /api/generate and need a running model and allowed browser origin. The suggested qwen3:4b model is editable. Live questions require valid source fields and exact quotes; unverifiable citations are rejected. Connection/model errors are explicit. This integration is implemented but has not been verified against a running model. There is no silent fallback presented as live AI.

## AI Viva Assistant & Portfolio RAG Bot

The Team Portfolio view (`HOD -> Department -> Team Portfolio`) includes a floating, low-compute AI Assistant (`💬 AI Viva Assistant`) designed to assist evaluators, faculty, and students during project viva examinations and portfolio reviews.

### Architecture & Zero-Compute Design
- **100% In-Browser Knowledge Extraction & BM25 Retrieval**: Chunks all Gate 0 and Gate 1 portfolio elements (Tables 0.1–0.5, Figures 0.1–1.2, Engines E1–E4, Functional Requirements FR-01–08, Non-Functional Requirements NFR-01–10, Tech Stack, and Test Suite Matrix Table 1.3) directly in the browser's JavaScript memory. **0 Vercel server memory or CPU is consumed for vector search or database indexing.**
- **Interactive Deep-Linking Citation Pills**: Every generated answer provides clickable citation tags (e.g., `[FR-01]`, `[Table 0.4]`, `[Engine E2]`). Clicking any pill automatically scrolls the portfolio smoothly to the exact verified table or diagram and triggers a glowing CSS pulse highlight.
- **Cascading Fallback Chain (Auto Mode)**:
  1. **Vercel Serverless Function** (`/api/chat` with Google Gemini 2.0/1.5 Flash).
  2. **Direct Google Gemini API** (Client-side with user-provided API key and model fallback).
  3. **Ollama Cloud / Remote API** (with free cloud usage credits and Bearer token).
  4. **Smart Extractive RAG Synthesizer** (Instant, zero-compute offline fallback requiring 0 API keys and 0 network calls).

---

### All Network Routes & Endpoints Used by the Bot

| Route / Endpoint | Method | Provider / Target | Purpose & Payload |
|---|---|---|---|
| **`/api/chat`** | `POST` | Vercel Serverless Function (`api/chat.js`) | Proxies prompts securely to Google Gemini using server-side `GEMINI_API_KEY`.<br>**Request:** `{ "prompt": string, "systemInstruction": string }`<br>**Response:** `{ "text": string, "provider": string }` or `{ "useFallback": true }` |
| **`https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={key}`** | `POST` | Google Generative AI (Direct API) | Direct client-side Gemini generation when a key is provided in Settings.<br>Tries models in order: `gemini-3.8-flash`, `gemini-2.0-flash`, `gemini-2.5-flash`, `gemini-1.5-flash`.<br>**Request:** `{ "contents": [...], "generationConfig": { "temperature": 0.2, "maxOutputTokens": 900 } }` |
| **`https://generativelanguage.googleapis.com/v1/models/{model}:generateContent?key={key}`** | `POST` | Google Generative AI (`v1` endpoint fallback) | Fallback for Gemini models exposed under the standard `v1` endpoint. |
| **`https://ollama.com/api/chat`** | `POST` | Ollama Cloud / Remote API | Chat completions for cloud models using free credits.<br>**Headers:** `Authorization: Bearer <token>`, `Content-Type: application/json`<br>**Request:** `{ "model": "gpt-oss:20b", "messages": [...], "stream": false }`<br>**Response:** `{ "message": { "content": "..." } }` |
| **`https://ollama.com/api/generate`** | `POST` | Ollama Cloud / Local Ollama fallback | Raw prompt generation fallback if `/api/chat` is not supported.<br>**Request:** `{ "model": "gpt-oss:20b", "prompt": "...", "stream": false }`<br>**Response:** `{ "response": "..." }` |
| **`http://localhost:11434/api/chat`** and **`/api/generate`** | `POST` | Local Self-Hosted Ollama | Local instance fallback when running an Ollama daemon locally. |
| **In-Memory (No Network)** | `N/A` | Smart Extractive RAG | Zero-compute, zero-latency deterministic extraction directly from BM25 retrieved portfolio chunks. |

---

### Supported Ollama Cloud Models (Free Credits)

Users can select or type any of the following models in the ⚙️ Settings dialog:
- 🥇 **`gpt-oss:20b`** *(Default / Recommended)*: High reasoning speed, concise markdown, perfect citation tag adherence.
- 🥈 **`gemma4:31b`**: Google's open architecture, excellent for deep technical and system architecture queries.
- 🥉 **`gpt-oss:120b`**: Flagship heavy reasoning model for complex algorithmic trade-offs.
- ⚡ **`nemotron-3-nano:30b`**: NVIDIA efficient model for crisp tabular summaries.
- ⚡ **`nemotron-3-super`** & **`nemotron-3-ultra`**: NVIDIA large-parameter enterprise models.
- 🚀 **`beam`**: Ultra-lightweight model for high-speed instant response.

---

### Citation Deep-Linking Anchor IDs in the Portfolio

The bot links citations directly to the following verified DOM elements:

| Citation Tag | Target Element ID | Portfolio Section |
|---|---|---|
| `[Table 0.1: Course Mapping]` | `table-courses` | Semester 5 Course-to-Engine Mapping |
| `[Table 0.2: Pipeline Matrix]` | `table-pipeline` | 7-Stage Architectural Pipeline |
| `[Stage 0: Problem Statement]` | `sec-problem` | Problem Statement & Baseline Friction |
| `[Figure 0.1: Use Case Diagram]` | `portfolio-diagram-usecase` | UML Use Case Diagram (Gate 0) |
| `[Figure 0.2: AS-IS Workflow]` | `portfolio-diagram-asis` | AS-IS Swimlane Workflow Diagram |
| `[Table 0.4: Scope Boundaries]` | `table-scope` | In-Scope & Out-of-Scope Boundaries |
| `[Table 0.5: Feasibility]` | `table-feasibility` | Feasibility & Resource Assessment |
| `[Stage 1: Architecture & Workflow]` | `sec-arch` | Multi-tier Architecture & Operational Pipeline |
| `[Figure 1.1: Architecture Diagram]` | `portfolio-diagram-arch` | System Architecture Diagram |
| `[Figure 1.2: DFD Diagram]` | `portfolio-diagram-dfd` | Level 1 Data Flow Diagram (DFD) |
| `[Engine E1]` .. `[Engine E4]` | `portfolio-engine-E1` .. `portfolio-engine-E4` | Core Decoupled Modular Engines |
| `[FR-01]` .. `[FR-08]` | `portfolio-fr-FR-01` .. `portfolio-fr-FR-08` | Functional Requirements Table 1.1 |
| `[NFR-01]` .. `[NFR-10]` | `portfolio-nfr-NFR-01` .. `portfolio-nfr-NFR-10` | Non-Functional Requirements Table 1.2 |
| `[Tech Stack]` | `sec-techstack` | Technologies & Tools Stack |
| `[Table 1.3: Test Matrix]` | `table-testsuite` | Acceptance Verification Test Cases |

---

### Bot Configuration (Settings Modal)
Inside the chat drawer, clicking the **⚙️ Settings** icon allows configuring:
1. **Generation Provider**: `Auto` (Gemini → Ollama Cloud → Offline), `Ollama Cloud`, `Google Gemini`, or `Smart Extractive RAG`.
2. **Google Gemini API Key & Model**: Enter a custom API key and model (defaults to `gemini-3.8-flash`). Keys are saved strictly in the user's browser `localStorage` (`pg_gemini_key`).
3. **Ollama Cloud Endpoint URL & Model**: Defaults to `https://ollama.com/api` and `gpt-oss:20b`.
4. **Ollama Bearer Token**: Enter token for authenticated Ollama Cloud accounts (`pg_ollama_token`).

All configuration is client-isolated in `localStorage` and never committed or transmitted to any third-party server beyond the selected LLM provider.

---

## Storage and verification

Team workspaces are isolated and saved in this browser's localStorage. Evidence binaries use IndexedDB. JSON exports contain forms, messages, profile photos and evidence metadata/URLs, but not image/video evidence binaries; download those separately. Clearing browser data removes saved work. Reset starts a fresh demonstration and reseeds the cases on rendering.

Checks cover roster import validation and actual XLSX parsing, per-team persistence and faculty access, the three cases, ten answered viva questions, shared inline feedback, and independent faculty unlocks. Browser checks cover Excel preview/import, HOD/student feedback visibility, file persistence and WebM decoding. Dummy upload fixtures were removed.

No production login, server database, cloud synchronization, or automated academic grading is claimed.

