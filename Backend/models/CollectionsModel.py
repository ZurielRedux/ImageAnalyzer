from pydantic import BaseModel, Field, ValidationError, field_validator, ValidationInfo, EmailStr
from typing import Optional, Annotated
from uuid import uuid4
from datetime import datetime

class Collections(BaseModel):
  id : Annotated[str, Field(default_factory=lambda: uuid4().hex)]
  name : str 
  created_at: datetime = Field(default_factory=datetime.now)
  updated_at: datetime
  # analyzed_images: 