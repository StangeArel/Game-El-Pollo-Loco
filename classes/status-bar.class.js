/**
 * Represents the health status bar displayed in the top-left corner of the screen.
 * 
 * Inherits from {@link DrawableObject}.
 */
class StatusBar extends DrawableObject {

    /**
     * Image paths representing health levels from 0% to 100%.
     * 
     * @type {string[]}
     */
    IMAGES = [
        './img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',   // 0%
        './img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',  // 20%
        './img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',  // 40%
        './img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',  // 60%
        './img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',  // 80%
        './img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png'  // 100%
    ];

    /**
     * Current health percentage (0–100).
     * 
     * @type {number}
     */
    percentage = 100;

    /**
     * Creates a new status bar and loads all image levels.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 40;
        this.y = 0;
        this.width = 200;
        this.height = 60;
        this.setPercentage(100);
    }

    /**
     * Sets the current health percentage and updates the displayed image.
     * 
     * @param {number} percentage - The health percentage (0 to 100).
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Resolves which image index to use based on the current percentage.
     * Rounds to the nearest 20% step.
     * 
     * @returns {number} Index in the `IMAGES` array.
     */
    resolveImageIndex() {
        return Math.round(this.percentage / 20);
    }
}
