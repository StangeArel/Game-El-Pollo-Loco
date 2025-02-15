let canvas;
let ctx;

let world = new World();

function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext("2d");

    console.log('My Character is', world.character);

/*     Das war zur Probe: character.src = './img/2_character_pepe/2_walk/W-21.png';
        ctx.drawImage(character, 20, 20, 50, 150); */

}
