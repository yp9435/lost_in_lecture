let isRecording = false;

// Backend API URL
const API_URL = "http://127.0.0.1:5000"; // Adjust if backend runs on a different host/port

// Start recording
document.getElementById('startRecording').addEventListener('click', () => {
    fetch(`${API_URL}/start-recording`, { method: 'POST' })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'Recording started') {
                isRecording = true;
                updateUI();
                document.getElementById('status').textContent = 'Recording started';
            } else {
                document.getElementById('status').textContent = 'Failed to start recording';
            }
        })
        .catch(error => {
            console.error('Error starting recording:', error);
            document.getElementById('status').textContent = 'Error starting recording';
        });
});

// Stop recording
document.getElementById('stopRecording').addEventListener('click', () => {
    fetch(`${API_URL}/stop-recording`, { method: 'POST' })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'Recording stopped') {
                isRecording = false;
                updateUI();
                document.getElementById('status').textContent = 'Recording stopped';
            } else {
                document.getElementById('status').textContent = 'Failed to stop recording';
            }
        })
        .catch(error => {
            console.error('Error stopping recording:', error);
            document.getElementById('status').textContent = 'Error stopping recording';
        });
});

// Generate quiz
document.getElementById('generateQuiz').addEventListener('click', () => {
    fetch(`${API_URL}/generate-quiz`, { method: 'POST' })
        .then(response => response.json())
        .then(data => {
            if (data.quiz) {
                displayQuiz(data.quiz);
            } else {
                document.getElementById('status').textContent = 'Failed to generate quiz';
            }
        })
        .catch(error => {
            console.error('Error generating quiz:', error);
            document.getElementById('status').textContent = 'Error generating quiz';
        });
});

// Summarize lecture
document.getElementById('summarizeLecture').addEventListener('click', () => {
    fetch(`${API_URL}/summarize-lecture`, { method: 'POST' })
        .then(response => response.json())
        .then(data => {
            if (data.summary) {
                displaySummary(data.summary);
            } else {
                document.getElementById('status').textContent = 'Failed to summarize lecture';
            }
        })
        .catch(error => {
            console.error('Error summarizing lecture:', error);
            document.getElementById('status').textContent = 'Error summarizing lecture';
        });
});

function updateUI() {
    document.getElementById('startRecording').disabled = isRecording;
    document.getElementById('stopRecording').disabled = !isRecording;
    document.getElementById('status').textContent = isRecording ? 'Recording...' : 'Not recording';
}

function displayQuiz(quiz) {
    const quizDiv = document.getElementById('quiz');
    const questionEl = document.getElementById('question');
    const optionsEl = document.getElementById('options');

    questionEl.textContent = quiz.question;
    optionsEl.innerHTML = '';

    quiz.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = option.text;
        button.className = 'quiz-option';
        button.addEventListener('click', () => checkAnswer(option.correct));
        optionsEl.appendChild(button);
    });

    quizDiv.style.display = 'block';
}

function checkAnswer(isCorrect) {
    alert(isCorrect ? 'Correct!' : 'Incorrect. Try again!');
}

function displaySummary(summary) {
    const summaryDiv = document.getElementById('status');
    summaryDiv.textContent = `Lecture Summary: ${summary}`;
}

updateUI();
