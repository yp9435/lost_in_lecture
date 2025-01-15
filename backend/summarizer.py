# summarizer.py
from utils.api_client import generate_ai_response

def summarize_lecture(lecture_text):
    prompt = f"Summarize: {lecture_text}"
    summary = generate_ai_response(prompt)
    return summary