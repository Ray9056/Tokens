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

    /**
     * Moves the Ghost
     * @param {number} speed
     * @param {Blob}   blob
     * @param {number} switchMode
     * @return {boolean}
     */
    move(speed, blob, switchMode) {
        let addToPen = false;
        this.x += this.dir.x * this.speed * speed;
        this.y += this.dir.y * this.speed * speed;
        
        if (this.path !== null) {
            addToPen = this.pathMove(blob, switchMode);
        } else {
            this.normalMove(blob);
        }
        
        this.moveFeet();
        this.draw();
        return addToPen;
    }

    /**
     * Moves the Ghost in a predefined path
     * @param {Blob}   blob
     * @param {number} switchMode
     * @return {boolean}
     */
    pathMove(blob, switchMode) {
        let step = this.path[this.pathStep];
        if (this.passedDist()) {
            if (this.dir.x) {
                this.x = step.distx;
            }
            if (this.dir.y) {
                this.y = step.disty;
            }
            
            if (step.next !== null) {
                this.pathStep = step.next;
                this.dir      = this.path[this.pathStep].dir;
            
            } else if (this.pathName === "exitPen") {
                this.path  = null;
                this.dir   = this.turn;
                this.turn  = null;
                this.speed = Data.getGhostSpeed(false);
            
            } else if (this.pathName === "enterPen") {
                this.mode       = switchMode;
                this.target     = this.getTarget(blob);
                this.tile       = Board.getGhostStartTile(false);
                this.tileCenter = Board.getTileXYCenter(this.tile);
                this.turn       = Board.getGhostStartTurn(true);
                return true;
            }
        }
        return false;
    }

    /**
     * Moves the Ghost around the board
     * @param {Blob} blob
     */
    normalMove(blob) {
        this.newTile(blob);
        this.x = Board.tunnelEnds(this.x);
        
        if (!this.center && this.passedCenter()) {
            if (this.turn) {
                this.makeTurn();
            }
            if (this.isNextIntersection()) {
                this.decideTurn();
            }
            this.speed  = this.getSpeed();
            this.center = true;
        }
    }

    /**
     * The Ghost moved to a new Tile
     * @param {Blob} blob
     */
    newTile(blob) {
        var tile = Board.getTilePos(this.x, this.y);
        if (!Board.equalTiles(this.tile, tile)) {
            this.tile       = tile;
            this.tileCenter = Board.getTileXYCenter(this.tile);
            this.center     = false;
            
            if (this.isEnteringPen()) {
                this.setPath("enterPen");
            }
        }
    }

    /**
     * Sets the Path of the Ghost
     * @param {string} path
     */
    setPath(name) {
        this.pathName = name;
        this.pathStep = 0;
        this.path     = this.paths[this.pathName];
        this.dir      = this.path[this.pathStep].dir;
        this.speed    = Data.getPathSpeed(name);
    }

    /**
     * Returns true if the Ghost is entering the Pen
     * @return {boolean}
     */
    isEnteringPen() {
        return this.mode === "eyes" && Board.equalTiles(this.tile, Board.eyesTarget);
    }

    /**
     * The Ghost turns used the previously stored turn direction
     */
    makeTurn() {
        this.x    = this.tileCenter.x;
        this.y    = this.tileCenter.y;
        this.dir  = this.turn;
        this.turn = null;
    }

    /**
     * The Ghost decided which direction to do next depending on different factors
     */
    decideTurn() {
        let turns = this.getTurns();
        if (turns.length === 1) {
            this.turn = turns[0];
        } else if (Data.isFrighten(this.mode)) {
            this.turn = turns[Utils.rand(0, turns.length - 1)];
        } else {
            this.turn = this.getTargetTurn(turns);
        }
    }

}