from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import api.scrapper as scrapper
import uvicorn
import services.auth as auth
import core.security as security
import api.qa as qa

app=FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(qa.router)
app.include_router(scrapper.router)
app.include_router(auth.router)
app.include_router(security.router)

if __name__=="__main__":
    uvicorn.run(app,host="localhost",port=3000)
