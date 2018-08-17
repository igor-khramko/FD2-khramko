"use strict";

var canvas = document.createElement("canvas");
var context = canvas.getContext("2d");
var body = document.querySelector("body");

canvas.setAttribute("width", 300);
canvas.setAttribute("height", 300);

body.appendChild(canvas);

function createClock(){
    var fontSize = 16;
    
    var clock = {
        R : 150,        
        posX : 0,
        posY : 0,
        color : "yellow",
        paint : function(){
            context.beginPath();
            context.fillStyle = clock.color;
            context.arc(clock.R, clock.R, clock.R, 0, Math.PI*2, false);
            context.fill();
            context.closePath();
        }
    }
    clock.Rh = 0.8*clock.R;                     //радиус расположения цифр относительно радиуса часов
    clock.rh = 0.1*clock.R;                     // радиус блока с цифрами относительно радиуса часов
    clock.cx = clock.R;                         //координата X центра часов
    clock.cy = clock.R;                         //координата Y центра часов
    clock.width = 2*clock.R;
    clock.height = clock.width;
    clock.paint();

    for ( var h=1; h<=12; h++ ) {                      // отображаемый час
        var clockPointerColor = "lightgreen";          
        var a=h/12*Math.PI*2;                          // отображаемый угол в радианах
        var x=clock.cx+Math.sin(a)*clock.Rh;           // проверяем - для угла=0 sin=0
        var y=clock.cy-Math.cos(a)*clock.Rh;           // проверяем - для угла=0 cos=1
        // итого цифра 12 (=0) окажется в x=cx, y=cy-r.
        
        context.beginPath();
        context.fillStyle = clockPointerColor;
        context.arc(x, y, clock.rh, 0, Math.PI*2, false);
        context.fill();
        context.closePath();
        context.beginPath();

        context.beginPath();
        context.fillStyle = "black";
        context.font = `${fontSize + "px"} Arial`;
        context.fillText(h, x - clock.rh/2, y + fontSize/3);
        context.closePath();
    }
    return clock;
}
var clock = createClock();

function update(){
    context.clearRect(clock.posX, clock.posY, clock.width, clock.height);
    createClock();
    updateTime();
}

update();
setInterval(update,1000);

function paintRealTime(realTime){
    var realTimeWidth = 0.33*clock.R; //длина блока с реальным временем (цифровых часов)
    context.beginPath();
    context.fillStyle = "black";
    context.fillText(realTime, clock.R - realTimeWidth/2, clock.R/2);
    context.closePath();
}

function updateTime() {
    var currTime=new Date();
    var currTimeHash=formatDateTime(currTime);
    paintRealTime(`${currTimeHash.hours}:${currTimeHash.minutes}:${currTimeHash.seconds}`);
    setRealTimeOnload(currTimeHash);
}

function setRealTimeOnload(currTimeHash){
    //углы поворота стрелок в каждый момент времени
    var aHour=currTimeHash.hours/12*Math.PI*2 + currTimeHash.minutes/720*Math.PI*2;     //720 = 12*60                       // отображаемый угол в радианах
    var aMin=currTimeHash.minutes/60*Math.PI*2 + currTimeHash.seconds/3600*Math.PI*2;   //3600 = 60*60  
    var aSec=currTimeHash.seconds/60*Math.PI*2;
    
    context.beginPath();
    context.lineWidth = 6;
    context.strokeStyle = "black";
    context.moveTo(clock.cx, clock.cy);
    context.lineTo(clock.cx + Math.sin(aHour)*0.6*clock.Rh, clock.cy - Math.cos(aHour)*0.6*clock.Rh);
    context.stroke();
    context.closePath();

    context.beginPath();
    context.lineWidth = 4;
    context.strokeStyle = "green";
    context.moveTo(clock.cx, clock.cy);
    context.lineTo(clock.cx + Math.sin(aMin)*0.9*clock.Rh, clock.cx - Math.cos(aMin)*0.9*clock.Rh);
    context.stroke();
    context.closePath();

    context.beginPath();
    context.lineWidth = 2;
    context.strokeStyle = "red";
    context.moveTo(clock.cx, clock.cy);
    context.lineTo(clock.cx + Math.sin(aSec)*clock.Rh, clock.cx - Math.cos(aSec)*clock.Rh);
    context.stroke();
    context.closePath();
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