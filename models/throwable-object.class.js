class ThrowableObject extends MovableObject {

    constructor(x, y) {
        super().loadImage('../img/7_statusbars/3_icons/icon_salsa_bottle.png');
        this.x = x;
        this.y = y;
        this.height = 100;
        this.width = 60;
        this.trow();
    }

    trow() {
        this.speedY = 10;
        this.applyGravity();
        setInterval(() => {
            this.x += 5;
        }, 25);
    }
}