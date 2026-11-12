# ProjectGate AI — Google Sites, Apps Script, Sheets & Drive Deployment Guide

This folder contains the **full-featured ProjectGate AI platform** rebuilt for **Google Sites + Google Apps Script + Google Sheets + Google Drive**, supporting all **31 teams across Themes 1–6**, **119 students**, **15 faculty guides**, **5-stage (0–4) design journey gating**, **Split-Screen AI Mentor**, **Floating BM25 Viva RAG Assistant**, **SheetJS Excel/CSV roster import/export**, and **Drive evidence uploads**.

---

## 1. Files in `google_sites_apps_script/`

Create these exact files inside your Google Apps Script project (**Extensions -> Apps Script** inside your Google Sheet, or standalone at `script.google.com`):

| Apps Script File | Type | Source File Here |
| --- | --- | --- |
| `Code.gs` | Script (`.gs`) | `Code.gs` |
| `SeedCohort.gs` | Script (`.gs`) | `SeedCohort.gs` |
| `index` | HTML (`index.html`) | `index.html` |
| `styles` | HTML (`styles.html`) | `styles.html` |
| `app_client` | HTML (`app_client.html`) | `app_client.html` |
| `rag_mentor` | HTML (`rag_mentor.html`) | `rag_mentor.html` |

> **Important:** In Apps Script HTML file names, create them **without** `.html` suffix (Apps Script displays `styles.html` when you enter `styles`). `Code.gs` calls `include('styles')`, `include('app_client')`, and `include('rag_mentor')`.

---

## 2. Database Setup & Populating All 31 Teams

You have three ways to fill your Google Sheet (pick **one**):

### Option A — One-Click Inside Apps Script (Easiest)
1. In Apps Script editor, select `resetAndFillGoogleSheetsDB` (from `SeedCohort.gs`) and click **Run**.
2. Grant Google Sheets & Drive permissions when prompted.
3. All **11 tabs** (`Students`, `Teams`, `TeamMembers`, `Projects`, `Documents`, `Faculty`, `StageSubmissions`, `VivaRecords`, `Discussions`, `Settings`, `Activities`) are created, headers styled, and populated with **31 teams, 119 students, 15 faculty guides, and 155 Stage 0–4 rows**.

### Option B — Import Updated CSVs Manually into Your Sheet
1. Open your Google Sheet and import (`File -> Import -> Replace current sheet`) the regenerated CSVs from `sheets_seed_csv/`:
   - `Faculty.csv`
   - `Students.csv`
   - `Teams.csv`
   - `TeamMembers.csv`
   - `Projects.csv`
   - `StageSubmissions.csv`
2. Then run `setupProjectGate()` once in Apps Script so `ROOT_FOLDER_ID` and any missing operational tabs (`Documents`, `VivaRecords`, `Discussions`, `Settings`, `Activities`) are created.

### Option C — Bulk Upload via Python API (`fill_google_sheets.py`)
```bash
pip install gspread google-auth
python fill_google_sheets.py --sheet-url "YOUR_GOOGLE_SHEET_URL"
```

---

## 3. Uploading Diagram Assets (`assets/`) to Google Drive (Optional)

Teams with diagram images (`assets/team03_architecture_doc.png`, etc.) display live Drive previews automatically if those images are uploaded to Drive:
```bash
pip install gspread google-auth google-api-python-client
python upload_drive_assets.py --sheet-url "YOUR_GOOGLE_SHEET_URL"
```
This uploads `../dist/assets/*` to a `ProjectGate_Assets` folder in Drive and saves `asset_map_json` in the `Settings` sheet tab. Students can also upload diagrams directly inside the **Design Journey** and **Evidence Library** UIs.

---

## 4. Optional Live Gemini AI Configuration

Even without an API key, the **Floating AI Viva Assistant** and **5-Dimension AI Mentor** work automatically using **Zero-Key BM25 Grounded Portfolio RAG**.

To enable Gemini responses without exposing your API key in the browser:
1. Apps Script Editor -> **Project Settings** -> **Script Properties**.
2. Add property:
   - `GEMINI_API_KEY` = your Google AI Studio key
   - `GEMINI_MODEL` = `gemini-2.0-flash` (optional)

Users can also choose their provider mode (Auto / Client Gemini Key / Zero-Key BM25) inside the drawer's `⚙️` settings panel.

---

## 5. Deploy & Embed in Google Sites

1. In Apps Script -> **Deploy -> New deployment -> Web app**.
   - **Execute as**: `Me`
   - **Who has access**: `Anyone` (recommended for Google Sites embedding) or `Anyone within <organization>`.
2. Copy the Web App URL (`https://script.google.com/macros/s/YOUR_DEPLOY_ID/exec`).
3. In **Google Sites**:
   - Click **Insert -> Embed -> By URL**.
   - Either embed **one single full-page workspace** using the base `/exec` URL (and use the built-in Role & Team switchers), OR create separate Google Sites navigation pages using server-side deep-links:
     - **Department / HOD Page**: `.../exec?page=department`
     - **Student Workspace**: `.../exec?page=student&usn=01FE24BCI029`
     - **Faculty Review Queue**: `.../exec?page=faculty&faculty=FAC-09`
     - **Featured Team Portfolio (Team A-03)**: `.../exec?page=portfolio&team=A-03`
     - **Admin & Roster Import**: `.../exec?page=admin`
4. Resize the embed block to full width and tall height (`900px–1200px`), then click **Publish** in Google Sites.
