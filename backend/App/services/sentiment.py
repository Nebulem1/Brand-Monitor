from transformers import pipeline
sentiment_model = pipeline("sentiment-analysis")

def get_sentiment(text:str):
    """
    Analyze the sentiment of the provided text.
    """
    if not text.strip():
        return {"error": "Text is required for sentiment analysis."}
    
    try:
        result = sentiment_model(text)
        return result[0]['label']
    except Exception as e:
        return {"error": str(e)}