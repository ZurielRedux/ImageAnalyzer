from pydantic import BaseModel, Field, validator
from typing import Annotated
from uuid import uuid4
from datetime import datetime
from .ImageModel import Image

class Collections(BaseModel):
  id : Annotated[str, Field(default_factory=lambda: uuid4().hex)]
  name : str = Field(default = "My First Collection")
  created_at: datetime = Field(default_factory=datetime.now)
  updated_at: datetime = None
  analyzed_images: list[Image] = Field(default_factory=list[Image])