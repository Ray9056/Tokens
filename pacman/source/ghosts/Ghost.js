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