class ThrowableObject extends MovableObject {

    IMAGES_ROTATING = [
        './img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ]

    IMAGES_SPLASH = [
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ]

    constructor(x, y, otherDirection) {
        super().loadImage('./img/7_statusbars/3_icons/icon_salsa_bottle.png');
        this.loadImages(this.IMAGES_ROTATING);
        this.loadImages(this.IMAGES_SPLASH);
        this.x = x;
        this.y = y;
        this.otherDirection = otherDirection;
        this.height = 100;
        this.width = 100;
        this.setCollisionBox();
        this.throw();
    }

    setCollisionBox() {
        this.collisionBox.width = 80;
        this.collisionBox.height = 80;
    }

    stop() {
        this.speedX = 0;
        this.speedY = 0;
        clearInterval(this.rotateAnimation);
        clearInterval(this.gravity);
    }

    destroy() {
        this.stop();
        this.destroyed = true;
        sounds.play('bottleBreak');
        if (!this.splashAnimation) {
            let self = this;
            this.splashAnimation = setStoppableInterval(() => {
                this.playAnimationOnce(this.IMAGES_SPLASH, function () {
                    self.deleteMe = true;
                });
            }, 70);
        }
    }

    isAboveGround() {
        return this.y < 350;
    }

    throw() {
        sounds.play('throw');
        this.speedY = 20;
        this.speedX = 5;
        if (this.otherDirection) {
            this.speedX *= -1;
        }
        this.applyGravity();
        setStoppableInterval(() => {
            this.x += this.speedX;
        }, 25);
        this.rotateAnimation = setStoppableInterval(() => {
            this.playAnimation(this.IMAGES_ROTATING);
        }, 70);
    }
}