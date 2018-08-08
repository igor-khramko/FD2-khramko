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
var buttonPressed = buttonStart.addEventListener("click", start);

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
    if (EO.keyCode==16 && gameAssets.player1.top>0){
        gameAssets.player1.speedY = -1;
    } else if(EO.keyCode==17 && gameAssets.player1.bottom<gameAssets.playingField.bottom){
        gameAssets.player1.speedY = 1;
    } else if(EO.keyCode==38 && gameAssets.player2.top>0){
        gameAssets.player2.speedY = -1;
    } else if(EO.keyCode==40 && gameAssets.player2.bottom<gameAssets.playingField.bottom){
        gameAssets.player2.speedY = 1;
    }
}

function playKeysUp(EO){
    EO=EO||window.event;
    EO.preventDefault();
    if (EO.keyCode==16 && gameAssets.player1.top>0){
        gameAssets.player1.speedY = 0;
    } else if(EO.keyCode==17 && gameAssets.player1.bottom<gameAssets.playingField.bottom){
        gameAssets.player1.speedY = 0;
    } else if(EO.keyCode==38 && gameAssets.player2.top>0){
        gameAssets.player2.speedY = 0;
    } else if(EO.keyCode==40 && gameAssets.player2.bottom<gameAssets.playingField.bottom){
        gameAssets.player2.speedY = 0;
    }
}

var gameAssets = (function createGameAssets(){
    var playingField = {
        view : document.querySelector(".game-field"),
        width : 500,
        height : 300,
        background : "white",
        border : "1px solid black"
    }
    playingField.center = {x: playingField.width/2, y: playingField.height/2};  //координаты центра игрового поля
    playingField.top = playingField.center.y - playingField.height/2;           //верхняя граница игрового поля
    playingField.bottom = playingField.center.y + playingField.height/2;        //нижняя граница игрового поля
    playingField.view.style.width = playingField.width + "px";                  //дефолтные значения стилей
    playingField.view.style.height = playingField.height + "px";
    playingField.view.style.backgroundColor = playingField.background;
    playingField.view.style.border = playingField.border;
    
    function Player(){
        var self = this;
        self.color = "yellow";                                                  //цвет игрока
        self.speedY = 0;                                                        //"скорость") игрока
        self.width = 10;                                                        //ширина игрока
        self.height = 0.25*playingField.height;                                 //высота игрока
        self.score = 0;                                                         //счёт игрока
        self.center = {x: self.width/2, y: playingField.center.y};              //координаты центра игрока
        self.top = self.center.y - self.height/2;                               //верхняя граница игрока
        self.bottom = self.center.y + self.height/2                             //нижняя граница игрока
        self.stylization = function(){                                          //дефолтные значения стилей
            self.view.style.width = self.width + "px";    
            self.view.style.height = self.height + "px";
            self.view.style.backgroundColor = self.color;
            self.view.style.top = self.top + "px";
        }
        self.move = function(centerY){
            self.top = centerY - self.height/2;
            self.bottom = centerY + self.height/2;
            self.view.style.top = self.top + "px";
        }
    }
    
    var player1 = (function createPlayer1(){
        var player1 = new Player();
        player1.view = document.querySelector(".player1");
        player1.scoreView = document.querySelector(".player1Score");
        player1.color = "green";
        player1.stylization();
        return player1;
    })()

    var player2 = (function createPlayer2(){
        var player2 = new Player();  
        player2.view = document.querySelector(".player2");
        player2.scoreView = document.querySelector(".player2Score");
        player2.view.style.right = 0 + "px";
        player2.color = "blue";
        player2.center.x = playingField.width-player2.width/2;
        player2.stylization();
        return player2;
    })()

    var ball = (function createBall(){
        var ball = {
            view : document.querySelector(".ball"),
            radius : 15,
            color : "red",
            posX : playingField.center.x,
            posY : playingField.center.y,  
            move : function(){
                ball.view.style.left = ball.posX + "px";
                ball.view.style.top = ball.posY + "px";
            }
        }
        ball.width = 2*ball.radius;
        ball.height = ball.width;
        ball.view.style.width = ball.width +"px";
        ball.view.style.height = ball.height +"px";
        ball.view.style.backgroundColor = ball.color;
        ball.view.style.left = ball.posX - ball.radius + "px";
        ball.view.style.top = ball.posY - ball.radius + "px";
        return ball;
    })()
    return {playingField, ball, player1, player2};
})();

function start(){
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
    
        // попал ли мяч в ракетку игрока 1
        if (gameAssets.ball.posX == gameAssets.player1.width && gameAssets.ball.posY>gameAssets.player1.top - 3*gameAssets.ball.height/4 && gameAssets.ball.posY+gameAssets.ball.height/4<gameAssets.player1.bottom){
            gameAssets.ball.speedX=-gameAssets.ball.speedX;
            gameAssets.ball.posX=gameAssets.player1.width;  
        }
        // попал ли мяч в ракетку игрока 2
        if (gameAssets.ball.posX == gameAssets.playingField.width - gameAssets.player2.width - gameAssets.ball.width && gameAssets.ball.posY>gameAssets.player2.top - 3*gameAssets.ball.height/4 && gameAssets.ball.posY+gameAssets.ball.height/4<gameAssets.player2.bottom){
            gameAssets.ball.speedX=-gameAssets.ball.speedX;
            gameAssets.ball.posX=gameAssets.playingField.width - gameAssets.player2.width - gameAssets.ball.width;
        }
        // вылетел ли мяч левее стены?
        if (gameAssets.ball.posX<0 && gameStatus == 1){
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
        gameAssets.ball.posX = gameAssets.playingField.center.x - gameAssets.ball.radius;
        gameAssets.ball.posY = gameAssets.playingField.center.y - gameAssets.ball.radius;
        gameAssets.ball.move();
        gameAssets.player1.move(gameAssets.playingField.center.y);
        gameAssets.player2.move(gameAssets.playingField.center.y);
        gameStatus = 1;
    }
    gameAssets.ball.move();
}