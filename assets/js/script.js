let pageContentEl = document.querySelector("#page-content");
let timer = document.querySelector("#timer");
let currentTime = 0;
let currentQuestion = 0;
let numRight = 0;
let intervalID;
let scores = [];

const questions = [
    {
        question: "Sample Questioneeeeeeeeeeeeeeeeeewqg ewgf qreg qerg erg qer gqwe gfqwe fqwe qwe r",
        answerOne: "Answer One",
        answerTwo: "Answer Two",
        answerThree: "Answer Three",
        answerFour: "Answer Four",
        correctAnswer: "2",
    },
    {
        question: "Sample Question Two",
        answerOne: "Answer One",
        answerTwo: "Answer Two",
        answerThree: "Answer Three",
        answerFour: "Answer Four",
        correctAnswer: "2",
    },
    {
        question: "Sample Question Three",
        answerOne: "Answer One",
        answerTwo: "Answer Two",
        answerThree: "Answer Three",
        answerFour: "Answer Four",
        correctAnswer: "2",
    },
    {
        question: "Sample Question Four",
        answerOne: "Answer One",
        answerTwo: "Answer Two",
        answerThree: "Answer Three",
        answerFour: "Answer Four",
        correctAnswer: "2",
    },
    {
        question: "Sample Question Five",
        answerOne: "Answer One",
        answerTwo: "Answer Two",
        answerThree: "Answer Three",
        answerFour: "Answer Four",
        correctAnswer: "2",
    },
];

// a button was clicked
let buttonHandler = function(event) {
    // get target element from event
    let targetEl = event.target;

    // start quiz button was clicked
    if (targetEl.matches(".start-btn")) {
        beginQuiz();
    } else if (targetEl.matches(".answer-btn")) {
        if (questions[currentQuestion].correctAnswer === targetEl.getAttribute("data-answer-id")) {
            numRight++;
        } else {
            currentTime = currentTime - 30;
        }
        currentQuestion++;
        if (!questions[currentQuestion]) {
            clearInterval(intervalID);
            intervalID = null;
            endQuiz();
        } else {
            displayQuestion();
        }
    }
}

// start the quiz
let beginQuiz = function() {
    // set and start the timer
    currentTime = 60;
    timerManager();

    // set score to 0
    numRight = 0;

    // load the first question
    currentQuestion = 0;
    displayQuestion();
}
let endQuiz = function() {
    clearScreen();

    var quizCompleteEl = document.createElement("div");
    quizCompleteEl.className = "page-content-text";
    quizCompleteEl.innerHTML = "You have finished the quiz! :D<br><br>Your final score is: " + numRight + "<br>Would you like to save your score?";

    var endButtonsEl = document.createElement("div");
    endButtonsEl.className = "end-buttons-holder";

    var submitButtonEl = document.createElement("button");
    submitButtonEl.textContent = "Submit your score!";
    submitButtonEl.className = "btn end-btn submit-btn";

    var againButtonEl = document.createElement("button");
    againButtonEl.textContent = "Try again!";
    againButtonEl.className = "btn end-btn start-btn";

    endButtonsEl.appendChild(submitButtonEl);
    endButtonsEl.appendChild(againButtonEl);
    pageContentEl.appendChild(quizCompleteEl);
    pageContentEl.appendChild(endButtonsEl);
}

// load a question
let displayQuestion = function() {
    clearScreen();

    // create question region
    var questionHolderEl = document.createElement("div");
    questionHolderEl.className = "page-content-text";
    questionHolderEl.innerHTML = questions[currentQuestion].question;

    // create the four answers
    var answerButtonOneEl = document.createElement("button");
    answerButtonOneEl.textContent = questions[currentQuestion].answerOne;
    answerButtonOneEl.className = "btn answer-btn";
    answerButtonOneEl.setAttribute("data-answer-id", "1");
    var answerButtonTwoEl = document.createElement("button");
    answerButtonTwoEl.textContent = questions[currentQuestion].answerTwo;
    answerButtonTwoEl.className = "btn answer-btn";
    answerButtonTwoEl.setAttribute("data-answer-id", "2");
    var answerButtonThreeEl = document.createElement("button");
    answerButtonThreeEl.textContent = questions[currentQuestion].answerThree;
    answerButtonThreeEl.className = "btn answer-btn";
    answerButtonThreeEl.setAttribute("data-answer-id", "3");
    var answerButtonFourEl = document.createElement("button");
    answerButtonFourEl.textContent = questions[currentQuestion].answerFour;
    answerButtonFourEl.className = "btn answer-btn";
    answerButtonFourEl.setAttribute("data-answer-id", "4");

    // create the answer region
    var answerHolderEl = document.createElement("div");
    answerHolderEl.className = "answer-holder";
    // append the four answers
    answerHolderEl.appendChild(answerButtonOneEl);
    answerHolderEl.appendChild(answerButtonTwoEl);
    answerHolderEl.appendChild(answerButtonThreeEl);
    answerHolderEl.appendChild(answerButtonFourEl);

    pageContentEl.appendChild(questionHolderEl);
    pageContentEl.appendChild(answerHolderEl);
}

let timerManager = function() {
    if (!intervalID) {
        intervalID = setInterval(function() {
            if (currentTime < 1) {
                timer.innerHTML = "Time Remaining: 00";
                console.log(currentTime);
                clearInterval(intervalID);
                intervalID = null;
                endQuiz();
            } else if (currentTime < 10) {
                timer.innerHTML = "Time Remaining: 0" + currentTime--;
            } else {
                timer.innerHTML = "Time Remaining: " + currentTime--;
            }
        }, 1000);
    }
}

// prompt us so we can save our score
let saveScore = function() {

}

// load the scores onto the screen
let loadScores = function() {

}

// clear everything currently on the screen
let clearScreen = function() {
    const pageNode = document.getElementById("page-content");
    while (pageNode.firstChild) {
        pageNode.removeChild(pageNode.lastChild);
    }
}

// listen for when a button on the page is clicked
pageContentEl.addEventListener("click", buttonHandler);