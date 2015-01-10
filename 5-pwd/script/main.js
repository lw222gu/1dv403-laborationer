"use strict";

var MyDesktop = {
    
    isWindowOpen: false,
    
    init: function(){
        var button = document.getElementById("photosbutton");
        button.onclick = function(){
        
            if(MyDesktop.isWindowOpen === true){
                return false;
            }
            
            else{
                MyDesktop.openWindow();
            }
            
            return false;
        };
    },
    
    openWindow: function(){
        
        MyDesktop.isWindowOpen = true;
        
        var divMain = document.getElementById("main");

        var photosWindow = document.createElement("div");
        photosWindow.className = "popup";

        var topBar = document.createElement("div");
        topBar.className = "topBar";

        var closeButton = document.createElement("button");
        closeButton.className = "closeButton";
        
        var contentPopup = document.createElement("div");
        contentPopup.className = "contentPopup";

        var statusBar = document.createElement("div");
        statusBar.className = "statusBar";
            
        topBar.appendChild(closeButton);
        photosWindow.appendChild(topBar);
        photosWindow.appendChild(contentPopup);
        photosWindow.appendChild(statusBar);
        divMain.appendChild(photosWindow);
    },
};

window.onload = MyDesktop.init; //pekar på metoden init som kommer köras när sidan laddats