/**
 * @extends {Ghost}
 * The Clyde Class
 */
class Clyde extends Ghost {
    
    /**
     * The Clyde constructor
     * @param {Canvas}  canvas
     * @param {?number} dots
     */
    constructor(canvas, dots) {
        super();
        
        this.paths = {
            inPen    : [
                { dir : { x:  0, y: -1 }, disty : 168, next : 1 },
                { dir : { x:  0, y:  1 }, disty : 180, next : 0 }
            ],
            exitPen  : [
                { dir : { x: -1, y:  0 }, distx : 168, next : 1    },
                { dir : { x:  0, y: -1 }, disty : 138, next : null }
            ],
            enterPen : [
                { dir : { x: -1, y:  0 }, distx : 168, next : 1    },
                { dir : { x:  0, y:  1 }, disty : 174, next : 2    },
                { dir : { x:  1, y:  0 }, distx : 192, next : null }
            ]
        };
        
        this.id      = 3;
        this.x       = 192;
        this.y       = 174;
        this.scatter = { x: 0, y: 31 };
        this.inPen   = true;
        this.color   = Clyde.color;
        
        this.init(canvas, dots);
        this.setPath("inPen");
    }
}