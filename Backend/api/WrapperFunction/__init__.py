import azure.functions as func
import fastapi
from routes import user

app = fastapi.FastAPI()
app.include_router(user.router)

@app.get("/sample")
async def index():
    return {
        "info": "Try /hello/Shivani for parameterized route.",
    }


@app.get("/hello/{name}")
async def get_name(name: str):
    return {
        "name": name,
    }