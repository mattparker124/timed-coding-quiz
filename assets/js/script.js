let pageContentEl = document.querySelector("#page-content");
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

// start the quiz
let beginQuiz = function() {
    clearScreen();
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