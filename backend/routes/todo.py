from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import SessionLocal
from .. import crud, schemas

router = APIRouter(prefix="/todos", tags=["Todos"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=schemas.TodoOut)
def create(todo: schemas.TodoCreate, db: Session = Depends(get_db)):
    return crud.create_todo(db, todo)

@router.get("/", response_model=list[schemas.TodoOut])
def read_all(db: Session = Depends(get_db)):
    return crud.get_all_todos(db)

@router.delete("/{todo_id}")
def delete(todo_id: int, db: Session = Depends(get_db)):
    deleted = crud.delete_todo(db, todo_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Todo not found")
    return {"message": "Deleted"}

@router.patch("/{todo_id}", response_model=schemas.TodoOut)
def update(todo_id: int, data: schemas.TodoUpdate, db: Session = Depends(get_db)):
    updated = crud.update_todo_status(db, todo_id, data.completed)
    if not updated:
        raise HTTPException(status_code=404, detail="Todo not found")
    return updated

