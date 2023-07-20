import enemyController from "./EnemyController.js";
import Player from "./player.js";
import BulletController from "./BulletController.js";

const canvas = document.getElementById("Game");
const ctx = canvas.getContext("2d");

canvas.width= 600;
canvas.width = 600;

const background = new Image();
background.src = "images/space.png";

const playerBulletController = new BulletController(canvas,10,"red",true)
const enemyBulletContoller = new BulletController(canvas, 4, 'white', false)
const enemyController = new enemyController(canvas, enemyBulletContoller); 
const player = new Player(canvas, 3, playerBulletController);
 
let isGameOver = false;
let didWin = false;

function game(){
    checkGameOver();
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    if (!isGameOver) {
    enemyController.draw(ctx);
    player.draw(ctx);
    playerBulletController.draw(ctx);
    enemyBulletContoller.draw(ctx);
}
}

function displayGameOver() {
    let text = didwin ? "You Win" : "Game Over";
    let textOffset = didWin ? 3.5 : 5;

    ctx.fillStyle = "white";
    ctx.font = "70px Arial";
    ctx.fillText(text, canvas.width / textOffset, canvas.height / 2);
}

function checkGameOver() {
    if(isGameOver){
        return;
    }
    if(enemyBulletContoller.collideWith(player)){
        isGameOver = true;
    }

    if(enemyController.collideWith(player)) {
        isGameOver = true;
    }

    if (enemyController.enemyRows.length === 0) {
        didWin = true;
        isGameOver = true;
    }
}

setInterval(game, 1000/60);
