from fastapi import APIRouter, Request, HTTPException, UploadFile, status, File
from fastapi.encoders import jsonable_encoder
from azure.storage.blob.aio import BlobServiceClient
import logging
from dotenv import dotenv_values

router = APIRouter()

@router.post("/file")
async def create_upload_file(file: UploadFile = File(...)):
    logging.info('Entered /file route')

    try:
        if not file:
            raise HTTPException(status_code=400, detail="No file provided")

        logging.info(f"Received file: {file.filename}, Content-Type: {file.content_type}")

        # Add logic here to handle the uploaded file
        
        return {"message": "File uploaded successfully", "filename": file.filename}
    except Exception as e:
        logging.error(f"An error occurred: {str(e)}")
        raise HTTPException(status_code=500, detail="An internal server error occurred")
    # name = file.filename
    # type = file.content_type
   
#     azureUpload = await uploadToAzure(file,name,type)
#     print(azureUpload)
#     if azureUpload == HTTPException(401):
#         raise HTTPException(
#              status_code = status.HTTP_401,
#              detail = 'Error uploading to Azure Blob Storage'
#         )
    
#     # imageAnalyze = await analyzeImage()

# async def uploadToAzure(file: UploadFile,file_name: str,file_type:str):
#     connect_str = dotenv_values("AZURE_BLOB_CONNECTION")
#     blob_service_client = BlobServiceClient.from_connection_string(connect_str)
#     container_name = "image-blob"

#     print('entered uploadToAzureFunc')

#     async with blob_service_client:
#             container_client = blob_service_client.get_container_client(container_name)
#             try:
#                 blob_client = container_client.get_blob_client(file_name)
#                 f = await file.read()
#                 await blob_client.upload_blob(f)
#             except Exception as e:
#                 print(e)
#                 return HTTPException(401, "Something went terribly wrong..")
    
#     return "{'did_it_work':'yeah it did!'}"