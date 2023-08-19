

export default class Enemy {

    constructor(x,y,imageNumber) {
        this.x = x;
        this.y = y;
        this.width = 44;
        this.height = 32;

        this.image = new Image();
        
        this.image.src = `enemy${imageNumber}.png`;

    }

    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    move(xVelocity, y_Velocity) {
        this.x += xVelocity; 
        this.y +=  y_Velocity;
    }

    collideWith(enemy) {
        if(this.x + this.width > enemy.x &&
            this.x < enemy.x + enemy.width &&
            this.y + this.height > enemy.y &&
            this.y < enemy.y + enemy.height){
               return true; 
            } else{
            return false;
            }
    }

   
}