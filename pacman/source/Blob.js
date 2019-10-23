/**
 * The Blob Class
 */
class Blob {
    
    /**
     * The Blob constructor
     */
    constructor() {
        this.init(Board.gameCanvas);
    }

    /**
     * Initializes the Blob
     * @param {Canvas} canvas
     */
    init(canvas) {
        this.canvas     = canvas;
        this.ctx        = canvas.context;
        
        this.tile       = Board.startingPos;
        this.tileCenter = Board.getTileXYCenter(this.tile);
        this.x          = this.tileCenter.x;
        this.y          = this.tileCenter.y;
        this.dir        = Board.startingDir;
        this.speed      = Data.getLevelData("pmSpeed");
        this.center     = true;
        this.turn       = null;
        this.delta      = null;
        this.mouth      = 5;
        this.radius     = Board.blobRadius;
        this.sound      = 1;
    }

/**
     * Animates the Blob
     * @param {number} speed
     * @return {boolean}
     */
    animate(speed) {
        let newTile = false;
        if (this.center && this.crashed()) {
            this.mouth = 5;
        } else if (this.delta) {
            newTile = this.cornering(speed);
        } else {
            newTile = this.move(speed);
        }
        this.draw();
        return newTile;
    }
    
}