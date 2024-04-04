from fastapi import APIRouter, Request
from fastapi.encoders import jsonable_encoder
from typing import List
from models import UserModel

router = APIRouter()

@router.get("/listall", response_description="List of all Users", response_model=List[UserModel.User])
async def list_users(req: Request):
    users = [user async for user in req.app.user_items_container.read_all_items()]
    return users

@router.post("/user", response_model=UserModel.User)
async def create_user(req: Request, user: UserModel.User):
    user = jsonable_encoder(user)
    new_user = await req.app.user_items_container.create_item(user)
    return new_user