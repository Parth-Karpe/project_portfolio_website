# ProjectGate AI

ProjectGate AI is a browser application for mini-project portfolios, faculty review, and viva practice. Students keep a stage-wise portfolio. Faculty review those stages. An AI mentor asks project-specific questions and grades descriptive answers against the portfolio, not against a generic textbook.

The app is a static site in `dist/`. A small Node server (`server.js`) and the Vercel function `api/chat.js` exist only to proxy model calls that the browser cannot make directly.

This document describes the code as it runs today. `README.md` and `PROJECT_SPECIFICATION.md` still describe an earlier demo (two design-journey stages, Gemini-first chat, Ollama-first viva). Where they disagree with this file, follow this file.

## Run it

From the project root:

```bat
run.bat
```

or:

```bat
node server.js 4174
```

Open http://127.0.0.1:4174.

`run.bat` uses Node when it is installed, because only the Node server exposes `/api/chat`. A plain Python static server can show the pages, but Kilo and the Gemini server fallback will not run.

HTML, CSS, and JavaScript are sent with `Cache-Control: no-store`. After a code change, reload the page. Script URLs also carry a `?v=` query so an old file is not reused.

Optional environment file `.env` in the project root (never commit it):

| Variable | Used by |
| --- | --- |
| `GEMINI_API_KEY` | `/api/chat` when the browser has no Gemini key |
| `OLLAMA_API_KEY` | `/api/chat` Ollama Cloud calls |
| `PORT` | Listen port if you do not pass one on the command line |

Deploy the same `dist/` folder on Vercel (`vercel.json` sets `outputDirectory` to `dist`). Put `GEMINI_API_KEY` in the Vercel project environment and redeploy after any change to `api/chat.js`.

## Repository map

| Path | Role |
| --- | --- |
| `dist/index.html` | Single page. Loads Firebase, portfolio data, persona modules, and `portfolio-rag.js`. |
| `dist/app.js` | Shell navigation, role switcher, design-journey forms, offline viva coach. |
| `dist/workspace.js` | Team workspace and settings page host. |
| `dist/department.js` | Department view and the rendered portfolio (Stage 0 through Stage 4 sections). |
| `dist/faculty.js` | Faculty review inbox, comments, approve / revise. |
| `dist/projector.js` | Presentation / projector layout. |
| `dist/ai-settings-page.js` | Settings tab for the mentor engine and keys. |
| `dist/portfolio-rag.js` | Mentor chat, question banks, retrieval, and descriptive grading. |
| `dist/firebase-db.js` | Firestore read/write for team forms and reviews. |
| `dist/data/team_*.js` | Static portfolio records for demo teams. |
| `dist/data/persona/` | Persona question rules. Only the Foundational CS files are in this tree. |
| `dist/data/sdd-kb.js` | Software-design knowledge base used by the SDD views. |
| `api/chat.js` | Server proxy: Kilo, Gemini, Ollama. |
| `server.js` | Local static host plus `/api/chat`. |
| `docs/sdd/` | Templates for the software-design document views. |
| `google_sites_apps_script/` | Seed CSVs for an older Google Sheets roster. |

`dist/index.html` also requests `auth.js` and three persona files that are not in this checkout:

- `data/persona/systems_thinking_knowledge.js`
- `data/persona/systems_thinking_rules.js`
- `data/persona/engineering_standards_knowledge.js`
- `data/persona/engineering_standards_rules.js`

Those script tags fail quietly. The mentor then uses the banks built inside `portfolio-rag.js` for Systems Thinking and Engineering Standards. Foundational CS uses `foundational_cs_rules.js` when that file loads.

## Who uses it

The role switcher is a demonstration control. It is not a login system.

| Role | What they can do |
| --- | --- |
| Team Lead | Edit the shared team workspace, submit stages, practice with the mentor, answer viva questions. |
| Faculty | Review assigned teams, comment, approve or send a stage back, open the mentor. |
| Faculty Admin | Allocate guides. Read-only on academic content. |
| HOD | Read the department: portfolios, progress, comments, viva records. |
| Admin | Import and export the roster, set department ownership. |

Roster import is local. The Admin panel reads `.xlsx`, `.xls`, or `.csv` in the browser with SheetJS. A bad row rejects the whole file. Matching team IDs are updated. Other teams, and existing stage text, stay.

Team form state can also sync to Cloud Firestore (`teams/{teamId}`) through `firebase-db.js`. If the Firebase script does not load, the app keeps working from this browser only.

## Portfolio stages

The portfolio and the mentor stage selector use five stages:

| Key | Label |
| --- | --- |
| `0` | Stage 0 — Problem definition and scope |
| `1` | Stage 1 — Requirement analysis |
| `system-design` | Stage 2 — System design |
| `2` | Stage 3 — Implementation and integration |
| `3` | Stage 4 — Testing and validation |

Stage 0 and Stage 1 are the stages with faculty question banks. Later stages still appear in the portfolio and in the revise-section map, but `facultyBank()` only returns questions for `'0'` and `'1'`.

