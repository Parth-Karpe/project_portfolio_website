"""
ProjectGate AI — Google Sheets API Bulk Filler (Python)
Reads all CSV files from ./sheets_seed_csv/ and writes them
into a Google Spreadsheet using the Google Sheets API v4 (via gspread).

Prerequisites:
  pip install gspread google-auth

Setup (Google Cloud Console):
  1. Enable "Google Sheets API" and "Google Drive API".
  2. Create a Service Account and download its JSON key as "service_account.json"
     in the same folder as this script (or pass --creds).
  3. Share your Google Sheet (Editor access) with the Service Account's
     client_email (found inside service_account.json).

Usage:
  python fill_google_sheets.py --sheet-id YOUR_SPREADSHEET_ID
  python fill_google_sheets.py --sheet-url "https://docs.google.com/spreadsheets/d/YOUR_ID/edit"
"""

import argparse
import csv
from pathlib import Path

import gspread
from google.oauth2.service_account import Credentials

SCOPES = [
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/drive",
]

DEFAULT_CSV_DIR = Path(__file__).resolve().parent / "sheets_seed_csv"

# Ensure all ProjectGate tabs exist (including empty operational tabs)
EXTRA_EMPTY_TABS = {
    "Documents": [
        "document_id", "project_id", "uploaded_by", "document_type",
        "file_name", "drive_file_id", "drive_url", "caption", "stage", "uploaded_at"
    ],
    "VivaRecords": [
        "viva_id", "project_id", "stage_number", "submitted_by",
        "questions_json", "answers_json", "mode", "submitted_at"
    ],
    "Discussions": [
        "message_id", "project_id", "author_name", "author_role",
        "topic", "message", "created_at"
    ],
    "Settings": [
        "key", "value", "updated_at"
    ],
    "Activities": [
        "activity_id", "project_id", "actor", "action", "created_at"
    ],
}


def load_csv_rows(csv_path: Path) -> list[list[str]]:
    with csv_path.open("r", encoding="utf-8-sig", newline="") as f:
        return list(csv.reader(f))


def get_or_create_worksheet(spreadsheet: gspread.Spreadsheet, title: str, rows: int, cols: int):
    try:
        ws = spreadsheet.worksheet(title)
        ws.clear()
        if ws.row_count < rows or ws.col_count < cols:
            ws.resize(rows=max(rows, 100), cols=max(cols, 15))
        return ws
    except gspread.WorksheetNotFound:
        return spreadsheet.add_worksheet(title=title, rows=max(rows, 100), cols=max(cols, 15))


def style_header(ws: gspread.Worksheet, col_count: int) -> None:
    if col_count <= 0:
        return
    last_col_letter = gspread.utils.rowcol_to_a1(1, col_count)
    ws.format(
        f"A1:{last_col_letter}",
        {
            "backgroundColor": {"red": 0.31, "green": 0.27, "blue": 0.90},
            "textFormat": {"bold": True, "foregroundColor": {"red": 1, "green": 1, "blue": 1}},
        },
    )
    ws.freeze(rows=1)


def fill_spreadsheet(spreadsheet: gspread.Spreadsheet, csv_dir: Path, init_empty_tabs: bool = True) -> None:
    csv_files = sorted(csv_dir.glob("*.csv"))
    if not csv_files:
        raise FileNotFoundError(f"No CSV files found in {csv_dir}")

    for csv_path in csv_files:
        tab_name = csv_path.stem
        rows = load_csv_rows(csv_path)
        if not rows:
            print(f"Skipping empty CSV: {csv_path.name}")
            continue

        ws = get_or_create_worksheet(spreadsheet, tab_name, len(rows) + 20, len(rows[0]) + 2)
        ws.update(range_name="A1", values=rows, value_input_option="RAW")
        style_header(ws, len(rows[0]))
        print(f"Populated '{tab_name}': {len(rows) - 1} data rows")

    if init_empty_tabs:
        existing_titles = {ws.title for ws in spreadsheet.worksheets()}
        for tab_name, headers in EXTRA_EMPTY_TABS.items():
            if tab_name not in existing_titles:
                ws = spreadsheet.add_worksheet(title=tab_name, rows=100, cols=len(headers) + 2)
                ws.update(range_name="A1", values=[headers], value_input_option="RAW")
                style_header(ws, len(headers))
                print(f"Created empty tab '{tab_name}' with headers")

    # Remove default Sheet1 if other tabs exist
    try:
        sheet1 = spreadsheet.worksheet("Sheet1")
        if len(spreadsheet.worksheets()) > 1 and not sheet1.get_all_values():
            spreadsheet.del_worksheet(sheet1)
    except gspread.WorksheetNotFound:
        pass


def main() -> None:
    parser = argparse.ArgumentParser(description="Fill ProjectGate AI Google Sheets DB via API.")
    group = parser.add_mutually_exclusive_group(required=True)
    group.add_argument("--sheet-id", help="Target Google Spreadsheet ID")
    group.add_argument("--sheet-url", help="Target Google Spreadsheet full URL")
    parser.add_argument(
        "--creds",
        default="service_account.json",
        help="Path to Google Service Account JSON key (default: service_account.json)",
    )
    parser.add_argument(
        "--csv-dir",
        default=str(DEFAULT_CSV_DIR),
        help="Directory containing CSV files (default: ./sheets_seed_csv)",
    )
    args = parser.parse_args()

    creds_path = Path(args.creds)
    if not creds_path.exists():
        raise FileNotFoundError(
            f"Credentials file not found: {creds_path}\n"
            "Download a Service Account JSON key from Google Cloud Console and share the Sheet with its client_email."
        )

    creds = Credentials.from_service_account_file(str(creds_path), scopes=SCOPES)
    client = gspread.authorize(creds)

    spreadsheet = client.open_by_key(args.sheet_id) if args.sheet_id else client.open_by_url(args.sheet_url)
    print(f"Connected to spreadsheet: {spreadsheet.title}")

    fill_spreadsheet(spreadsheet, Path(args.csv_dir))
    print(f"Done! Open sheet: {spreadsheet.url}")


if __name__ == "__main__":
    main()
