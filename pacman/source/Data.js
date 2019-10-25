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
        },
        { // 2
            ghostSpeed        : 0.85,
            tunnelSpeed       : 0.45,
            pmSpeed           : 0.9,
            eatingSpeed       : 0.79,
            ghostFrightSpeed  : 0.55,
            pmFrightSpeed     : 0.95,
            eatingFrightSpeed : 0.83,
            elroyDotsLeft1    : 30,
            elroySpeed1       : 0.9,
            elroyDotsLeft2    : 15,
            elroySpeed2       : 0.95,
            fruitType         : 2,
            fruitScore        : 300,
            frightTime        : 5,
            frightBlinks      : 5,
            switchTimes       : [ 7, 20, 7, 20, 5, 1033, 1 / 60, 1 ],
            penForceTime      : 4,
            penLeavingLimit   : [ 0, 0, 0, 50 ]
        },
        { // 3 
            ghostSpeed        : 0.85,
            tunnelSpeed       : 0.45,
            pmSpeed           : 0.9,
            eatingSpeed       : 0.79,
            ghostFrightSpeed  : 0.55,
            pmFrightSpeed     : 0.95,
            eatingFrightSpeed : 0.83,
            elroyDotsLeft1    : 40,
            elroySpeed1       : 0.9,
            elroyDotsLeft2    : 20,
            elroySpeed2       : 0.95,
            fruitType         : 3,
            fruitScore        : 500,
            frightTime        : 4,
            frightBlinks      : 5,
            switchTimes       : [ 7, 20, 7, 20, 5, 1033, 1 / 60, 1 ],
            penForceTime      : 4,
            penLeavingLimit   : [ 0, 0, 0, 0 ]
        },
        { // 4
            ghostSpeed        : 0.85,
            tunnelSpeed       : 0.45,
            pmSpeed           : 0.9,
            eatingSpeed       : 0.79,
            ghostFrightSpeed  : 0.55,
            pmFrightSpeed     : 0.95,
            eatingFrightSpeed : 0.83,
            elroyDotsLeft1    : 40,
            elroySpeed1       : 0.9,
            elroyDotsLeft2    : 20,
            elroySpeed2       : 0.95,
            fruitType         : 3,
            fruitScore        : 500,
            frightTime        : 3,
            frightBlinks      : 5,
            switchTimes       : [ 7, 20, 7, 20, 5, 1033, 1 / 60, 1 ],
            penForceTime      : 4,
            penLeavingLimit   : [ 0, 0, 0, 0 ]
        },
        { // 5
            ghostSpeed        : 0.95,
            tunnelSpeed       : 0.5,
            pmSpeed           : 1,
            eatingSpeed       : 0.87,
            ghostFrightSpeed  : 0.6,
            pmFrightSpeed     : 1,
            eatingFrightSpeed : 0.87,
            elroyDotsLeft1    : 40,
            elroySpeed1       : 1,
            elroyDotsLeft2    : 20,
            elroySpeed2       : 10.05,
            fruitType         : 4,
            fruitScore        : 700,
            frightTime        : 2,
            frightBlinks      : 5,
            switchTimes       : [ 5, 20, 5, 20, 5, 1037, 1 / 60, 1 ],
            penForceTime      : 3,
            penLeavingLimit   : [ 0, 0, 0, 0 ]
        },
        { // 6
            ghostSpeed        : 0.95,
            tunnelSpeed       : 0.5,
            pmSpeed           : 1,
            eatingSpeed       : 0.87,
            ghostFrightSpeed  : 0.6,
            pmFrightSpeed     : 1,
            eatingFrightSpeed : 0.87,
            elroyDotsLeft1    : 50,
            elroySpeed1       : 1,
            elroyDotsLeft2    : 25,
            elroySpeed2       : 10.05,
            fruitType         : 4,
            fruitScore        : 700,
            frightTime        : 5,
            frightBlinks      : 5,
            switchTimes       : [ 5, 20, 5, 20, 5, 1037, 1 / 60, 1 ],
            penForceTime      : 3,
            penLeavingLimit   : [ 0, 0, 0, 0 ]
        },
        { // 7
            ghostSpeed        : 0.95,
            tunnelSpeed       : 0.5,
            pmSpeed           : 1,
            eatingSpeed       : 0.87,
            ghostFrightSpeed  : 0.6,
            pmFrightSpeed     : 1,
            eatingFrightSpeed : 0.87,
            elroyDotsLeft1    : 50,
            elroySpeed1       : 1,
            elroyDotsLeft2    : 25,
            elroySpeed2       : 1.05,
            fruitType         : 5,
            fruitScore        : 1000,
            frightTime        : 2,
            frightBlinks      : 5,
            switchTimes       : [ 5, 20, 5, 20, 5, 1037, 1 / 60, 1 ],
            penForceTime      : 3,
            penLeavingLimit   : [ 0, 0, 0, 0 ]
        },
        { // 8
            ghostSpeed        : 0.95,
            tunnelSpeed       : 0.5,
            pmSpeed           : 1,
            eatingSpeed       : 0.87,
            ghostFrightSpeed  : 0.6,
            pmFrightSpeed     : 1,
            eatingFrightSpeed : 0.87,
            elroyDotsLeft1    : 50,
            elroySpeed1       : 1,
            elroyDotsLeft2    : 25,
            elroySpeed2       : 1.05,
            fruitType         : 5,
            fruitScore        : 1000,
            frightTime        : 2,
            frightBlinks      : 5,
            switchTimes       : [ 5, 20, 5, 20, 5, 1037, 1 / 60, 1 ],
            penForceTime      : 3,
            penLeavingLimit   : [ 0, 0, 0, 0 ]
        },
    ]
}());