let canvas;
let world;
let keyboard = new KeyBoard();

function init() {
    canvas = document.getElementById('canvas');
    showStartScreen();
    //startGame();
}

function showStartScreen() {
    let context = canvas.getContext('2d');
    let img = new Image();
    img.src = './img/9_intro_outro_screens/start/startscreen_1.png';

    img.onload = function() {
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
}

function startGame() {
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
    }, 1000);
    
}

function stopPropagation(e) {
    e.stopPropagation();
}

function pauseGame() {
    stopAllIntervals();

    let menuOverlay = document.getElementById('menu-overlay');
    menuOverlay.classList.remove('d_none');
}

function resumeGame() {
    if (world) {
        world.run();

        world.character.animate();
        world.character.applyGravity();
        world.level.animateAll();
    }

    let menuOverlay = document.getElementById('menu-overlay');
    menuOverlay.classList.add('d_none');
}