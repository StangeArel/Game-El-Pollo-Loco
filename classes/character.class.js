class Character extends MovableObject {
    height = 250;
    y = 50;
    speed = 10;
    maxEnergy = 100;
    energy = this.maxEnergy;

    IMAGES_WALKING = [
        './img/2_character_pepe/2_walk/W-21.png',
        './img/2_character_pepe/2_walk/W-22.png',
        './img/2_character_pepe/2_walk/W-23.png',
        './img/2_character_pepe/2_walk/W-24.png',
        './img/2_character_pepe/2_walk/W-25.png',
        './img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING = [
        './img/2_character_pepe/3_jump/J-31.png',
        './img/2_character_pepe/3_jump/J-32.png',
        './img/2_character_pepe/3_jump/J-33.png',
        './img/2_character_pepe/3_jump/J-34.png',
        './img/2_character_pepe/3_jump/J-35.png',
        './img/2_character_pepe/3_jump/J-36.png',
        './img/2_character_pepe/3_jump/J-37.png',
        './img/2_character_pepe/3_jump/J-38.png',
        './img/2_character_pepe/3_jump/J-39.png'
    ]

    IMAGES_DEAD = [
        './img/2_character_pepe/5_dead/D-51.png',
        './img/2_character_pepe/5_dead/D-52.png',
        './img/2_character_pepe/5_dead/D-53.png',
        './img/2_character_pepe/5_dead/D-54.png',
        './img/2_character_pepe/5_dead/D-55.png',
        './img/2_character_pepe/5_dead/D-56.png',
        './img/2_character_pepe/5_dead/D-57.png'
    ]

    IMAGES_HURT = [
        './img/2_character_pepe/4_hurt/H-41.png',
        './img/2_character_pepe/4_hurt/H-42.png',
        './img/2_character_pepe/4_hurt/H-43.png'
    ]

    IMAGES_IDLE = [
        './img/2_character_pepe/1_idle/idle/I-1.png',
        './img/2_character_pepe/1_idle/idle/I-2.png',
        './img/2_character_pepe/1_idle/idle/I-3.png',
        './img/2_character_pepe/1_idle/idle/I-4.png',
        './img/2_character_pepe/1_idle/idle/I-5.png',
        './img/2_character_pepe/1_idle/idle/I-6.png',
        './img/2_character_pepe/1_idle/idle/I-7.png',
        './img/2_character_pepe/1_idle/idle/I-8.png',
        './img/2_character_pepe/1_idle/idle/I-9.png',
        './img/2_character_pepe/1_idle/idle/I-10.png'
    ]

    IMAGES_LONG_IDLE = [
        './img/2_character_pepe/1_idle/long_idle/I-11.png',
        './img/2_character_pepe/1_idle/long_idle/I-12.png',
        './img/2_character_pepe/1_idle/long_idle/I-13.png',
        './img/2_character_pepe/1_idle/long_idle/I-14.png',
        './img/2_character_pepe/1_idle/long_idle/I-15.png',
        './img/2_character_pepe/1_idle/long_idle/I-16.png',
        './img/2_character_pepe/1_idle/long_idle/I-17.png',
        './img/2_character_pepe/1_idle/long_idle/I-18.png',
        './img/2_character_pepe/1_idle/long_idle/I-19.png',
        './img/2_character_pepe/1_idle/long_idle/I-20.png'
    ]

    world;
    maxAvailableBottles = 10;
    currentAvailableBottles = this.maxAvailableBottles;

    constructor() {
        super().loadImage('./img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.applyGravity(); // Gravitation
        this.setCollisionBox();
        this.animate();
    }

    setCollisionBox() {
        this.collisionBox.width = 80;
        this.collisionBox.height = 150;
    }

    isAtLevelEnd() {
        return this.x >= this.world.level.level_end_x && this.x <= this.world.level.level_end_x + this.speed;
    }

    isAtLevelEndTrap() {
        return this.levelEndReached && this.x > this.world.level.level_end_x - 100;
    }

    animate() {
        setStoppableInterval(() => {
            if (this.world.keyboard.SPACE) {
                this.throwBottle();
            }

            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.moveRight();
                this.otherDirection = false;
            }

            if (this.world.keyboard.LEFT) {
                if ((this.x > 0 && !this.levelEndReached) || this.isAtLevelEndTrap()) {
                    this.moveLeft();
                    this.otherDirection = true;
                }
            }

            if (this.world.keyboard.UP && !this.isAboveGround()) {
                this.jump();
            }

            if (this.isAtLevelEnd() || this.levelEndReached) {
                this.levelEndReached = true;
                this.world.camera_x = -this.world.level.level_end_x + 100;
            } else {
                this.world.camera_x = -this.x + 100;
            }
        }, 1000 / 60);

        setStoppableInterval(() => {
            if (this.isDead()) {
                let self = this;
                sounds.play('characterDying');
                this.playAnimationOnce(this.IMAGES_DEAD, function () {
                    stopAllIntervals();
                    self.world.gameOver = true;
                    let btnStart = document.getElementById('btnStartGame');
                    btnStart.classList.remove("d_none");
                    let btnMenu = document.getElementById('btnMenu');
                    btnMenu.classList.add("d_none");
                    btnStart.innerHTML = "Try again!";
                });
                this.longIdle = false;
                clearInterval(this.longIdleTimer);
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
                sounds.play('characterHurt');
                this.resetLongIdle();
            } else if (this.isAboveGround()) {
                sounds.play('jump');
                this.playAnimation(this.IMAGES_JUMPING);
                this.resetLongIdle();
            } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                sounds.play('walking');
                this.playAnimation(this.IMAGES_WALKING);
                this.resetLongIdle();
            } else if (this.longIdle) {
                sounds.play('snoring');
                this.playAnimation(this.IMAGES_LONG_IDLE);
            } else {
                this.playAnimation(this.IMAGES_IDLE);
                this.longIdle = false;

                if (!this.longIdleTimer) {
                    this.longIdleTimer = setTimeout(() => {
                        this.longIdle = true;
                        this.longIdleTimer = null;
                    }, 10000);
                }
            }
        }, 70);
    }

    resetLongIdle() {
        this.longIdle = false;
        clearInterval(this.longIdleTimer);
        this.longIdleTimer = null;
    }

    jump() {
        this.speedY = 30;
    }

    pickUp(item) {
        if (item instanceof Bottle) {
            sounds.play('collectBottle');
            this.currentAvailableBottles = Math.min(this.currentAvailableBottles + 1, this.maxAvailableBottles);
            this.world.statusBarSecondary.setPercentage(this.currentAvailableBottles / this.maxAvailableBottles * 100);
        }

        if (item instanceof Coin) {
            sounds.play('coin');
            this.energy = Math.min(this.energy + 5, this.maxEnergy);
            this.world.statusBar.setPercentage(this.energy / this.maxEnergy * 100);
        }

        item.deleteMe = true;
    }

    throwBottle() {
        if (this.currentAvailableBottles > 0 && !this.throwing) {
            this.throwing = true;
            this.resetLongIdle();
            let bottle = new ThrowableObject(this.x + 50, this.y + 100, this.otherDirection);
            this.world.throwableObjects.push(bottle);
            this.currentAvailableBottles = Math.max(this.currentAvailableBottles - 1, 0);
            let bottlePercentage = this.getAvailableBottlePercentage();
            this.world.statusBarSecondary.setPercentage(bottlePercentage);

            setTimeout(() => {
                this.throwing = false;
            }, 500);
        }
    }

    getAvailableBottlePercentage() {
        return Math.min(this.currentAvailableBottles / this.maxAvailableBottles * 100.0, 100)
    }
}