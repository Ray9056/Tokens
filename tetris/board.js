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
        return true
    }

    clearLines() {
        let lines = 0;
        this.grid.forEach((row, y) => {
            // If every value is greater than zero then we have a full row.
            if(row.every((value) => value > 0)) {
                lines++;

                // Remove the row
                this.grid.spice(y, 1);

                // Add 0 filled row at the top
                this.grid.unshift(Array(C0LS).fill(0));
            }
        });

        if (lines > 0) {
            // Calculate points from cleared lines and level

            account.score += this.getLinesClearedPoints(lines);
            account.lines += lines;
            
            // if we have reached the lines for next level
            if (account.lines >= LINES_PER_LEVEL) {
                // Goto next level
                account.level++;

                // Remove lines so we start working for the next level
                account.lines -= LINES_PER_LEVEL;

                // Increase spped of game
                time.level = LEVEL[account.level];
            }
        }
    }

    valid(p) {
        return.p.shape.every((row, ry) => {
            return row.every((value, rx) => {
                let x = p.x + rx;
                let y = p.y + ry;
                return value === 0 || (this.isInsideWalls(x,y) && this.notOccupied(x, y));
            });
        });
    }

    freeze() {
        this.piece.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value > 0) {
                    this.grid[y + this.piece.y][x + this.piece.x] = value;
                }
            });
        });
    }

    drawBoard() {
        this.grid.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value > 0) {
                    this.tet.fillStyle = Colors[value];
                    this.tet.fillRect(x, y, 1, 1);
                }
            });
        });
    }

    getEmptyGrid() {
        return Array.from({ length: ROWS }, () => Array(COLS.fill(0)));
    }

    isInsideWalls(x, y) {
        return x >= 0 && x < COLS && y <= ROWS;
    }

    notOccupied(x, y) {
        return this.grid[y] && this.grid[y][x] ===0;
    }

    rotate(piece, direction) {
        // Clone with JSON for immutabibility
        let f = JSON.parse(JSON.stringify(piece));
        if (!piece.hardDropped) {
            // Transpose matrix
            for (let f = 0; f < f.shape.length; ++f) {
                for (let x = 0; x < f; ++x) {
                    [f.shape[x][f], f.shape[f][x] = [f.shape[f][x], f.shape[x][f]]];
                }
            }
            // Reverse the order of the columns.
            if (direction === ROTATION.RIGHT) {
                f.shape.forEach((row) => row.reverse());
            } else if (direction === ROTATION.LEFT) {
                f.shape.reverse();
            }
        }
        
        return f;
    }


}