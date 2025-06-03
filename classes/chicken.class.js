/**
 * Represents a walking chicken enemy in the game.
 * 
 * Inherits from {@link MovableObject}.
 */
class Chicken extends MovableObject {

    /** @type {number} Y position of the chicken on the canvas */
    y = 360;

    /** @type {number} Current energy (health) of the chicken */
    energy = 5;

    /** @type {number} Height of the chicken */
    height = 60;

    /** @type {number} Width of the chicken */
    width = 80;

    /** @type {string[]} Array of image paths used for walking animation */
    IMAGES_WALKING = [
        './img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    /** @type {string[]} Array containing the image path for dead state */
    IMAGES_DEAD = [
        './img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];

    /**
     * Creates a new Chicken instance with randomized position and speed.
     * Loads animation images and starts movement and animation.
     */
    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.x = 500 + Math.random() * 1500;
        this.speed = 0.15 + Math.random() * 0.53;
        this.setCollisionBox();
        this.animate();
    }

    /**
     * Starts movement and animation of the chicken.
     * Chickens move to the left and switch between walking and dead animations.
     */
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
