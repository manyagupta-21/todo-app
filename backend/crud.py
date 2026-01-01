from sqlalchemy.orm import Session
from . import models, schemas

def create_todo(db: Session, todo: schemas.TodoCreate):
    db_todo = models.Todo(
        title=todo.title,
        completed=False
    )
    db.add(db_todo)
    db.commit()
    db.refresh(db_todo)
    return db_todo

def get_all_todos(db: Session):
    return db.query(models.Todo).all()

def delete_todo(db: Session, todo_id: int):
    todo = db.query(models.Todo).filter(models.Todo.id == todo_id).first()
    if not todo:
        return None
    db.delete(todo)
    db.commit()
    return todo

def update_todo_status(db: Session, todo_id: int, completed: bool):
    todo = db.query(models.Todo).filter(models.Todo.id == todo_id).first()
    if not todo:
        return None
    todo.completed = completed
    db.commit()
    db.refresh(todo)
    return todo

