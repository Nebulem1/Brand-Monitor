import requests, io
from PIL import Image
from ultralytics import YOLO
import praw  
from services.sentiment import get_sentiment
from core.config import client_id, client_secret, username, password

reddit = praw.Reddit(
    client_id=client_id, 
    client_secret=client_secret,  # secret
    user_agent="BrandPulseAI Reddit Scraper",
    username=username,
    password=password
)

yolo_model = YOLO("best (1).pt")

def is_valid_url(url):
     return (
        url.endswith(".html") or
        "cnbc.com" in url or
        "reddit.com/r/" in url
    )

def detect_logo(img_url, brand):
    try:
        img_data = requests.get(img_url, timeout=10).content
        img = Image.open(io.BytesIO(img_data)).convert("RGB")
        results = yolo_model(img)
        for r in results:
            for c in r.names.values():
                if brand.lower() in c.lower():
                    return True
        return False
    except:
        return False

def scrape_reddit_posts(brand: str):
    filtered = []
    for submission in reddit.subreddit("all").search(brand, limit=1000):
        if not is_valid_url(submission.url):
            continue
        title = submission.title.strip()
        description = getattr(submission, "selftext", "").strip()
        url = submission.url
        is_image = url.lower().endswith((".jpg", ".png", ".jpeg"))
        contains_image=False
        if is_image:
            contains_image=detect_logo(url,brand)
        has_text_or_image = bool(description) or (is_image and contains_image)
        
        if title and has_text_or_image:
            filtered.append({
                "title": title,
                "description": description,
                "url": url,
                "contains_image":contains_image,
                "sentiment":get_sentiment(title + " " + description)
            })
        if len(filtered) == 10:
            break
    return filtered
