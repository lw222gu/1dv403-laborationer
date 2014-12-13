"use strict";

var Quiz = {
    
    questionText: "",
    question: {},
    numberOfAnswers: 0,
    questionNumber: 1,
    url: "http://vhost3.lnu.se:20080/question/1",

    init: function(){

        var xhr = new XMLHttpRequest();
        
        xhr.onreadystatechange = function(){
                
            if (xhr.readyState === 4 && xhr.status === 200){
                Quiz.question = JSON.parse(xhr.responseText);
                Quiz.questionText = Quiz.question.question;
                
                Quiz.generateQuestion(Quiz.questionText);
            }
                
        };
            
        xhr.open("GET", Quiz.url, true);
        xhr.send(null);
        
    },
    
    generateQuestion: function(questionText){
        
        var questionHeader = document.getElementById("questionheader");
        var questionP = document.getElementById("question");

        questionHeader.innerHTML = "Fråga " + Quiz.questionNumber;
        questionP.innerHTML = questionText;
        
        Quiz.writeAnswer();
    
    },
    
    writeAnswer: function(){
        
        var textarea = document.getElementById("textbox");
        textarea.focus();
        var button = document.getElementById("button");

        button.onclick = function(){
            Quiz.sendAnswer(textarea.value);
        };
        
        textarea.onkeypress = function(e){
            if(e.keyCode == 13 && !e.shiftKey){
                e.preventDefault();
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

            //If answer is correct    
            if (xhr2.readyState === 4 && xhr2.status === 200){
                Quiz.question = JSON.parse(xhr2.responseText);
                Quiz.url = Quiz.question.nextURL;
                
                if (Quiz.question.nextURL === undefined){
                    Quiz.youWonPopup();
                }
                
                else {
                    Quiz.questionNumber++;
                    Quiz.init();
                }
            }
            
            //If answer is wrong
            else if (xhr2.status === 400) {
                var main = document.getElementById("main");
                main.setAttribute("class", "red");
                
                setTimeout(function(){
                    main.className = "";
                }, 600);
                
                document.getElementById("questionheader").innerHTML = "Fråga " + Quiz.questionNumber + " - Fel, försök igen!";
            }

            document.getElementById("textbox").value = "";
        
        };
        
    },
    
    youWonPopup: function (){
        
        var main = document.getElementById("main");
        var divPopup = document.createElement("div");
        divPopup.setAttribute("class", "popup");
        var h2Popup = document.createElement("h2");
        var pPopup = document.createElement("p");
        var button = document.createElement("button");
        
        h2Popup.innerHTML = "Grattis, du vann!";
        pPopup.innerHTML = "Du behövde " + Quiz.numberOfAnswers + " svar för att klara samtliga frågor.";
        button.innerHTML = "Spela igen!";

        divPopup.appendChild(h2Popup);
        divPopup.appendChild(pPopup);
        divPopup.appendChild(button);
        main.insertBefore(divPopup, main.firstChild);
        
        button.focus();
        
        button.onclick = function(){
            main.removeChild(divPopup);
            Quiz.numberOfAnswers = 0;
            Quiz.questionNumber = 1;
            Quiz.url = "http://vhost3.lnu.se:20080/question/1";

            Quiz.init();
        };
    },
    
};

window.onload = Quiz.init; //pekar på metoden init som kommer köras när sidan laddats