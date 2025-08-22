from pydantic import BaseModel

class TextRequest(BaseModel):
    text: str

class BrandRequest(BaseModel):
    brand: str

class MainRequest(BaseModel):
    urlList: list[str]

class UserLogin(BaseModel):
    email:str 
    password:str