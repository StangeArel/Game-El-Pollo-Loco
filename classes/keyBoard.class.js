/**
 * Represents the current state of directional and action keys.
 * Each property is a boolean indicating whether a specific key is currently pressed.
 */
class KeyBoard {

    /** @type {boolean} True if the left arrow key is pressed */
    LEFT = false;

    /** @type {boolean} True if the right arrow key is pressed */
    RIGHT = false;

    /** @type {boolean} True if the up arrow key is pressed */
    UP = false;

    /** @type {boolean} True if the down arrow key is pressed */
    DOWN = false;

    /** @type {boolean} True if the space bar is pressed */
    SPACE = false;
}

/**
 * Event listener for keydown events.
 * Sets the corresponding key state to true when a key is pressed.
 */
document.addEventListener("keydown", (e) => {
    switch (e.keyCode) {
        case 39: // ArrowRight
            keyboard.RIGHT = true;
            break;
        case 37: // ArrowLeft
            keyboard.LEFT = true;
            break;
        case 38: // ArrowUp
            keyboard.UP = true;
            break;
        case 40: // ArrowDown
            keyboard.DOWN = true;
            break;
        case 32: // Spacebar
            keyboard.SPACE = true;
            break;
        default:
            break;
    }
});

/**
 * Event listener for keyup events.
 * Sets the corresponding key state to false when a key is released.
 */
document.addEventListener("keyup", (e) => {
    switch (e.keyCode) {
        case 39: // ArrowRight
            keyboard.RIGHT = false;
            break;
        case 37: // ArrowLeft
            keyboard.LEFT = false;
            break;
        case 38: // ArrowUp
            keyboard.UP = false;
            break;
        case 40: // ArrowDown
            keyboard.DOWN = false;
            break;
        case 32: // Spacebar
            keyboard.SPACE = false;
            break;
        default:
            break;
    }
});
