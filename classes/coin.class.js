class Coin extends Item {
    IMAGES = [
        './img/8_coin/coin_1.png',
        './img/8_coin/coin_2.png'
    ]

    height = 40;
    width = 40;
    y = 400;

    constructor() {
        super();
        this.loadImage(this.getRandomImage());
        this.loadImages(this.IMAGES);
        this.y = this.getRandomPositionY();
        this.setCollisionBox();
        this.animate();
    }

    animate() {
        setStoppableInterval(() => {
            this.playAnimation(this.IMAGES);
        }, 200);
    }
}