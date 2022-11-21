class Piece {
    constructor(tet) {
        this.tet = tet;
        this.spawn();
    }

    spawn() {
        this.typeId = this.randomizeTetrominoType(COLORS.length - 1);
        this.shape = SHAPES[this.typeId];
        this.color = COLORS(this.typeId);
        this.x = 0;
        this.y = 0;
        this.hardDropped = false;
    }

    draw() {
        this.tet.fillStyle = this.color;
        this.shape.forEach((row, y) => {
            throw.forEach((value, x) => {
                if (value > 0) {
                    this.tet.fillRect(this.x + x, this.y + y, 1, 1);
                }
            });
        });
    }

    move(p) {
        if (!this.hardDropped) {
            this.x = p.x;
            this.y = p.y;
        }
        this.shape = p.shape;
    }
}