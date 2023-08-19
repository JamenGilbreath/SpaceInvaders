import Enemy from "./enemy.js";
import MovingDirection from "./movingDirection.js";
import BulletController from "./BulletController.js";

export default class EnemyController {
  createEnemies() {
    this.enemyMap.forEach((row, rowIndex) => {
      this.enemyRows[rowIndex] = [];
      row.forEach((enemyNumber, enemyIndex) => {
        if (enemyNumber > 0) {
          this.enemyRows[rowIndex].push(
            new Enemy(enemyIndex * 50, rowIndex * 35, enemyNumber) // Create instances of the "Enemy" class instead
          );
        }
      });
    });
  }

  enemyMap = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [2, 2, 2, 3, 3, 3, 3, 2, 2, 2],
    [2, 2, 2, 3, 3, 3, 3, 2, 2, 2],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
  ];
  enemyRows = [];

  currentDirection = MovingDirection.right;
  xVelocity = 0;
  yVelocity = 0;
  defaultXVelocity = 1;
  defaultYVelocity = 1;
  moveDownTimerDefault = 30;
  moveDownTimer = this.moveDownTimerDefault;
  fireBulletTimerDefault = 100;
  fireBulletTimer = this.fireBulletTimerDefault;

  constructor(canvas) {
    this.canvas = canvas;
    this.createEnemies();
    this.enemyBulletController = new BulletController(canvas);
    this.playerBulletController = new BulletController(canvas, 5, "red", true);

    this.enemyDeathSounds = new Audio("enemy-death.wav");
    this.enemyDeathSounds.volume = 0.5;
  }

  draw(ctx) {
    this.drawEnemies(ctx);
    this.decrementMoveDownTimer();
    this.updateVelocityAndDirection();
    this.collisionDetection(this.enemyBulletController);
    this.resetMoveDownTimer();
    this.fireBullet();
  }

  collisionDetection(enemyBulletController) {
    // Add enemyBulletController as a parameter
    this.enemyRows.forEach((enemyRow) => {
      for (let i = 0; i < enemyRow.length; i++) {
        const enemy = enemyRow[i];
        if (enemyBulletController.collideWith(enemy)) {
          // Use enemyBulletController instead of this.playerBulletController
          this.enemyDeathSounds.currentTime = 0;
          this.enemyDeathSounds.play();

          // Detect collisions between player's bullets and enemies
          const destroyedEnemies = enemyBulletController.Bullets.filter(
            (bullet) => enemyRow.some((enemy) => enemy.collideWith(bullet)) // Use enemyRow to check collisions with each enemy in the row
          );

          // Destroy enemies
          destroyedEnemies.forEach((bullet) => {
            const index = enemyRow.findIndex((enemy) =>
              enemy.collideWith(bullet)
            );
            if (index !== -1) {
              enemyRow.splice(index, 1);
            }
          });
        }
      }
    });

    this.enemyRows = this.enemyRows.filter((enemyRow) => enemyRow.length > 0);
  }
  fireBullet() {
    this.fireBulletTimer--;
    if (this.fireBulletTimer <= 0) {
      this.fireBulletTimer = this.fireBulletTimerDefault;
      const allEnemies = this.enemyRows.flat();
      const enemyIndex = Math.floor(Math.random() * allEnemies.length);
      const enemy = allEnemies[enemyIndex];
      this.enemyBulletController.shoot(enemy.x, enemy.y, -3);
    }
  }

  resetMoveDownTimer() {
    if (this.moveDownTimer <= 0) {
      this.moveDownTimer = this.moveDownTimerDefault;
    }
  }

  decrementMoveDownTimer() {
    if (
      this.currentDirection === MovingDirection.downLeft ||
      this.currentDirection === MovingDirection.downRight
    ) {
      this.moveDownTimer--;
    }
  }

  updateVelocityAndDirection() {
    if (
      this.enemyRows.length === 0 ||
      this.enemyRows.every((row) => row.length === 0)
    ) {
      return;
    }
    let shouldBreak = false;
    for (const enemyRow of this.enemyRows) {
      if (this.currentDirection === MovingDirection.right) {
        this.xVelocity = this.defaultXVelocity;
        this.yVelocity = 0;
        const rightMostEnemy = enemyRow[enemyRow.length - 1];
        if (
          rightMostEnemy.x + rightMostEnemy.width + this.xVelocity >=
          this.canvas.width
        ) {
          this.currentDirection = MovingDirection.downLeft;
          shouldBreak = true;
          break;
        }
      } else if (this.currentDirection === MovingDirection.downLeft) {
        if (this.moveDown(MovingDirection.left)) {
          shouldBreak = true;
          break;
        }
      } else if (this.currentDirection === MovingDirection.left) {
        this.xVelocity = -this.defaultXVelocity;
        this.yVelocity = 0;
        const leftMostEnemy = enemyRow[0];
        if (leftMostEnemy.x <= 0) {
          this.currentDirection = MovingDirection.downRight;
          shouldBreak = true;
          break;
        }
      } else if (this.currentDirection === MovingDirection.downRight) {
        if (this.moveDown(MovingDirection.right)) {
          shouldBreak = true;
          break;
        }
      }
    }
  }

  moveDown(newDirection) {
    this.xVelocity = 0;
    this.yVelocity = this.defaultYVelocity;
    if (this.moveDownTimer <= 0) {
      this.currentDirection = newDirection;
      return true;
    }
    return false;
  }

  drawEnemies(ctx) {
    this.enemyRows.forEach((enemyRow) => {
      enemyRow.forEach((enemy) => {
        enemy.move(this.xVelocity, this.yVelocity);
        enemy.draw(ctx);
      });
    });
  }

  collideWith(sprite) {
    console.log("Bullet:", this.x, this.y, this.width, this.height);
  console.log("Sprite:", sprite.x, sprite.y, sprite.width, sprite.height);
    return this.enemyRows.flat().some((enemy) => enemy.collideWith(sprite));
  }
}
