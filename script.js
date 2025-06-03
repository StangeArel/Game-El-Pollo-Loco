let canvas;
let world;
let keyboard = new KeyBoard();
let sounds;

function init() {
    canvas = document.getElementById('canvas');
    sounds = new Sounds();
    showStartScreen();

    new TouchEvents();
}

function showStartScreen() {
    let context = canvas.getContext('2d');
    let img = new Image();
    img.src = './img/9_intro_outro_screens/start/startscreen_1.png';

    img.onload = function () {
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
}

function startGame() {
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

function loadAndStartGame(wonScreen, loading, mobileButtons, menuOverlay, btnStart, btnMenu) {
    showOnlyLoadingScreen(wonScreen, loading, mobileButtons, menuOverlay);

    world = new World(canvas, keyboard);

    setTimeout(() => {
        hideLoadingScreen(loading, btnStart, btnMenu, mobileButtons);

        sounds.play('backgroundChicken', true);
    }, 1000);
}

function hideLoadingScreen(loading, btnStart, btnMenu, mobileButtons) {
    loading.classList.add('d_none');
    btnStart.classList.add("d_none");
    btnMenu.classList.remove("d_none");
    btnMenu.classList.remove("btnMenu");
    btnMenu.innerHTML = "M";
    btnMenu.classList.add("btnMenuInGame");
    mobileButtons.classList.remove('d_none');
}

function showOnlyLoadingScreen(wonScreen, loading, mobileButtons, menuOverlay) {
    wonScreen.classList.add('d_none');
    loading.classList.remove('d_none');
    mobileButtons.classList.add('d_none');
    menuOverlay.classList.add('d_none');
}

function stopPropagation(e) {
    e.stopPropagation();
}

function pauseGame() {
    sounds.play('menuSound');
    sounds.play('backgroundMusic', true);
    stopAllIntervals();

    showMenuOverlay();

    setSoundButtonText();

    sounds.pause('backgroundChicken');
}

function showMenuOverlay() {
    let menuOverlay = document.getElementById('menu-overlay');
    menuOverlay.classList.remove('d_none');
}

function setSoundButtonText() {
    let btnSound = document.getElementById('btnSound');

    if (sounds.getSoundEnabled()) {
        btnSound.innerText = 'Turn Off Sounds';
    } else {
        btnSound.innerText = 'Turn On Sounds';
    }
}

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

window.matchMedia("(orientation: landscape)").addEventListener("change", e => {
    const landscape = e.matches;

    if (!landscape) {
        pauseGame();
    }
});
