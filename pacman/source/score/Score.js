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
}