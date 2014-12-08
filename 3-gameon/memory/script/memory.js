"use strict";

var Memory = {

    imageArray: [],
    turnedBricks: [],
    pairedBricks: [],
    numberOfPairs: 0,
    numberOfTurns: 0,
    numberOfFinishedGames: 0,
    rows: 2,
    cols: 2,

    init: function(){
        
        var gameTable = document.querySelector(".memorytable");
        
        //Nollställer infon ifall att man är på omgång två++ i spelet
        Memory.numberOfTurns = 0;
        Memory.numberOfPairs = 0;
        gameTable.innerHTML = "";
        Memory.pairedBricks = [];

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
                    
                    //onclick som skickar med första objektet i arrayen samt vilken placering kortet har i arrayen
                    aTile.onclick = function(e){
                        e.preventDefault();
                        var imageElement = this.getElementsByTagName("img");
                        Memory.flipTile(imageElement[0], this.getAttribute("id"));
                    };
                }
                    
            }
        
    },
    
    //Vänder vald bricka
    flipTile: function(imageElement, brickNumber){
        
        //Kontrollerar om brickan redan är vänd, och förhindrar klick
        if(brickNumber === Memory.turnedBricks[Memory.turnedBricks.length-1]){
        
            return false;
        }
        
        for (var i = 0; i < Memory.pairedBricks.length; i++){
         
            if(brickNumber === Memory.pairedBricks[i]){
                return false;
            }
        }
        
        //Ger vänd bricka en ny bildlänk
        var imageID = Memory.imageArray[brickNumber];
        imageElement.setAttribute("src", "pics/" + imageID + ".svg");

        Memory.turnedBricks.push(brickNumber);

        var pairs = document.querySelector(".pairs");
 
        //Kontrollerar om antalet vända brickor är två
        if (Memory.turnedBricks.length === 2){
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
    
    //Vänder tillbaka felaktiga brickor
    flipBackTiles: function(){
        var brickOne = Memory.turnedBricks[0];
        var brickOneImage = document.getElementById(brickOne).firstChild;
        brickOneImage.setAttribute("src", "pics/0.svg");

        var brickTwo = Memory.turnedBricks[1];
        var brickTwoImage = document.getElementById(brickTwo).firstChild;
        brickTwoImage.setAttribute("src", "pics/0.svg");

        Memory.turnedBricks = [];

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
        divPopup.setAttribute("class", "popup")
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