"use strict";

var Memory = {

    imageArray: [],

    
    init: function(){
        var rows = 4;
        var cols = 4;
        
        Memory.createGameArray(rows, cols);
    },
    
    createGameArray: function (rows, cols){
        var gameArray = RandomGenerator.getPictureArray(rows, cols);
    },
    
};

window.onload = Memory.init; //pekar på metoden init som kommer köras när sidan laddats