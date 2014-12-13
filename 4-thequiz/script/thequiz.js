"use strict";

var Quiz = {
    
    questionText: "",
    questionID: 1,
    question: {},
    numberOfAnswers: 0,
    url: "http://vhost3.lnu.se:20080/question/",

    init: function(){
        
        var xhr = new XMLHttpRequest();
        
        xhr.onreadystatechange = function(){
                
            if (xhr.readyState === 4 && xhr.status === 200){
                Quiz.question = JSON.parse(xhr.responseText);
                Quiz.questionText = Quiz.question.question;
                Quiz.questionID = Quiz.question.id;                    
                Quiz.generateQuestion(Quiz.questionText, Quiz.questionID);
            }
                
        };
            
        xhr.open("GET", Quiz.url + Quiz.questionID, true);
        xhr.send(null);
        
    },
    
    generateQuestion: function(questionText, questionID){
        
        console.log(questionText);
        var questionHeader = document.getElementById("questionheader");
        var questionP = document.getElementById("question");
        
        questionHeader.innerHTML = "Fråga " + questionID;
        questionP.innerHTML = questionText;
        
        Quiz.questionNumber++;
        
        Quiz.writeAnswer();
    
    },
    
    writeAnswer: function(){
        
        var textarea = document.getElementById("textbox");
        var button = document.getElementById("button");

        button.onclick = function(){
            console.log(textarea.value);
            Quiz.sendAnswer(textarea.value);
        };
        
        textarea.onkeypress = function(e){
            if(e.keyCode == 13 && !e.shiftKey){
                e.preventDefault();
                console.log(textarea.value);
                Quiz.sendAnswer(textarea.value);
            }
        };
        
    },
    
    sendAnswer: function(answerText){
        
        Quiz.numberOfAnswers++;
        
        var xhr2 = new XMLHttpRequest();
     
        xhr2.open("POST", Quiz.question.nextURL, true);
        xhr2.setRequestHeader("Content-Type", "application/json"); 
        
        var answer = {
	        "answer": answerText
        };
    
        xhr2.send(JSON.stringify(answer));
        
        xhr2.onreadystatechange = function(){
                
            if (xhr2.status === 200){
                console.log("Rätt!");
            }
            
            else {
                console.log("Fel!");
            }
                
        };
        
    },
    
};

window.onload = Quiz.init; //pekar på metoden init som kommer köras när sidan laddats