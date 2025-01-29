import base64
import json
from googleapiclient.discovery import build
from google.oauth2 import service_account
from googleapiclient.http import MediaIoBaseDownload
import io
import os

# Autenticación
SCOPES = ['https://www.googleapis.com/auth/drive.readonly']
SERVICE_ACCOUNT_FILE = 'service_account.json'

creds = service_account.Credentials.from_service_account_file(
  SERVICE_ACCOUNT_FILE, scopes=SCOPES)
service = build('drive', 'v3', credentials=creds)
file_name = 'app-release.apkt'

# Buscar el archivo por nombre
results = service.files().list(
    q=f"name = '{file_name}'",
    fields="files(id, name)"
).execute()

files = results.get('files', [])

if not files:
    print(f"No se encontró el archivo con el nombre '{file_name}'.")
else:
    file_id = files[0]['id']  # Obtener el ID del primer archivo que coincida
    print(f"Archivo encontrado: {file_name}, ID: {file_id}")
    
    # Descargar el archivo
    request = service.files().get_media(fileId=file_id)
    fh = io.FileIO(file_name, 'wb')

    downloader = MediaIoBaseDownload(fh, request)
    done = False
    while done is False:
        status, done = downloader.next_chunk()
        print(f'Descargando {int(status.progress() * 100)}%.')
    
    print('Archivo descargado con éxito!')
          
