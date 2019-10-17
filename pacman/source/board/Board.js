let Board = (function () {
    "use strict";
    
    /**
     * @const The Board MAtrix (28x31) and the Values
     * 0 Wall | 1 Path | 2 Pill on Path | 3 Intersection | 4 Pill on Interection | 5 Tunnel
     */
    const wallValue    = 0,
        pillPathValue  = 2,
        interValue     = 3,
        interPillValue = 4,
        tunnelValue    = 5,
        
        boardMatrix    = [
            [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
            [ 0, 4, 2, 2, 2, 2, 4, 2, 2, 2, 2, 2, 4, 0, 0, 4, 2, 2, 2, 2, 2, 4, 2, 2, 2, 2, 4, 0 ],
            [ 0, 2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0 ],
            [ 0, 1, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1, 0 ],
            [ 0, 2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0 ],
            [ 0, 4, 2, 2, 2, 2, 4, 2, 2, 4, 2, 2, 4, 2, 2, 4, 2, 2, 4, 2, 2, 4, 2, 2, 2, 2, 4, 0 ],
            [ 0, 2, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 2, 0 ],
            [ 0, 2, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 2, 0 ],
            [ 0, 4, 2, 2, 2, 2, 4, 0, 0, 4, 2, 2, 4, 0, 0, 4, 2, 2, 4, 0, 0, 4, 2, 2, 2, 2, 4, 0 ],
            [ 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0 ],
            [ 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0 ],
            [ 0, 0, 0, 0, 0, 0, 2, 0, 0, 3, 1, 1, 3, 1, 1, 3, 1, 1, 3, 0, 0, 2, 0, 0, 0, 0, 0, 0 ],
            [ 0, 0, 0, 0, 0, 0, 2, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 2, 0, 0, 0, 0, 0, 0 ],
            [ 0, 0, 0, 0, 0, 0, 2, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 2, 0, 0, 0, 0, 0, 0 ],
            [ 5, 5, 5, 5, 5, 5, 4, 1, 1, 3, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1, 1, 4, 5, 5, 5, 5, 5, 5 ],
            [ 0, 0, 0, 0, 0, 0, 2, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 2, 0, 0, 0, 0, 0, 0 ],
            [ 0, 0, 0, 0, 0, 0, 2, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 2, 0, 0, 0, 0, 0, 0 ],
            [ 0, 0, 0, 0, 0, 0, 2, 0, 0, 3, 1, 1, 1, 1, 1, 1, 1, 1, 3, 0, 0, 2, 0, 0, 0, 0, 0, 0 ],
            [ 0, 0, 0, 0, 0, 0, 2, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 2, 0, 0, 0, 0, 0, 0 ],
            [ 0, 0, 0, 0, 0, 0, 2, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 2, 0, 0, 0, 0, 0, 0 ],
            [ 0, 4, 2, 2, 2, 2, 4, 2, 2, 4, 2, 2, 4, 0, 0, 4, 2, 2, 4, 2, 2, 4, 2, 2, 2, 2, 4, 0 ],
            [ 0, 2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0 ],
            [ 0, 2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0 ],
            [ 0, 3, 2, 4, 0, 0, 4, 2, 2, 4, 2, 2, 4, 1, 1, 4, 2, 2, 4, 2, 2, 4, 0, 0, 4, 2, 3, 0 ],
            [ 0, 0, 0, 2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 2, 0, 0, 0 ],
            [ 0, 0, 0, 2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 2, 0, 0, 0 ],
            [ 0, 4, 2, 4, 2, 2, 4, 0, 0, 4, 2, 2, 4, 0, 0, 4, 2, 2, 4, 0, 0, 4, 2, 2, 4, 2, 4, 0 ],
            [ 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0 ],
            [ 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0 ],
            [ 0, 4, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 2, 2, 4, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 0 ],
            [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
        ],

        /**
     * @const Possible Turns at the Intersections
     * 0 Up | 1 Left | 2 Down | 3 Right
     */
    boardTurns = {
        x1y1   : [ 2, 3       ],
        x6y1   : [ 1, 2, 3    ],
        x12y1  : [ 1, 2       ],
        x15y1  : [ 2, 3       ],
        x21y1  : [ 1, 2, 3    ],
        x26y1  : [ 1, 2       ],
        x1y5   : [ 0, 2, 3    ],
        x6y5   : [ 0, 1, 2, 3 ],
        x9y5   : [ 1, 2, 3    ],
        x12y5  : [ 0, 1, 3    ],
        x15y5  : [ 0, 1, 3    ],
        x18y5  : [ 1, 2, 3    ],
        x21y5  : [ 0, 1, 2, 3 ],
        x26y5  : [ 0, 1, 2    ],
        x1y8   : [ 0, 3       ],
        x6y8   : [ 0, 1, 2    ],
        x9y8   : [ 0, 3       ],
        x12y8  : [ 1, 2       ],
        x15y8  : [ 2, 3       ],
        x18y8  : [ 0, 1       ],
        x21y8  : [ 0, 2, 3    ],
        x26y8  : [ 0, 1       ],
        x9y11  : [ 2, 3       ],
        x12y11 : [ 1, 3       ],
        x15y11 : [ 1, 3       ],
        x18y11 : [ 1, 2       ],
        x6y14  : [ 0, 1, 2, 3 ],
        x9y14  : [ 0, 1, 2    ],
        x18y14 : [ 0, 2, 3    ],
        x21y14 : [ 0, 1, 2, 3 ],
        x9y17  : [ 0, 2, 3    ],
        x18y17 : [ 0, 1, 2    ],
        x1y20  : [ 2, 3       ],
        x6y20  : [ 0, 1, 2, 3 ],
        x9y20  : [ 0, 1, 3    ],
        x12y20 : [ 1, 2       ],
        x15y20 : [ 2, 3       ],
        x18y20 : [ 0, 1, 3    ],
        x21y20 : [ 0, 1, 2, 3 ],
        x26y20 : [ 1, 2       ],
        x1y23  : [ 0, 3       ],
        x3y23  : [ 1, 2       ],
        x6y23  : [ 0, 2, 3    ],
        x9y23  : [ 1, 2, 3    ],
        x12y23 : [ 1, 3       ],
        x15y23 : [ 1, 3       ],
        x18y23 : [ 1, 2, 3    ],
        x21y23 : [ 0, 1, 2    ],
        x24y23 : [ 2, 3       ],
        x26y23 : [ 0, 1       ],
        x1y26  : [ 2, 3       ],
        x3y26  : [ 0, 1, 3    ],
        x6y26  : [ 0, 1       ],
        x9y26  : [ 0, 3       ],
        x12y26 : [ 1, 2       ],
        x15y26 : [ 2, 3       ],
        x18y26 : [ 0, 1       ],
        x21y26 : [ 0, 3       ],
        x24y26 : [ 0, 1, 3    ],
        x26y26 : [ 1, 2       ],
        x1y29  : [ 0, 3       ],
        x12y29 : [ 0, 1, 3    ],
        x15y29 : [ 0, 1, 3    ],
        x26y29 : [ 0, 1       ]
    },

    /** @const Board data */
    energizers    = [{ x: 1, y: 3 }, { x: 26, y: 3 }, { x: 1, y: 23 }, { x: 26, y: 23 }],
    pillAmount    = 244,
    fruitTile     = { x: 13.25, y: 16.8333 },
    fruitSize     = 20,
    tileSize      = 12,
    lineWidth     = 2,
    halfLine      = lineWidth / 2,
    bigRadius     = tileSize / 2,
    smallRadius   = tileSize / 4,
    eraseSize     = tileSize * 2,
    boardCols     = boardMatrix[0].length,
    boardRows     = boardMatrix.length,
    canvasWidth   = tileSize * boardCols,
    canvasHeight  = tileSize * boardRows,
    scoreHeight   = tileSize * 2,
    totalHeight   = canvasHeight + scoreHeight,
    tunnelStart   = -tileSize / 2,
    tunnelEnd     = tileSize * boardCols + tunnelStart,
    ghostSize     = tileSize * 1.5,
    blobRadius    = Math.round(tileSize / 1.5),
    pillSize      = Math.round(tileSize * 0.16666),
    energizerSize = Math.round(tileSize * 0.41666),
    boardColor    = "rgb(0, 51, 255)",
    startingPos   = { x: 14, y: 23 },
    startingDir   = { x: -1, y:  0 },
    eyesTarget    = { x: 13, y: 11 };

/** @type {Canvas} The Game Canvas */
let boardCanvas, screenCanvas, gameCanvas;


/**
 * Returns the position at the middle of a tile
 * @param {number} tile
 * @return {number}
 */
function getTileCenter(tile) {
    return Math.round((tile + 0.5) * tileSize);
}

 /**
     * Converts an x,y tile into an x,y position
     * @param {{x: number, y: number}} tile
     * @return {{x: number, y: number}}
     */
    function tileToPos(tile) {
        return { x: tile.x * tileSize, y: tile.y * tileSize };
    }
    
    /**
     * The Board API
     */
    return {
        create() {
            boardCanvas  = new BoardCanvas();
            screenCanvas = new Canvas().init("screen");
            gameCanvas   = new GameCanvas();
        },

        /**
         * Returns the conetext for the board element
         * @return {Canvas}
         */
        get boardCanvas() {
            return boardCanvas;
        },

        /**
         * Returns the conetext for the screen element
         * @return {Canvas}
         */
        get screenCanvas() {
            return screenCanvas;
        },

        /**
         * Returns the conetext for the game element
         * @return {Canvas}
         */
        get gameCanvas() {
            return gameCanvas;
        },
        
        
        
        /**
         * Clears the saved rects in the Game Canvas
         */
        clearGame() {
            gameCanvas.clearSavedRects();
        },
        
        /**
         * Draws the board
         * @param {boolean} newLevel
         */
        drawBoard(newLevel) {
            boardCanvas.drawBoard(newLevel);
        },
        
        /**
         * Clears all the Canvas
         */
        clearAll() {
            boardCanvas.clear();
            gameCanvas.clear();
            screenCanvas.clear();
        },
        
       /**
         * Returns the width of the canvas
         * @return {number}
         */
        get width() {
            return canvasWidth;
        },
        
        /**
         * Returns the height of the canvas
         * @return {number}
         */
        get height() {
            return totalHeight;
        },
        
        /**
         * Returns the amount of columns of the matrix
         * @return {number}
         */
        get cols() {
            return boardCols;
        },
        
        /**
         * Returns the amount of rows of the matrix
         * @return {number}
         */
        get rows() {
            return boardRows;
        },
        
        /**
         * Returns the tile size
         * @return {number}
         */
        get tileSize() {
            return tileSize;
        },
        
        /**
         * Returns the line width
         * @return {number}
         */
        get lineWidth() {
            return lineWidth;
        },
        
        /**
         * Returns the half of the line width
         * @return {number}
         */
        get halfLine() {
            return halfLine;
        },
        
        /**
         * Returns the big radius
         * @return {number}
         */
        get bigRadius() {
            return bigRadius;
        },
        
        /**
         * Returns the small radius
         * @return {number}
         */
        get smallRadius() {
            return smallRadius;
        },
        
        /**
         * Returns the erase size
         * @return {number}
         */
        get eraseSize() {
            return eraseSize;
        },
        
        /**
         * Returns the board color
         * @return {string}
         */
        get boardColor() {
            return boardColor;
        },
        
        /**
         * Returns an array with the position of the energizers
         * @return {Array.<{x: number, y: number}>}
         */
        get energizers() {
            return energizers;
        },
