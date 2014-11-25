"use strict";
/* Message constructor */

function Message(message, date){
    
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

Message.prototype.getHTMLText = function(){
    // Hämtar texten med \n utbytt mot <br/>
    var text = this.getText();
    return text;
    
};

Message.prototype.getDateText = function(_date){
    var dateText = Message.getDate();
    return dateText;
};

