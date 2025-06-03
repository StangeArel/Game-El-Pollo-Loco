/**
 * Represents a static background object in the game world.
 * Inherits from MovableObject and is positioned at the bottom of the canvas.
 */
class BackgroundObject extends MovableObject {

    /**
     * The width of the background object in pixels.
     * @type {number}
     */
    width = 720;

    /**
     * The height of the background object in pixels.
     * @type {number}
     */
    height = 480;

    /**
     * Creates a new BackgroundObject instance.
     * Loads the specified image and positions the object at the given x-coordinate,
     * aligning it to the bottom edge of the canvas.
     *
     * @param {string} imagePath - Path to the background image file.
     * @param {number} x - The horizontal position of the background object.
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height;
    }
}
