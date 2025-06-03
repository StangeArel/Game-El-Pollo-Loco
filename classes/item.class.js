/**
 * Base class for collectible items (e.g., coins, bottles) in the game.
 * Provides shared logic for random positioning and image selection.
 * 
 * Inherits from {@link DrawableObject}.
 */
class Item extends DrawableObject {

    /**
     * The vertical position of the item. Defaults to ground level.
     * @type {number}
     */
    y = 350;

    /**
     * Array of image paths representing the visual states of the item.
     * Should be set in subclasses (e.g., Coin, Bottle).
     * @type {string[]}
     */
    IMAGES = [];

    /**
     * Creates a new item and assigns it a random X position.
     */
    constructor() {
        super();
        this.x = this.getRandomPositionX();
    }

    /**
     * Returns a random image path from the `IMAGES` array.
     * 
     * @returns {string} A randomly selected image path.
     */
    getRandomImage() {
        return this.IMAGES[Math.round(Math.random())];
    }

    /**
     * Generates a random horizontal position between 500 and 2000.
     * 
     * @returns {number} A random X coordinate.
     */
    getRandomPositionX() {
        return Math.random() * 1500 + 500;
    }

    /**
     * Generates a random vertical position between 150 and 400.
     * Useful for airborne or floating items.
     * 
     * @returns {number} A random Y coordinate.
     */
    getRandomPositionY() {
        return Math.random() * 250 + 150;
    }
}
