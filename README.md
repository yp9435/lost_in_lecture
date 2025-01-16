# Lost in Lecture - Chrome Extension

A Chrome extension that helps students maintain focus during lectures by providing real-time transcription, summarization, and quiz generation.

## Features

- 🎙️ Real-time lecture transcription
- 📝 Automatic lecture summarization
- ❓ AI-generated quizzes based on lecture content
- 🔄 Interactive quiz interface in popup
- 🔒 Google login integration

## Installation

1. Clone this repository
2. Install dependencies:
   ```bash
   cd backend
   pip install -r requirements.txt
   ```
3. Start the backend server:
   ```bash
   python app.py
   ```
4. Load the extension in Chrome:
   - Go to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked" and select the project directory

## Usage

1. Click the extension icon to open the popup
2. Start recording when lecture begins
3. Stop recording when lecture ends
4. View generated summary and quiz
5. Test your knowledge with interactive quiz questions

## Project Structure

```
backend/            # Flask server for speech processing
  app.py            # Main server application
  quiz_generator.py # Quiz generation logic
  summarizer.py     # Lecture summarization
  speech_to_text.py # Speech-to-text transcription

popup/              # Chrome extension popup UI
  popup.html        # Popup HTML structure
  popup.js          # Popup interaction logic
  style.css         # Popup styling

content/            # Content scripts
background/         # Background scripts
utils/              # Shared utilities
```

## Dependencies

- Flask (backend server)
- Vosk (speech-to-text)
- Chrome Extension APIs
- Nebius AI (quiz generation and summarization)
- Firebase (Storage)

## License

MIT
