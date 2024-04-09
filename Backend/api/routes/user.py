from fastapi import APIRouter, Request, status, UploadFile, File, Depends, HTTPException
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from routes.process import uploadToAzure
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from typing import List, Annotated
from passlib.context import CryptContext
from .token import fake_decode_token
from models import UserModel

import logging

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/token")

async def get_user(req: Request, token: Annotated[str, Depends(oauth2_scheme)]):
    user = fake_decode_token(req.app.user_items_container, token)

    print(user, 'user')
    print(token, 'token')
    logging.warning(token)

    if not user: 
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"}
        )
    return user

# @router.get("/getcooluser", response_model=UserModel.User)
# async def get_user_id(req: Request):
#     user = await req.app.user_items_container.read_item(item="98f553b5d38d4a12953053de409e6794", partition_key="98f553b5d38d4a12953053de409e6794")
#     return user

@router.get("/getUser")
async def get_current_user(current_user: Annotated[UserModel.User, Depends(get_user)]):
    return current_user

@router.get("/listAll", response_description="List of all Users", response_model=List[UserModel.User])
async def list_users(req: Request):
    users = [user async for user in req.app.user_items_container.read_all_items()]
    return users

@router.post("/create", response_model=UserModel.User)
async def create_user(req: Request, user: UserModel.User, response_model=UserModel.User):
    user = jsonable_encoder(user)
    new_user = await req.app.user_items_container.create_item(user)
    return JSONResponse(status_code=status.HTTP_201_CREATED, content=new_user)

@router.post("/profile-pic")
async def create_upload_file(file: UploadFile = File(...)):
    azureBlobResponse = await uploadToAzure(file, "user-image-blob")
