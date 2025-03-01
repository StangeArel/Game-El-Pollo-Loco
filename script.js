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
    world = new World(canvas, keyboard);
    let btnStart = document.getElementById('btnStartGame');
    btnStart.classList.toggle("d_none");
}

function pauseGame() {
    stopAllIntervals();
    let menuBtn = document.getElementById('btnMenu');
    menuBtn.removeEventListener('click', pauseGame);
    menuBtn.addEventListener('click', resumeGame);
}

function resumeGame() {
    world.run();

    world.character.animate();
    world.character.applyGravity();
    world.level.animateAll();

    let menuBtn = document.getElementById('btnMenu');
    menuBtn.removeEventListener('click', resumeGame);
    menuBtn.addEventListener('click', pauseGame);
}