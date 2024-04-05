from fastapi import APIRouter, Request, HTTPException, UploadFile, status, File
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from azure.storage.blob.aio import BlobServiceClient
from dotenv import dotenv_values
import logging

config = dotenv_values(".env")
router = APIRouter()

@router.post("/file")
async def create_upload_file(file: UploadFile = File(...)):
    logging.info('Entered /file route')
    logging.info(f"Received file: {file.filename}, Content-Type: {file.content_type}")
    
    azureBlobResponse = await uploadToAzure(file)
    # imageAnalyze = await analyzeImage(file)

    return JSONResponse(status_code=status.HTTP_201_CREATED, content={"message": "File Uploaded and Analyzed"})

async def uploadToAzure(file: UploadFile):
    connect_str = config["AZURE_BLOB_CONNECTION"]
    blob_service_client = BlobServiceClient.from_connection_string(connect_str)
    container_name = "image-blob"

    async with blob_service_client:
            container_client = blob_service_client.get_container_client(container_name)
            try:
                blob_client = container_client.get_blob_client(file.filename)
                f = await file.read()
                await blob_client.upload_blob(f)
            except Exception as e:
                print(e)
                return HTTPException(401, "Error uploading file to Blob storage")
    
    return (f"successfully uploaded {file.filename} to Blob storage")