from fastapi import FastAPI
from .database import engine
from . import models
from .routes import todo

# Create database tables
models.Base.metadata.create_all(bind=engine)

# Initialize app
app = FastAPI(title="Todo API")

# Root path
@app.get("/")
def root():
    return {"message": "Todo API is running 🚀"}

# Include todo routes
app.include_router(todo.router)

