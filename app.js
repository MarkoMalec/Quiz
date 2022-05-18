document.addEventListener("DOMContentLoaded", function() {
    
    fetch("questions.json").then(res => res.json()).then(data => { 
        
        console.log(data.questions[0].question); // just a test
        var score = "0";            
        var questionNum = -1;
        const btnStart = document.getElementById("start");
        
        btnStart.addEventListener("click", function nextQuestion() {
            btnStart.remove();
            ++questionNum; // increment question number (index) on each click event
            
            if (questionNum >= data.questions.length) { // when question number reaches the length of questions (15) alert the msg
                alert("Congratulations, you are still not a millionare...");
                
            } else { // while it is less than questions length, display the content
                const allContent = document.getElementsByClassName("content-wrapper")[0];
                const questionContainer = document.getElementById("question");
                const answers = data.questions[questionNum].content;
                const answersContainer = document.getElementById("answers");
                const answerDivs = answersContainer.childNodes;
                const answerCorrect = data.questions[questionNum].correct;
                const [answer1, answer2, answer3, answer4] = [answers[0], answers[1], answers[2], answers[3]];
                const scoreValue = document.getElementById("scoreValue");
                scoreValue.innerHTML = score;
                
                questionContainer.innerHTML = data.questions[questionNum].question;

                // iterate through answers and put them in HTML
                for(let i = 0; i < answers.length; i++) { 
                    answersContainer.innerHTML = `<div id="0">${answer1}</div><div id="1">${answer2}</div><div id="2">${answer3}</div><div id="3">${answer4}</div>`;
                };

                // check if answer clicked is correct and if it is activate nextQuestion();      
                for(let j = 0; j < answerDivs.length; j++) {
                    answerDivs[j].addEventListener("click", function(e) {
                        if(e.target.id == answerCorrect) { // this block will indicate if the answer was correct or not by changing bg color of answer clicked
                            e.target.style = "background-color:green";
                        } else {
                            e.target.style = "background-color:red";
                        };
                        setTimeout(function(){
                            if(e.target.id == answerCorrect) {
                                ++score
                                nextQuestion();
                            } else {
                                allContent.style = "flex-direction:column";
                                allContent.innerHTML = `<p>Wrong answer, the correct answer was:<br /><strong>${answers[answerCorrect]}</strong></p>`;
                                allContent.innerHTML += `<h1>Game Over!</h1>`
                                allContent.innerHTML += `<p>You got ${score}/15 answers right!`
                                allContent.innerHTML += `<button id="restart" style="padding:1.5rem 2.5rem;font-size:1.25rem">Try again</button>`
                                var btnRestart = document.getElementById("restart");
                        
                                btnRestart.addEventListener("click", () => {
                                    location.reload();
                                })
                            };
                        }, 2000)
                    });
                };
            }; // the app (else)       
        }); // btnNext event Listener
    }); // fetch data
}); // DOMContentLoaded event listener
    

        


