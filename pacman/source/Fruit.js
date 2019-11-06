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

}