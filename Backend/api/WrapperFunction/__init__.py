import azure.functions as func
import fastapi
# from routes import user
# from util.database import engine
from sqlmodel import Field, Session, SQLModel, create_engine, select
# from models import user

class User(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    email: str = Field(index=True)

AZURE_DATABASE_URL = "mssql+pyodbc://maxchen:a12345678!@image-analyzer-server.database.windows.net/image-analyzer-db?driver=odbc+Driver+18+for+SQL+Server"
# SQLALCHEMY_DATABASE_URL = "postgresql://user:password@postgresserver/db"

connect_args={"check_same_thread": False}

engine = create_engine(
    AZURE_DATABASE_URL, 
    echo=True, 
    connect_args=connect_args
)

app = fastapi.FastAPI()
# app.include_router(user.router)

@app.get("/sample")
async def index():
    return {
        "info": "Try /hello/Shivani for parameterized route.",
    }

@app.get("/users")
async def get_users():
    with Session(engine) as session:
        users = session.exec(select(User)).all()
        return users


@app.get("/hello/{name}")
async def get_name(name: str):
    return {
        "name": name,
    }