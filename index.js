const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 600;

const background = new Image();
background.src = "C:\\Users\\Admin\\Desktop\\Visual Studios BVT\\SpaceInvaders\\images\\space.png";
function game(){
ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
}

setInterval(game, 100 / 60);
