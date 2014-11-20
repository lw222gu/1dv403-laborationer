"use strict";
/* Message constructor */

function Message(message, date){
    
 //   var text;
    
    this.getText = function(){
        return message;
    };
    
    this.setText = function(_text){
        message = _text;
    };
    
    this.getDate = function(){
        return date;
    };
    
    this.setDate = function(_date){
        date = new Date();
    };
}

Message.prototype.toString = function(){
    // Returnerar objektet som en sträng
    return (this.getText() + " (" + this.getDate() + ")");
};

Message.prototype.getHTMLText = function(text){
    // Hämtar texten med \n utbytt mot <br/>
    // return this.getText();
    
};

Message.prototype.getDateText = function(_date){
    // Hämtar datumet? Vad gör denna egentligen. Finns med i exemplet men inte listan över funktioner.
};

