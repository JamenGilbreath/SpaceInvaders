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

    collideWith(sprite) {
        const bulletThatHitSpriteIndex = this.Bullets.findIndex(bullet => {
            return (
                bullet.x + bullet.width > sprite.x &&
                bullet.x < sprite.x + sprite.width &&
                bullet.y + bullet.height > sprite.y &&
                bullet.y < sprite.y + sprite.height
            );
        });

        if (bulletThatHitSpriteIndex >= 0) {
            this.Bullets.splice(bulletThatHitSpriteIndex, 1);
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

    shoot(x, y, velocity, timeTillNextBulletAllowed = 0) {
        if (
            this.timeTillNextBulletAllowed <= 0 &&
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
}