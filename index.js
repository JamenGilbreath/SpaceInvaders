import EnemyController from "./EnemyController.js";
import Player from "./player.js";
import BulletController from "./BulletController.js";

const canvas = document.getElementById("Game");
const ctx1 = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 600;

const background = new Image();
background.src = "space.png";

const playerBulletController = new BulletController(canvas, 10, "red", true);
const enemyBulletController = new BulletController(canvas, 4, "white", false);
const enemy = new EnemyController(canvas, enemyBulletController);
const player = new Player(canvas, 3, playerBulletController);

let isGameOver = false;
let didWin = false;

function game() {
  ctx1.clearRect(0, 0, canvas.width, canvas.height);
  checkGameOver();
  ctx1.drawImage(background, 0, 0, canvas.width, canvas.height);
  if (!isGameOver) {
    enemy.draw(ctx1); // enemies are being drawn first
    enemyBulletController.draw(ctx1);
    player.draw(ctx1);
    playerBulletController.draw(ctx1);
  }
}

function displayGameOver() {
  let text = didWin ? "You Win" : "Game Over";
  let textOffset = didWin ? 3.5 : 5;

  ctx1.fillStyle = "white";
  ctx1.font = "70px Arial";
  ctx1.fillText(text, canvas.width / textOffset, canvas.height / 2);
}

function checkGameOver() {
  if (isGameOver) {
    return;
  }
  if (enemyBulletController.collideWith(player)) {
    isGameOver = true;
  }

  if (enemy.collideWith(player)) {
    isGameOver = true;
  }

  if (enemy.enemyRows.length === 0) {
    didWin = true;
    isGameOver = true;
  }
}

setInterval(game, 1000 / 60);
