/**
 * Represents a secondary status bar, used for displaying bottle count (or similar resource).
 * 
 * Inherits from {@link StatusBar}.
 */
class StatusBarSecondary extends StatusBar {

    /**
     * Image paths representing resource levels from 0% to 100% for bottles.
     * 
     * @type {string[]}
     */
    IMAGES = [
        "./img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png",   // 0%
        "./img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png",  // 20%
        "./img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png",  // 40%
        "./img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png",  // 60%
        "./img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png",  // 80%
        "./img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png"  // 100%
    ];

    /**
     * Creates a new secondary status bar and loads the appropriate images.
     * Positioned below the primary health bar.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.y = 50; // Slightly lower than the main status bar
        this.setPercentage(100);
    }
}
