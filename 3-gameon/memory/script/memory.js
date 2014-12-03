"use strict";

var Memory = {

    imageArray: [],

    init: function(){
        var rows = 4;
        var cols = 4;
        
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
                var tileCell = document.createElement("td");
                tileCell.className = "imageTile";
                tableRow.appendChild(tileCell);
                
                var aTile = document.createElement("a");
                aTile.className = "tilelink";
                aTile.setAttribute("href", "#");
                    
                var tile = document.createElement("img");
                tile.className = "tile";
                tile.setAttribute("src", "pics/0.png")
 
//                this.imageArray.forEach(function(value){
//                     tile.setAttribute("src", "pics/" + value + ".png");
//                });
                    
                aTile.appendChild(tile);
                tileCell.appendChild(aTile);
                    
            }
        }
        
        
    },
    
};

window.onload = Memory.init; //pekar på metoden init som kommer köras när sidan laddats