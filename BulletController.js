import Bullet from "./Bullet.js";

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

    collideWith(sprite) {
        const bulletThatHitSpriteIndex = this.Bullets.findIndex((Bullet) => Bullet.collideWith(sprite));

        if (bulletThatHitSpriteIndex >= 0) {
            this.Bullets.splice(bulletThatHitSpriteIndex, 1);
            return true;
        }
        return false;
    }

    shoot(x, y, velocity, timeTillNextBulletAllowed = 0) {
        if (
            this.timeTillNextBulletAllowed <= 0 && 
            this.Bullets.length < this.maxBulletsAtATime
        ) {
            const bullet = new Bullet(this.canvas, x, y, velocity, this.bulletColor);
            this.Bullets.push(bullet);
            if (this.soundEnabled) {
                this.shootSound.currentTime = 0;
                this.shootSound.play();
            }
            this.timeTillNextBulletAllowed = timeTillNextBulletAllowed;
        }
    }
}