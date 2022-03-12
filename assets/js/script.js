let pageContentEl = document.querySelector("#page-content");
let timer = document.querySelector("#timer");
let currentTime = 0;
let scores = [];

// a button was clicked
let buttonHandler = function(event) {
    // get target element from event
    let targetEl = event.target;

    // start quiz button was clicked
    if (targetEl.matches(".start-btn")) {
        beginQuiz();
    }
}

let timerManager = function() {
    setInterval(function() {
        if (currentTime < 1) {
            timer.innerHTML = "Time Remaining: 00";
            clearInterval();
        } else if (currentTime < 10) {
            timer.innerHTML = "Time Remaining: 0" + currentTime--;
        } else {
            timer.innerHTML = "Time Remaining: " + currentTime--;
        }
    }, 1000)
}

// start the quiz
let beginQuiz = function() {
    clearScreen();

    // set and start the timer
    currentTime = 60;
    timerManager();
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