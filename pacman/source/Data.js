let Data = (function (){
    "use strict";

    const levelsData = [
        {// 1
            ghostSpeed        : 0.75,                           // Normal Ghost speed
            tunnelSpeed       : 0.4,                            // Ghost speed in the tunel
            pmSpeed           : 0.8,                            // Normal Pacman speed
            eatingSpeed       : 0.71,                           // Pacman speed while eating
            ghostFrightSpeed  : 0.5,                            // Ghost speed in Fright mode
            pmFrightSpeed     : 0.9,                            // Pacman speed in Fright mode
            eatingFrightSpeed : 0.79,                           // Pacman speed in Fright mode while eating
            elroyDotsLeft1    : 20,                             // How many dots left before Blinky "Cruise Elroy" mode 1
            elroySpeed1       : 0.8,                            // The speed of Blinky "Cruise Elroy" mode 1
            elroyDotsLeft2    : 10,                             // How many dots left before Blinky "Cruise Elroy" mode 2
            elroySpeed2       : 0.85,                           // The speed of Blinky "Cruise Elroy" mode 2
            fruitType         : 1,                              // The type of fruit for this level
            fruitScore        : 100,                            // The score when catching a fruit
            frightTime        : 6,                              // The fright mode time
            frightBlinks      : 5,                              // The amount of blinks before turning back
            switchTimes       : [ 7, 20, 7, 20, 5, 20, 5, 1 ],  // The times between scatter, chase, scatter... modes
            penForceTime      : 4,                              // The time after a ghost leaves the pen while the pacman is not eating dots
            penLeavingLimit   : [ 0, 0, 30, 60 ]                // Amount of dots before each ghost leaves the pen
        }
    ]
}());