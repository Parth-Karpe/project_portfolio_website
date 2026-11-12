"""
ProjectGate AI — Google Drive Portfolio Asset Uploader (Python)
Uploads architecture, workflow, data design, and use-case diagrams from ../dist/assets/
into Google Drive, shares them link-readable, and stores `asset_map_json` in the
`Settings` tab of your ProjectGate Google Sheet so images render inside Google Sites.

Prerequisites:
  pip install gspread google-auth google-api-python-client

Usage:
  python upload_drive_assets.py --sheet-id YOUR_SPREADSHEET_ID
  python upload_drive_assets.py --sheet-url "https://docs.google.com/spreadsheets/d/YOUR_ID/edit"
"""

import argparse
import json
import mimetypes
import re
from datetime import datetime, timezone
from pathlib import Path

import gspread
from google.oauth2.service_account import Credentials
from googleapiclient.discovery import build
from googleapiclient.http import MediaFileUpload

SCOPES = [
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/drive",
]

DEFAULT_ASSETS_DIR = Path(__file__).resolve().parent.parent / "dist" / "assets"


def extract_sheet_id(url_or_id: str) -> str:
    m = re.search(r"/spreadsheets/d/([a-zA-Z0-9-_]+)", url_or_id)
    return m.group(1) if m else url_or_id.strip()


def find_or_create_folder(drive, folder_name: str, parent_id: str | None = None) -> str:
    q = f"mimeType='application/vnd.google-apps.folder' and name='{folder_name}' and trashed=false"
    if parent_id:
        q += f" and '{parent_id}' in parents"
    resp = drive.files().list(q=q, fields="files(id,name)").execute()
    files = resp.get("files", [])
    if files:
        return files[0]["id"]
    meta = {"name": folder_name, "mimeType": "application/vnd.google-apps.folder"}
    if parent_id:
        meta["parents"] = [parent_id]
    created = drive.files().create(body=meta, fields="id").execute()
    return created["id"]


def main():
    parser = argparse.ArgumentParser(description="Upload ProjectGate diagram assets to Google Drive.")
    parser.add_argument("--sheet-id", help="Target Google Spreadsheet ID")
    parser.add_argument("--sheet-url", help="Target Google Spreadsheet URL")
    parser.add_argument("--creds", default="service_account.json", help="Path to Service Account JSON")
    parser.add_argument("--assets-dir", default=str(DEFAULT_ASSETS_DIR), help="Path to dist/assets directory")
    parser.add_argument("--folder-name", default="ProjectGate_Assets", help="Drive folder name")
    args = parser.parse_args()

    sheet_ref = args.sheet_id or args.sheet_url
    if not sheet_ref:
        raise SystemExit("Pass --sheet-id or --sheet-url.")

    assets_dir = Path(args.assets_dir)
    if not assets_dir.exists():
        raise SystemExit(f"Assets directory not found: {assets_dir}")

    creds = Credentials.from_service_account_file(args.creds, scopes=SCOPES)
    drive = build("drive", "v3", credentials=creds)
    gc = gspread.authorize(creds)
    sh = gc.open_by_key(extract_sheet_id(sheet_ref))

    folder_id = find_or_create_folder(drive, args.folder_name)
    asset_map = {}

    for path in sorted(assets_dir.iterdir()):
        if not path.is_file():
            continue
        mime_type, _ = mimetypes.guess_type(str(path))
        mime_type = mime_type or "application/octet-stream"

        media = MediaFileUpload(str(path), mimetype=mime_type, resumable=True)
        file_meta = {"name": path.name, "parents": [folder_id]}
        uploaded = drive.files().create(body=file_meta, media_body=media, fields="id").execute()
        fid = uploaded["id"]

        drive.permissions().create(
            fileId=fid,
            body={"type": "anyone", "role": "reader"},
        ).execute()

        thumb_url = f"https://drive.google.com/thumbnail?id={fid}&sz=w1600"
        asset_map["assets/" + path.name] = thumb_url
        asset_map[path.name] = thumb_url
        print(f"Uploaded {path.name} -> {thumb_url}")

    # Upsert asset_map_json into Settings worksheet
    try:
        ws = sh.worksheet("Settings")
    except gspread.WorksheetNotFound:
        ws = sh.add_worksheet(title="Settings", rows=50, cols=5)
        ws.append_row(["key", "value", "updated_at"])

    records = ws.get_all_values()
    now = datetime.now(timezone.utc).isoformat()
    payload = json.dumps(asset_map)

    updated = False
    for idx, row in enumerate(records[1:], start=2):
        if row and row[0].strip() == "asset_map_json":
            ws.update(f"A{idx}:C{idx}", [["asset_map_json", payload, now]])
            updated = True
            break
    if not updated:
        ws.append_row(["asset_map_json", payload, now])

    print(f"\nSaved {len(asset_map)//2} asset URLs to Settings!asset_map_json.")


if __name__ == "__main__":
    main()
