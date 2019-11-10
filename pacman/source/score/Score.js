/**
 * The Score Class
 */
class Score {
    
    /**
     * The Score constructor
     */
    constructor() {
        this.canvas = Board.boardCanvas;
        this.ctx    = this.canvas.context;
        
        this.score  = 0;
        this.level  = 1;
        this.lives  = 2;
        this.bonus  = 0;
        this.ghosts = 0;
        
        this.textTop     = 32.5;
        this.scoreLeft   = 3.2;
        this.livesLeft   = 16.3;
        this.scoreMargin = 0.5;
        this.scoreWidth  = 7;
        this.scoreHeight = 2;
        this.scoreColor  = "rgb(255, 255, 51)";
        this.fruitTile   = { x: 26, y: 31.5 };
        
        this.blobs = [ new ScoreBlob(0), new ScoreBlob(1) ];
        this.food  = new Fruit();
    }

    /**
     * Draws the Score, Blobs and Fruit in the board
     */
    draw() {
        this.drawTexts();
        this.drawScore();
        
        this.blobs.forEach(function (blob) {
            blob.draw();
        });
        this.food.draw(this.fruitTile);
    }

    /**
     * Increases the game score by the given amount
     * @param {number} amount
     */
    incScore(amount) {
        this.score += amount;
        if (this.score > Data.extraLife * Math.pow(10, this.bonus)) {
            if (this.lives < 4) {
                this.incLife(true);
            }
            this.bonus += 1;
        }
        this.drawScore();
    }

    /**
     *  Increases/Decreases the game lives depending on the param
     * @param {boolean} isIncrease
     */
    lincLife(isIncrease) {
        this.lives += isIncrease ? 1 : -1;

        if (isIncrease) {
            let blob = new ScoreBlob(this.lives -1);
            this.blobs.push(blob);
            blob.draw();
        } else if (this.blobs.length) {
            let blob = this.blobs.pop();
            blob.clear();
        }
    }

    /**
     * Increases the game level
     */
    newLevel() {
        this.level += 1;
        this.ghosts = 0;
        Data.level  = this.level;
    }
    
}