from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from core.config import SECRET_KEY, ALGORITHM
from core.config import client
from core.security import get_password_hash
from pydantic import BaseModel

router = APIRouter()
data=client.server
users=data.user

router=APIRouter()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

class UserData(BaseModel):
      name:str
      email:str 
      password:str
      brand:str

def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    user = users.find_one({"email": email})
    if user is None:
        raise credentials_exception
    user['_id']=str(user['_id'])
    return user

@router.get("/users/me/")
async def read_users_me(UserLogin :dict = Depends(get_current_user)):
    data={
        "id":str(UserLogin['_id']),
        'name':UserLogin['name'],
        'email':UserLogin['email'],
        'brand':UserLogin['brand']
    }
    return data


@router.post("/register")
async def register_user(userData:UserData):
    
    if not userData.email or not userData.password:
        raise HTTPException(status_code=400, detail="Email and password are required")
    
    user = users.find_one({"email": userData.email})
    if user:
        raise HTTPException(status_code=400, detail="Email already registered")
    user_data = {
        "name": userData.name,
        "email": userData.email,
        "hashed_password": get_password_hash(userData.password),
        'brand':userData.brand
    }
    users.insert_one(user_data)
    return {"message": "User created successfully"}