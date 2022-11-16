class Board {
    constructor(tet, tetNext) {
        this.tet = tet;
        this.tetNext = tetNext;
        this.init();
    }

    int() {
        // Calculate size of canvas from constants.
        this.tet.canvas.width = COLS * BlOCK_SIZE;
        this.tet.canvas.width = ROWS * BlOCK_SIZE;

        // Scale so we don't need to give size on every draw.
        this.tet.scale(BlOCK_SIZE, BlOCK_SIZE);
    }

    reset() {
        this.grid = this.getEmptyGrid();
        this.piece = new Piece(this.tet);
        this.piece.setStartingPosition();
        this.getNewPiece();
    }
    getNewPiece() {
        const { width, height } = this.tetNext.canvas;
        this.next = new Piece(this.tetNext);
        this.tetNext.clearRect(0, 0, width, height);
        this.next.draw();
    }

    draw() {
        this.piece.draw();
        this.drawBoard();
    }

    drop() {
        let q = moves[KeyboardEvent.DOWN](this.piece);
        if (this.valid(q)) {
            this.piece.move(q);
        } else {
            this.freeze();
            this.clearLines();
            if (this.piece.y === 0) {
                // Game over
                return false;
            }
            this.piece = this.next;
            this.piece.tet = this.tet;
            this.piece.setStartingPosition();
            this.getNewPiece();
        }
    }





}