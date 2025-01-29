import base64
import json
from googleapiclient.discovery import build
from google.oauth2 import service_account
from googleapiclient.http import MediaIoBaseDownload
import io
import os

SCOPES = ['https://www.googleapis.com/auth/drive.readonly']
SERVICE_ACCOUNT_FILE = 'service_account.json'

creds = service_account.Credentials.from_service_account_file(
  SERVICE_ACCOUNT_FILE, scopes=SCOPES)
service = build('drive', 'v3', credentials=creds)
file_name = 'app-release.apk'

results = service.files().list(
    q=f"name = '{file_name}'",
    fields="files(id, name)"
).execute()

files = results.get('files', [])

if not files:
    print(f"Not Found '{file_name}'.")
else:
    file_id = files[0]['id']  
    print(f"Found: {file_name}, ID: {file_id}")

    path = './android/app/build/outputs/apk/release/'
    os.makedirs(path, exist_ok=True)

    request = service.files().get_media(fileId=file_id)
    fh = io.FileIO(path+file_name, 'wb')

    downloader = MediaIoBaseDownload(fh, request)
    done = False
    while done is False:
        status, done = downloader.next_chunk()
        print(f'Downloading ... {int(status.progress() * 100)}%.')
    
    print('Success!')
          
