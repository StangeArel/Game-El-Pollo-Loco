/**
 * Handles touch events for mobile control buttons
 * (move left/right, jump, and throw actions).
 * 
 * Updates the global `keyboard` object accordingly.
 */
class TouchEvents {
    /**
     * Initializes all mobile button touch event listeners.
     */
    constructor() {
        this.registerMoveRightButtonEvents();
        this.registerMoveLeftButtonEvents();
        this.registerJumpButtonEvents();
        this.registerThrowButtonEvents();
    }

    /**
     * Registers touch events for the throw button.
     * Sets or unsets `keyboard.SPACE`.
     */
    registerThrowButtonEvents() {
        let throwButton = document.getElementById('throw');

        throwButton.addEventListener('touchstart', () => {
            throwButton.classList.add('mobileButtonsHover');
            keyboard.SPACE = true;
        });

        throwButton.addEventListener('touchend', () => {
            throwButton.classList.remove('mobileButtonsHover');
            keyboard.SPACE = false;
        });
    }

    /**
     * Registers touch events for the jump button.
     * Sets or unsets `keyboard.UP`.
     */
    registerJumpButtonEvents() {
        let jumpButton = document.getElementById('jump');

        jumpButton.addEventListener('touchstart', () => {
            jumpButton.classList.add('mobileButtonsHover');
            keyboard.UP = true;
        });

        jumpButton.addEventListener('touchend', () => {
            jumpButton.classList.remove('mobileButtonsHover');
            keyboard.UP = false;
        });
    }

    /**
     * Registers touch events for the move left button.
     * Sets or unsets `keyboard.LEFT`.
     */
    registerMoveLeftButtonEvents() {
        let moveLeftButton = document.getElementById('moveLeft');

        moveLeftButton.addEventListener('touchstart', () => {
            moveLeftButton.classList.add('mobileButtonsHover');
            keyboard.LEFT = true;
        });

        moveLeftButton.addEventListener('touchend', () => {
            moveLeftButton.classList.remove('mobileButtonsHover');
            keyboard.LEFT = false;
        });
    }

    /**
     * Registers touch events for the move right button.
     * Sets or unsets `keyboard.RIGHT`.
     */
    registerMoveRightButtonEvents() {
        let moveRightButton = document.getElementById('moveRight');

        moveRightButton.addEventListener('touchstart', () => {
            moveRightButton.classList.add('mobileButtonsHover');
            keyboard.RIGHT = true;
        });

        moveRightButton.addEventListener('touchend', () => {
            moveRightButton.classList.remove('mobileButtonsHover');
            keyboard.RIGHT = false;
        });
    }
}
