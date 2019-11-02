/**
 * The Game Display
 */
class Display {
    
    /**
     * The Game Display constructor
     * @param {function} callback
     */
    constructor(callback) {
        this.container = document.querySelector("#container");
        this.display   = "mainScreen";
        this.callback  = callback;
    }

}