"use strict";
var buttonStart = document.querySelector(".button-start");
var score1 = document.querySelector(".player1Score");
var score2 = document.querySelector(".player2Score");
var player1Score = 0;
var player2Score = 0;
score1.innerHTML = player1Score;
score2.innerHTML = player2Score;
var gameStatus = 1; // 1 - мяч в игре; 2 - пауза в игре

// window.addEventListener("keydown", playKeysDown);
// window.addEventListener("keyup", playKeysUp);
// buttonStart.addEventListener("click", start);

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
    var canvas = document.createElement("canvas");
    canvas.setAttribute("width", 501);
    canvas.setAttribute("height", 301);
    canvas.classList.add("game-field")
    var context = canvas.getContext("2d");

    var playingField = {
        width : 500,
        height : 300,
        posX : 0.5,
        posY : 0.5,
        lineWidth : 2,
        color: "black"
    }

    context.beginPath();
    context.strokeStyle = playingField.color;
    context.lineWidth = playingField.lineWidth;
    context.strokeRect(playingField.posX, playingField.posY, playingField.width, playingField.height);
    context.closePath();

    var body = document.querySelector("body");
    body.appendChild(canvas);
    
    playingField.cx = playingField.width/2;                         //координата X центра игрового поля
    playingField.cy = playingField.height/2;                        //координата Y центра игрового поля
    
    function Player(){
        var self = this;
        self.color = "yellow";                                                  //цвет игрока
        self.speedY = 0;                                                        //"скорость") игрока
        self.width = 0.02*playingField.width;                                                        //ширина игрока
        self.height = 0.25*playingField.height;                                 //высота игрока
        self.score = 0;                                                         //счёт игрока
        self.posX;                                                          //координата X позиции ракетки (левый верхний угол)
        self.posY;                                                          //координата Y позиции ракетки (левый верхний угол)
        self.cx = self.width/2;                                            //координата X центра игрока
        self.cy = playingField.cy;                                //координата Y центра игрока
        self.bottom = self.cy + self.height/2                             //нижняя граница игрока
        self.paint = function(){                                          //дефолтные значения стилей
            context.beginPath();
            context.fillStyle = self.color;
            context.fillRect(self.posX, self.posY, self.width, self.height);
            context.closePath();
        }
        self.move = function(centerY){
            self.top = centerY - self.height/2;
            self.bottom = centerY + self.height/2;
            self.view.style.top = self.top + "px";
        }
    }
    
    var player1 = (function createPlayer1(){
        var player1 = new Player();
        player1.posX = playingField.posX;
        player1.posY = player1.cy - player1.height/2;
        player1.scoreView = document.querySelector(".player1Score");
        player1.color = "green";
        player1.paint();
        return player1;
    })()

    var player2 = (function createPlayer2(){
        var player2 = new Player();
        player2.posX = playingField.width - player2.width;
        player2.posY = player2.cy - player2.height/2;
        player2.scoreView = document.querySelector(".player2Score");
        player2.color = "blue";
        player2.paint();
        return player2;
    })()

    var ball = (function createBall(){
        var ball = {
            radius : 15,
            color : "red",
            posX : playingField.cx,
            posY : playingField.cy,  
            paint : function(){
                context.beginPath();
                context.fillStyle = ball.color;
                context.arc(ball.posX,ball.posY, ball.radius, 0,Math.PI*2, false);
                context.fill();
                context.closePath();
            },
            setDefaultPosition : function(){

            }
        }
        ball.width = 2*ball.radius;
        ball.height = ball.width;
        ball.paint();
        return ball;
    })()
    return {playingField, player1, player2, ball};
})();

function setDefaultPosition(){
    gameAssets.player1.cx = self.width/2;
    gameAssets.player1.cy = gameAssets.playingField.cy;

    gameAssets.player2.cx = self.width/2;
    gameAssets.player2.cy = gameAssets.playingField.cy;

    gameAssets.ball.posX = gameAssets.playingField.cx;
    gameAssets.ball.posY = gameAssets.playingField.cy;
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
        gameAssets.ball.posX+=gameAssets.ball.speedX;
        gameAssets.ball.posY+=gameAssets.ball.speedY;
        //игрок 1 выше верхнего края игрового поля
        if(gameAssets.player1.top<0){
            gameAssets.player1.center.y=gameAssets.player1.height/2;  
            gameAssets.player1.move(gameAssets.player1.center.y);
        }
        //игрок 1 ниже нижнего края игрового поля
        if(gameAssets.player1.bottom>gameAssets.playingField.bottom){
            gameAssets.player1.center.y=gameAssets.playingField.height - gameAssets.player1.height/2;
        }
        //игрок 2 выше верхнего края игрового поля
        if(gameAssets.player2.top<0){
            gameAssets.player2.center.y=gameAssets.player2.height/2;
        }
        //игрок 2 ниже нижнего края игрового поля
        if(gameAssets.player2.bottom>gameAssets.playingField.bottom){
            gameAssets.player2.center.y=gameAssets.playingField.height - gameAssets.player2.height/2;
        }
        // мяч попал в ракетку игрока 1
        if (gameAssets.ball.posX == gameAssets.player1.width && gameAssets.ball.posY>gameAssets.player1.top - 3*gameAssets.ball.height/4 && gameAssets.ball.posY+gameAssets.ball.height/4<gameAssets.player1.bottom){
            gameAssets.ball.speedX=-gameAssets.ball.speedX;
            gameAssets.ball.posX=gameAssets.player1.width;  
        }
        // мяч попал в ракетку игрока 2
        if (gameAssets.ball.posX == gameAssets.playingField.width - gameAssets.player2.width - gameAssets.ball.width && gameAssets.ball.posY>gameAssets.player2.top - 3*gameAssets.ball.height/4 && gameAssets.ball.posY+gameAssets.ball.height/4<gameAssets.player2.bottom){
            gameAssets.ball.speedX=-gameAssets.ball.speedX;
            gameAssets.ball.posX=gameAssets.playingField.width - gameAssets.player2.width - gameAssets.ball.width;
        }
        // вылетел ли мяч левее стены?
        if (gameAssets.ball.posX<0 && gameStatus == 1){
            gameAssets.ball.posX = 0;
            gameAssets.ball.speedX=0;
            gameAssets.ball.speedY=0;
            gameAssets.player1.speedY=0;
            gameAssets.player2.speedY=0;
            player2Score++;
            score2.innerHTML = player2Score;
            gameStatus = 2;
        }
        // вылетел ли мяч правее стены?
        if (gameAssets.ball.posX+gameAssets.ball.width>gameAssets.playingField.width && gameStatus == 1){
            gameAssets.ball.posX = gameAssets.playingField.width - gameAssets.ball.width;
            gameAssets.ball.speedX=0;
            gameAssets.ball.speedY=0;
            gameAssets.player1.speedY=0;
            gameAssets.player2.speedY=0;
            player1Score+=1;
            score1.innerHTML = player1Score;
            gameStatus = 2;
        }
        // вылетел ли мяч выше стены?
        if (gameAssets.ball.posY<0){
            gameAssets.ball.speedY=-gameAssets.ball.speedY;
            gameAssets.ball.posY=0;
        }
        // вылетел ли мяч ниже стены?
        if (gameAssets.ball.posY+gameAssets.ball.height>gameAssets.playingField.height){
            gameAssets.ball.speedY=-gameAssets.ball.speedY;
            gameAssets.ball.posY=gameAssets.playingField.height-gameAssets.ball.height;
        }  
        RAF(tick);
    } else if(gameStatus == 2){
        gameStatus = 1;
    }
    gameAssets.ball.move();
}