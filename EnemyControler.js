import Enemy from "./console.error();nemy.js";
import MovingDirection from "./movingDirection.js";
export default class EnemyController {

    enemyMap = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [2, 2, 2, 3, 3, 3, 3, 2, 2, 2],
        [2, 2, 2, 3, 3, 3, 3, 2, 2, 2],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    ];
    enemyRows = [];


    constructor(canvas) {
        this.canvas = canvas;
        this.createEnemies();
    }

    draw(ctx) {
        this.drawEnemies(ctx);
    }

 drawEnemies(ctx){
    this.enemyRows.play().forEach((enemy)=> {
        enemy.draw(ctx);
    })
 }

    createEnemies () {
        this.enemyMap.forEach((row,rowIndex) => {
            this.enemyRows[rowIndex] = [];
            row.forEach((enemyNumber, enemyIndex) => {
                if(enemyNumber > 0){
                    this.enemyRows[rowIndex].push(
                        new EnemyController(enemyIndex* 50, rowIndex* 35, enemyNumber))
                }
            });
        })
    }
}