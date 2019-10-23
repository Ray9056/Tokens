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

    /**
     * Moves the Blob
     * @param {number} speed
     * @return {boolean}
     */
    move(speed) {
        this.x += this.dir.x * this.speed * speed;
        this.y += this.dir.y * this.speed * speed;
        
        this.moveMouth();
        this.newTile();
        let newTile = this.atCenter();
        
        this.x = Board.tunnelEnds(this.x);
        return newTile;
    }

    /**
     * Changes the state of the Blob's mouth
     */
    moveMouth() {
        this.mouth = (this.mouth + 1) % 20;
    }

    /**
     * The Blob might have entered a new Tile, and several things might need to be done
     */
    newTile() {
        let tile = Board.getTilePos(this.x, this.y);
        if (!Board.equalTiles(this.tile, tile)) {
            this.tile       = tile;
            this.tileCenter = Board.getTileXYCenter(tile);
            this.center     = false;
            
            if (this.turn && this.inBoard(this.turn) && !this.isWall(this.turn)) {
                this.delta = {
                    x : this.dir.x || this.turn.x,
                    y : this.dir.y || this.turn.y
                };
            }
        }
    }

    /**
     * Does the turning or wall crash when the Blob is at, or just passed, the center of a tile
     * @return {boolean}
     */
    atCenter() {
        if (!this.center && this.passedCenter()) {
            let turn = false;
            if (this.turn && this.inBoard(this.turn) && !this.isWall(this.turn)) {
                this.dir  = this.turn;
                this.turn = null;
                turn      = true;
            }
            if (turn || this.crashed()) {
                this.x = this.tileCenter.x;
                this.y = this.tileCenter.y;
            }
            this.center = true;
            
            return true;
        }
        return false;
    }

    /**
     * Does a faster turn by turnning a bit before the corner.
     * Only when a turn is asked before reaching an intersection
     * @param {number} speed
     * @return {boolean}
     */
    cornering(speed) {
        this.x += this.delta.x * this.speed * speed;
        this.y += this.delta.y * this.speed * speed;
        
        if (this.passedCenter()) {
            if (this.dir.x) {
                this.x = this.tileCenter.x;
            }
            if (this.dir.y) {
                this.y = this.tileCenter.y;
            }
            this.dir   = this.turn;
            this.turn  = null;
            this.delta = null;
            
            return true;
        }
        return false;
    }

    /**
     * Eats food (dots, energizers, fruits)
     * @param {boolean} atPill
     * @param {boolean} frightenGhosts
     */
    onEat(atPill, frightenGhosts) {
        if (!atPill) {
            this.sound = 1;
        }
        
        let key;
        if (frightenGhosts) {
            key = atPill ? "eatingFrightSpeed" : "pmFrightSpeed";
        } else {
            key = atPill ? "eatingSpeed" : "pmSpeed";
        }
        this.speed = Data.getLevelData(key);
    }

    /**
     * Returns the apropiate sound effect
     * @return {string}
     */
    getSound() {
        this.sound = (this.sound + 1) % 2;
        return this.sound ? "eat2" : "eat1";
    }

    /**
     * New direction (given by the user)
     * @param {{x: number, y: number}} turn
     */
    makeTurn(turn) {
        if (this.delta) {
            return;
        }
        if (this.turnNow(turn)) {
            this.dir    = turn;
            this.turn   = null;
            this.center = false;
        } else {
            this.turn = turn;
        }
    }

    
}