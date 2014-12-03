"use strict";

var Memory = {

    imageArray: [],

    init: function(){
        var rows = 3;
        var cols = 2;
        
        Memory.createGameArray(rows, cols);
    },
    
    createGameArray: function (rows, cols){
        this.imageArray = RandomGenerator.getPictureArray(rows, cols);
        console.log(this.imageArray);
        Memory.createBoard(rows, cols);
    },
    
    createBoard: function(rows, cols){
//        var numberOfTiles = rows * cols;
        var table = document.querySelector(".memorytable");
        
        for (var i = 1; i <= rows; i++){
            var tableRow = document.createElement("tr");
            tableRow.className = "tablerow";
            table.appendChild(tableRow);
            
            for (var j = 1; j <= cols; j++ ){
                var imageTile = document.createElement("td");
                imageTile.className = "imageTile";
                tableRow.appendChild(imageTile);
            }
        }
    },
    
};

window.onload = Memory.init; //pekar på metoden init som kommer köras när sidan laddats