A Stage 0 portfolio is chunked into citations the mentor can point at: problem statement, objectives, Table 0.1 (courses), Table 0.2, Table 0.3, engines E1–E4, Table 0.4 (scope), Table 0.5 (feasibility), and the AS-IS diagram. Stage 1 chunks are functional requirements, non-functional requirements, use cases, and the test matrix.

The older design-journey form in `app.js` still has its own Stage 1 / Stage 2 fields (`problem`, `objectives`, `functional`, and so on). That form is the workspace draft. The portfolio pages are the structured Gate 0 / Gate 1 record.

## AI mentor

The mentor lives in `dist/portfolio-rag.js`. It is opened from the portfolio and from the mentor dashboard.

Five lenses (personas):

| Persona | What a question is about |
| --- | --- |
| Systems Thinking | Need, boundary, and flow |
| Foundational CS Knowledge | A course idea applied to this project |
| Faculty Expertise | A defense question from objectives, requirements, and tests |
| Engineering Standards | Quality targets and how the portfolio says they are checked |
| Theme-Based Expertise | Why the project belongs to its theme |

Each persona, for Stage 0 and Stage 1, has five multiple-choice questions and five descriptive questions.

### Where the questions come from

1. `STAGE0_BANK` and `STAGE1_BANK` in `portfolio-rag.js` are the default faculty banks.
2. `facultyBank(stage)` replaces Systems Thinking, Foundational CS, and Engineering Standards when a matching `stageTemplates` object exists on the persona rules module.
3. In this checkout, only `dist/data/persona/foundational_cs_rules.js` is present. Its Stage 0 descriptive ids are `CS0-D1` … `CS0-D5`. Stage 1 ids are `CS1-D1` … `CS1-D5`.
4. `enrichDescriptiveQuestionFromPortfolio()` binds a template to this team's tables and engines. The student sees the template prompt. The model also receives portfolio hints and rubric points. The sentence "Ground your answer in …" is stripped and is not shown.

Example, Foundational CS Stage 0, `CS0-D2`:

- Prompt: explain how a data structure or algorithm supports an important operation.
- Points the model must look for: name the operation, name the structure or algorithm, explain how it supports that operation.
- Artifacts: engine chunks and Table 0.3 (`DESCRIPTIVE_TEMPLATE_ARTIFACTS`).

MCQ right/wrong for Foundational CS can go through `evaluationRules.evaluateSubmission` in the same rules file. That function compares the chosen letter or text with the stored correct option. It does not grade descriptive answers.

### Multiple choice

A persona MCQ round is five questions from the bank, grounded in the active team's portfolio. The correct option index is on the bank item. A saved unfinished round is restored from `sessionStorage` until it is submitted.

### Descriptive round

Descriptive practice is sequential.

- The pool is the five bank questions for that persona and stage.
- The student sees one question at a time.
- A satisfactory answer counts toward the target of **4** passing answers (`DESCRIPTIVE_PASS_TARGET`).
- Each question allows **3** attempts (`DESCRIPTIVE_MAX_ATTEMPTS`). A fail stays on that question until the cap, then the round moves on.
- An attempt is not counted when the model returns no grade at all.
- The card shows the result, the marks, one short note, and the missing points. It does not show a local word-overlap parser.

Marks:

| Rule | Value |
| --- | --- |
| Scale | 5 |
| Full marks | conceptual correctness at least 70% (`DESCRIPTIVE_FULL_MARKS_RATIO`) |
| Pass | conceptual correctness at least 50% (`DESCRIPTIVE_PASS_RATIO`) |
| Otherwise | `round(ratio × 5)`, and never 5 |

Those thresholds are applied in `reconcileDescriptiveQuestionMarks()` from the model's `conceptualCorrectness` (or from `marksEarned / marksMax` if the percent is missing). The local overlap helper `descriptiveFeedback()` is still in the file and is not what the card uses.

The instruction sent to the model is built in `reviewDescriptiveWithLlm()`. It asks for a JSON array:

```json
[{
  "id": 0,
  "supported": true,
  "conceptualCorrectness": 0.85,
  "missing": [],
  "note": "one sentence",
  "suggestion": "",
  "marksEarned": 5,
  "marksMax": 5
}]
```

The model is told to accept abbreviations (OS, DBMS, DAA, DSA, POCD, CN), to accept a rubric point when the idea is present in different words, and to name specific portfolio courses or concepts in the suggestion when the answer fails. `parseModelJsonArray()` pulls that array out of markdown fences or a `<think>` block.

### Chat answers

Portfolio chat retrieval is in-browser. The mentor chunks the active portfolio, scores chunks, and asks the model to answer only from those chunks, with citation tags such as `[FR-01]` or `[Table 0.1]`. If every model call fails, `synthesizeExtractiveAnswer()` quotes the retrieved chunks with no network call.

Choosing **Offline extractive RAG** in settings skips the models entirely.

## Model order

Every mentor call (chat, MCQ generation, descriptive grade) uses `llmTextWithGeminiFirst()`:

