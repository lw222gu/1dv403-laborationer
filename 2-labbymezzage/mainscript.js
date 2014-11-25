"use strict";

var mezzageApp = {
    
    messages: [],

    init: function(e){ 
        
        var divMessages = document.getElementById("messages");
        var ul = document.createElement("ul");
        var clickedOnce = false;
        var li;
        var p;
        var button = document.querySelector("#button");
    
        button.onclick = function(){

            if(!clickedOnce){
                divMessages.appendChild(ul);        
                clickedOnce = true;
            }
            
            var message = document.getElementById("textbox").value;
//          var date = Message.prototype.getDateText();

            var mess = new Message(message, Message.date);
            mezzageApp.messages.push(mess);
            console.log(mezzageApp.messages);
        
            for (mess in mezzageApp.messages){
                li = document.createElement("li");
                p = document.createElement("p");
                p.innerHTML = message;
                li.appendChild(p);
            }
        
            ul.appendChild(li);

        };

            
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
    }
};

window.onload = mezzageApp.init; //pekar på metoden init som kommer köras när sidan laddats


