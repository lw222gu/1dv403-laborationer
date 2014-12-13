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
        
        console.log(questionText);
        var questionHeader = document.getElementById("questionheader");
        var questionP = document.getElementById("question");

        questionHeader.innerHTML = "Fråga " + Quiz.questionNumber;
        questionP.innerHTML = questionText;
        
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
        console.log(Quiz.numberOfAnswers);
        
        var xhr2 = new XMLHttpRequest();
     
        xhr2.open("POST", Quiz.question.nextURL, true);
        xhr2.setRequestHeader("Content-Type", "application/json"); 
        
        var answer = {
	        "answer": answerText
        };
    
        xhr2.send(JSON.stringify(answer));
        
        xhr2.onreadystatechange = function(){
                
            if (xhr2.readyState === 4 && xhr2.status === 200){
                console.log("Rätt!");
                Quiz.question = JSON.parse(xhr2.responseText);
                Quiz.url = Quiz.question.nextURL;
                
                if (Quiz.question.nextURL === undefined){
                    console.log("Spelet slut!");
                    Quiz.youWonPopup();
                }
                
                else {
                    Quiz.questionNumber++;
                    Quiz.init();
                }
            }
            
            else if (xhr2.status === 400) {
                console.log("Fel!");

                var main = document.getElementById("main");
                main.setAttribute("class", "red");
                
                setTimeout(function(){
                    main.className = "";
                }, 2000);
            }

            document.getElementById("textbox").value = "";
        
        };
        
    },
    
    youWonPopup: function (){
        
//        document.getElementById("questionheader").innerHTML = "";
//        document.getElementById("question").innerHTML = "";
        
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