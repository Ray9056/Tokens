/**
 * The Game High Scores
 */
class HighScores {
    
    /**
     * The Game High Scores constructor
     */
    constructor() {
        this.input     = document.querySelector(".input input");
        this.scores    = document.querySelector(".scores");
        this.none      = document.querySelector(".none");
        this.data      = new Storage("pacman.hs");
        this.total     = this.data.get("total") || 0;
        this.focused   = false;
        this.maxScores = 10;
        
        this.input.onfocus = () => this.focused = true;
        this.input.onblur  = () => this.focused = false;
    }

     /**
     * Show the Scores for the given mode
     */
    show() {
        this.scores.innerHTML = "";
        this.showHideNone(this.total === 0);
        
        if (this.total > 0) {
            this.displayTitles();
            this.displayScores();
        }
    }

    /**
     * Create the titles and place it in the DOM
     */
    displayTitles() {
        let div = this.createContent("name", "lvl", "score");
        div.className = "titles";
        this.scores.appendChild(div);
    }

    /**
     * Create each score line and place it in the DOM
     */
    displayScores() {
        for (let i = 1; i <= this.total; i += 1) {
            let data = this.data.get(i),
                div  = this.createContent(data.name, data.level, Utils.formatNumber(data.score, ","));
            
            div.className = "highScore";
            this.scores.appendChild(div);
        }
    }

    /**
     * TODO: Creates the content for each High Score
     */
}