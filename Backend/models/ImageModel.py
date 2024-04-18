from pydantic import BaseModel , Field
from uuid import uuid4
from datetime import datetime
from typing import Annotated

class Image(BaseModel):
  id:  Annotated[str, Field(default_factory=lambda: uuid4().hex)]
  image_blob_url: str
  image_user_tags: list[str]
  image_details: dict
  analyzed_at: datetime = Field(default_factory=datetime.now)

