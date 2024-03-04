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
let questions = [
  {
    question: "What is Jquery?",
    answers: [
      "Something you ask your friend Jay",
      "A css framework that allows for fast development of web applications",
      "A Javascript Library designed to simplify HTML DOM tree traversal",
      "A programming language",
    ],
    correct:
      "A Javascript Library designed to simplify HTML DOM tree traversal",
  },
  {
    question:
      "Which of these is not a valid keyword for instantiating a variable in Javascript?",
    answers: ["var", "let", "const", "inst"],
    correct: "inst",
  },
  {
    question:
      "Which of these is a valid way to declare a function in Javascript?",
    answers: [
      "const funcitonName = () => {...",
      "functionName function(){...",
      "function(){...",
      "function functionName{...",
    ],
    correct: "const funcitonName = () => {...",
  },
];
// If I had more time or was a better programmer I'd figure out where these need to be used and passed to/from but that's a bit of code optimization for another day
let secondsLeft = questions.length*50;
let correctAnswer = "";
let gameover = false;
let initials = "";

//starts the timer, ticks down by "1 second" at a time.
function startTimer() {
  let timerInterval = setInterval(function () {
    secondsLeft--;
    //this is necessary because if someone answered wrong with less than 50 seconds left you end up with negative numbers. This makes sure those don't get rendered.
    if (secondsLeft < 0) {
      secondsLeft = 0;
      gameover = true;
    }
    //splits time into minutes and seconds so I can display the timer more readably
    let minutes = Math.floor(secondsLeft / 60);
    let seconds = secondsLeft % 60;
    //this probably isn't the most elegant or proper way of doing this but it works
    if (seconds < 10) seconds = `0${seconds}`;
    timerButtonEl.textContent = `Time Remaining: ${minutes}:${seconds}`;

    if (gameover == true) {
      clearInterval(timerInterval);
      //if gameover was set but there is still time on the clock, the player won and we ask their initials and record their time.
      if (secondsLeft > 0) {
        questionEl.innerHTML = `Congratulations, you WIN! You completed the quiz with ${minutes}:${seconds} remaining on the clock`;
        questionEl.classList.add("d-flex");
        questionEl.classList.add("justify-content-center");
        questionListEl.innerHTML = "";
        initials = prompt(
          "Congratulations! Please enter your 3 character initials."
        ).toUpperCase();
        while (initials.length != 3) {
          initials = prompt(
            "Sorry, that was not 3 characters. Please enter your 3 character initials."
          ).toUpperCase();
        }
        console.log(
          `${initials} completed the quiz with ${secondsLeft} remaining`
        );
        storeScore();
      } else {
        //if there is not time on the clock remaining, the player has lost and we make fun of them for their failure
        questionEl.innerHTML = `I'm sorry, you've failed. You're a failure now. Hope you can live with that.`;
        questionEl.classList.add("d-flex");
        questionEl.classList.add("justify-content-center");
        questionListEl.innerHTML = "";
      }
    }
    // an astute observer will notice that the timer is lying about how much time is left. This is intentional because I thought it was funny to have the timer tick down faster than it says
  }, 800);
}
//When you press the start button, the timer starts, the button is set to invisble, the
buttonEl.addEventListener("click", function () {
  buttonEl.classList.add("invisible");

  startTimer();
  nextQuestion();
});

questionListEl.addEventListener("click", function (event) {
  let element = event.target;
  // console.log(element.textContent);
  if (element.textContent == correctAnswer) {
    nextQuestion();
  } else {
    secondsLeft -= 50;
  }
});

//this function shifts the next question off the list, and renders all the questions into the HTML. Then it sets the correct answer variable so the event listener can check if the correct question was selected.
function nextQuestion() {
  if (questions.length == 0) {
    //this is simply an elegant way of ending the game without screwing up the timer display
    gameover = true;
    return;
  }
  document.getElementById("jsQuestions").classList.remove("invisible");
  let current = questions.shift();
  questionEl.textContent = current.question;
  questionListEl.innerHTML = "";
  for (const answer of current.answers) {
    let li = document.createElement("li");
    li.textContent = answer;
    li.classList.add("list-group-item");
    questionListEl.appendChild(li);
  }
  correctAnswer = current.correct;
}

//this function stores the score into local storage. It first pulls the list from local storage,  then checks if this score is better than the worst store in storage, and finally if it is removes that score, stores this one, and sorts the list by scores
function storeScore(){
  //first, pull local storage list of scores
  let scoreList = JSON.parse(localStorage.getItem("scoreList"));
  let winnerScore = {
    score: secondsLeft,
    name: initials
  };
  //if scoreList is empty, create scorelist and add the winner score to it
  if(scoreList == null){
    scoreList = [winnerScore];
  // if scoreLList ISN'T empty, check that it's an array
  }else if(Array.isArray(scoreList)){
    // score list should already be sorted correctly, so simply check that the current score is better than the worst on the list
    if(scoreList.length<5){
      scoreList.push(winnerScore);
    }else if(scoreList[scoreList.length-1].score < winnerScore.score){
      
      //pops the worst score off of the score list, which should be the lowest, and adds the new one on the end.
      scoreList.pop();
      scoreList.push(winnerScore);
    }
    //now the list is complete, but not sorted. We pass the score list to a helper function that accepts an array and returns the array sorted by score
  }else{
    // if there is something in scoreList but it's not an array, something has gone very wrong
    console.log("something has gone awry");
  }
  scoreList.sort((a, b) => {
    if(a.score<b.score){
    return 1;
    }else if(a.score>b.score){
    return -1;
    }else{
    return 0;
    }
    });

  localStorage.setItem("scoreList", JSON.stringify(scoreList));
}