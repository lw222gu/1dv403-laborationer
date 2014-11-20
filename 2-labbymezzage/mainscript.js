"use strict";

var mezzageApp = {
    
    messages: [],

    init: function(e){ 
        
        var mess = new Message("Testmeddelande", new Date());
/*      alert(mess);
        alert(mess.getText());
        mess.setText("En annan text att testa");
        alert(mess);
        
        mezzageApp.messages.push(mess, "Kiwi");
        alert(mezzageApp.messages[1]);
*/
    }
};


window.onload = mezzageApp.init; //pekar på metoden init som kommer köras när sidan laddats


