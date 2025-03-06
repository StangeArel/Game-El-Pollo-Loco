class Item extends DrawableObject {
    y = 350;
    IMAGES = [];

    constructor() {
        super();
        this.x = this.getRandomPositionX();
    }

    getRandomImage() {
        return this.IMAGES[Math.round(Math.random())];
    }

    getRandomPositionX() {
        return Math.random() * 1500 + 500;
    }

    getRandomPositionY() {
        return Math.random() * 250 + 150;
    }
}