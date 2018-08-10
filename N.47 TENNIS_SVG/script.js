"use strict";
var buttonStart = document.querySelector(".button-start");
var score1 = document.querySelector(".player1Score");
var score2 = document.querySelector(".player2Score");
var player1Score = 0;
var player2Score = 0;
score1.innerHTML = player1Score;
score2.innerHTML = player2Score;
var gameStatus = 1; // 1 - мяч в игре; 2 - пауза в игре

window.addEventListener("keydown", playKeysDown);
window.addEventListener("keyup", playKeysUp);
buttonStart.addEventListener("click", start);

var RAF=
        // находим, какой метод доступен
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        // ни один не доступен
        // будем работать просто по таймеру
        function(callback)
            { window.setTimeout(callback, 1000 / 60); }
        ;

function playKeysDown(EO){
    EO=EO||window.event;
    EO.preventDefault();
    if (EO.keyCode==16){
        gameAssets.player1.speedY = -2;
    } else if(EO.keyCode==17){
        gameAssets.player1.speedY = 2;
    } else if(EO.keyCode==38){
        gameAssets.player2.speedY = -2;
    } else if(EO.keyCode==40){
        gameAssets.player2.speedY = 2;
    }
}

function playKeysUp(EO){
    EO=EO||window.event;
    EO.preventDefault();
    if (EO.keyCode==16){
        gameAssets.player1.speedY = 0;
    } else if(EO.keyCode==17){
        gameAssets.player1.speedY = 0;
    } else if(EO.keyCode==38){
        gameAssets.player2.speedY = 0;
    } else if(EO.keyCode==40){
        gameAssets.player2.speedY = 0;
    }
}

var gameAssets = (function createGameAssets(){
    var body = document.querySelector("body");
    var field = document.createElementNS("http://www.w3.org/2000/svg","svg");
    var fieldRect = document.createElementNS("http://www.w3.org/2000/svg","rect");
    var playingField = {
        width : 500,
        height : 300,
    }
    function setAttributesPlayingField(){
        field.setAttribute("width", playingField.width);
        field.setAttribute("height", playingField.height);
    }
    var playingFieldRect = {
        width : 500,                                                //ширина игрового поля
        height : 300,                                               //высота игрового поля
        x : 0,                                                      //координата x точки построения игрового поля (левый верхний угол)
        y : 0,                                                      //координата y точки построения игрового поля (левый верхний угол)
        fill : "none",                                              //цвет заливки игрового поля
        stroke : "black",                                           //цвет обводки игрового поля
        strokeWidth: 4                                             //ширина обводки игрового поля
    }
    function setAttributesPlayingFieldRect(){
        playingFieldRect.center = {x: playingFieldRect.width/2, y : playingFieldRect.height/2};    //координаты центра игрового поля
        fieldRect.setAttribute("width", playingFieldRect.width);
        fieldRect.setAttribute("height", playingFieldRect.height);
        fieldRect.setAttribute("x", playingFieldRect.x);
        fieldRect.setAttribute("y", playingFieldRect.y);
        fieldRect.setAttribute("fill", playingFieldRect.fill);
        fieldRect.setAttribute("stroke", playingFieldRect.stroke);
        fieldRect.setAttribute("stroke-width", playingFieldRect.strokeWidth);
    }
    setAttributesPlayingField();
    setAttributesPlayingFieldRect();
    
    function Player(){
        var self = this;
        self.color = "yellow";                                                          //цвет ракетки
        self.speedY = 0;                                                                //"скорость" ракетки
        self.width = 0.02*playingFieldRect.width;                                       //ширина ракетки
        self.height = 0.25*playingFieldRect.height;                                     //высота ракетки
        self.center = {x : self.width/2, y : playingFieldRect.center.y},                //координаты центра ракетки
        self.top =  self.center.y - self.height/2,                                      //верхняя граница ракетки
        self.bottom = self.center.y + self.height/2,                                    //нижняя граница ракетки
        self.score = 0;                                                                 //счёт игрока             
        self.move = function(centerY){                                                  //движение ракетки
            self.bottom = centerY + self.height/2;                   
            self.top = centerY - self.height/2; 
            self.view.setAttribute("y", self.top);
        }
        self.setDefaultAttributes = function(){                                         //дефолтные значения атрибутов
            self.view.setAttribute("x", self.x);
            self.view.setAttribute("y", self.top);
            self.view.setAttribute("fill", self.color);
            self.view.setAttribute("width", self.width);
            self.view.setAttribute("height", self.height);
            self.view.setAttribute("stroke-width", self.width);
        }
    }
    
    var player1 = (function createPlayer1(){
        var player1 = new Player();
        player1.view = document.createElementNS("http://www.w3.org/2000/svg","rect");
        player1.x = 0;
        player1.color = "green";
        player1.setDefaultAttributes();
        return player1;
    })()
    
    var player2 = (function createPlayer2(){
        var player2 = new Player();  
        player2.view = document.createElementNS("http://www.w3.org/2000/svg","rect");
        player2.center.x = playingFieldRect.width - player2.width/2;               
        player2.x = playingFieldRect.width - player2.width;
        player2.color = "blue";
        player2.setDefaultAttributes();
        return player2;
    })()

    var ball = (function createBall(){
        var ball = {
            view : document.createElementNS("http://www.w3.org/2000/svg","circle"),
            radius : 15,
            color : "red",
            posX : playingFieldRect.center.x,
            posY : playingFieldRect.center.y,  
            move : function(){
                ball.view.setAttribute("cx", ball.posX);
                ball.view.setAttribute("cy", ball.posY);
            },
            setDefaultAttributes : function(){
                ball.view.setAttribute("cx", ball.posX);
                ball.view.setAttribute("cy", ball.posY);
                ball.view.setAttribute("r", ball.radius);
                ball.view.setAttribute("fill", ball.color);
            }
        }
        ball.setDefaultAttributes();
        return ball;
    })()
    field.appendChild(player1.view);
    field.appendChild(player2.view);
    field.appendChild(ball.view);
    field.appendChild(fieldRect);
    body.appendChild(field);
    return {playingFieldRect, player1, player2, ball};
    
})();

