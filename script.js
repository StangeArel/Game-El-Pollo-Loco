/** @type {HTMLCanvasElement} */
let canvas;

/** @type {World} */
let world;

/** @type {KeyBoard} */
let keyboard = new KeyBoard();

/** @type {Sounds} */
let sounds;

let showingStartScreen;

/**
 * Initializes the game by setting up the canvas, sounds, and touch events.
 */
function init() {
    canvas = document.getElementById('canvas');
    sounds = new Sounds();
    showStartScreen();

    new TouchEvents();
}

/**
 * Displays the start screen by drawing an image on the canvas.
 */
function showStartScreen() {
    showingStartScreen = true;
    let context = canvas.getContext('2d');
    let img = new Image();
    img.src = './img/9_intro_outro_screens/start/startscreen_1.png';

    img.onload = function () {
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
}

/**
 * Starts the game by playing sounds and calling the function to load and start the game.
 */
function startGame() {
    showingStartScreen = false;
    sounds.play('menuSound');
    sounds.play('backgroundMusic', true);

    let wonScreen = document.getElementById('won');
    let loading = document.getElementById('loading');
    let mobileButtons = document.getElementById('mobileButtons');
    let menuOverlay = document.getElementById('menu-overlay');
    let btnStart = document.getElementById('btnStartGame');
    let btnMenu = document.getElementById('btnMenu');

    loadAndStartGame(wonScreen, loading, mobileButtons, menuOverlay, btnStart, btnMenu);
}

/**
 * Loads the game and starts it after a short delay.
 *
 * @param {HTMLElement} wonScreen - The win screen element.
 * @param {HTMLElement} loading - The loading screen element.
 * @param {HTMLElement} mobileButtons - The mobile buttons element.
 * @param {HTMLElement} menuOverlay - The menu overlay element.
 * @param {HTMLElement} btnStart - The start button.
 * @param {HTMLElement} btnMenu - The menu button.
 */
function loadAndStartGame(wonScreen, loading, mobileButtons, menuOverlay, btnStart, btnMenu) {
    showOnlyLoadingScreen(wonScreen, loading, mobileButtons, menuOverlay);

    world = new World(canvas, keyboard);

    setTimeout(() => {
        hideLoadingScreen(loading, btnStart, btnMenu, mobileButtons);
        sounds.play('backgroundChicken', true);
    }, 1000);
}

/**
 * Hides the loading screen and shows the game controls.
 *
 * @param {HTMLElement} loading
 * @param {HTMLElement} btnStart
 * @param {HTMLElement} btnMenu
 * @param {HTMLElement} mobileButtons
 */
function hideLoadingScreen(loading, btnStart, btnMenu, mobileButtons) {
    loading.classList.add('d_none');
    btnStart.classList.add("d_none");
    btnMenu.classList.remove("d_none");
    btnMenu.classList.remove("btnMenu");
    btnMenu.innerHTML = "M";
    btnMenu.classList.add("btnMenuInGame");
    mobileButtons.classList.remove('d_none');
}

/**
 * Shows only the loading screen and hides other elements.
 *
 * @param {HTMLElement} wonScreen
 * @param {HTMLElement} loading
 * @param {HTMLElement} mobileButtons
 * @param {HTMLElement} menuOverlay
 */
function showOnlyLoadingScreen(wonScreen, loading, mobileButtons, menuOverlay) {
    wonScreen.classList.add('d_none');
    loading.classList.remove('d_none');
    mobileButtons.classList.add('d_none');
    menuOverlay.classList.add('d_none');
}

/**
 * Prevents the event from bubbling up the DOM tree.
 *
 * @param {Event} e
 */
function stopPropagation(e) {
    e.stopPropagation();
}

/**
 * Pauses the game, stops intervals, shows the menu overlay, and pauses certain sounds.
 */
function pauseGame() {
    sounds.play('menuSound');
    sounds.play('backgroundMusic', true);
    stopAllIntervals();
    showMenuOverlay();
    setSoundButtonText();
    sounds.pause('backgroundChicken');
}

/**
 * Displays the menu overlay.
 */
function showMenuOverlay() {
    let menuOverlay = document.getElementById('menu-overlay');
    menuOverlay.classList.remove('d_none');
}

/**
 * Updates the sound toggle button text based on whether sounds are enabled.
 */
function setSoundButtonText() {
    let btnSound = document.getElementById('btnSound');

    if (sounds.getSoundEnabled()) {
        btnSound.innerText = 'Turn Off Sounds';
    } else {
        btnSound.innerText = 'Turn On Sounds';
    }
}

/**
 * Resumes the game after a pause, restarting animations and sounds.
 */
function resumeGame() {
    sounds.play('menuSound');
    if (world) {
        world.run();
        world.character.animate();
        world.character.applyGravity();
        world.level.animateAll();
        sounds.play('backgroundChicken', true);
    }

    let menuOverlay = document.getElementById('menu-overlay');
    menuOverlay.classList.add('d_none');
}

/**
 * Toggles the sound on or off and updates the sound button text accordingly.
 */
function toggleSounds() {
    if (sounds.getSoundEnabled()) {
        sounds.setSoundEnabled(false);
        sounds.pauseAll();
    } else {
        sounds.setSoundEnabled(true);
        sounds.play('menuSound');
        sounds.play('backgroundMusic', true);
    }
    setSoundButtonText();
}

// Listen for screen orientation changes and pause game if in portrait mode
window.matchMedia("(orientation: landscape)").addEventListener("change", e => {
    const landscape = e.matches;
    if (!landscape && !showingStartScreen) {
        pauseGame();
    }
});
