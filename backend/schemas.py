from pydantic import BaseModel
from typing import Optional

class TodoCreate(BaseModel):
    title: str
    description: Optional[str] = None

class TodoUpdate(BaseModel):
    completed: bool

class TodoOut(TodoCreate):
    id: int
    completed: bool

    class Config:
        orm_mode = True