function setDefaultPosition(){
    gameAssets.player1.center = {x: self.width/2, y: gameAssets.playingFieldRect.center.y}; 
    gameAssets.player1.setDefaultAttributes();

    gameAssets.player2.center = {x: self.width/2, y: gameAssets.playingFieldRect.center.y};     
    gameAssets.player1.setDefaultAttributes();

    gameAssets.ball.posX = gameAssets.playingFieldRect.center.x;
    gameAssets.ball.posY = gameAssets.playingFieldRect.center.y;
    gameAssets.ball.setDefaultAttributes();
}

function start(){
    setDefaultPosition();
    gameAssets.ball.speedX=2;
    gameAssets.ball.speedY=1;
    tick();
}

function tick() {
    if(gameStatus == 1){
        gameAssets.player1.center.y+=gameAssets.player1.speedY;
        gameAssets.player2.center.y+=gameAssets.player2.speedY;
        gameAssets.player1.move(gameAssets.player1.center.y);
        gameAssets.player2.move(gameAssets.player2.center.y);
        gameAssets.ball.posX+=gameAssets.ball.speedX;
        gameAssets.ball.posY+=gameAssets.ball.speedY;
        //игрок 1 выше верхнего края игрового поля
        if(gameAssets.player1.top<0){
            gameAssets.player1.center.y=gameAssets.player1.height/2;  
            gameAssets.player1.move(gameAssets.player1.center.y);
        }
        //игрок 1 ниже нижнего края игрового поля
        if(gameAssets.player1.bottom>gameAssets.playingFieldRect.height){
            gameAssets.player1.center.y=gameAssets.playingFieldRect.height - gameAssets.player1.height/2;  
            gameAssets.player1.move(gameAssets.player1.center.y);
        }
        //игрок 2 выше верхнего края игрового поля
        if(gameAssets.player2.top<0){
            gameAssets.player2.center.y=gameAssets.player2.height/2;  
            gameAssets.player2.move(gameAssets.player2.center.y);
        }
        //игрок 2 ниже нижнего края игрового поля
        if(gameAssets.player2.bottom>gameAssets.playingFieldRect.height){
            gameAssets.player2.center.y=gameAssets.playingFieldRect.height - gameAssets.player2.height/2;  
            gameAssets.player2.move(gameAssets.player2.center.y);
        }
        // мяч попал в ракетку игрока 1
        if (gameAssets.ball.posX == gameAssets.player1.width + gameAssets.ball.radius && gameAssets.ball.posY>gameAssets.player1.top - 3*gameAssets.ball.radius/2 && gameAssets.ball.posY+gameAssets.ball.radius/2<gameAssets.player1.bottom){
            gameAssets.ball.speedX=-gameAssets.ball.speedX;
            gameAssets.ball.posX=gameAssets.player1.width + gameAssets.player1.radius;  
        }
        // мяч попал в ракетку игрока 2
        if (gameAssets.ball.posX == gameAssets.playingFieldRect.width - gameAssets.player2.width - gameAssets.ball.radius && gameAssets.ball.posY>gameAssets.player2.top - gameAssets.ball.radius/2 && gameAssets.ball.posY+gameAssets.ball.radius/2<gameAssets.player2.bottom){
            gameAssets.ball.speedX=-gameAssets.ball.speedX;
            gameAssets.ball.posX=gameAssets.playingFieldRect.width - gameAssets.player2.width - gameAssets.ball.radius;
        }
        // вылетел ли мяч левее стены?
        if (gameAssets.ball.posX - gameAssets.ball.radius<0 && gameStatus == 1){
            gameAssets.ball.speedX=0;
            gameAssets.ball.speedY=0;
            gameAssets.player1.speedY=0;
            gameAssets.player2.speedY=0;
            gameAssets.ball.posX = gameAssets.ball.radius + gameAssets.playingFieldRect.strokeWidth/2;
            player2Score++;
            score2.innerHTML = player2Score;
            gameStatus = 2;
        }
        // вылетел ли мяч правее стены?
        if (gameAssets.ball.posX+gameAssets.ball.radius>gameAssets.playingFieldRect.width && gameStatus == 1){
            gameAssets.ball.speedX=0;
            gameAssets.ball.speedY=0;
            gameAssets.player1.speedY=0;
            gameAssets.player2.speedY=0;
            gameAssets.ball.posX = gameAssets.playingFieldRect.width - gameAssets.ball.radius - gameAssets.playingFieldRect.strokeWidth/2;
            player1Score+=1;
            score1.innerHTML = player1Score;
            gameStatus = 2;
        }
        // вылетел ли мяч выше стены?
        if (gameAssets.ball.posY - gameAssets.ball.radius<0){
            gameAssets.ball.speedY=-gameAssets.ball.speedY;
            gameAssets.ball.posY=gameAssets.ball.radius;
        }
        // вылетел ли мяч ниже стены?
        if (gameAssets.ball.posY+gameAssets.ball.radius>gameAssets.playingFieldRect.height){
            gameAssets.ball.speedY=-gameAssets.ball.speedY;
            gameAssets.ball.posY=gameAssets.playingFieldRect.height-gameAssets.ball.radius;
        }  
        RAF(tick);
    } else if(gameStatus == 2){
        gameStatus = 1;
    }
    gameAssets.ball.move();
}