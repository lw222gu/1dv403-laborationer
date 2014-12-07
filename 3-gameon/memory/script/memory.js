"use strict";

var Memory = {

    imageArray: [],
    turnedBricks: [],
    numberOfPairs: 0,

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
                    aTile.setAttribute("id", brickNumber);
                        
                    var tile = document.createElement("img");
                    tile.className = "tile";
                    tile.setAttribute("src", "pics/0.png");
                        
                    aTile.appendChild(tile);
                    tileCell.appendChild(aTile);
                    tableRow.appendChild(tileCell);
                    brickNumber += 1;
                 
                    aTile.onclick = function(){
                        var imageElement = this.getElementsByTagName("img");
                        Memory.flipTile(imageElement[0], this.getAttribute("id"));
                    };
                    
                }
                    
            }
        
    },
    
    flipTile: function(imageElement, brickNumber){
        var imageID = Memory.imageArray[brickNumber];
        imageElement.setAttribute("src", "pics/" + imageID + ".png");

        Memory.turnedBricks.push(brickNumber);
    
        if (Memory.turnedBricks.length === 2){
            Memory.compareTiles();
//            Memory.turnedBricks = [];
        }
        
    },
 
    compareTiles: function(){
        if (Memory.imageArray[Memory.turnedBricks[0]] === Memory.imageArray[Memory.turnedBricks[1]]){
            Memory.numberOfPairs++;
            console.log("Antal par: ", Memory.numberOfPairs);
        }
        
        else {
            setTimeout(function() {
                Memory.flipBackTiles();
            }, 1000);
        }
        
    },
    
    flipBackTiles: function(){
//        var brickOne = Memory.imageArray[Memory.turnedBricks[0]];
        var brickOne = Memory.turnedBricks[0];
        var brickOneImage = document.getElementById(brickOne).firstChild;
        brickOneImage.setAttribute("src", "pics/0.png");

        var brickTwo = Memory.turnedBricks[1];
        var brickTwoImage = document.getElementById(brickTwo).firstChild;
        brickTwoImage.setAttribute("src", "pics/0.png");

        Memory.turnedBricks = [];

    },


};

window.onload = Memory.init; //pekar på metoden init som kommer köras när sidan laddats