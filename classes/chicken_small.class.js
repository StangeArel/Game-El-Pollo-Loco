class ChickenSmall extends Chicken {
    y = 360;
    energy = 5;
    height = 53;
    width = 60;
    
    IMAGES_WALKING = [
        './img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        './img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        './img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    IMAGES_DEAD = [
        './img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ]

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.setCollisionBox();
    }

    setCollisionBox() {
        this.collisionBox.width = 50;
        this.collisionBox.height = 50;
    }
}
