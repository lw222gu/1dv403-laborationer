/* Message constructor */

function Message(message, date){
    
    var text;
    
    this.getText = function(){
        return message;
    };
    
    this.setText = function(_text){
        message = text;
    };
    
    this.getDate = function(){
        return date;
    };
    
    this.setDate = function(_date){
        date = new Date();
    };
}

Message.prototype.toString = function(){
    return this.getText()+" ("+this.getDate()+")";
};

Message.prototype.getHTMLText = function(_text){
    
};

Message.prototype.getDateText = function(_date){
    
};

