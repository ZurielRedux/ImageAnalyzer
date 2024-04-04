from sqlmodel import Session, SQLModel, create_engine, select

AZURE_DATABASE_URL = "mssql+pyodbc://maxchen:a12345678!@image-analyzer-server.database.windows.net/image-analyzer-db?driver=odbc+Driver+18+for+SQL+Server"
# SQLALCHEMY_DATABASE_URL = "postgresql://user:password@postgresserver/db"

connect_args={"check_same_thread": False}

engine = create_engine(
    AZURE_DATABASE_URL, 
    echo=True, 
    connect_args=connect_args
)