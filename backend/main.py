from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .database import engine
from . import models
from .routes import todo

# Create database tables
models.Base.metadata.create_all(bind=engine)

# Initialize app
app = FastAPI(title="Todo API")

# 🔹 ADD THIS CORS BLOCK
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Root path
@app.get("/")
def root():
    return {"message": "Todo API is running 🚀"}

# Include todo routes
app.include_router(todo.router)

