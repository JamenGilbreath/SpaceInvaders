import Bullet from "./Bullet.js";

export default class BulletController {
    Bullet = [];
    timeTillNextBulletAllowed = 0;

    constructor(canvas, maxBulletsAtATime, BulletColor, soundEnabled) {
        this.canvas = canvas;
        this.maxBulletsAtATime = maxBulletsAtATime;
        this.BulletColor = BulletColor;
        this.soundEnabled = soundEnabled
        this.enemyDeathSounds = new Audio('sounds/enemy-death.wav');
        this.enemyDeathSounds.volume = 0.5;
        this.shootSound = new Audio("sound/shoot.wav");
        this.shootSound.volume = 0.5;
    }

    draw(ctx) {
        this.Bullets = this.Bullets.filter(Bullet => Bullet.y + Bullet.width > 0 && Bullet.y <= this.canvas.height);
        this.Bullets.forEach(Bullet => Bullet.draw(ctx));

        if (this.timeTillNextBulletAllowed > 0) {
            this.timeTillNextBulletAllowed--;
        }
    }

    collideWith(sprite) {
        const bulletThatHitSpriteIndex = this.Bullet.findIndex((Bullet) => Bullet.collideWith(sprite));

        if (bulletThatHitSpriteIndex >= 0) {
            this.Bullets.splice(bulletThatHitSpriteIndex, 1);
            return true;
        }
        return false;
    }

    shoot(x, y, velocity, timeTillNextBulletAllowed = 0) {
        if (
            this.timeTillNextBulletAllowed <= 0 && 
            this.bullets.length < this.maxBulletsAtATime
        ) {
            const bullet = new Bullet(this.canvas, x, y, velocity, this.BulletColor);
            this.bullets.push(bullet);
            if (this.soundEnabled) {
                this.shootSound.currentTime = 0;
                this.shootSound.play();
            }
            this.timeTillNextBulletAllowed = timeTillNextBulletAllowed;
        }
    }
}