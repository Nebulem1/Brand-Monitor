import os
from dotenv import load_dotenv
from pymongo import MongoClient
from pathlib import Path
env_path = Path("C:/Users/91777/Documents/Python Programe/Brand Monitor/.env") 
load_dotenv(dotenv_path=env_path)
url= os.getenv("url")
client = MongoClient(url)
SECRET_KEY= os.getenv("SECRET_KEY")
ALGORITHM= os.getenv("ALGORITHM")
ACCESS_TOKEN_EXPIRE_MINUTES= int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES"))
google_key=os.getenv("google_key")
client_secret=os.getenv("client_secret")
client_id=os.getenv("client_id")
username="AdviceWonderful6870"
password=os.getenv("password")