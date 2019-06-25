function gameRoutes(app) {

    let goodAnswers = 0;
    let isGameOver = false;
    let callToFriendUsed = false;
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
        } else if (isGameOver) {
            res.json({
                loser: true,
            })
        }
        else {
            const nextQuestion = questions[goodAnswers];
            const { question, answers } = nextQuestion
            res.json({
                question, answers,
            })
        }
    });

    app.post('/answer/:index', (req, res) => {
        if (isGameOver) {
            res.json({
                loser: true,
            })
        }

        const { index } = req.params;
        const question = questions[goodAnswers];

        const isGoodAnswer = question.correctAnswer === Number(index);

        if (isGoodAnswer) {
            goodAnswers++;
        } else {
            isGameOver = true;
        }

        res.json({
            correct: isGoodAnswer,
            goodAnswers,
        });
        // if (question.correctAnswer === Number(index)) {
        //     res.json({
        //         correct: true,
        //     })
        // } else {
        //     res.json({
        //         correct: false,
        //     })
        // }
    });

    app.get('/help/friend', (req, res) => {
        if (callToFriendUsed) {
            return res.json({
                text: "To koło ratunkowe było juz wykorzystane.",
            });
        }
        callToFriendUsed = true;
        const doseFriendKnowAnswer = Math.random() < 0.8;
        const question = questions[goodAnswers]
        res.json({
            text: doseFriendKnowAnswer ? `Hmm, wydaję mi się, że odpowiedź to ${question.answers[question.correctAnswer]}` : "Hmm, no nie wiem",
        })
    })

    app.get('/help/fifty', (req, res) => {
        if (fiftyFiftyUsed) {
            return res.json({
                text: "To koło ratunkowe było juz wykorzystane.",
            });
        }
        fiftyFiftyUsed = true;
        const question = questions[goodAnswers]
        const answersCopy = question.answers.filter((s, index) => (
            index !== question.correctAnswer
        ));
        answersCopy.splice(~~(Math.random() * answersCopy.length), 1);

        res.json({
            answersToRemove: answersCopy,
        })
    })

    app.get('/help/audiance', (req, res) => {
        if (questionToAudianceUsed) {
            return res.json({
                text: "To koło ratunkowe było juz wykorzystane.",
            });
        }
        questionToAudianceUsed = true;


        const chart = [10, 20, 30, 40];

        for (let i = chart.length - 1; i > 0; i--) {
            const change = Math.floor(Math.random() * 20 - 10);

            chart[i] += change;
            chart[i - 1] -= change;
        }
        const question = questions[goodAnswers];
        const { correctAnswer } = question;
        [chart[3], chart[correctAnswer]] = [chart[correctAnswer], chart[3]]; // zamiana indeksu ostatniego z właściwą odpowiedzią


        res.json({
            chart
        })
    })
}


module.exports = gameRoutes;