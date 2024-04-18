from fastapi import APIRouter, Request, status, UploadFile, File, Depends, HTTPException
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from .process import uploadToAzure
from ..models import UserModel
from typing import List, Annotated
from pydantic import BaseModel

from azure.cosmos.aio import CosmosClient

from dotenv import dotenv_values

config = dotenv_values(".env")


user_router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def fake_decode_token(token):
    return UserModel.User (
        username = token + "fakedecoded", email="john@example.com", first_name="John", last_name="Doe"
    )

@user_router.get("/items")
async def read_items(token: Annotated[str, Depends(oauth2_scheme)]):
    return {"token": token}

async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)]):
    user = fake_decode_token(token)
    return user

@user_router.get("/users/me")
async def read_users_me(current_user: Annotated[UserModel.User, Depends(get_current_user)]):
    return current_user

@user_router.post("/token")
async def login(req: Request, form_data: Annotated[OAuth2PasswordRequestForm, Depends()]):
    email = form_data.username
    user = [item async for item in req.app.user_items_container.query_items(
        query="SELECT * FROM c Where c.email = @email",
        parameters=[
        {"name": "@email", "value": email}
    ]
    )]

    if not user:
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    
    # user = UserModel.UserInDB(**user)
    # hashed_password = 

    return user

@user_router.get("/listAll", response_description="List of all Users", response_model=List[UserModel.User])
async def list_users(req: Request):
    users = [user async for user in req.app.user_items_container.read_all_items()]
    return users

@user_router.post("/create", response_model=UserModel.User)
async def create_user(req: Request, user: UserModel.User, response_model=UserModel.User):
    user = jsonable_encoder(user)
    new_user = await req.app.user_items_container.create_item(user)
    return JSONResponse(status_code=status.HTTP_201_CREATED, content=new_user)

@user_router.post("/profile-pic")
async def create_upload_file(file: UploadFile = File(...)):
    azureBlobResponse = await uploadToAzure(file, "user-image-blob")

# @user_router.get("/test/listAll", response_description="List of all Users", response_model=List[UserModel.User])
# async def list_users(req: Request):
#     print("/test/listAll route")
#     users = [user async for user in req.app.user_items_container.read_all_items()]
#     return JSONResponse(status_code=status.HTTP_200_OK, content=users)