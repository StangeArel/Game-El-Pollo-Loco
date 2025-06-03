/**
 * Represents any object that can be drawn on the canvas.
 * Provides basic rendering, animation, image loading, and collision detection.
 */
class DrawableObject {

    /** @type {number} Object height in pixels */
    height = 150;

    /** @type {number} Object width in pixels */
    width = 100;

    /** @type {number} X position on the canvas */
    x = 120;

    /** @type {number} Y position on the canvas */
    y = 280;

    /** @type {HTMLImageElement} Currently displayed image */
    img;

    /** @type {Object<string, HTMLImageElement>} Cached images by path */
    imageCache = {};

    /** @type {number} Index of the currently displayed animation frame */
    currentImage = 0;

    /** @type {{width?: number, height?: number}} Collision box dimensions */
    collisionBox = {};

    /** @type {string[]|null} Previously used animation image array */
    previousImages = null;

    /**
     * Sets the collision box to match the object's current width and height.
     */
    setCollisionBox() {
        this.collisionBox.width = this.width;
        this.collisionBox.height = this.height;
    }

    /**
     * Loads a single image and sets it as the current image.
     * 
     * @param {string} path - Path to the image file.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Draws the object onto the canvas.
     * 
     * @param {CanvasRenderingContext2D} ctx - The canvas 2D context to draw on.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * Draws a visual frame around the collision box (for debugging).
     * Only active for instances of MovableObject.
     * 
     * @param {CanvasRenderingContext2D} ctx - The canvas 2D context.
     */
    drawFrame(ctx) {
        if (this instanceof MovableObject) {
            ctx.beginPath();
            ctx.lineWidth = '2';
            ctx.strokeStyle = 'blue';
            ctx.rect(
                this.x,
                this.y + (this.height - this.collisionBox.height),
                this.collisionBox.width,
                this.collisionBox.height
            );
            ctx.stroke();
        }
    }

    /**
     * Loads multiple images into the image cache.
     * 
     * @param {string[]} arr - Array of image paths to load.
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
     * Checks if this object is colliding with another.
     * 
     * @param {DrawableObject} mo - The other object to check collision against.
     * @returns {boolean} True if a collision is detected.
     */
    isColliding(mo) {
        return this.x + this.collisionBox.width > mo.x &&
            this.y + (this.height - this.collisionBox.height) + this.collisionBox.height > mo.y + (mo.height - mo.collisionBox.height) &&
            this.x < mo.x + mo.collisionBox.width &&
            this.y + (this.height - this.collisionBox.height) < mo.y + (mo.height - mo.collisionBox.height) + mo.collisionBox.height;
    }

    /**
     * Checks if the collision is happening from the top (e.g., landing on an enemy).
     * 
     * @param {DrawableObject} mo - The object being landed on.
     * @returns {boolean} True if this object is colliding from above.
     */
    isCollidingTop(mo) {
        return this.isColliding(mo) &&
            this.y + (this.height - this.collisionBox.height) + this.collisionBox.height <
            mo.y + (mo.height - mo.collisionBox.height) + mo.collisionBox.height;
    }

    /**
     * Plays a looping animation by cycling through the given images.
     * 
     * @param {string[]} images - Array of image paths to animate through.
     */
    playAnimation(images) {
        if (this.previousImages !== images) {
            this.previousImages = images;
            this.currentImage = 0;
        }
        const i = this.currentImage % images.length;
        const path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * Plays an animation once and then executes a callback function.
     * 
     * @param {string[]} images - Array of image paths to animate through.
     * @param {Function} fn - Callback function to execute after animation completes.
     */
    playAnimationOnce(images, fn) {
        if (this.previousImages !== images) {
            this.previousImages = images;
            this.currentImage = 0;
        }

        if (this.currentImage < images.length) {
            const i = this.currentImage % images.length;
            const path = images[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        } else if (typeof fn === 'function') {
            fn();
        }
    }
}
