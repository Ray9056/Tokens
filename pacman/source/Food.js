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
    
}