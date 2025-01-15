// background.js
let mediaRecorder;
let audioChunks = [];

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'startRecording') {
        startRecording(sendResponse);
        return true;  // Indicates we will respond asynchronously
    } else if (request.action === 'stopRecording') {
        stopRecording(sendResponse);
        return true;  // Indicates we will respond asynchronously
    }
});

function startRecording(sendResponse) {
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.ondataavailable = event => {
                audioChunks.push(event.data);
            };
            mediaRecorder.onstop = () => {
                const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
                sendAudioToBackend(audioBlob);
                audioChunks = [];
            };
            mediaRecorder.start();
            sendResponse({success: true});

            // Set up interval for sending audio chunks
            setInterval(() => {
                if (mediaRecorder && mediaRecorder.state === 'recording') {
                    mediaRecorder.requestData();  // This will trigger ondataavailable
                }
            }, 30000);  // Every 30 seconds
        })
        .catch(error => {
            console.error('Error accessing microphone:', error);
            sendResponse({success: false, error: 'Failed to access microphone'});
        });
}

function stopRecording(sendResponse) {
    if (mediaRecorder) {
        mediaRecorder.stop();
        sendResponse({success: true});
    } else {
        sendResponse({success: false, error: 'No active recording'});
    }
}

function sendAudioToBackend(audioBlob) {
    const formData = new FormData();
    formData.append('audio', audioBlob, 'lecture_audio.wav');

    fetch('http://localhost:5000/process-speech', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log('Transcribed text:', data.transcribed_text);
        return fetch('http://localhost:5000/generate-quiz', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ lecture_text: data.transcribed_text })
        });
    })
    .then(response => response.json())
    .then(quizData => {
        chrome.runtime.sendMessage({ type: 'quiz', quiz: quizData.quiz });
    })
    .catch(error => console.error('Error:', error));
}