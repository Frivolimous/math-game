const DisplayElements = {
    question: null,
    answers: [],
    history: null,
    score: null,
};

const GameState = {
    score: 0,
    questionNumber: 0,
    numQuestions: 10,
    correctAnswer: -1,
    questionText: '',
}

let generateQuestion;

function init() {    
    var gameM = document.getElementById('game');
    var startMult = document.getElementById('start-mult');
    var startAdd = document.getElementById('start-add');
    var startSub = document.getElementById('start-sub');
    var startDiv = document.getElementById('start-div');

    gameM.style.display = "none";
    startAdd.addEventListener("click", () => startGame(generateAddition));
    startMult.addEventListener("click", () => startGame(generateMultiplication));
    startSub.addEventListener("click", () => startGame(generateSubtraction));
    startDiv.addEventListener("click", () => startGame(generateDivision));

    DisplayElements.question = document.getElementById('question');
    var a = document.getElementsByClassName('answer')
    DisplayElements.answers = [a[0], a[1], a[2]];
    // console.log(DisplayElements.answers);
    DisplayElements.history = document.getElementById('history');
    DisplayElements.score = document.getElementById('score');

    DisplayElements.answers.forEach((el, i) => el.addEventListener('click', () => selectAnswer(i)));

    clearHistory();

    DisplayElements.score.innerHTML = `${GameState.score} / ${GameState.numQuestions}`;
}

function startGame(gen) {
    var startM = document.getElementById('main-menu');
    var gameM = document.getElementById('game');

    startM.style.display = "none";
    gameM.style.display = "flex";

    generateQuestion = gen;
    generateQuestion();
}

function clearHistory() {
    DisplayElements.history.innerHTML = '<b>History:<b><br>';
}

function setQuestion(questionText, answer0Text, answer1Text, answer2Text, correctIndex) {
    GameState.questionText = questionText;
    GameState.correctAnswer = correctIndex;
    
    DisplayElements.question.innerHTML = questionText + ' = ?';
    DisplayElements.answers[0].innerHTML = answer0Text;
    DisplayElements.answers[1].innerHTML = answer1Text;
    DisplayElements.answers[2].innerHTML = answer2Text;
}

let selectAnswer = (index) => {
    console.log(`Answered: ${index}`);

    var result = document.createElement('div');
    var resultState = document.createElement('div');
    result.classList.add('history-row');
    DisplayElements.history.appendChild(result);

    result.innerHTML = `${GameState.questionText} = ${DisplayElements.answers[index].innerHTML}`;
    result.appendChild(resultState);

    if (index === GameState.correctAnswer) {
        resultState.innerHTML = '✓';
        resultState.classList.add('checkmark');
        GameState.score++;

        DisplayElements.score.innerHTML = `${GameState.score} / ${GameState.numQuestions}`;
    } else {
        resultState.innerHTML = 'X';
        resultState.classList.add('error');
    }
    
    GameState.questionNumber++;

    if (GameState.questionNumber === 10) {
        DisplayElements.question.innerHTML = `All done! You got ${GameState.score} correct out of ${GameState.numQuestions} questions. Refresh to try again!`;
        DisplayElements.question.classList.add('end-subtitle');
        DisplayElements.question.id = 'end-text';
        DisplayElements.answers.forEach(el => el.style.display = 'none');
    } else {
        generateQuestion();
    }
}


let generateMultiplication = () => {
    var first = Math.ceil(Math.random() * 10);
    var second = Math.ceil(Math.random() * 10);
    var correct = first * second;

    var question = `${first} x ${second}`;

    var wrongOne;
    var wrongTwo;

    do {
        wrongOne = Math.floor(Math.random() * 10) + Math.max(1, correct - 5);
    } while (wrongOne === correct);
    
    do {
        wrongTwo = Math.floor(Math.random() * 10) + Math.max(1, correct - 5);
    } while (wrongTwo === correct || wrongTwo === wrongOne);

    var correctPosition = Math.floor(Math.random() * 3);

    if (correctPosition === 0) {
        setQuestion(question, correct, wrongOne, wrongTwo, 0);
    } else if (correctPosition === 1) {
        setQuestion(question, wrongOne, correct, wrongTwo, 1);
    } else {
        setQuestion(question, wrongOne, wrongTwo, correct, 2);
    }
}

let generateAddition = () => {
    var first = Math.ceil(Math.random() * 10);
    var second = Math.ceil(Math.random() * 10);
    var correct = first + second;

    var question = `${first} + ${second}`;

    var wrongOne;
    var wrongTwo;

    do {
        wrongOne = Math.floor(Math.random() * 3) + Math.max(1, correct - 5);
    } while (wrongOne === correct);
    
    do {
        wrongTwo = Math.floor(Math.random() * 3) + Math.max(1, correct - 5);
    } while (wrongTwo === correct || wrongTwo === wrongOne);

    var correctPosition = Math.floor(Math.random() * 3);

    if (correctPosition === 0) {
        setQuestion(question, correct, wrongOne, wrongTwo, 0);
    } else if (correctPosition === 1) {
        setQuestion(question, wrongOne, correct, wrongTwo, 1);
    } else {
        setQuestion(question, wrongOne, wrongTwo, correct, 2);
    }
}

let generateSubtraction = () => {
    var first = Math.ceil(Math.random() * 10);
    var second = Math.ceil(Math.random() * 10);
    var answer = first + second;

    var question = `${answer} - ${first}`;

    var wrongOne;
    var wrongTwo;

    do {
        wrongOne = Math.floor(Math.random() * 3) + Math.max(1, Math.min(second - 5, 10));
    } while (wrongOne === second);
    
    do {
        wrongTwo = Math.floor(Math.random() * 3) + Math.max(1, Math.min(second - 5, 10));
    } while (wrongTwo === second || wrongTwo === wrongOne);

    var correctPosition = Math.floor(Math.random() * 3);

    if (correctPosition === 0) {
        setQuestion(question, second, wrongOne, wrongTwo, 0);
    } else if (correctPosition === 1) {
        setQuestion(question, wrongOne, second, wrongTwo, 1);
    } else {
        setQuestion(question, wrongOne, wrongTwo, second, 2);
    }
}

let generateDivision = () => {
    var first = Math.ceil(Math.random() * 10);
    var second = Math.ceil(Math.random() * 10);
    var answer = first * second;

    var question = `${answer} : ${first}`;

    var wrongOne;
    var wrongTwo;

    do {
        wrongOne = Math.floor(Math.random() * 3) + Math.max(1, Math.min(second - 5, 10));
    } while (wrongOne === second);
    
    do {
        wrongTwo = Math.floor(Math.random() * 3) + Math.max(1, Math.min(second - 5, 10));
    } while (wrongTwo === second || wrongTwo === wrongOne);

    var correctPosition = Math.floor(Math.random() * 3);

    if (correctPosition === 0) {
        setQuestion(question, second, wrongOne, wrongTwo, 0);
    } else if (correctPosition === 1) {
        setQuestion(question, wrongOne, second, wrongTwo, 1);
    } else {
        setQuestion(question, wrongOne, wrongTwo, second, 2);
    }
}




















init();
