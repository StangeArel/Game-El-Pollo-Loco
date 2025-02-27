class Bottle extends Item {

    IMAGES = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ]

    y = 350;
    height = 80;
    width = 42;
    
    constructor() {
        super();
        this.x = this.getRandomPositionX();
        this.loadImage(this.getRandomImage());
    }

    getRandomImage() {
        return this.IMAGES[Math.round(Math.random())];
    }

    getRandomPositionX() {
        return Math.random() * 1500 + 500;
    }
}