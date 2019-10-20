(function () {
    "use strict";
    
    var display, demo, animations, sounds, scores,
        score, food, fruit, ghosts, blob,
        animation, startTime, actions, shortcuts,
        soundFiles  = [ "start", "death", "eat1", "eat2", "kill" ],
        specialKeys = {
            "8"  : "BS",
            "13" : "Enter",
            "37" : "Left",
            "65" : "Left",
            "38" : "Up",
            "87" : "Up",
            "39" : "Right",
            "68" : "Right",
            "40" : "Down",
            "83" : "Down"
        };
    
    
    
    /**
     * Calls the Game Over animation and then deletes the game data
     */
    function gameOver() {
        display.set("ready");
        animations.gameOver(() => {
            food   = null;
            fruit  = null;
            ghosts = null;
            blob   = null;
            
            Board.clearAll();
            display.set("gameOver").show();
            scores.setInput();
        });
    }
    
    /**
     * Creates the Blob and the Ghosts, and starts the Ready animation
     * @param {boolean} newLife
     */
    function createPlayers(newLife) {
        ghosts = new Ghosts(newLife ? ghosts : null);
        blob   = new Blob();
        
        blob.draw();
        ghosts.draw();
        animations.ready(() => display.set("playing"));
    }
    
    
    /**
     * Called when the Blob enters a new tile
     */
    function blobEating() {
        let tile   = blob.getTile(),
            atPill = food.isAtPill(tile);
        
        if (atPill) {
            let value = food.eatPill(tile),
                total = food.getLeftPills();
            
            fruit.add(total);
            score.pill(value);
            ghosts.resetPenTimer();
            ghosts.checkElroyDots(total);
            
            if (value === Data.energizerValue) {
                ghosts.frighten(blob);
            }
            sounds[blob.getSound()]();
        
        } else if (fruit.isAtPos(tile)) {
            let text = score.fruit();
            fruit.eat();
            animations.fruitScore(text, Board.fruitTile);
        }
        blob.onEat(atPill, ghosts.areFrighten());
    }

    /**
     * Called to do the crash etween a ghost and th blob
     */
    function ghostCrash() {
        ghosts.crash(blob.getTile(), (eyesCounter, tile) => {
            let text = score.kill(eyesCounter);
            animations.ghostScore(text, tile);
            sounds.kill();
        }, () => {
            Board.clearGame();
            animations.death(blob, newLife);
            sounds.death();
        });
    }

    /**
     * Called after the Blob dies
     */
    function newLife() {
        if (!score.died()) {
            gameOver();
        } else {
            display.set("ready");
            createPlayers(true);
        }
    }

    /**
     * Called after we get to a new level
     */
    function newLevel() {
        animations.newLevel(score.getLevel(), () => {
            food  = new Food();
            fruit = new Fruit();
            
            Board.clearGame();
            food.draw();
            score.draw();
            createPlayers(false);
        });
    }

    /**
     * Request an animation frame
     */
    function requestAnimation() {
        startTime = new Date().getTime();
        animation = window.requestAnimationFrame(() => {
            let time  = new Date().getTime() - startTime,
                speed = time / 16;
            
            if (speed > 5) {
                return requestAnimation();
            }
            
            if (display.isMainScreen()) {
                demo.animate(time, speed);
            } else if (animations.isAnimating()) {
                animations.animate(time);
            } else if (display.isPlaying()) {
                Board.clearGame();
                food.wink();
                fruit.reduceTimer(time);
                ghosts.animate(time, speed, blob);
                let newTile = blob.animate(speed);
                animations.animate(time);
                
                if (newTile) {
                    ghosts.setTargets(blob);
                    blobEating();
                }
                if (food.getLeftPills() === 0) {
                    score.newLevel();
                    animations.endLevel(newLevel);
                }
                ghostCrash();
            }
            requestAnimation();
        });
    }

    /**
     * Cancel an animation frame
     */
    function cancelAnimation() {
        window.cancelAnimationFrame(animation);
    }