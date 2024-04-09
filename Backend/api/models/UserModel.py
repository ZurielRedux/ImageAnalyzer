from pydantic import BaseModel, Field, ValidationError, field_validator, ValidationInfo, EmailStr
from uuid import uuid4
from typing import Optional, Annotated
from datetime import datetime

class User(BaseModel):
    id : Annotated[str, Field(default_factory=lambda: uuid4().hex)]
    username : str
    email : EmailStr
    created_at: datetime = Field(default_factory=datetime.now)

    @field_validator('username')
    @classmethod
    def check_alphanumeric(cls, username: str, info: ValidationInfo) -> str:
        if isinstance(username, str):
            is_alphanumberic = username.replace(' ', '').isalnum()
            assert is_alphanumberic, f'{info.field_name} must be alphanumeric'
        return username

User {
    id,
    username,
    email,
    created_at,
    password,
    profile_pic,
    collections: {
        {
            collection_id: string
            name: animals,
            analyzed_images: {
                {
                    images: url to blobstorage
                    analyzed data of the image: {}
                },
            }
            created_on,
            updated_at,
        }
    }
}