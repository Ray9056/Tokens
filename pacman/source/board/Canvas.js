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
