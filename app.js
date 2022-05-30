document.addEventListener("DOMContentLoaded", function () {
  fetch("questions.json")
    .then((res) => res.json())
    .then((data) => {
      var tracker = 0;
      var trackerMoney = -1;
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
        ++trackerMoney;
        
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
          const money = document.getElementsByTagName("p");
          const moneyArr = [...money];
          // reverse method because of the UI
          const reversedMoneyArr = moneyArr.reverse();

          questionContainer.innerHTML = data.questions[questionNum].question;

          // iterate through answers and put them in HTML
          for (let i = 0; i < answers.length; i++) {
            answersContainer.innerHTML = `<div id="0">${answer1}</div><div id="1">${answer2}</div><div id="2">${answer3}</div><div id="3">${answer4}</div>`;
          }
          // Indication of current money position
          for(let n = 0; n < reversedMoneyArr.length; n++) {
            reversedMoneyArr[questionNum].classList.add('currentMoney');
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
                  answersContainer.style = "";
                  answerDivs.forEach((el) => { 
                    el.style = "pointer-events:none" 
                    el.innerHTML = "";
                  });
                  questionContainer.innerHTML = '';
                  btnStart.style = "display: block";
                  btnStart.innerText = "Next Question";
                  reversedMoneyArr[trackerMoney].classList.remove('currentMoney')
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
