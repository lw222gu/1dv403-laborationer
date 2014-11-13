"use strict";

var mezzageApp = {};
var Message = {};
        
    mezzageApp.init = function(){ 
        
        var mess = new Message("Testmeddelande", new Date());
        alert(mess);
        alert(mess.getText());
        mess.setText("En annan text att testa");
        alert(mess);
    }

window.onload = mezzageApp.init; //pekar på metoden init som kommer köras när sidan laddats