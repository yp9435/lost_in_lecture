// popup.js
let isRecording = false;

document.getElementById('startRecording').addEventListener('click', () => {
    chrome.runtime.sendMessage({action: 'startRecording'}, (response) => {
        if (response.success) {
            isRecording = true;
            updateUI();
        } else {
            document.getElementById('status').textContent = 'Failed to start recording';
        }
    });
});

document.getElementById('stopRecording').addEventListener('click', () => {
    chrome.runtime.sendMessage({action: 'stopRecording'}, (response) => {
        if (response.success) {
            isRecording = false;
            updateUI();
        } else {
            document.getElementById('status').textContent = 'Failed to stop recording';
        }
    });
});

function updateUI() {
    document.getElementById('startRecording').disabled = isRecording;
    document.getElementById('stopRecording').disabled = !isRecording;
    document.getElementById('status').textContent = isRecording ? 'Recording...' : 'Not recording';
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'quiz') {
        displayQuiz(message.quiz);
    }
});

function displayQuiz(quiz) {
    const quizDiv = document.getElementById('quiz');
    const questionEl = document.getElementById('question');
    const optionsEl = document.getElementById('options');

    questionEl.textContent = quiz.question;
    optionsEl.innerHTML = '';

    quiz.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = option.text;
        button.addEventListener('click', () => checkAnswer(option.correct));
        optionsEl.appendChild(button);
    });

    quizDiv.style.display = 'block';
}

function checkAnswer(isCorrect) {
    alert(isCorrect ? 'Correct!' : 'Incorrect. Try again!');
}

updateUI();