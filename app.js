document.addEventListener("DOMContentLoaded", function () {
  fetch("questions.json")
    .then((res) => res.json())
    .then((data) => {
      var score = 0;
      var tracker = 0;
      var questionNum = -1;
      const btnStart = document.getElementById("start");

      //////// SOUNDS:
      var soundCorrect = new Audio("sounds/correct_answer.mp3");
      var soundWrong = new Audio("sounds/sounds_wrong_answer.mp3");
      var soundStart = new Audio("sounds/sounds_lets_play.mp3");

      btnStart.addEventListener("click", function nextQuestion() {
        btnStart.style = "display: none";
        soundStart.play();
        ++questionNum; // increment question number (index) on each click event

        if (questionNum >= data.questions.length) {
          // when question number reaches the length of questions (15) alert the msg
          alert("Congratulations, you are still not a millionare...");
        } else {
          // while it is less than questions length, display the content
          const allContent =
            document.getElementsByClassName("content-wrapper")[0];
          const questionContainer = document.getElementById("question");
          const answers = data.questions[questionNum].content;
          const answersContainer = document.getElementById("answers");
          const answerDivs = answersContainer.childNodes;
          const answerCorrect = data.questions[questionNum].correct;
          const [answer1, answer2, answer3, answer4] = [
            answers[0],
            answers[1],
            answers[2],
            answers[3],
          ];
          const scoreValue = document.getElementById("scoreValue");
          scoreValue.innerHTML = score;

          questionContainer.innerHTML = data.questions[questionNum].question;

          // iterate through answers and put them in HTML
          for (let i = 0; i < answers.length; i++) {
            answersContainer.innerHTML = `<div id="0">${answer1}</div><div id="1">${answer2}</div><div id="2">${answer3}</div><div id="3">${answer4}</div>`;
          }

          // check if answer clicked is correct and if it is activate nextQuestion();
          for (let j = 0; j < answerDivs.length; j++) {
            answerDivs[j].addEventListener("click", function checkAnswer(e) {
              if (e.target.id == answerCorrect) {
                // this block will indicate if the answer was correct or not by changing bg color of answer clicked
                soundCorrect.play();
                e.target.style = "background-color:green";
                answersContainer.style = "pointer-events:none";
              } else {
                answerDivs[answerCorrect].classList.add("answerCorrect");
                soundWrong.play();
                e.target.style = "background-color:red;pointer-events:none";
              }
              setTimeout(function () {
                if (e.target.id == answerCorrect) {
                  ++tracker;
                  score += 100;
                  answersContainer.style = "";
                  //messy part where I copied the money part from original game
                  questionNum == 0 ? (score = 100) : score;
                  questionNum == 1 ? (score = 200) : score;
                  questionNum == 2 ? (score = 300) : score;
                  questionNum == 3 ? (score = 500) : score;
                  questionNum == 4 ? (score = 1000) : score;
                  questionNum == 5 ? (score = 2000) : score;
                  questionNum == 6 ? (score = 4000) : score;
                  questionNum == 7 ? (score = 8000) : score;
                  questionNum == 8 ? (score = 16000) : score;
                  questionNum == 9 ? (score = 32000) : score;
                  questionNum == 10 ? (score = 64000) : score;
                  questionNum == 11 ? (score = 125000) : score;
                  questionNum == 12 ? (score = 250000) : score;
                  questionNum == 13 ? (score = 500000) : score;
                  questionNum == 14 ? (score = "1 Million") : score;
                  btnStart.style = "display: block";
                  btnStart.innerText = "Next Question";
                  // for(let n = 0; n < answerDivs.length; n++) {
                  //   answerDivs[n].style = "pointer-events:none";
                  // }
                  // // repeat style for correct answer because it gets removed after timeout
                  // answerDivs[j].style = "background-color:green";
                } else {
                  allContent.style.flexDirection = "column";
                  allContent.innerHTML = `<p>Wrong answer, the correct answer was:<br /><br /><strong>${answers[answerCorrect]}</strong></p>`;
                  allContent.innerHTML += `<h1>Game Over!</h1>`;
                  allContent.innerHTML += `<p>You got ${tracker}/15 answers right!`;
                  allContent.innerHTML += `<button id="restart" style="padding:1.5rem 2.5rem;font-size:1.25rem">Try again</button>`;
                  var btnRestart = document.getElementById("restart");

                  btnRestart.addEventListener("click", () => {
                    location.reload();
                  });
                }
              }, 5000);
            }); // EventListener for answerDivs[j]
          } // for loop through answerDivs
        } // the app (else)
      }); // btnNext event Listener
    }); // fetch data
}); // DOMContentLoaded event listener
