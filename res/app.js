document.addEventListener("DOMContentLoaded", function() {

    fetch("questions.json").then(res => res.json()).then(data => { 
            
        console.log(data.questions[0].question); // just a test
                    
        // var questionNum = 1;
        const btnNext = document.getElementById("next");
        const btnPrevious = document.getElementById("previous");
        // btnPrevious.disabled = true;
        

        btnPrevious.addEventListener("click", function() {
            
            console.log(questionNum);
            if(questionNum < 0) {
                btnPrevious.disabled = true;
            } else {
                var questionNum = 0;
                btnPrevious.disabled = false;
            }
        })
                    
        // btnNext.addEventListener("click", function() {

        //     ++questionNum; // increment question number (index) on each click event
        //     console.log(questionNum);
            
        //     if (questionNum >= data.questions.length) { // when question number reaches the length of questions (15) alert the msg
        //         alert("No more questions!");

        //     } else { // while it is less than questions length, display the content
        //         var answers = data.questions[questionNum].content;
        //         const answersContainer = document.getElementById("answers");
        //         var answerCorrect = data.questions[questionNum].correct;
                
        //         document.getElementById("question").innerHTML = data.questions[questionNum].question;
                
        //         for(i = 0; i < answers.length; i++) { // iterate through answers and put them in HTML
        //             var [answer1, answer2, answer3, answer4] = [answers[0], answers[1], answers[2], answers[3]];
                    
        //             answersContainer.innerHTML = `<div id="0">${answer1}</div><div id="1">${answer2}</div><div id="2">${answer3}</div><div id="3">${answer4}</div>`;
        //         };

        //         var answerDivs = answersContainer.childNodes;
        //         console.log(answerDivs);
                       
        //         for(j = 0; j < answerDivs.length; j++) {
        //             answerDivs[j].addEventListener("click", function(e) {
        //                 if(e.target.id == answerCorrect) {
        //                     console.log("correct");
        //                 } else {
        //                     console.log("incorrect");
        //                 }
        //             });
        //         };
            }; // the app        
        }); // btnNext event Listener

        
    }); // fetch data
}); // DOMContentLoaded event listener
    

        


