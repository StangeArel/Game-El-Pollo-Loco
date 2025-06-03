/**
 * Represents a collectible coin item in the game.
 * The coin animates continuously and has a randomized vertical position.
 * 
 * Inherits from {@link Item}.
 */
class Coin extends Item {

    /**
     * Array of image paths for the coin animation.
     * 
     * @type {string[]}
     */
    IMAGES = [
        './img/8_coin/coin_1.png',
        './img/8_coin/coin_2.png'
    ];

    /** @type {number} Height of the coin in pixels */
    height = 40;

    /** @type {number} Width of the coin in pixels */
    width = 40;

    /** @type {number} Default Y position of the coin (may be overridden) */
    y = 400;

    /**
     * Creates a new coin instance with a random Y position and starts animation.
     */
    constructor() {
        super();
        this.loadImage(this.getRandomImage());
        this.loadImages(this.IMAGES);
        this.y = this.getRandomPositionY(); // Randomize vertical position
        this.setCollisionBox();
        this.animate();
    }

    /**
     * Starts the coin's looping animation by cycling through the IMAGES array.
     */
    animate() {
        setStoppableInterval(() => {
            this.playAnimation(this.IMAGES);
        }, 200);
    }
}
