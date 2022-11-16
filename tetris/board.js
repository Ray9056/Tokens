class Board {
    constructor(ctx, ctxNext) {
        this.ctx = ctx;
        this.ctxNext = ctxNext;
        this.init();
    }

    int() {
        // Calculate size of canvas from constants.
        this.ctx.canvas.width = COLS * BlOCK_SIZE;
        this.ctx.canvas.width = ROWS * BlOCK_SIZE;

        // Scale so we don't need to give size on every draw.
        this.ctx.scale(BlOCK_SIZE, BlOCK_SIZE);
    }

    reset() {
        this.grid = this.getEmptyGrid();
        this.piece = new Piece(this.ctx);
        this.piece.setStartingPosition();
        this.getNewPiece();
    }
}