/**
 * Represents a bottle item that can be picked up by the character.
 * Extends the Item class and defines its own images, size, and collision box.
 */
class Bottle extends Item {

    /**
     * Array of image paths for bottle appearances.
     * @type {string[]}
     */
    IMAGES = [
        './img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        './img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    /**
     * The height of the bottle in pixels.
     * @type {number}
     */
    height = 80;

    /**
     * The width of the bottle in pixels.
     * @type {number}
     */
    width = 42;

    /**
     * Creates a new Bottle instance, loads a random image, and sets its collision box.
     */
    constructor() {
        super();
        this.loadImage(this.getRandomImage());
        this.setCollisionBox();
    }
}
