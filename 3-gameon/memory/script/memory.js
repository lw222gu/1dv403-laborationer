"use strict";

var Memory = {

    imageArray: [],
    turnedBricks: [],
    pairedBricks: [],
    numberOfPairs: 0,
    numberOfTurns: 0,
    numberOfFinishedGames: 0,
    rows: 4,
    cols: 4,

    init: function(){

        Memory.createGameArray(Memory.rows, Memory.cols);
    },
    
    createGameArray: function (rows, cols){
        this.imageArray = RandomGenerator.getPictureArray(rows, cols);
        console.log(this.imageArray);
    
        Memory.createBoard(rows, cols);
    },
    
    createBoard: function(rows, cols){
        var table = document.querySelector(".memorytable");
        var brickNumber = 0;
        var pairs = document.querySelector(".pairs");
        pairs.innerHTML = "Antal par: 0";

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
                    tile.setAttribute("src", "pics/0.svg");
                        
                    aTile.appendChild(tile);
                    tileCell.appendChild(aTile);
                    tableRow.appendChild(tileCell);
                    brickNumber += 1;
                 
/*                    aTile.addEventListener("click", function(){
                        var imageElement = this.getElementsByTagName("img");
                        Memory.flipTile(imageElement[0], this.getAttribute("id"));
                    });
*/

                    aTile.onclick = function(e){
                        e.preventDefault();
                        var imageElement = this.getElementsByTagName("img");
                        Memory.flipTile(imageElement[0], this.getAttribute("id"));
                    };
                }
                    
            }
        
    },
    
    flipTile: function(imageElement, brickNumber){
        
        if(brickNumber === Memory.turnedBricks[Memory.turnedBricks.length-1]){
        
            return false;
        }
        
        for (var i = 0; i < Memory.pairedBricks.length; i++){
         
            if(brickNumber === Memory.pairedBricks[i]){
                return false;
            }
        }
        
        var imageID = Memory.imageArray[brickNumber];
        imageElement.setAttribute("src", "pics/" + imageID + ".svg");

        Memory.turnedBricks.push(brickNumber);

        var pairs = document.querySelector(".pairs");
 
    
        if (Memory.turnedBricks.length === 2){
            Memory.compareTiles();
            Memory.numberOfTurns++;
//            Memory.turnedBricks = [];
            pairs.innerHTML = "Antal par: " + Memory.numberOfPairs;
            console.log("Antal försök: ", Memory.numberOfTurns);
            
            if(Memory.numberOfPairs === (Memory.rows * Memory.cols) / 2){
                Memory.gameFinished();
            }
            
        }
        
    },
 
    compareTiles: function(){
        if (Memory.imageArray[Memory.turnedBricks[0]] === Memory.imageArray[Memory.turnedBricks[1]]){
            Memory.numberOfPairs++;
            Memory.pairedBricks.push(Memory.turnedBricks[0], Memory.turnedBricks[1]);
 
            Memory.turnedBricks = [];
            
        }
        
        else {
            setTimeout(function() {
                Memory.flipBackTiles();
            }, 1000);
        }
        
    },
    
    flipBackTiles: function(){
        var brickOne = Memory.turnedBricks[0];
        var brickOneImage = document.getElementById(brickOne).firstChild;
        brickOneImage.setAttribute("src", "pics/0.svg");

        var brickTwo = Memory.turnedBricks[1];
        var brickTwoImage = document.getElementById(brickTwo).firstChild;
        brickTwoImage.setAttribute("src", "pics/0.svg");

        Memory.turnedBricks = [];

    },
    
    gameFinished: function(){
        
        var finishedGames = document.querySelector(".finishedgames");
        var gameTable = document.querySelector(".memorytable");


        Memory.numberOfFinishedGames++;
        finishedGames.innerHTML = "Antal klarade omgångar: " + Memory.numberOfFinishedGames;

        alert("Grattis, du vann! Du klarade spelet på " + Memory.numberOfTurns + " försök.");

        Memory.numberOfTurns = 0;
        Memory.numberOfPairs = 0;

        gameTable.innerHTML = "";
        Memory.pairedBricks = [];
        Memory.init();
    },


};

window.onload = Memory.init; //pekar på metoden init som kommer köras när sidan laddats