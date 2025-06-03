class KeyBoard {
    LEFT = false;
    RIGHT = false;
    UP = false;
    DOWN = false;
    SPACE = false;
}

document.addEventListener("keydown", (e) => {
    switch (e.keyCode) {
        case 39:
            keyboard.RIGHT = true;
            break;
        case 37:
            keyboard.LEFT = true;
            break;
        case 38:
            keyboard.UP = true;
            break;
        case 40:
            keyboard.DOWN = true;
            break;
        case 32:
            keyboard.SPACE = true;
            break;
        default:
            break;
    }
});


document.addEventListener("keyup", (e) => {
    switch (e.keyCode) {
        case 39:
            keyboard.RIGHT = false;
            break;
        case 37:
            keyboard.LEFT = false;
            break;
        case 38:
            keyboard.UP = false;
            break;
        case 40:
            keyboard.DOWN = false;
            break;
        case 32:
            keyboard.SPACE = false;
            break;
        default:
            break;
    }
});