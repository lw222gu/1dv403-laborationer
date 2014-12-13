"use strict";

var Quiz = {
    
    questionNumber: 1,
    answer: {},
    questionText: "",
    questionID: 1,

    init: function(){
        
        var xhr = new XMLHttpRequest();
        
            xhr.onreadystatechange = function(){
                
                if (xhr.readyState === 4 && xhr.status === 200){
                    var question = JSON.parse(xhr.responseText);
                    Quiz.questionText = question.question;
                    Quiz.questionID = question.id;
                    Quiz.generateQuestion(Quiz.questionText, Quiz.questionID);
                }
                
            };
            
            xhr.open("GET", "http://vhost3.lnu.se:20080/question/" + Quiz.questionID, true);
            xhr.send(null);
        
    },
    
    generateQuestion: function(questionText, questionID){
        
        console.log(questionText);
        var questionHeader = document.getElementById("questionheader");
        var questionP = document.getElementById("question");
        
        questionHeader.innerHTML = "Fråga " + questionID;
        questionP.innerHTML = questionText;
        
        Quiz.questionNumber++;
        
        Quiz.saveAnswer();
    
    },
    
    saveAnswer: function(){
        
        var textarea = document.getElementById("textbox");
        var button = document.getElementById("button");

        button.onclick = function(){
            console.log(textarea.value);
        };
        
        textarea.onkeypress = function(e){
            if(e.keyCode == 13 && !e.shiftKey){
                e.preventDefault();
                console.log(textarea.value);
            }
        };
        
    },
    
};

window.onload = Quiz.init; //pekar på metoden init som kommer köras när sidan laddats