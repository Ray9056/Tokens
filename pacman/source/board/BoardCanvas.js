/**
 * @extends {Canvas}
 * The Board Canvas Class
 */
class BoardCanvas extends Canvas {
    
    /**
     * The Board Canvas constructor
     */
    constructor() {
        super();
        
        this.init("board");
        
        this.ctx.lineWidth   = Board.lineWidth;
        this.ctx.strokeStyle = Board.boardColor;
        
        
        this.drawTShapes = {
            "down"  : { radians: 0,   x:  0, y:  0 },
            "left"  : { radians: 0.5, x:  0, y: -5 },
            "right" : { radians: 1.5, x: -1, y:  0 },
            "up"    : { radians: 1,   x: -1, y: -5 }
        };
        this.radians = {
            "top-left"     : { from:   1, to: 1.5 },
            "top-right"    : { from: 1.5, to:   2 },
            "bottom-right" : { from:   0, to: 0.5 },
            "bottom-left"  : { from: 0.5, to:   1 }
        };
        this.corners = {
            "top-left"     : { x:  1, y:  1 },
            "top-right"    : { x: -1, y:  1 },
            "bottom-right" : { x: -1, y: -1 },
            "bottom-left"  : { x:  1, y: -1 }
        };
        this.smallCorners = {
            "top-left" : {
                x : { cell: 1, line: -1 },
                y : { cell: 1, line: -1 }
            },
            "top-right" : {
                x : { cell: 0, line:  1 },
                y : { cell: 1, line: -1 }
            },
            "bottom-right" : {
                x : { cell: 0, line:  1 },
                y : { cell: 0, line:  1 }
            },
            "bottom-left" : {
                x : { cell: 1, line: -1 },
                y : { cell: 0, line:  1 }
            }
        };
    }

     /**
     * Draw the Board
     * @param {boolean} newLevel
     */
    drawBoard(newLevel) {
        this.drawGhostsPen();
        
        this.ctx.save();
        this.ctx.strokeStyle = newLevel ? "white" : Board.boardColor;
        this.drawOuterBorder();
        this.drawInnerBorder();
        
        // First Row
        this.drawRectangle(2,  2,  4, 3);
        this.drawRectangle(7,  2,  5, 3);
        this.drawRectangle(16, 2,  5, 3);
        this.drawRectangle(22, 2,  4, 3);
        
        // Second Row
        this.drawRectangle(2,  6, 4, 2);
        this.drawTShape(7,     6, 4, 4, "right");
        this.drawTShape(10,    6, 4, 4, "down");
        this.drawTShape(16,    6, 4, 4, "left");
        this.drawRectangle(22, 6, 4, 2);
        
        // Third Row
        this.drawRectangle(7,  15, 2, 5);
        this.drawTShape(10,    18, 4, 4, "down");
        this.drawRectangle(19, 15, 2, 5);
        
        // Fourth Row
        this.drawLShape(2,     21, false);
        this.drawRectangle(7,  21, 5, 2);
        this.drawRectangle(16, 21, 5, 2);
        this.drawLShape(22,    21, true);
        
        // Fith Row
        this.drawTShape(2,  24, 4, 6, "up");
        this.drawTShape(10, 24, 4, 4, "down");
        this.drawTShape(16, 24, 6, 4, "up");
        
        this.ctx.restore();
    }
   