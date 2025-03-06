class Chicken extends MovableObject {
    y = 360;
    energy = 5;
    height = 60;
    width = 80;
    
    IMAGES_WALKING = [
        './img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    IMAGES_DEAD = [
        './img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ]

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.x = 500 + Math.random() * 1500;
        this.speed = 0.15 + Math.random() * 0.53;
        this.setCollisionBox();
        this.animate();
    }

    animate() {
        setStoppableInterval(() => {
            if (!this.isDead()) {
                this.moveLeft();
            }
        }, 1000 / 60);

        setStoppableInterval(() => {
            if (this.isDead()) {
                this.loadImage(this.IMAGES_DEAD[0]);
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 200);
    }
}
