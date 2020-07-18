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

    if(secondsLeft === 0 || index >= 5) {
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

var correctSound = new Audio();
correctSound.src = "assets/bell-transition.mp3";
var wrongSound = new Audio();
wrongSound.src = "assets/hockey-buzzer.mp3";

function startQuiz(event) {
  event.preventDefault();
  startEl.style.display = "none";
  q1El.style.display = "block";
}

// Loop through questions and keep score
var score = 0;
var index = 0;
var questionArr = [q1El, q2El, q3El, q4El, q5El];
var currentQ;
var previousQ;

// Question Loop
function nextQ(direction) {
  index = index + direction;
  if(index >= 5) {
    quizOver();
  }
  else {
    currentQ = questionArr[index];
    previousQ = questionArr[index -1];

    currentQ.style.display = "block";
    previousQ.style.display = "none";

    // Display if answer was correct
    if(event.target.matches(".true")) {
      correctSound.play();
      currentQ.lastElementChild.textContent = "Correct!";
      currentQ.lastElementChild.setAttribute("style", "color: #FCA311; font-style: italic; margin-top: 10px;");
    }
    // Display if answer was wrong
    else if(event.target.matches(".false")) {
      wrongSound.play();
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

// Quiz over, display final score
var overEl = document.getElementById("over");
overEl.style.display = "none";
var scoreEl = document.getElementById("score");

function quizOver() {
  q5El.style.display = "none";
  overEl.style.display = "block";
  scoreEl.textContent = score;
}

// Highscores Page
var submitBtn = document.getElementById("submit");
var initialsInput = document.getElementById("initials");
var scorePage = document.getElementById("highscore-page");
scorePage.style.display = "none";
var scoreList = document.getElementById("highscore-list");
var header = document.querySelector("header");

// Highscores Object
var highScoresObj = [];

function renderScores() {
  // Clear scores
  scoreList.innerHTML = "";
  
  // Render new li for each new initial
  for (var i = 0; i < highScoresObj.length; i++) {
    var userInitials = highScoresObj[i].initials;
    var userHighScore = highScoresObj[i].topScore;

    var li = document.createElement("li");
    li.innerHTML = userInitials + "    ~    " + userHighScore;
    li.setAttribute("data-index", i);
    li.setAttribute("style", "background-color: #FCA311; margin: 5px; padding: 5px; font-size: 20px;");

    scoreList.appendChild(li);
  }
}

init();

function init() {
  // Get stored scores from localStorage
  var storedScores = JSON.parse(localStorage.getItem("highScores"));

  if (storedScores !== null) {
    highScoresObj = storedScores;
  }
  renderScores();
}

function storeScores() {
  localStorage.setItem("highScores", JSON.stringify(highScoresObj));
}

// When initials submitted
submitBtn.addEventListener("click", function(event) {
  event.preventDefault();
  overEl.style.display = "none";
  scorePage.style.display = "block";
  header.style.display = "none";
  
  // Grab user input
  var initialsText = initialsInput.value.trim();

  // If user input blank
  if (initialsText === "") {
    return;
  }

  // Add new initials and score to array
  highScoresObj.push({initials: initialsText, topScore: score});
  
  // Store and re-render
  storeScores();
  renderScores();
});

// Clear scores
var clearEl = document.getElementById("clear-scores");
clearEl.addEventListener("click", function(event) {
  event.preventDefault();

  for(var i = 0; i < highScoresObj.length; i++) {
    highScoresObj[i].initials = "";
    highScoresObj[i].topScore = "";
    highScoresObj.length = 0;
  }

  storeScores();
  renderScores();
});

// View Scores link
var scoreLink = document.getElementById("view-scores");
scoreLink.addEventListener("click", function(event) {
  event.preventDefault();
  startEl.style.display = "none";
  scorePage.style.display = "block";
  header.style.display = "none";

  init();
});