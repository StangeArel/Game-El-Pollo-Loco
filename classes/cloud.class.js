/**
 * Represents a cloud in the background that moves continuously to the left.
 * 
 * Inherits from {@link MovableObject}.
 */
class Cloud extends MovableObject {

    /** @type {number} Y position of the cloud on the canvas */
    y = 20;

    /** @type {number} Height of the cloud */
    height = 250;

    /** @type {number} Width of the cloud */
    width = 500;

    /**
     * Creates a new cloud instance, sets a random X position, and starts its movement.
     */
    constructor() {
        super().loadImage('./img/5_background/layers/4_clouds/1.png');
        this.x = Math.random() * 500;
        this.animate();
    }

    /**
     * Starts the cloud's movement to the left.
     */
    animate() {
        this.moveLeft();
    }
}
