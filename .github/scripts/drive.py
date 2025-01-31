import base64
import json
from google.oauth2.service_account import Credentials
from googleapiclient.discovery import build
from googleapiclient.http import MediaFileUpload, MediaIoBaseDownload

import os
import sys

SERVICE_ACCOUNT_JSON_BASE64 = os.getenv("SERVICE_ACCOUNT_BASE64")

if not SERVICE_ACCOUNT_JSON_BASE64:
    print("ERROR: La variable de entorno SERVICE_ACCOUNT_JSON_BASE64 no está configurada.")
    sys.exit(1)

creds_json = base64.b64decode(SERVICE_ACCOUNT_JSON_BASE64).decode('utf-8')

creds_dict = json.loads(creds_json)
credentials = Credentials.from_service_account_info(creds_dict, scopes=["https://www.googleapis.com/auth/drive"])
service = build("drive", "v3", credentials=credentials)


def subir_archivo(file_path, folder_id=None):
    file_metadata = {"name": os.path.basename(file_path)}
    if folder_id:
        file_metadata["parents"] = [folder_id]

    media = MediaFileUpload(file_path, resumable=True)
    file = service.files().create(body=file_metadata, media_body=media, fields="id").execute()
    print(f"✅ File uploaded with ID: {file.get('id')}")
    return file.get("id")  
        
def descargar_archivo(file_id, output_path):
    dir, file = os.path.split(output_path)
    os.makedirs(dir, exist_ok=True)
    request = service.files().get_media(fileId=file_id)
    with open(output_path, "wb") as f:
        downloader = MediaIoBaseDownload(f, request)
        done = False
        while not done:
            status, done = downloader.next_chunk()
            print(f"🔄 Download {int(status.progress() * 100)}% ")

    print(f"✅ File downloaded to : {output_path}")


if len(sys.argv) < 3:
    print("Who:")
    print("  Upload:   python script.py upload path_to_file")
    print("  Download:   python script.py download file_id output_path")
    sys.exit(1)

action = sys.argv[1].lower()

if action == "upload":
    file_path = sys.argv[2]
    subir_archivo(file_path)

elif action == "download":
    if len(sys.argv) < 4:
        print("ERROR: File id and output path are required for download.")
        sys.exit(1)
    file_id = sys.argv[2]
    output_path = sys.argv[3]
    descargar_archivo(file_id, output_path)

else:
    print("ERROR: Unknow command use 'upload' o 'download'.")
    sys.exit(1)