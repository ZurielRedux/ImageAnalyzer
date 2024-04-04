import azure.functions as func
import fastapi
# from routes import user
# from util.database import engine
from sqlmodel import Field, Session, SQLModel, create_engine, select
# from models import user

class Hero(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    email: str = Field(index=True)

AZURE_DATABASE_URL = "mssql+pyodbc://maxchen:a12345678!@image-analyzer-server.database.windows.net/image-analyzer-db?driver=odbc+Driver+17+for+SQL+Server"
# SQLALCHEMY_DATABASE_URL = "postgresql://user:password@postgresserver/db"

connect_args={"check_same_thread": False}

engine = create_engine(
    AZURE_DATABASE_URL, 
    echo=True, 
    connect_args=connect_args
)

def create_db_and_tables():
    SQLModel.metadata.create_all(engine)

fast_app = fastapi.FastAPI()
# app.include_router(user.router)

@fast_app.on_event("startup")
def on_startup():
    create_db_and_tables()

@fast_app.post("/heroes")
def create_hero(hero: Hero):
    with Session(engine) as session:
        session.add(hero)
        session.commit()
        session.refresh(hero)
        return hero

@fast_app.get("/sample")
async def index():
    return {
        "info": "Try /hello/Shivani for parameterized route.",
    }

@fast_app.get("/heroes")
async def get_users():
    with Session(engine) as session:
        users = session.exec(select(Hero)).all()
        return users


@fast_app.get("/hello/{name}")
async def get_name(name: str):
    return {
        "name": name,
    }

app = func.AsgiFunctionApp(app=fast_app, http_auth_level=func.AuthLevel.ANONYMOUS)