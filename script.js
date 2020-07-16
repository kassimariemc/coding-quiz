// Start button clicked
var startBtn = document.getElementById("start");

startBtn.addEventListener("click", startTimer);
startBtn.addEventListener("click", startQuiz);

// Timer
var timerEl = document.getElementById("timer");

var secondsLeft = 80;

function startTimer(event) {
  event.preventDefault();
  var timerInterval = setInterval(function() {
    secondsLeft--;
    timerEl.textContent = secondsLeft;

    if(secondsLeft === 0 || index > 4) {
      clearInterval(timerInterval);
      quizOver();
    }

  }, 1000);
}

// Start Quiz
var startEl = document.getElementById("start-page");

var q1El = document.getElementById("q1");
q1El.style.display = "none";
var q2El = document.getElementById("q2");
q2El.style.display = "none";
var q3El = document.getElementById("q3");
q3El.style.display = "none";
var q4El = document.getElementById("q4");
q4El.style.display = "none";
var q5El = document.getElementById("q5");
q5El.style.display = "none";
var ansClick = document.getElementById("questions");

function startQuiz(event) {
  event.preventDefault();
  startEl.style.display = "none";
  q1El.style.display = "block";
}

// Loop through questions and keep score
var ansButton = document.querySelectorAll("button");
var score = 0;
var index = 0;
var questionArr = [q1El, q2El, q3El, q4El, q5El];
var currentQ;
var previousQ;

// Question Loop
function nextQ(direction) {
  index = index + direction;
  if(index > 4) {
    quizOver();
  }
  else {
    currentQ = questionArr[index];
    previousQ = questionArr[index -1];

    currentQ.style.display = "block";
    previousQ.style.display = "none";

    // Display if answer was correct
    if(event.target.matches(".true")) {
      currentQ.lastElementChild.textContent = "Correct!";
      currentQ.lastElementChild.setAttribute("style", "color: #FCA311; font-style: italic; margin-top: 10px;");
    }
    // Display if answer was wrong
    else if(event.target.matches(".false")) {
      currentQ.lastElementChild.textContent = "Wrong!";
      currentQ.lastElementChild.setAttribute("style", "color: #FCA311; font-style: italic; margin-top: 10px;");
    }
  }

} 

ansClick.addEventListener("click", function() {
  if(event.target.matches("button")) {
    // If correct answer selected increase score
    if(event.target.matches(".true")) {
      score = score + 10;
    }
    // If incorrect answer selected penalize time
    else if(event.target.matches(".false")) {
      secondsLeft = secondsLeft - 10;
    }
    nextQ(1);
  }
});

// Quiz over
var overEl = document.getElementById("over");
overEl.style.display = "none";
var scoreEl = document.getElementById("score");

function quizOver() {
  q5El.style.display = "none";
  overEl.style.display = "block";
  scoreEl.textContent = score;
}

// Store Initials and score into highscores