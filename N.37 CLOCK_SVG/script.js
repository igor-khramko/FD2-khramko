"use strict";

(function createHourPointer(){
    var R = 150;        //радиус часов
    var D = 2*R;        //диаметр часов
    var Rh = 0.8*R;     //радиус расположения цифр относительно радиуса часов
    var rh = 0.1*R;     // радиус блока с цифрами относительно радиуса часов
    var cx = R;       //координата X центра часов
    var cy = R;       //координата Y центра часов
    var clockBox = document.getElementById("clockBox");
    var clock = document.getElementById("clock");

    clockBox.setAttribute("width", D + "px");
    clockBox.setAttribute("height", D + "px");

    clock.setAttribute("cx", cx + "px");
    clock.setAttribute("cy", cy + "px");
    clock.setAttribute("r", R + "px");
    clock.setAttribute("fill", "yellow");
    clock.setAttribute("stroke", "blue");
    clockBox.style.padding = 0.01*R + "px";
    // clockBox.classList.add("clock");

    var realTime = document.createElementNS("http://www.w3.org/2000/svg","text");
    realTime.setAttribute("textLength", 0.33*R); //устанавливаем длину текстового представления цифровых часов
    var realTimeWidth = realTime.getAttribute("textLength"); //ширина блока с реальным временем
    realTime.setAttribute("x", R - realTimeWidth/2 + "px")
    realTime.setAttribute("y", R/2 + "px");
    realTime.classList.add("realTime");
    
    for ( var h=1; h<=12; h++ ) {       // отображаемый час
        var a=h/12*Math.PI*2;           // отображаемый угол в радианах
        var x=cx+Math.sin(a)*Rh;         // проверяем - для угла=0 sin=0
        var y=cy-Math.cos(a)*Rh;         // проверяем - для угла=0 cos=1
        // итого цифра 12 (=0) окажется в x=cx, y=cy-r.
        var hour = document.createElementNS("http://www.w3.org/2000/svg","circle");
        hour.innerHTML = h;
        hour.setAttribute("r", rh + "px");
        hour.setAttribute("cx", x + "px");
        hour.setAttribute("cy", y + "px");
        hour.setAttribute("fill", "lightgreen");
        hour.setAttribute("stroke", "darkgreen");
        clockBox.appendChild(realTime);
        clockBox.appendChild(hour);
    }
    
    var hourPointer = document.createElementNS("http://www.w3.org/2000/svg","line");
    hourPointer.classList.add("hour-pointer");
    hourPointer.setAttribute("x1", R + "px");
    hourPointer.setAttribute("y1", R + "px");
    hourPointer.setAttribute("x2", R + "px");
    hourPointer.setAttribute("y2", R/2 + "px");

    var minutePointer = document.createElementNS("http://www.w3.org/2000/svg","line");
    minutePointer.classList.add("minute-pointer");
    minutePointer.setAttribute("x1", R + "px");
    minutePointer.setAttribute("y1", R + "px");
    minutePointer.setAttribute("x2", R + "px");
    minutePointer.setAttribute("y2", 0.3*R+ "px");

    var secondPointer = document.createElementNS("http://www.w3.org/2000/svg","line");
    secondPointer.classList.add("second-pointer");
    secondPointer.setAttribute("x1", R + "px");
    secondPointer.setAttribute("y1", R + "px");
    secondPointer.setAttribute("x2", R + "px");
    secondPointer.setAttribute("y2", 0.2*R + "px");

    clockBox.appendChild(hourPointer);
    clockBox.appendChild(minutePointer);
    clockBox.appendChild(secondPointer);
})()

updateTime();
setInterval(updateTime,1000);

function updateTime() {
    var currTime=new Date();
    var currTimeHash=formatDateTime(currTime);
    document.querySelector(".realTime").innerHTML=currTimeHash.hours + ":" + currTimeHash.minutes + ":" + currTimeHash.seconds;
    setRealTimeOnload(currTimeHash);
}

function setRealTimeOnload(currTimeHash){
    var hourPointer = document.querySelector(".hour-pointer");
    hourPointer.style.transform = `rotate(${(currTimeHash.hours%12)/12*360 + 360/12*currTimeHash.minutes/60 + 'deg'} 0 0)`; 

    var minutePointer = document.querySelector(".minute-pointer");
    minutePointer.style.transform = `rotate(${currTimeHash.minutes/60*360 + 360/60*currTimeHash.seconds/60 + 'deg'} 0 0)`; 

    var secondPointer = document.querySelector(".second-pointer");
    secondPointer.style.transform = `rotate(${currTimeHash.seconds/60*360 + 'deg'}) 0`;
}

// дополняет строку val слева нулями до длины Len
function str0l(val,len) {
    var strVal=val.toString();
    while ( strVal.length < len )
        strVal='0'+strVal;
    return strVal;
}

// форматирует переданную дату-время в формате дд.мм.гггг чч:мм:сс
function formatDateTime(dt) {
    var hours=dt.getHours();
    var minutes=dt.getMinutes();
    var seconds=dt.getSeconds();
    return {hours: str0l(hours,2), minutes: str0l(minutes,2), seconds: str0l(seconds,2)};
}