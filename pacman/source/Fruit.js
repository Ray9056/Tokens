/**
 * The Fruit Class
 */
class Fruit {
    
    /**
     * The Fruit constructor
     */
    constructor() {
        this.ctx   = Board.boardCanvas.context;
        this.timer = 0;
    }

    /**
     * Try to add a fruit in the board
     * @param {number} dotsLeft
     */
    add(dotsLeft) {
        if (dotsLeft === Data.fruitDots1 || dotsLeft === Data.fruitDots2) {
            this.timer = Data.fruitTime;
            this.draw(Board.fruitTile);
        }
    }

    /**
     * Reduces the fruit timer when there is one
     * @param {number} time
     */
    reduceTimer(time) {
        if (this.timer > 0) {
            this.timer -= time;
            if (this.timer <= 0) {
                this.eat();
            }
        }
    }

    /**
     * Eats the Fruit
     */
    eat() {
        this.clear();
        this.timer = 0;
    }

    /**
     * Returns true if the given tile is at the fruit position
     * @param {{x: number, y: number}}
     * @return {boolean}
     */
    isAtPos(tile) {
        if (this.timer > 0) {
            let rect = Board.getFruitRect(),
                pos  = Board.tileToPos(tile);
            
            return (
                pos.x >= rect.left && pos.x <= rect.right &&
                pos.y >= rect.top  && pos.y <= rect.bottom
            );
        }
        return false;
    }

    /**
     * Draws a Fruit
     * @param {{x: number, y: number}}
     */
    draw(tile) {
        let pos = Board.tileToPos(tile);
        this.ctx.save();
        this.ctx.translate(pos.x, pos.y);
        this["draw" + Data.getFruitName()]();
        this.ctx.restore();
    }

     /**
     * Clears the Fruit
     */
    clear() {
        let pos = Board.fruitPos;
        this.ctx.clearRect(pos.x - 1, pos.y - 1, Board.fruitSize, Board.fruitSize);
    }
    

}