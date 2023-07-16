import Bullet from "./Bullet.js";

export default class BulletController {
    bullet = [];
    timeTillNextBulletAllowed = 0;
 Constructor (canvas, maxBulletsAtATime, BulletColor, soundEnabled) {
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

    this.bullets = this.bullets.filter(bullet => bullet.y + bullet.width > 0 && bullet.y <= this.canvas.height);

    this.bullets.forEach(bullet => bullet.draw(ctx))

    if(this.timeTillNextBulletAllowed >0) {
        this.timeTillNextBulletAllowed--;
    }
 }

 collideWith(sprite) {
    const bulletThatHitSpriteIndex = this.bullets.findIndex(
        (this.bullet.collideWith(sprite))
    
    );

    if(bulletThatHitSpriteIndex >= 0) {
        this.bullet.splice(bulletThatHitSpriteIndex, 1)
        return true;
    }
    return false;
 }

 shoot(x, y, velocity, timeTillNextBulletAllowed = 0) {
    if(
        this.timeTillNextBulletAllowed <=0 && 
        this.bullet.length < this.maxBulletsAtATime
        );
        {
            const buller = new Bullet(this.canvas, x, y, velocity, this.BulletColor);
            this.bullets.push(bullet);
            if(this.soundEnabled){
                this.shootSound.currentTime = 0;
                this.shootSound.play();
            }
            this.timeTillNextBulletAllowed = timeTillNextBulletAllowed;
        }
 }

}