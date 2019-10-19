/**
 * The Canvas Base Class
 */
class Canvas {
    
    /**
     * Initializes the Canvas Object
     * @param {string} name
     * @return {Canvas}
     */
    init(name) {
        let canvas    = document.querySelector("." + name);
        canvas.width  = Board.width;
        canvas.height = Board.height;
        
        this.ctx              = canvas.getContext("2d");
        this.ctx.font         = "2em 'Whimsy TT'";
        this.ctx.fillStyle    = "white";
        this.ctx.textAlign    = "center";
        this.ctx.textBaseline = "middle";
        
        this.rects            = [];
        
        return this;
    }

    /**
     * Returns the conetext for the board element
     * @return {RenderingContext}
     */
    get context() {
        return this.ctx;
    }
    
    /**
     * Fills the canvas with black at the given alpha value
     * @param {number} alpha
     * @param {number=} x
     * @param {number=} y
     * @param {number=} width
     * @param {number=} height
     */
    fill(alpha, x, y, width, height) {
        this.ctx.save();
        this.ctx.fillStyle = "rgba(0, 0, 0, " + alpha + ")";
        this.ctx.fillRect(x || 0, y || 0, width || Board.width, height || Board.height);
        this.ctx.restore();
    }

    /**
     * Clear the entire board
     */
    clear() {
        this.ctx.clearRect(0, 0, Board.width, Board.height);
        this.rects = [];
    }
    
     /**
     * Clears only the saved rects
     */
    clearSavedRects() {
        this.rects.forEach((rect) => {
            this.ctx.clearRect(rect.x, rect.y, rect.width, rect.height);
            if (rect.alpha) {
                this.fill(rect.alpha, rect.x, rect.y, rect.width, rect.height);
            }
        });
        this.rects = [];
    }
   
    /**
     * Saves a new position to clear in the future
     * @param {number} x
     * @param {number} y
     */
    savePos(x, y) {
        this.rects.push({
            x      : x - Board.eraseSize / 2,
            y      : y - Board.eraseSize / 2,
            width  : Board.eraseSize,
            height : Board.eraseSize
        });
    }