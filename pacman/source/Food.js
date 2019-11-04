/**
 * The Food Class
 */
class Food {
    
    /**
     * The Food constructor
     */
    constructor() {
        this.ctx = Board.boardCanvas.context;
        
        this.init();
        this.createMatrix();
        this.createEnergizers();
    }

    /**
     * Initializes the instance
     */
    init() {
        this.total      = Board.pillAmount;
        this.minRadius  = Board.pillSize;
        this.maxRadius  = Board.energizerSize;
        this.radius     = this.maxRadius;
        this.energizers = [];
        this.matrix     = [];
        this.mult       = -1;
    }

    /**
     * Creates a Matrix with the positions of the pills and energizers
     */
    createMatrix() {
        for (let i = 0; i < Board.rows; i += 1) {
            this.matrix[i] = [];
            for (let j = 0; j < Board.cols; j += 1) {
                this.matrix[i][j] = Board.hasPill(j, i) ? Data.pillValue : 0;
            }
        }
        
        Board.energizers.forEach((pos) => {
            this.matrix[pos.y][pos.x] = Data.energizerValue;
        });
    }

    /**
     * Creates a list with only the active energizers
     */
    createEnergizers() {
        this.energizers = [];
        
        Board.energizers.forEach((pos) => {
            if (this.matrix[pos.y][pos.x] === Data.energizerValue) {
                this.energizers.push(Board.getTileXYCenter(pos));
            }
        });
    }

    /**
     * Does the Enerigizers animation
     */
    wink() {
        this.calcRadius();
        this.drawEnergizers();
    }

    /**
     * Calculates the Radius for the Energizers
     */
    calcRadius() {
        this.radius += this.mult * 0.1;
        
        if (this.radius <= this.minRadius) {
            this.mult = 1;
        } else if (this.radius >= this.maxRadius) {
            this.mult = -1;
        }
    }

}