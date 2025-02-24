class ThrowableObject extends MovableObject {

    constructor(x, y, otherDirection) {
        super().loadImage('../img/7_statusbars/3_icons/icon_salsa_bottle.png');
        this.x = x;
        this.y = y;
        this.otherDirection = otherDirection;
        this.height = 100;
        this.width = 60;
        this.trow();
    }

    trow() {
        this.speedY = 10;
        this.speedX = 5;
        if (this.otherDirection) {
            this.speedX *= -1;
        }
        this.applyGravity();
        setInterval(() => {
            this.x += this.speedX;
        }, 25);
    }
}