1. **OVHcloud** anonymous chat, model `Qwen3.6-27B`.
   - `POST https://oai.endpoints.kepler.ai.cloud.ovh.net/v1/chat/completions`
   - No API key. The browser calls it directly (`Access-Control-Allow-Origin: *`).
   - About 2 requests per minute per IP per model.
   - The request asks for at least 4096 output tokens. Below that, this model spends the budget on a `reasoning` field and leaves `content` empty, which the app treats as no answer.
2. **Kilo** `kilo-auto/free`, only if OVH returns no usable text.
   - The browser calls `POST /api/chat` with `provider: "kilo"`.
   - The server calls `https://ai-gateway.kilo.ai/api/v1/chat/completions` with `Authorization: Bearer anonymous`.
   - Kilo does not allow a browser call (no CORS header), so the proxy is required.
   - About 200 requests per hour per server IP. Do not put passwords or private personal data in answers. Kilo may log prompts.
3. **Gemini `gemini-3.8-flash`**, only if both OVH and Kilo return no text.
   - If `pg_gemini_key` is set, the browser calls `generativelanguage.googleapis.com` directly.
   - Otherwise `/api/chat` with `provider: "gemini"` uses `GEMINI_API_KEY`.
   - Busy responses (503, 429, 500) retry up to four times on that same model. A 404 does not switch to Gemini 2.5.

For a descriptive grade, if OVH replies with text that is not a grade JSON array, the app asks Kilo once for JSON. Gemini is not called merely because the JSON parse failed. Gemini runs only when there is still no text.

`/api/chat` also accepts `provider: "ollama"`, `"gemini"`, and `"auto"` for older clients. Auto tries Gemini, then Ollama, then returns `useFallback: true`. The mentor does not use auto mode. Prompts longer than 4000 characters are rejected with `useFallback`.

Settings that control this are stored only in the browser:

| Key | Meaning |
| --- | --- |
| `pg_llm_provider` | `free` (OVH, then Kilo, then Gemini) or `extractive` (offline) |
| `pg_gemini_key` | Browser Gemini key, used only as the last fallback |
| `pg_gemini_model` | Stored model id. The fallback call forces `gemini-3.8-flash` |
| `pg_ollama_url`, `pg_ollama_model`, `pg_ollama_token` | Used by `/api/chat` Ollama paths, not by the current mentor chain |

## What is saved where

| Store | Key | Contents |
| --- | --- | --- |
| `localStorage` | `projectgate-v1` | Role, active team, design-journey forms, reviews |
| `localStorage` | `pg_llm_*` | Mentor settings above |
| `sessionStorage` | `pg_assess_{team}_{persona}_{stage}_{kind}` | The current MCQ or descriptive round |
| `sessionStorage` | `pg_faculty_monitor_{teamId}` | Last 50 descriptive grade snapshots. Read with `getFacultyAssessmentMonitor(teamId)` |
| `sessionStorage` | `pg_quiz_{teamId}` | Active portfolio quiz card |
| IndexedDB | `projectgate-evidence` | Architecture images and demo videos |
| Firestore | `teams/{teamId}` | Forms, stage statuses, reviews, when Firebase is available |

Clearing site data removes the local workspace. Firestore copies remain until deleted in the Firebase console.

## `/api/chat` contract

`POST /api/chat`

```json
{
  "provider": "kilo",
  "prompt": "student or mentor prompt, max 4000 characters",
  "systemInstruction": "optional",
  "maxOutputTokens": 1024,
  "geminiKey": "",
  "geminiModel": "gemini-3.8-flash",
  "ollamaToken": "",
  "ollamaModel": "gpt-oss:20b",
  "ollamaUrl": "https://ollama.com/api"
}
```

Success:

```json
{ "text": "...", "provider": "Kilo (kilo-auto/free)" }
```

Failure that the client can recover from:

```json
{ "useFallback": true, "error": "reason" }
```

`OPTIONS` returns 200 and is used as a liveness check (`pg_api_available`, cached for one hour).

## Demo teams

Static portfolios are loaded from `dist/data/team_01.js`, `team_03.js`, `team_04.js`, `team_05.js`, `team_06.js`, `team_07.js`, `team_08.js`, `team_12.js`, `team_13.js`, `team_14.js`, `team_a07.js`, `team_b01.js`, and `team_b10.js`. They are sample academic projects (timetable scheduling, a small database engine, plant-disease detection, and others). They are not live assessment records.

The three scripted faculty-review cases in the older README (teams 03, 07, and 12) are still seeded by `demo-cases.js` for the design-journey demonstration.

## Checks that already exist

`test-mentor.js` is a Node script of mentor assertions. It is not a browser test. There is no automated suite that drives the descriptive grade through OVH or Kilo.

When you change mentor behavior, reload http://127.0.0.1:4174 and submit one descriptive answer. Confirm the first network call is OVH `chat/completions`, and that a Gemini `generateContent` call appears only after both OVH and Kilo returned nothing.
