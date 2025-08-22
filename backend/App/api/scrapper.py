from fastapi import APIRouter, HTTPException,BackgroundTasks
from models.schema import BrandRequest
from services.scraper import scrape_reddit_posts
from core.config import client
from datetime import datetime
from fastapi.responses import StreamingResponse
import io
import requests

data = client.server
analyse = data.analyse

router = APIRouter()
trigger=False
@router.post("/")
def fetch_reddit_data(data: BrandRequest , background_tasks: BackgroundTasks):
    today=datetime.combine(datetime.now(),datetime.min.time())
    res=analyse.find_one({"brand":data.brand,"date":today})
    if res:
        return res["post"]
    try:
        posts =  scrape_reddit_posts(data.brand)
        obj={
            "brand":data.brand,
            "date":today,
            "post":posts
        }
        background_tasks.add_task(allBrand)
        analyse.insert_one(obj)
        return posts
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/download-image")
def download_image(url: str):
    try:
        response = requests.get(url, timeout=10)
        if 'image' not in response.headers.get('Content-Type', ''):
            return {"error": "URL does not point to an image."}

        filename = url.split("/")[-1] or "download.jpg"
        return StreamingResponse(io.BytesIO(response.content),
                                 media_type=response.headers["Content-Type"],
                                 headers={
                                     "Content-Disposition": f"attachment; filename={filename}"
                                 })
    except Exception as e:
        return {"error": "Failed to fetch image", "details": str(e)}

def allBrand():
    for brand in ["Nike","Adidas","Apple"]:
        today=datetime.combine(datetime.now(),datetime.min.time())
        res=analyse.find_one({"brand":brand,"date":today})
        if res:
            continue
        try:
            posts =  scrape_reddit_posts(brand)
            obj={
                "brand":brand,
                "date":today,
                "post":posts
            }
            analyse.insert_one(obj)
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

@router.get("/comparasion/{brand}")
def get_comparasion(brand:str):
    res = analyse.find_one({"brand": brand})
    if not res or 'post' not in res:
        raise HTTPException(status_code=404, detail="Brand not found or no data available.")
    
    sentiment = [i.get('sentiment') for i in res['post']]
    return sentiment

@router.post("/urllist")
def get_urls(data:dict):
    res=data['data']
    if not res:
        raise HTTPException(status_code=404, detail="No data available.")
    res=[i['url'] for i in res]
    return res 