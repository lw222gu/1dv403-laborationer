"use strict";

var MyDesktop = {
    
    isWindowOpen: false,
    images: [],
    thumbnailHeights: [],
    thumbnailWidths: [],
    url: "http://homepage.lnu.se/staff/tstjo/labbyServer/imgviewer/",
    
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
        statusBar.innerHTML = "Laddar...";
            
        topBar.appendChild(closeButton);
        photosWindow.appendChild(topBar);
        photosWindow.appendChild(contentPopup);
        photosWindow.appendChild(statusBar);
        divMain.appendChild(photosWindow);
        
        closeButton.onclick = function(){
            MyDesktop.closePopup();
        };
        
        MyDesktop.getImages();
    },
    
    getImages: function(){
        alert("Test!");
        var xhr = new XMLHttpRequest();
        
        xhr.onreadystatechange = function(){
                
            if (xhr.readyState === 4 && xhr.status === 200){
                MyDesktop.images = JSON.parse(xhr.responseText);
//               Quiz.questionText = Quiz.question.question;
//               Quiz.generateQuestion(Quiz.questionText);
                
                for(var i = 0; i < MyDesktop.images.length; i++){
                    MyDesktop.thumbnailHeights.push(MyDesktop.images[i].thumbHeight);
                    MyDesktop.thumbnailWidths.push(MyDesktop.images[i].thumbWidth);

                }
                
                console.log(MyDesktop.thumbnailHeights, MyDesktop.thumbnailWidths);
                MyDesktop.createThumbnails();
            }
                
        };
            
        xhr.open("GET", MyDesktop.url, true);
        xhr.send(null);
    },
    
    createThumbnails: function(){
//        var i;
//        for (i = 0, )
    },
    
    closePopup: function(){
        document.getElementById("main").removeChild(document.querySelector(".popup"));
        MyDesktop.isWindowOpen = false;
    },
};

window.onload = MyDesktop.init; //pekar på metoden init som kommer köras när sidan laddats