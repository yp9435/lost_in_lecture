# speech_to_text.py
import os
import json
import queue
import threading
import pyaudio
import wave
from vosk import Model, KaldiRecognizer, SetLogLevel

# Set Vosk logging to only show errors
SetLogLevel(-1)

class SpeechToText:
    def __init__(self, model_path, output_file):
        if not os.path.exists(model_path):
            raise FileNotFoundError(f"Vosk model not found at {model_path}")
        self.model = Model(model_path)
        self.recognizer = KaldiRecognizer(self.model, 16000)
        self.recognizer.SetWords(True)

        self.audio = pyaudio.PyAudio()
        self.stream = None
        self.audio_queue = queue.Queue()
        self.stop_thread = threading.Event()
        self.output_file = output_file

    def start_listening(self):
        """Start listening to microphone input"""
        self.stream = self.audio.open(
            format=pyaudio.paInt16,
            channels=1,
            rate=16000,
            input=True,
            frames_per_buffer=8000,
            stream_callback=self._audio_callback
        )
        self.stream.start_stream()
        print("Listening... (Press Ctrl+C to stop)")

        threading.Thread(target=self._process_audio).start()

    def stop_listening(self):
        """Stop listening and close audio stream"""
        self.stop_thread.set()
        if self.stream:
            self.stream.stop_stream()
            self.stream.close()
        self.audio.terminate()
        print("Stopped listening.")

    def _audio_callback(self, in_data, frame_count, time_info, status):
        self.audio_queue.put(in_data)
        return None, pyaudio.paContinue

    def _process_audio(self):
        with open(self.output_file, 'w') as f:
            while not self.stop_thread.is_set():
                try:
                    data = self.audio_queue.get(timeout=1)
                except queue.Empty:
                    continue

                if self.recognizer.AcceptWaveform(data):
                    result = json.loads(self.recognizer.Result())
                    if result['text']:
                        print(result['text'])
                        f.write(result['text'] + ' ')
                        f.flush()

            # Process any remaining audio in the queue
            while not self.audio_queue.empty():
                data = self.audio_queue.get()
                if self.recognizer.AcceptWaveform(data):
                    result = json.loads(self.recognizer.Result())
                    if result['text']:
                        print(result['text'])
                        f.write(result['text'] + ' ')
                        f.flush()

            # Get final result
            final_result = json.loads(self.recognizer.FinalResult())
            if final_result['text']:
                print(final_result['text'])
                f.write(final_result['text'])
                f.flush()

def main():
    model_path = "../vosk-model-small-en-us-0.15"  # Replace with the actual path to your Vosk model
    output_file = "lecture_transcript.txt"
    stt = SpeechToText(model_path, output_file)

    try:
        stt.start_listening()
        input("Press Enter to stop recording...")
    except KeyboardInterrupt:
        print("\nStopping...")
    finally:
        stt.stop_listening()

if __name__ == "__main__":
    main()