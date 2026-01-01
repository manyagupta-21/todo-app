from pydantic import BaseModel
from typing import Optional

class TodoCreate(BaseModel):
    title: str
    description: Optional[str] = None

class TodoOut(TodoCreate):
    id: int
    completed: bool

    class Config:
        orm_mode = True
