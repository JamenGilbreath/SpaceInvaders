export default class Enemy {

    constructor(XMLDocument,y,imageNumber) {
        this.x = x;
        this.y = y;
        this.width = 44;
        this.height = 32;

        this.image = new Image();
        this.Image.src = 'images/enemy${imageNumber}.png'
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}