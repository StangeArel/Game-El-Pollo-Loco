class StatusBarEndboss extends StatusBar {
    
    
    IMAGES = [
        "../img/7_statusbars/2_statusbar_endboss/orange/0.png",
        "../img/7_statusbars/2_statusbar_endboss/orange/20.png",
        "../img/7_statusbars/2_statusbar_endboss/orange/40.png",
        "../img/7_statusbars/2_statusbar_endboss/orange/60.png",
        "../img/7_statusbars/2_statusbar_endboss/orange/80.png",
        "../img/7_statusbars/2_statusbar_endboss/orange/100.png"
    ];

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.y = 0;
        this.x = 500;

        this.setPercentage(100);
    }
}