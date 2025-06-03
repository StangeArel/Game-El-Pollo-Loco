/**
 * Represents the status bar for the endboss, showing its current health level.
 * 
 * Inherits from {@link StatusBar}.
 */
class StatusBarEndboss extends StatusBar {

    /**
     * Image paths representing the endboss's health levels from 0% to 100%.
     * 
     * @type {string[]}
     */
    IMAGES = [
        "./img/7_statusbars/2_statusbar_endboss/orange/0.png",   // 0%
        "./img/7_statusbars/2_statusbar_endboss/orange/20.png",  // 20%
        "./img/7_statusbars/2_statusbar_endboss/orange/40.png",  // 40%
        "./img/7_statusbars/2_statusbar_endboss/orange/60.png",  // 60%
        "./img/7_statusbars/2_statusbar_endboss/orange/80.png",  // 80%
        "./img/7_statusbars/2_statusbar_endboss/orange/100.png"  // 100%
    ];

    /**
     * Creates the endboss status bar and sets its position and images.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.y = 0;     // Top of the screen
        this.x = 500;   // Positioned further to the right
        this.setPercentage(100);
    }
}
