//Hidden game-over modal which pops up when player reaches water
let gameOverModal = document.createElement('div');
gameOverModal.className = 'modal';
document.body.appendChild(gameOverModal);

class Actor {
  constructor(xCord, yCord, speed = null) {
    this.x = xCord;
    this.y = xCord;
    this.height = 65;
    this.width = 65;
    this.speed = speed;
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

class Enemy extends Actor {

  constructor(xCord, yCord, speed) {
    super(xCord, yCord, speed);
    this.sprite = 'images/enemy-bug.png';
  }

  update(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if ((this.x + this.speed * dt) > 505)
      this.x = 0;
    else
      this.x = this.x + this.speed * dt;
    this.render();
  }

  render() {
    super.render();
  }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
let allEnemies = [new Enemy(0, 0, 40), new Enemy(0, 0, 50), new Enemy(300, 0, 60), new Enemy(100, 0, 100), new Enemy(100, 0, 70), new Enemy(200, 0, 25)];
class Player extends Actor {

  constructor(xCord, yCord) {
    super(xCord, yCord);
    this.sprite = 'images/player.png';
  }

  resetPosition() {
    this.x = 300;
    this.y = 450;
  }
  render() {
    super.render();
  }

  handleInput(code) {
    switch (code) {
      case 'up':
        if (this.y - 83 > 0)
          this.y = this.y - 83;
        else
          this.y = 0;

        this.render();
        break;
      case 'down':
        if (this.y + 83 < 450)
          this.y = this.y + 83;
        else
          this.y = 450;

        this.render();
        break;
      case 'left':
        if (this.x - 101 > 0)
          this.x = this.x - 101;
        else
          this.x = 0;
        this.render();
        break;
      case 'right':
        if (this.x + 101 < 400)
          this.x = this.x + 101;
        else
          this.x = 400;
        this.render();
        break;
    }

  }
}

// Place the player object in a variable called player

let player = new Player(300,450);
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
