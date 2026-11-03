# ProjectGate AI — CS (AI) department demonstration

AI-Powered Interactive Mini-Project Portfolio & Mentoring System

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

## Storage and verification

Team workspaces are isolated and saved in this browser's localStorage. Evidence binaries use IndexedDB. JSON exports contain forms, messages, profile photos and evidence metadata/URLs, but not image/video evidence binaries; download those separately. Clearing browser data removes saved work. Reset starts a fresh demonstration and reseeds the cases on rendering.

Checks cover roster import validation and actual XLSX parsing, per-team persistence and faculty access, the three cases, ten answered viva questions, shared inline feedback, and independent faculty unlocks. Browser checks cover Excel preview/import, HOD/student feedback visibility, file persistence and WebM decoding. Dummy upload fixtures were removed.

No production login, server database, cloud synchronization, live RAG or automated academic grading is claimed.
