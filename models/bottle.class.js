class Bottle extends Item {

    IMAGES = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ]

    height = 80;
    width = 42;
    
    constructor() {
        super();
        this.loadImage(this.getRandomImage());
        this.setCollisionBox();
    }
}