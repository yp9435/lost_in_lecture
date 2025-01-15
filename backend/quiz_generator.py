# quiz_generator.py
from utils.api_client import generate_ai_response
import json

def generate_quiz(lecture_text):
    prompt = f"Generate Quiz: {lecture_text}"
    quiz_json = generate_ai_response(prompt)
    quiz = json.loads(quiz_json)
    return quiz