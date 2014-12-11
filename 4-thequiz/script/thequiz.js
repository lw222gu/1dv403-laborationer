"use strict";

var Quiz = {
    
    questionNumber: 1,

    init: function(){
        
        var xhr = new XMLHttpRequest();
        var question;
        
            xhr.onreadystatechange = function(){
                
                if (xhr.readyState === 4 && xhr.status === 200){
                    question = JSON.parse(xhr.responseText);
                    Quiz.generateQuestion(question.question);
                }
                
            };
            
            xhr.open("GET", "http://vhost3.lnu.se:20080/question/" + Quiz.questionNumber, true);
            xhr.send(null);

            
//        document.getElementById("button").onclick = function();
        
    },
    
    generateQuestion: function(question){
        
        console.log(question);
        var questionHeader = document.getElementById("questionheader");
        var questionText = document.getElementById("question");
        
        questionHeader.innerHTML = "Fråga " + Quiz.questionNumber;
        questionText.innerHTML = question;
        
        Quiz.questionNumber++;
    
    },
    
};

window.onload = Quiz.init; //pekar på metoden init som kommer köras när sidan laddats