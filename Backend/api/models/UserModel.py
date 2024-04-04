from pydantic import BaseModel, Field, ValidationError, field_validator, ValidationInfo
from uuid import uuid4
from typing import Optional
from datetime import datetime

class User(BaseModel):
    id : str = Field(default_factory=lambda: uuid4().hex)
    username : str
    email : str = Field(pattern=r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$')
    created_at: datetime = datetime.now()

    @field_validator('username')
    @classmethod
    def check_alphanumeric(cls, username: str, info: ValidationInfo) -> str:
        if isinstance(username, str):
            is_alphanumberic = username.replace(' ', '').isalnum()
            assert is_alphanumberic, f'{info.field_name} must be alphanumeric'
        return username

