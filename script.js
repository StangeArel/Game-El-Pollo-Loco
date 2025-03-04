let canvas;
let world;
let keyboard = new KeyBoard();
let sounds;

function init() {
    canvas = document.getElementById('canvas');
    sounds = new Sounds();
    showStartScreen();
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

    let loading = document.getElementById('loading');
    loading.classList.remove('d_none');

    let menuOverlay = document.getElementById('menu-overlay');
    menuOverlay.classList.add('d_none');

    world = new World(canvas, keyboard);

    setTimeout(() => {
        loading.classList.add('d_none');
        let btnStart = document.getElementById('btnStartGame');
        btnStart.classList.add("d_none");
        let btnMenu = document.getElementById('btnMenu');
        btnMenu.classList.remove("d_none");
        btnMenu.classList.remove("btnMenu");
        btnMenu.innerText = "| |";

        btnMenu.classList.add("btnMenuInGame");

        sounds.play('backgroundChicken', true);
    }, 1000);

}

function stopPropagation(e) {
    e.stopPropagation();
}

function pauseGame() {
    sounds.play('menuSound');
    sounds.play('backgroundMusic', true);
    stopAllIntervals();

    let menuOverlay = document.getElementById('menu-overlay');
    menuOverlay.classList.remove('d_none');

    sounds.pause('backgroundChicken');
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
    if (sounds.soundEnabled) {
        sounds.soundEnabled = false;
        sounds.pauseAll();

        let btnSound = document.getElementById('btnSound');
        btnSound.innerText = 'Turn On Sounds'
    } else {
        sounds.soundEnabled = true;
        sounds.play('menuSound');
        sounds.play('backgroundMusic', true);


        let btnSound = document.getElementById('btnSound');
        btnSound.innerText = 'Turn Off Sounds'
    }
}
