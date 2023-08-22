import Bullet from "./Bullet.js"; // Fix the import statement here

export default class BulletController {
    Bullets = [];
    timeTillNextBulletAllowed = 0;

    constructor(canvas, maxBulletsAtATime, bulletColor, soundEnabled) {
        this.canvas = canvas;
        this.maxBulletsAtATime = maxBulletsAtATime;
        this.bulletColor = bulletColor;
        this.soundEnabled = soundEnabled;
        this.enemyDeathSounds = new Audio('enemy-death.wav');
        this.enemyDeathSounds.volume = 0.5;
        this.shootSound = new Audio('shoot.wav');
        this.shootSound.volume = 0.5;
    }
    shoot(x, y, velocity, timeTillNextBulletAllowed = 0) {
        if (
            this.timeTillNextBulletAllowed <=  0 &&
            this.Bullets.length < this.maxBulletsAtATime
        ) {
            const bullet = new Bullet(this.canvas, x, y, velocity, this.bulletColor);
            this.Bullets.push(bullet);
    
            // Add a console.log statement to check if a bullet is added
            console.log("Bullet added:", bullet);
    
            if (this.soundEnabled) {
                this.shootSound.currentTime = 0;
                this.shootSound.play();
            }
            this.timeTillNextBulletAllowed = timeTillNextBulletAllowed;
        }
    }


    collideWith(enemy) {
        const bulletThatHitSpriteIndex = this.Bullets.findIndex((bullet) => {
            const collision =
                bullet.x + bullet.width > enemy.x &&
                bullet.x < enemy.x + enemy.width &&
                bullet.y + bullet.height > enemy.y &&
                bullet.y < enemy.y + enemy.height;
    
            if (collision) {
                console.log("Bullet overlapped enemy:", bullet, enemy);
            }
    
            return collision;
        });
    
        if (bulletThatHitSpriteIndex >= 0) {
            // Remove the bullet from the array and log a message
            this.Bullets.splice(bulletThatHitSpriteIndex, 1);
            console.log("Bullet removed from array");
            return true;
        }
        return false;
    }

    draw(ctx) {
        this.Bullets.forEach((bullet) => {
            bullet.draw(ctx);
            bullet.y -= bullet.velocity; // Update bullet position here
        });

        this.Bullets = this.Bullets.filter(
            (bullet) => bullet.y + bullet.height > 0 && bullet.y <= this.canvas.height
        );

        if (this.timeTillNextBulletAllowed > 0) {
            this.timeTillNextBulletAllowed--;
        }
    }

}