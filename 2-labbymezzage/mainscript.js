"use strict";

var mezzageApp = {
    
    messages: [],

    init: function(e){ 
        var button = document.querySelector(".button");
        button.onclick = function(){
        
        var mess = new Message(Message.prototype.getHTMLText(), Message.prototype.getDateText());
        mezzageApp.messages.push(mess);
        
        console.log(mezzageApp.messages);

        
        for(var i = 0; i <= mezzageApp.messages.length - 1; i++){
            
            if (mezzageApp.messages.length == 1){
                var ul = document.createElement("ul");
                document.getElementById("messages").appendChild(ul);
            }
            
            var li = document.createElement("li");
//            li.innerHTML = Message.prototype.toString();
            ul.appendChild(li);
        }
        
 //       return false;
        };
        
        
        
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


