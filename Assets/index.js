//button that starts the game
var start = document.getElementById("start");
start.addEventListener("click", startGame);
var timerEL = document.getElementById('timer');
var timeLeft = 60;
var highScore = document.getElementById("highScore");
highScore.addEventListener("click", pastScore);

// Function that controls the Timer
function setTimer() {
    var countdown = setInterval(function () {
        timeLeft--;
        timerEL.textContent = "Time Left: " + timeLeft;

        if (timeLeft <= 0) {
            clearInterval(countdown);
            timerEL.textContent = "0"; // Corrected the element name to timerEL
            // displayScore();
        }
    }, 1000);
}

//questions
var questions = [
    {
        question: "How many Hit Dice does a Monk have per level?",
        options: ["1d4", "1d6", "1d8", "1d12"],
        answerNumber: 2,
        answer: "1d8",
    },
    {
        question: "At what level do Rogues pick their subclass?",
        options: ["1", "2", "3", "4"],
        answerNumber: 2,
        answer: "3",
    },{
        question: "which is not an free action?",
        options: ["Talk", "Attack", "Draw a Weapon", "Interact with an object"],
        answerNumber: 1,
        answer: "Attack",
    },{
        question: "What does flanking give you per the PHB?",
        options: ["+2 to attack", "nothing", "An extra attack", "advantage on the Attack"],
        answerNumber: 3,
        answer: "advantage on the attack",
    },{
        question: "Which class is not considered a 'full caster'?",
        options: ["Ranger", "Wizard", "Warlock", "Scorcerer"],
        answerNumber: 0,
        answer: "Ranger",
    },{
        question: "what are a Barbarian's main stats?",
        options: ["Cha + Wis", "Int + Str", "Str + Con", "Dex + Cha"],
        answerNumber: 2,
        answer: "Str + Con",
    },{
        question: "What die do you use the most?",
        options: ["d4", "d100", "d10", "d20"],
        answerNumber: 3,
        answer: "d20",
    },
];
var answerButton = document.getElementsByClassName("answerChoice");
var correctAnswer = 0;
var wrongAnswer = 0;

for (var i = 0; i < answerButton.length; i++) {
    answerButton[i].addEventListener("click", checkAnswer);
  }

function answerBtn(){
    var answers = document.getElementById("answerOptions");
    answers.style.display ="block";
};



document.getElementById("answerOptions");
answerOptions.style.display = "none";
var currentQuestionNum = 0;
function showQuestions() {
    var questionText = document.getElementById("question");
    var answers = document.getElementById("answerOptions");
    var currentQ = questions[currentQuestionNum];
    questionText.textContent = currentQ.question;

    var answerChoice = answers.getElementsByClassName("answerChoice");
    for( var i=0; 
        i < currentQ.options.length;
        i++){
            answerChoice[i].textContent = currentQ.options[i];
        }
};
function checkAnswer(event) {
    var selectedAnswer = event.target.textContent;
    var currentQ = questions[currentQuestionNum];
  
    if (selectedAnswer === currentQ.options[currentQ.answerNumber]) {
        correctAnswer++;
      } else {
        wrongAnswer++;
        timeLeft -= 5;
      }
  
    currentQuestionNum++;
  
    if (currentQuestionNum < questions.length) {
      showQuestions();
    } else {
      displayScore();
    }
  }
 
  function displayScore() {
    var score = document.getElementById("score");
    score.textContent =
      "Answered correctly: " +
      correctAnswer +
      " Answered incorrectly: " +
      wrongAnswer;
  
    var nameInput = document.createElement("input");
    nameInput.setAttribute("type", "text");
    nameInput.setAttribute("placeholder", "Enter your initials");
  
    var submitButton = document.createElement("button");
    submitButton.textContent = "Submit";
    
    score.appendChild(nameInput);
    score.appendChild(submitButton);
    nameInput.style.display = "flex";
    nameInput.style.display = "column";

    var backButton = document.createElement("button");
    backButton.textContent = "Play again";
    score.appendChild(backButton);
    backButton.addEventListener("click", startOver);
    backButton.style.display = "flex";
    backButton.style.display = "column";

    submitButton.addEventListener("click", function () {
      var initials = nameInput.value.trim();
      if (initials) {
        localStorage.setItem("userIn", initials);
        localStorage.setItem("correctAns", correctAnswer);
      }

    });
  }

  function pastScore(){
    var savedIn = localStorage.getItem("userIn");
    var savedScore = localStorage.getItem("correctAns");
    if (savedIn){
       var score = document.getElementById("score");
       var show = document.getElementById("show");
       show.style.display = "none";
        var showIn = document.createElement("p");
        showIn.textContent = savedIn + " answered " + savedScore + " correctly!"
        score.appendChild(showIn);
    }
    var backButton = document.createElement("button");
    backButton.textContent = "Play again";
    score.appendChild(backButton);
    backButton.addEventListener("click", startOver);
    backButton.style.display = "flex";
    backButton.style.display = "column";
  };

  function startOver() {
    window.location.reload();
  }
// Function that starts the game
function startGame() {
    setTimer();
    showQuestions();
    answerBtn()
};