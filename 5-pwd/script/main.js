"use strict";

var MyDesktop = {
    
    isWindowOpen: false,
    images: [],
    thumbnailHeights: [],
    thumbnailWidths: [],
    thumbMaxHeight: "",
    thumbMaxWidth: "",
    sheet: document.styleSheets[0],
    
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
        
        var topBarText = document.createElement("p");
        topBarText.innerHTML = "Bakgrundsgalleri";

        var closeButton = document.createElement("button");
        closeButton.className = "closeButton";
        
        var contentPopup = document.createElement("div");
        contentPopup.className = "contentPopup";

        var statusBar = document.createElement("div");
        statusBar.className = "statusBar";
        statusBar.innerHTML = "Laddar...";
        
        topBar.appendChild(topBarText);    
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
        var xhr = new XMLHttpRequest();
        
        xhr.onreadystatechange = function(){
                
            if (xhr.readyState === 4 && xhr.status === 200){
                MyDesktop.images = JSON.parse(xhr.responseText);
                
                for(var i = 0; i < MyDesktop.images.length; i++){
                    MyDesktop.thumbnailHeights.push(MyDesktop.images[i].thumbHeight);
                    MyDesktop.thumbnailWidths.push(MyDesktop.images[i].thumbWidth);
                }
                
                MyDesktop.thumbnailHeights.sort();
                MyDesktop.thumbnailWidths.sort();
                
                MyDesktop.thumbMaxHeight = MyDesktop.thumbnailHeights[MyDesktop.thumbnailHeights.length - 1];
                MyDesktop.thumbMaxWidth = MyDesktop.thumbnailWidths[MyDesktop.thumbnailWidths.length - 1];
                
                MyDesktop.createThumbnails();
            }
                
        };
            
        xhr.open("GET", MyDesktop.url, true);
        xhr.send(null);
    },
    
    createThumbnails: function(){
        
        var imageNumber = 0;
        MyDesktop.sheet.insertRule(".thumbnailLink {height:" + MyDesktop.thumbMaxHeight + "px; width:" + MyDesktop.thumbMaxWidth + "px;}", 15);

        for(var i = 0; i < MyDesktop.images.length; i++){
            
            var thumbnail = document.createElement("img");
            thumbnail.className = "thumbnail";
            
            var aThumbnail = document.createElement("a");
            aThumbnail.setAttribute("href", "#");
            aThumbnail.setAttribute("id", imageNumber);
            aThumbnail.setAttribute("class", "thumbnailLink");
//            aThumbnail.setAttribute("style", "height:" + MyDesktop.thumbMaxHeight + "px; width:" + MyDesktop.thumbMaxWidth + "px;");

            var thumbURL = MyDesktop.images[i].thumbURL;
            thumbnail.setAttribute("src", thumbURL);

            aThumbnail.appendChild(thumbnail);
            var contentPopup = document.querySelector(".contentPopup");
            contentPopup.appendChild(aThumbnail);
            
            aThumbnail.onclick = function(){
                MyDesktop.switchBG(this.getAttribute("id"));
                return false;
            };
            
            imageNumber++;
        }
        
        var originalImage = document.createElement("div");
        originalImage.className = "originalImage";
        
        var a = document.createElement("a");
        a.setAttribute("href", "#");
        a.innerHTML = "Byt tillbaka till originalbilden";
        
        originalImage.appendChild(a);
        
        var content = document.querySelector(".contentPopup");
        content.appendChild(originalImage);
        
        a.onclick = function(){
            MyDesktop.originalBG();
            return false;
        };
        
        document.querySelector(".statusBar").innerHTML = "";
        
    },
    
    switchBG: function(ID){
        var imageURL = MyDesktop.images[ID].URL;
        var container = document.getElementById("container");
        container.setAttribute("style", "background-image:url(" + imageURL + ");");
    },
    
    closePopup: function(){
        document.getElementById("main").removeChild(document.querySelector(".popup"));
        MyDesktop.isWindowOpen = false;
    },
    
    originalBG: function(){
        var container = document.getElementById("container");
        container.removeAttribute("style");
    },
};

window.onload = MyDesktop.init; //pekar på metoden init som kommer köras när sidan laddats