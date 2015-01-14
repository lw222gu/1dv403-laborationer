"use strict";

var Memory = {

    imageArray: [],
    turnedTiles: [],
    pairedTiles: [],
    numberOfPairs: 0,
    numberOfTurns: 0,
    numberOfFinishedGames: 0,
    rows: 4,
    cols: 4,

    init: function(){
        
        var gameTable = document.querySelector(".memorytable");
        
        //Nollställer infon ifall att man är på omgång två++ i spelet
        Memory.numberOfTurns = 0;
        Memory.numberOfPairs = 0;
        gameTable.innerHTML = "";
        Memory.pairedTiles = [];

        Memory.createGameArray(Memory.rows, Memory.cols);
    },
    
    //Slumpar arrayen
    createGameArray: function (rows, cols){
        this.imageArray = RandomGenerator.getPictureArray(rows, cols);
        console.log(this.imageArray);
    
        Memory.createBoard(rows, cols);
    },
    
    //Genererar spelbrädet
    createBoard: function(rows, cols){
        var table = document.querySelector(".memorytable");
        var tileNumber = 0;
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
                    aTile.setAttribute("id", tileNumber);
                        
                    var tile = document.createElement("img");
                    tile.className = "tile";
                    tile.setAttribute("src", "pics/0.svg");
                    tile.setAttribute("alt", "spelbricka");
                        
                    aTile.appendChild(tile);
                    tileCell.appendChild(aTile);
                    tableRow.appendChild(tileCell);
                    tileNumber += 1;
                    
                    //onclick som skickar med första objektet i arrayen samt vilken placering kortet har i arrayen
                    aTile.onclick = function(){
//                      e.preventDefault();
                       
                        if (Memory.turnedTiles.length === 2){
                            return false;
                        }
 
                        var imageElement = this.getElementsByTagName("img");
                        Memory.flipTile(imageElement[0], this.getAttribute("id"));
                    
                        return false;
                    };
                    
                }
                    
            }
        
    },
    
    //Vänder vald bricka
    flipTile: function(imageElement, tileNumber){
        
        //Kontrollerar om brickan redan är vänd, och förhindrar klick
        if(tileNumber === Memory.turnedTiles[Memory.turnedTiles.length-1]){
        
            return false;
        }
        
        for (var i = 0; i < Memory.pairedTiles.length; i++){
         
            if(tileNumber === Memory.pairedTiles[i]){
                return false;
            }
        }
        
        //Ger vänd bricka en ny bildlänk
        var imageID = Memory.imageArray[tileNumber];
        imageElement.setAttribute("src", "pics/" + imageID + ".svg");

        Memory.turnedTiles.push(tileNumber);

        var pairs = document.querySelector(".pairs");
 
        //Kontrollerar om antalet vända brickor är två
        if (Memory.turnedTiles.length === 2){
            
            Memory.compareTiles();
            Memory.numberOfTurns++;
            pairs.innerHTML = "Antal par: " + Memory.numberOfPairs;
            console.log("Antal försök: ", Memory.numberOfTurns);

            if(Memory.numberOfPairs === (Memory.rows * Memory.cols) / 2){
                Memory.gameFinished();
            }
            
        }
        
    },
 
    //Jämför de vända brickorna
    compareTiles: function(){
        if (Memory.imageArray[Memory.turnedTiles[0]] === Memory.imageArray[Memory.turnedTiles[1]]){
            Memory.numberOfPairs++;
            Memory.pairedTiles.push(Memory.turnedTiles[0], Memory.turnedTiles[1]);
 
            Memory.turnedTiles = [];
            
        }
        
        else {
            setTimeout(function() {
                Memory.flipBackTiles();
            }, 1000);
        }
        
    },
    
    //Vänder tillbaka felaktiga brickor
    flipBackTiles: function(){
        var tileOne = Memory.turnedTiles[0];
        var tileOneImage = document.getElementById(tileOne).firstChild;
        tileOneImage.setAttribute("src", "pics/0.svg");

        var tileTwo = Memory.turnedTiles[1];
        var tileTwoImage = document.getElementById(tileTwo).firstChild;
        tileTwoImage.setAttribute("src", "pics/0.svg");

        Memory.turnedTiles = [];

    },
    
    //Vid alla rätt:
    gameFinished: function(){
        
        var finishedGames = document.querySelector(".finishedgames");

        Memory.numberOfFinishedGames++;
        finishedGames.innerHTML = "Antal klarade omgångar: " + Memory.numberOfFinishedGames;

        var h2Text = "Grattis, du vann!";
        var pText = " Du klarade spelet på " + Memory.numberOfTurns + " försök.";
        Memory.youWonPopup(h2Text, pText);
        
    },
    
    //Popup som talar om hur många försök som krävts och ger möjligheten att spela igen
    youWonPopup: function (h2Text, pText){
        var main = document.getElementById("main");
        var divPopup = document.createElement("div");
        divPopup.setAttribute("class", "popup");
        var h2Popup = document.createElement("h2");
        var pPopup = document.createElement("p");
        var button = document.createElement("button");
        
        h2Popup.innerHTML = h2Text;
        pPopup.innerHTML = pText;
        button.innerHTML = "Spela igen!";

        divPopup.appendChild(h2Popup);
        divPopup.appendChild(pPopup);
        divPopup.appendChild(button);
        main.insertBefore(divPopup, main.firstChild);
        
        button.onclick = function(){
            main.removeChild(divPopup);
            Memory.init();
        };
    },


};

window.onload = Memory.init; //pekar på metoden init som kommer köras när sidan laddats