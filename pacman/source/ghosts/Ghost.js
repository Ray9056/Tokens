/**
 * The Ghost Base Class
 */
class Ghost {
    
    /**
     * Initializes the Ghost
     * @param {Canvas}  canvas
     * @param {?number} dots
     */
    init(canvas, dots) {
        this.canvas     = canvas;
        this.ctx        = canvas.context;
        
        this.mode       = "scatter";
        this.tile       = Board.getGhostStartTile(this.inPen);
        this.tileCenter = Board.getTileXYCenter(this.tile);
        this.turn       = Board.getGhostStartTurn(this.inPen);
        this.center     = false;
        this.dotsCount  = dots || 0;
        this.target     = this.scatter;
        this.speed      = Data.getGhostSpeed(this.inPen);
        this.feet       = 0;
        this.path       = null;
        this.pathName   = null;
        this.pathStep   = 0;
    }

    /**
     * Switches the Ghost mode
     * @param {number} oldMode
     * @param {number} newMode
     * @param {Blob}   blob
     */
    switchMode(oldMode, newMode, blob) {
        if (!this.dontSwitch(oldMode)) {
            this.mode   = newMode;
            this.target = this.getTarget(blob);
            this.speed  = this.getSpeed();
                
            if (!this.dontHalfTurn(oldMode)) {
                if (this.path === null) {
                    this.turn = {
                        x : this.dir.x * -1,
                        y : this.dir.y * -1
                    };
                } else {
                    this.turn = { x: 1, y: 0 };
                }
            }
        }
    }
    
}