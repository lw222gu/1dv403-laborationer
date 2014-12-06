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
        var table = document.querySelector(".memorytable");
        var brickNumber = 0;


            for (var i = 1; i <= rows; i++){
                var tableRow = document.createElement("tr");
                tableRow.className = "tablerow";
                table.appendChild(tableRow);
    
                for (var j = 1; j <= cols; j++ ){
                    var tileCell = document.createElement("td");
                    tileCell.className = "imageTile";
                    
                    var aTile = document.createElement("a");
                    aTile.className = "tilelink";
                    aTile.setAttribute("href", "#");
                    aTile.setAttribute("bricknumber", brickNumber);
                        
                    var tile = document.createElement("img");
                    tile.className = "tile";
                    tile.setAttribute("src", "pics/0.png");
                        
                    aTile.appendChild(tile);
                    tileCell.appendChild(aTile);
                    tableRow.appendChild(tileCell);
                    brickNumber += 1;
                 
                    var myBrick = 0;                 
                 
                    aTile.onclick = function(){
                        var imageElement = this.getElementsByTagName("img");
                        myBrick += 1;
                        Memory.flipTile(imageElement[0], this.getAttribute("bricknumber"), myBrick);
                    };
                    
                }
                    
            }
        
    },
    
    flipTile: function(imageElement, bricknumber, myBrick){
        imageElement.setAttribute("src", "pics/" + Memory.imageArray[bricknumber] + ".png");
        console.log(myBrick);
    },
 
 /*
    compareTiles: function(myBrick){
        var turnedBricks = [];
        turnedBricks.push(myBrick);
        console.log(turnedBricks);
    },
*/ 

};

window.onload = Memory.init; //pekar på metoden init som kommer köras när sidan laddats