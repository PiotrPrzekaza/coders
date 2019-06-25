const question = document.querySelector('.question');
const answer1 = document.querySelector('#answer1')
const answer2 = document.querySelector('#answer2')
const answer3 = document.querySelector('#answer3')
const answer4 = document.querySelector('#answer4')
const gameBoard = document.querySelector('.gameBoard');
const h2 = document.querySelector('h2');
const tipDiv = document.querySelector('.tip');

function fillQestionElements(data) {

    if (data.winner === true) {
        gameBoard.style.display = 'none';
        h2.innerText = 'WYGRAŁEŚ';
        return;
    }

    if (data.loser === true) {
        gameBoard.style.display = 'none';
        h2.innerText = 'Nie poszło tym razem sprubój ponownie';
        return;
    }
    question.innerText = data.question;
    for (const i in data.answers) {
        const answerEl = document.querySelector(`#answer${Number(i) + 1}`);
        answerEl.innerText = data.answers[i];
    }
    // answer1.innerText = data.answers[0];
    // answer2.innerText = data.answers[1];
    // answer3.innerText = data.answers[2];
    // answer4.innerText = data.answers[3];
};

function showNextQuestion() {
    fetch('/question', {
        method: 'GET',
    })
        .then(r => r.json())
        .then(data => {
            fillQestionElements(data);
        })
};
showNextQuestion();

const goodAnswerSpan = document.querySelector('.good-answers');

function handleAnswerFeedback(data) {
    goodAnswerSpan.innerText = data.goodAnswers;
    showNextQuestion();
}

function sendAnswer(answerIndex) {
    fetch(`/answer/${answerIndex}`, {
        method: 'POST',
    })
        .then(r => r.json())
        .then(data => {
            handleAnswerFeedback(data);
        })
}

const buttons = document.querySelectorAll('.answer-btn');

for (const button of buttons) {
    button.addEventListener('click', (e) => {
        const answerIndex = e.target.dataset.answer;
        sendAnswer(answerIndex);
    })
}

function handleFriendAnswer(data) {
    tipDiv.innerText = data.text;
}

function callToFriend() {
    fetch('/help/friend', {
        method: 'GET',
    })
        .then(r => r.json())
        .then(data => {
            handleFriendAnswer(data);
        })
}

document.querySelector('.callToFriend').addEventListener('click', callToFriend)

function handleFiftyFiftyAnswer(data) {
    console.log(data);
}

function fiftyFifty() {
    fetch('/help/fifty', {
        method: 'GET',
    })
        .then(r => r.json())
        .then(data => {
            handleFiftyFiftyAnswer(data);
        })
}

document.querySelector('.fiftyFifty').addEventListener('click', fiftyFifty)