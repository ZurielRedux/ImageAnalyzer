from pydantic import BaseModel, Field, ValidationError, field_validator, ValidationInfo, EmailStr
from typing import Optional, Annotated
from uuid import uuid4
from datetime import datetime

class Image(BaseModel):
  image_url: str
  image_tags: list[str]
  