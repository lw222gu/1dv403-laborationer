"use strict";

var mezzageApp = {
    
    messages: [],
    
    init: function(e){ 
        
        var button = document.querySelector("#button");
        document.getElementById("counter").innerHTML = "Antal meddelanden: 0";

        button.onclick = function(){

            var message = document.getElementById("textbox").value;

            var mess = new Message(message, new Date());
            mezzageApp.messages.push(mess);
            console.log(mezzageApp.messages);
            
            mezzageApp.renderMessages(mezzageApp.messages[mezzageApp.messages.length-1]);

        };

    },
    
    
    renderMessages: function(){

        document.getElementById("messages").innerHTML = "";
        var textbox = document.querySelector("#textbox");
        
        var counter = 0;
        var counterText; 
        
        for (var i = 0; i < mezzageApp.messages.length; ++i){
            mezzageApp.renderMessage(i);
            textbox.value = "";
            counter++;
            counterText = document.getElementById("counter").innerHTML = "Antal meddelanden: " + counter;
        }
        
    },
    
    
    renderMessage: function(messageID){
        
        var myMessages = document.getElementById("messages");
        
        var oneMessage = document.createElement("div");
        oneMessage.className = "message";
        
        var text = document.createElement("p");
        text.className = "messagetext";
        
        var date = document.createElement("footer");
        date.className = "datetext";

        text.innerHTML = mezzageApp.messages[messageID].getHTMLText();
        date.innerHTML = mezzageApp.messages[messageID].getDateText();
        oneMessage.appendChild(text);
        oneMessage.appendChild(date);
        
        myMessages.appendChild(oneMessage);
        
    },

};

window.onload = mezzageApp.init; //pekar på metoden init som kommer köras när sidan laddats




//            Message.message = document.getElementById("#textbox").value;
            
                    
//        sendMess.addEventListener("click", function(){
//           var mess = new Message();
//        });
        
   /* 
        var mess = new Message("Testmeddelande", new Date());
        alert(mess);
        alert(mess.getText());
        mess.setText("En annan text att testa");
        alert(mess);
        
        mezzageApp.messages.push(mess, "Kiwi");
        alert(mezzageApp.messages[1]);
        console.log(mess);
    */
    
 
 
 
 //Ul istället för div
 /*
            if(!clickedOnce){
                divMessages.appendChild(ul);        
                clickedOnce = true;
            }
 */      
    
    /*
            for (mess in mezzageApp.messages){
                var text = document.createElement("p");
                text.className = "messagetext";
                var date = document.createElement("p");
                date.className = "datetext";
                li = document.createElement("li");
                text.innerHTML = mezzageApp.messages[mess].getHTMLText(message);
                date.innerHTML = mezzageApp.messages[mess].getDateText();
                li.appendChild(text);
                li.appendChild(date);
            }
       
            ul.appendChild(li);
            var textbox = document.querySelector("#textbox");
            textbox.value = "";
 */