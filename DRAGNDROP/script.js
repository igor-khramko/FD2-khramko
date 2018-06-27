"use strict";

var draggedImage = 0;
var imagebox = document.querySelector(".imagebox").style.position = "relative";
for(var i=0; i<imagebox.length; i++){
    var image = document.querySelectorAll("img");
    image[i].style.position = "absolute";
    image[i].style.zIndex = "0";
}
function imageDragStart(e) {
    e=e||window.event;
    draggedImage=e.target;
}

function imageDragEnd(e) {
    e=e||window.event;
    draggedImage=null;
}

function divDragOver(e) {
    e=e||window.event;
    e.preventDefault();
}

function divDrop(e) {
    e=e||window.event;
    e.preventDefault();
    if ( draggedImage )
        e.currentTarget.appendChild(draggedImage);
}