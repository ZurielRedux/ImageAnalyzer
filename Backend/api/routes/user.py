import logging
from fastapi import APIRouter

router = APIRouter()

@router.get("/test/{username}")
async def get_user(username:str):
    return {
        "username" : username,
        "age" : 20
    }