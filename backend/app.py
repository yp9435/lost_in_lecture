# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
from speech_to_text import SpeechToText
from summarizer import summarize_lecture
from quiz_generator import generate_quiz
from utils.api_client import generate_ai_response
import os
import threading

app = Flask(__name__)
CORS(app)

# Initialize SpeechToText
model_path = "../vosk-model-small-en-us-0.15"  # Replace with actual path
output_file = "lecture_transcript.txt"
stt = SpeechToText(model_path, output_file)

# Initialize Nebius AI Client
nebius_client = generate_ai_response(os.environ.get("NEBIUS_API_KEY"))

recording_thread = None
is_recording = False

@app.route('/start-recording', methods=['POST'])
def start_recording():
    global recording_thread, is_recording
    if is_recording:
        return jsonify({"error": "Recording is already in progress"}), 400

    is_recording = True
    recording_thread = threading.Thread(target=stt.start_listening)
    recording_thread.start()
    return jsonify({"message": "Recording started"})

@app.route('/stop-recording', methods=['POST'])
def stop_recording():
    global recording_thread, is_recording
    if not is_recording:
        return jsonify({"error": "No recording in progress"}), 400

    stt.stop_listening()
    recording_thread.join()
    is_recording = False
    return jsonify({"message": "Recording stopped"})

@app.route('/generate-quiz', methods=['POST'])
def generate():
    with open(output_file, 'r') as f:
        lecture_text = f.read()
    quiz = generate_quiz(lecture_text, nebius_client)
    return jsonify({"quiz": quiz})

@app.route('/summarize-lecture', methods=['POST'])
def summarize():
    with open(output_file, 'r') as f:
        lecture_text = f.read()
    summary = summarize_lecture(lecture_text, nebius_client)
    return jsonify({"summary": summary})

if __name__ == '__main__':
    app.run(debug=True)