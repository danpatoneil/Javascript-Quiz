/*
acquire references to all 5 questions
use UL lists for multiple choice questions
click detector watches for a click on the answers box (ul)
    if click is on correct answer, clear card and load next question, advance correct counter by 1
    if click is on incorrect answer, deduct 30 seconds from timer
when correct counter is at 5, stop timer and record remaining time.
prompt user to enter their initials, if their input is something other than 3 letters, ask them to do it again
check if score is higher than the lowest in the list of 5 stored in memory.
If it is, remove the lowest entry, store the new score with the initials provided, and re-shuffle array and store it again.
 */
const questionEl = document.getElementById("questionText");
const questionListEl = document.getElementById("questionList");
const buttonEl = document.getElementById("jsButton");
const timerButtonEl = document.getElementById("buttonTimer");
let secondsLeft = 180;
let questionsLeft = 5;

//starts the timer, ticks down by "1 second" at a time.
function startTimer(){
  var timerInterval = setInterval(function() {
    secondsLeft--;
    //splits time into minutes and seconds so I can display the timer more readably
    let minutes = Math.floor(secondsLeft/60);
    let seconds = secondsLeft%60;
    //this probably isn't the most elegant or proper way of doing this but it works
    if(seconds<10){seconds=`0${seconds}`}
    timerButtonEl.textContent = `Time Remaining: ${minutes}:${seconds}`;

    if(secondsLeft === 0) {
      clearInterval(timerInterval);
      
    }
// an astute observer will notice that the timer is lying about how much time is left. This is intentional because I thought it was funny to have the timer tick down faster than it says
  }, 900);
}

buttonEl.addEventListener("click", function() {
  buttonEl.classList.add("invisible");
  startTimer();
});

function clearQuestions(){

}

function renderQuestions(){
    if(questionsLeft=0){

    }else{
        
    }
}