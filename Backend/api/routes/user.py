from fastapi import APIRouter, Request
from fastapi.encoders import jsonable_encoder
from typing import List
from models import UserModel

router = APIRouter()

@router.get("/listall", response_description="List of all Users", response_model=List[UserModel.User])
async def list_users(request: Request):
    users = [user async for user in request.app.user_items_container.read_all_items()]
    return users

