import azure.functions as func

from Backend import app as fastapi_app


# Below line is for running uvicorn local dev
app = fastapi_app

# Below line is for main entry point for azure function
# app = func.AsgiFunctionApp(app=fastapi_app, http_auth_level=func.AuthLevel.ANONYMOUS)
