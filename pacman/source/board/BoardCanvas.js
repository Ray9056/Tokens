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
