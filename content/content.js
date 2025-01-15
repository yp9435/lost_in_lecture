
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "injectQuiz") {
        displayQuizOverlay(message.quiz);
        sendResponse({ success: true });
    }
});

function displayQuizOverlay(quiz) {
   
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    overlay.style.color = 'white';
    overlay.style.zIndex = '9999';
    overlay.style.display = 'flex';
    overlay.style.flexDirection = 'column';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    overlay.id = 'quiz-overlay';


    const question = document.createElement('h2');
    question.textContent = quiz.question;
    overlay.appendChild(question);

    quiz.options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option.text;
        button.style.margin = '10px';
        button.style.padding = '10px';
        button.style.fontSize = '16px';
        button.addEventListener('click', () => {
            alert(option.correct ? 'Correct!' : 'Incorrect. Try again!');
            document.body.removeChild(overlay);
        });
        overlay.appendChild(button);
    });

    document.body.appendChild(overlay);
}