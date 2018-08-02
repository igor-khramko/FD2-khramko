"use strict";

(function createHourPointer(){
    var R = 150;        //радиус часов
    var Rh = 0.8*R;     //радиус расположения цифр относительно радиуса часов
    var rh = 0.1*R;     // радиус блока с цифрами относительно радиуса часов
    var cx = R;       //координата X центра часов
    var cy = R;       //координата Y центра часов
    var realTimeWidth = 0.33*R; //ширина блока с реальным временем

    var clock = document.createElement("div");
    clock.style.width = 2*R + "px";
    clock.style.height = 2*R + "px";
    clock.style.padding = 0.01*R + "px";
    clock.classList.add("clock");
    document.querySelector("body").appendChild(clock);

    var realTime = document.createElement("div");
    realTime.style.width = realTimeWidth + "px";
    realTime.classList.add("realTime");
    
    realTime.style.left = R - realTimeWidth/2 + "px"; //смещение отображения цифровых часов относитедбно центральной оси
    realTime.style.top = R/2 + "px";

    for ( var h=1; h<=12; h++ ) {       // отображаемый час
        var a=h/12*Math.PI*2;           // отображаемый угол в радианах
        var x=cx+Math.sin(a)*Rh;         // проверяем - для угла=0 sin=0
        var y=cy-Math.cos(a)*Rh;         // проверяем - для угла=0 cos=1
        // итого цифра 12 (=0) окажется в x=cx, y=cy-r.
        var hour = document.createElement("div");
        hour.innerHTML = h;
        hour.style.width = 2*rh + "px";
        hour.style.height = 2*rh + "px";
        hour.classList.add("hour");
        hour.style.left = x - rh + "px";
        hour.style.top = y - rh +"px";
        clock.appendChild(hour);
    }

    var hourPointer = document.createElement("div");
    hourPointer.classList.add("hour-pointer");
    var hourPointerHeight = 0.5*R; //длина часовой стрелки
    var hourPointerWidth = 6; //"толщина" часовой стрелки
    hourPointer.style.width = hourPointerWidth + "px";
    hourPointer.style.height = hourPointerHeight + "px";
    hourPointer.style.left = R - hourPointerWidth/2 + "px";
    hourPointer.style.top = R - hourPointerHeight+ "px";

    var minutePointer = document.createElement("div");
    minutePointer.classList.add("minute-pointer");
    var minutePointerHeight = 0.75*R; //длина минутной стрелки
    var minutePointerWidth = 4; //"толщина" минутной стрелки
    minutePointer.style.width = minutePointerWidth + "px";
    minutePointer.style.height = minutePointerHeight + "px";
    minutePointer.style.left = R - minutePointerWidth/2 + "px";
    minutePointer.style.top = R - minutePointerHeight+ "px";

    var secondPointer = document.createElement("div");
    secondPointer.classList.add("second-pointer");
    var secondPointerHeight = 0.8*R; //длина секундной стрелки
    var secondPointerWidth = 1; //"толщина" секундной стрелки
    secondPointer.style.width = secondPointerWidth + "px";
    secondPointer.style.height = secondPointerHeight + "px";
    secondPointer.style.left = R - secondPointerWidth/2 + "px";
    secondPointer.style.top = R - secondPointerHeight+ "px";

    clock.appendChild(realTime);
    clock.appendChild(hourPointer);
    clock.appendChild(minutePointer);
    clock.appendChild(secondPointer);
})()

updateTime()
setInterval(updateTime,1000);

function updateTime() {
    var currTime=new Date();
    var currTimeHash=formatDateTime(currTime);
    document.querySelector(".realTime").innerHTML=currTimeHash.hours + ":" + currTimeHash.minutes + ":" + currTimeHash.seconds;
    setRealTimeOnload(currTimeHash);
}

function setRealTimeOnload(currTimeHash){
    var currTimeSec = currTimeHash.hours * 3600 + currTimeHash.minutes * 60 + currTimeHash.seconds;
    var hourPointer = document.querySelector(".hour-pointer");
    hourPointer.style.transform = `rotate(${(currTimeHash.hours%12)/12*360 + 360/12*currTimeHash.minutes/60 + 'deg'})`; 

    var minutePointer = document.querySelector(".minute-pointer");
    minutePointer.style.transform = `rotate(${currTimeHash.minutes/60*360 + 360/60*currTimeHash.seconds/60 + 'deg'})`; 

    var secondPointer = document.querySelector(".second-pointer");
    secondPointer.style.transform = `rotate(${currTimeHash.seconds/60*360 + 'deg'})`;
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