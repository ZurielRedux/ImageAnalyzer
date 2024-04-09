from fastapi import APIRouter, Request, status, UploadFile, File, Depends, HTTPException
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from routes.process import uploadToAzure
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from typing import List, Annotated
from passlib.context import CryptContext
from models import UserModel

router = APIRouter()

def fake_hash_password(password: str):
  return "fakehashed" + password

async def fake_decode_token(db, username):
  user_in_db = await db.app.user_items_container.read_item(item=username, parition_key=username)

  print(user_in_db, 'user in db')
  print(username, 'username')

  if username in user_in_db:
    user_dict = user_in_db
    return UserModel.UserInDB(**user_dict)


@router.post("/")
async def login(req: Request, form_data: Annotated[OAuth2PasswordRequestForm, Depends()]):
  user_dict =  await req.app.user_items_container.read_item(item="98f553b5d38d4a12953053de409e6794", partition_key="98f553b5d38d4a12953053de409e6794")

  print(req, 'req')
  return user_dict

  # if not user_dict:
  #   raise HTTPException(status_code=400, detail="Incorrect username or password")
  # user = UserModel.UserInDB(**user_dict)
  # hashed_password = fake_hash_password(form_data.password)
  # if not hashed_password == user.hashed_password:
  #   raise HTTPException(status_code=400, detail="Incorrect username or password")
  
  # return {"access_token": user.username, "token_type": "bearer"}
