/* Engine.js
 * This file provides the game loop functionality (update entities and render),
 * draws the initial game board on the screen, and then calls the update and
 * render methods on your player and enemy objects (defined in your app.js).
 */
let animationId;
var Engine = (function(global) {
  var doc = global.document,
    win = global.window,
    canvas = doc.createElement('canvas'),
    ctx = canvas.getContext('2d'),
    lastTime;

  canvas.width = 505;
  canvas.height = 606;
  doc.body.appendChild(canvas);

  /* This function serves as the starting point for the game loop itself
  */
  function main() {

    var now = Date.now(),
      dt = (now - lastTime) / 1000.0;

    update(dt);
    render();

    lastTime = now;

    animationId = win.requestAnimationFrame(main);
  }

  function init() {
    lastTime = Date.now();
    main();
    constructHiddenGameOverModal();
  }

  function update(dt) {
    updateEntities(dt);
    checkCollisions();
    checkGameOver();
  }

  function checkCollisions() {
    allEnemies.forEach(function(enemy) {
      if (enemy.x < player.x + player.width && enemy.x + enemy.width > player.x &&
        enemy.y < player.y + player.height && enemy.y + enemy.height > player.y) {
        player.resetPosition();
      }
    });
  }

  function checkGameOver() {

    if (player.y == 0) {
      document.getElementsByClassName('modal')[0].style.display = 'table';
      gameOver = 1;
    }
  }

  function constructHiddenGameOverModal() {
    let gameStats = document.createElement('div');
    gameStats.className = 'gameStats';
    let modalTextpara = document.createElement('p');
    let playAgainButton = document.createElement('input');
    playAgainButton.setAttribute('type', 'button');
    playAgainButton.setAttribute('value', 'Play Again');
    modalTextpara.textContent = 'LETS GOOOOO!!! You made it to the water!'
    modalTextpara.className = 'para1-gameover';
    playAgainButton.className = 'play-again';
    gameOverModal.appendChild(gameStats);
    gameStats.appendChild(modalTextpara);
    gameStats.appendChild(playAgainButton);

    playAgainButton.addEventListener('click', function() {
      gameOver = 0;
      document.getElementsByClassName('modal')[0].style.display = 'none';
      player.resetPosition();
    });
  }

  function updateEntities(dt) {
    allEnemies.forEach(function(enemy) {
      enemy.update(dt);
    });
  }

  function render() {

    var rowImages = [
        'images/water-block.png', // Top row is water
        'images/stone-block.png', // Row 1 of 3 of stone
        'images/stone-block.png', // Row 2 of 3 of stone
        'images/stone-block.png', // Row 3 of 3 of stone
        'images/grass-block.png', // Row 1 of 2 of grass
        'images/grass-block.png' // Row 2 of 2 of grass
      ],
      numRows = 6,
      numCols = 5,
      row, col;

    // Before drawing, clear existing canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    /* Loop through the number of rows and columns we've defined above
     * and, using the rowImages array, draw the correct image for that
     * portion of the "grid"
     */
    for (row = 0; row < numRows; row++) {
      for (col = 0; col < numCols; col++) {
        ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
      }
    }

    renderEntities();
  }

  /* This function is called by the render function and is called on each game
   * tick. Its purpose is to then call the render functions you have defined
   * on your enemy and player entities within app.js
   */
  function renderEntities() {
    allEnemies.forEach(function(enemy) {
      enemy.render();
    });

    player.render();
  }

  Resources.load([
    'images/stone-block.png',
    'images/water-block.png',
    'images/grass-block.png',
    'images/enemy-bug.png',
    'images/player.png'
  ]);
  Resources.onReady(init);

  global.ctx = ctx;
})(this);
