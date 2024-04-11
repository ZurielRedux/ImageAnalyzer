from fastapi import APIRouter, Request, HTTPException, UploadFile, status, File, Form
from fastapi.responses import JSONResponse
from azure.storage.blob.aio import BlobServiceClient
from dotenv import dotenv_values
import aiohttp
import logging

config = dotenv_values(".env")
process_router = APIRouter()

@process_router.post("/file")
async def create_upload_file(user_tags: str = Form(None), file: UploadFile = File(...) ):
    logging.info('Entered /file route')
    print(f"Tags Array: {user_tags}")
    print(f"Received file: {file.filename}, Content-Type: {file.content_type}")
    
    azureBlobResponse = await uploadToAzure(file, "image-blob")
    imageAnalyze = await analyzeImage(file)

    return JSONResponse(status_code=status.HTTP_201_CREATED, content={"message": "File Uploaded and Analyzed"})

async def uploadToAzure(file: UploadFile, container_name: str):
    connect_str = config["AZURE_BLOB_CONNECTION"]
    blob_service_client = BlobServiceClient.from_connection_string(connect_str)

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

@process_router.post("/analyze")
async def analyzeImage(file: UploadFile = File(...)):
    subscription_key = config['AZURE_VISION_KEY']
    address = config['AZURE_VISION_ADDRESS']
    parameters = {'visualFeatures': 'Categories,Description,Color,Objects,Faces', 'language': 'en'}
    
    await file.seek(0)  # Reset file pointer to read the file again
    image_data = await file.read()
    
    headers = {
        'Content-Type': 'application/octet-stream',
        'Ocp-Apim-Subscription-Key': subscription_key
    }
    
    async with aiohttp.ClientSession() as session:
        async with session.post(address, headers=headers, params=parameters, data=image_data) as response:
            results = await response.json()
            if response.status != 200:
                # Raise an exception for HTTP error statuses
                response.raise_for_status()
    
            print(f'API responded with: {results}')
            return JSONResponse(status_code=status.HTTP_200_OK, content={"message": "File Analyzed", "Results": results})