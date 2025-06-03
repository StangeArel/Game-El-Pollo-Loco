/**
 * Represents a smaller variant of the chicken enemy.
 * Inherits behavior from the {@link Chicken} class, but with different size and images.
 */
class ChickenSmall extends Chicken {

    /** @type {number} Y position of the small chicken on the canvas */
    y = 360;

    /** @type {number} Energy (health) of the small chicken */
    energy = 5;

    /** @type {number} Height of the small chicken */
    height = 53;

    /** @type {number} Width of the small chicken */
    width = 60;

    /** @type {string[]} Walking animation images for the small chicken */
    IMAGES_WALKING = [
        './img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        './img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        './img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    /** @type {string[]} Image shown when the small chicken is dead */
    IMAGES_DEAD = [
        './img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];

    /**
     * Creates a new small chicken instance, loads walking images, and sets collision box.
     */
    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.setCollisionBox();
    }

    /**
     * Overrides the parent method to define a smaller collision box.
     */
    setCollisionBox() {
        this.collisionBox.width = 50;
        this.collisionBox.height = 50;
    }
}
