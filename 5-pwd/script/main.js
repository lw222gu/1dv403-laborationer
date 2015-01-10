"use strict";

var MyDesktop = {
    
    isWindowOpen: false,
    
    init: function(){
        var button = document.getElementById("photosbutton");
        button.onclick = function(){
            MyDesktop.openWindow();
            return false;
        };
    },
    
    openWindow: function(){
        if(MyDesktop.isWindowOpen === true){
            return false;
        }
        
        MyDesktop.isWindowOpen = true;
        
        var divMain = document.getElementById("main");
        var photosWindow = document.createElement("div");
        photosWindow.className = "popupWindow";
        photosWindow.innerHTML = "test";
        divMain.appendChild(photosWindow);
    },
};

window.onload = MyDesktop.init; //pekar på metoden init som kommer köras när sidan laddats