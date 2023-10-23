var start = document.getElementById("start");
start.addEventListener("click", startGame);
var timerEL = document.getElementById('timer');
var timeLeft = 60;

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

// Function that starts the game
function startGame() {
    setTimer();
}