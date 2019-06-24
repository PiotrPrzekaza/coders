const express = require('express');
const path = require('path');

const app = express();

app.listen(3000, () => {
    console.log('Server is listening at http://localhost:3000');
});

app.use(express.static(
    path.join(__dirname, 'public')
))

let goodAnswers = 0;
let callToFrendUsed = false;
let questionToAudianceUsed = false;
let fiftyFiftyUsed = false;

const questions = [
    {
        question: 'Gdzie w pamięci przechowywane są typy proste a gdzie typy referencyjne?',
        answers: ["Oba typy są przechowywane na stercie", "Typy proste na stercie, a referaencyjne na stosie", "Oba typy są przechowywane na stosie", "Typy proste na stosie, a referencyjne na stercie"],
        correctAnswer: 3,
    },
    {
        question: 'W jakim celu stosuje się dziedziczenie?',
        answers: ["Kiedy potrzebujemy aby z klasy dziedziczącej można było utworzyć obiekt", 'Aby przekazać klasie dziedziczącej "zachowania" klasy dziedziczonej', "Aby utrudnic innym programistom odczytanie naszego kodu", "Kiedy potrzebujemy aby z klasy dziedziczonej mozna było utworzyć obiekt"],
        correctAnswer: 1,
    },
    {
        question: 'Po ilu klasach abstrakcyjnych można dzidziczyć?',
        answers: ["Po jednej", "Nie istnieją klasy abstrakcyjne w C#", "Nie ma ograniczeń", "Po dwóch"],
        correctAnswer: 0,
    },
    {
        question: 'Jaki jest domyślny modificator dostępu w interfejsie?',
        answers: ["sealed", "private", "normal", "public"],
        correctAnswer: 3,
    },
    {
        question: 'Jaka jest różnica między klasą a obiektem?',
        answers: ["Obiekt dziedziczy po klasie", "Nie ma różnic, obiekt to to samo co klasa", "Klasa jest definicją na podstawie której możemy utworzyć obiekt", "Klasa jest tworzona w czasie wykonywania programu, a obiekt podczas kompilacji"],
        correctAnswer: 2,
    }
]

app.get('/question', (req, res) => {

    if (goodAnswers === questions.length) {
        res.json({
            winner: true,
        });
    } else {
        const nextQuestion = questions[goodAnswers];
        const { question, answers } = nextQuestion
        res.json({
            question, answers,
        })
    }
})