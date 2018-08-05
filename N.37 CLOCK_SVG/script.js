"use strict";

var center = (function createHourPointer(){
    var R = 150;        //радиус часов
    var Rh = 0.8*R;     //радиус расположения цифр относительно радиуса часов
    var rh = 0.1*R;     // радиус блока с цифрами относительно радиуса часов
    var center = {cx: R, cy: R}; //координаты центра часов
    var realTimeWidth = 0.33*R; //длина блока с реальным временем (цифровых часов)
    var clockBox = document.getElementById("clockBox");
    var clock = document.getElementById("clock");

    clockBox.setAttribute("width", 1000 + "px");
    clockBox.setAttribute("height", 1000 + "px");

    clock.setAttribute("cx", center.cx + "px");
    clock.setAttribute("cy", center.cy + "px");
    clock.setAttribute("r", R + "px");
    clock.setAttribute("fill", "yellow");
    clock.setAttribute("stroke", "blue");
    clockBox.style.padding = 0.01*R + "px";
    // clockBox.classList.add("clock");

    var realTime = document.createElementNS("http://www.w3.org/2000/svg","text");
    realTime.setAttribute("textLength", realTimeWidth);
    realTime.setAttribute("x", R - realTimeWidth/2 + "px")
    realTime.setAttribute("y", R/2 + "px");
    realTime.classList.add("realTime");
    
    for ( var h=1; h<=12; h++ ) {       // отображаемый час
        var a=h/12*Math.PI*2;           // отображаемый угол в радианах
        var x=center.cx+Math.sin(a)*Rh;         // проверяем - для угла=0 sin=0
        var y=center.cy-Math.cos(a)*Rh;         // проверяем - для угла=0 cos=1
        // итого цифра 12 (=0) окажется в x=cx, y=cy-r.
        var hour = document.createElementNS("http://www.w3.org/2000/svg","circle");
        var hourNumber = document.createElementNS("http://www.w3.org/2000/svg","text");

        hour.setAttribute("r", rh + "px");
        hour.setAttribute("cx", x + "px");
        hour.setAttribute("cy", y + "px");
        hour.setAttribute("fill", "lightgreen");
        hour.setAttribute("stroke", "darkgreen");
 
        hourNumber.classList.add("hour-number");
        hourNumber.innerHTML = h;
        hourNumber.setAttribute("x", x-rh/2.5 + "px");
        hourNumber.setAttribute("y", y + rh/3 + "px");

        clockBox.appendChild(realTime);
        clockBox.appendChild(hour);
        clockBox.appendChild(hourNumber);   
    }
    
    var hourPointer = document.createElementNS("http://www.w3.org/2000/svg","line");
    hourPointer.classList.add("hour-pointer");
    hourPointer.setAttribute("x1", R + "px");
    hourPointer.setAttribute("y1", R + "px");
    hourPointer.setAttribute("x2", R + "px");
    hourPointer.setAttribute("y2", R/2 + "px"); //длина часовой стрелки (R-0.5*R)

    var minutePointer = document.createElementNS("http://www.w3.org/2000/svg","line");
    minutePointer.classList.add("minute-pointer");
    minutePointer.setAttribute("x1", R + "px");
    minutePointer.setAttribute("y1", R + "px");
    minutePointer.setAttribute("x2", R + "px");
    minutePointer.setAttribute("y2", 0.3*R+ "px"); //длина минутной стрелки (R-0.3*R)

    var secondPointer = document.createElementNS("http://www.w3.org/2000/svg","line");
    secondPointer.classList.add("second-pointer");
    secondPointer.setAttribute("x1", R + "px");
    secondPointer.setAttribute("y1", R + "px");
    secondPointer.setAttribute("x2", R + "px");
    secondPointer.setAttribute("y2", 0.2*R + "px"); //длина секундной стрелки (R-0.2*R)

    clockBox.appendChild(hourPointer);
    clockBox.appendChild(minutePointer);
    clockBox.appendChild(secondPointer);
    return center;
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
    hourPointer.setAttribute("transform", `rotate(${(currTimeHash.hours%12)/12*360 + 360/12*currTimeHash.minutes/60} ${center.cx} ${center.cy})`); 

    var minutePointer = document.querySelector(".minute-pointer");
    minutePointer.setAttribute("transform", `rotate(${currTimeHash.minutes/60*360 + 360/60*currTimeHash.seconds/60} ${center.cx} ${center.cy})`); 

    var secondPointer = document.querySelector(".second-pointer");
    secondPointer.setAttribute("transform", `rotate(${currTimeHash.seconds/60*360} ${center.cx} ${center.cy})`);
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