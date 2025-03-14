class TouchEvents {
    constructor() {
        let moveRightButton = document.getElementById('moveRight');
    
        moveRightButton.addEventListener('touchstart', () => {
            moveRightButton.classList.add('mobileButtonsHover');
            keyboard.RIGHT = true;
        });
    
        moveRightButton.addEventListener('touchend', () => {
            moveRightButton.classList.remove('mobileButtonsHover');
            keyboard.RIGHT = false;
        });
    
        let moveLeftButton = document.getElementById('moveLeft');
    
        moveLeftButton.addEventListener('touchstart', () => {
            moveLeftButton.classList.add('mobileButtonsHover');
            keyboard.LEFT = true;
        });
    
        moveLeftButton.addEventListener('touchend', () => {
            moveLeftButton.classList.remove('mobileButtonsHover');
            keyboard.LEFT = false;
        });
    
        let jumpButton = document.getElementById('jump');
    
        jumpButton.addEventListener('touchstart', () => {
            jumpButton.classList.add('mobileButtonsHover');
            keyboard.UP = true;
        });
    
        jumpButton.addEventListener('touchend', () => {
            jumpButton.classList.remove('mobileButtonsHover');
            keyboard.UP = false;
        });
    
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
}