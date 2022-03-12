const pageContentEl = document.querySelector("#page-content");
const timer = document.querySelector("#timer");

let currentTime = 0;
let currentQuestion = 0;
let numRight = 0;
let intervalID;

let scores = [];

const questions = [
    {
        question: "Arrays in Javascript can be used to store _______",
        answerOne: "Booleans",
        answerTwo: "Objects",
        answerThree: "Other arrays",
        answerFour: "All of the above",
        correctAnswer: "4",
    },
    {
        question: "Which of these is not a data type",
        answerOne: "Prompt",
        answerTwo: "Boolean",
        answerThree: "String",
        answerFour: "Number",
        correctAnswer: "1",
    },
    {
        question: "Which of these would be a correct way to store the array 'cars' to local storage",
        answerOne: `localStorage.getItem("cars", JSON.parse(cars));`,
        answerTwo: `localStorage.setItem("cars", JSON.stringify(cars[i]));`,
        answerThree: `localStorage.setItem("cars", JSON.stringify(cars));`,
        answerFour: `localStorage.parse("cars", JSON.array(cars));`,
        correctAnswer: "3",
    },
    {
        question: "How do you wrap the condition of an if statement",
        answerOne: "curly braces",
        answerTwo: "parenthesis",
        answerThree: "brackets",
        answerFour: "hyphens",
        correctAnswer: "2",
    },
    {
        question: "What is a good option for solving a coding problem you're having trouble with",
        answerOne: "Reading the documentation online",
        answerTwo: "Using AskBCS",
        answerThree: "Talking with your classmates",
        answerFour: "All of the above",
        correctAnswer: "4",
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
    } else if (targetEl.matches(".submit-btn")) {
        saveScore();
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

    // get user name and score
    const userName = prompt("Enter your name:");
    const userScore = {numRight, userName};

    // add to the scores
    scores.push(userScore);

    // sort scores from highest to lowest
    scores.sort(function (a, b) {
        return b.numRight - a.numRight;
    });

    // remove any scores after the ten highest
    scores.splice(10);

    // save and display the high scores
    localStorage.setItem("scores", JSON.stringify(scores));
    clearScreen();

    var highScoresEl = document.createElement("div");
    highScoresEl.className = "scores-cont";

    var highScoreTextEl = document.createElement("h2");
    highScoreTextEl.innerHTML = "HIGH SCORES";
    highScoreTextEl.className = "page-content-text";

    var scoresListEl = document.createElement("ol");
    scoresListEl.id = "highScores";
    scoresListEl.innerHTML = scores.map((score) =>
    `<li>${score.numRight} - ${score.userName}`
    );

    var buttonEl = document.createElement("div");
    buttonEl.className = "end-buttons-holder";

    var againButtonEl = document.createElement("button");
    againButtonEl.textContent = "Try again!";
    againButtonEl.className = "btn end-btn start-btn";

    buttonEl.appendChild(againButtonEl);
    highScoresEl.appendChild(scoresListEl);
    pageContentEl.appendChild(highScoreTextEl);
    pageContentEl.appendChild(highScoresEl);
    pageContentEl.appendChild(buttonEl);
}

// load the scores when the page loads
let loadScores = function() {
    scores = localStorage.getItem("scores");
    if (scores === null) {
        scores = [];
        console.log(scores);
    } else {
        scores = JSON.parse(scores);
    }
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

// load the scores when the page loads
loadScores();