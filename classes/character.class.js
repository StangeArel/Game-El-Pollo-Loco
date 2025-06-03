/**
 * Represents the main character of the game.
 * Extends the MovableObject class with abilities like walking, jumping, throwing bottles, etc.
 */
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

    /**
     * Constructs the character, loads images, and initializes movement and gravity.
     */
    constructor() {
        super().loadImage('./img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.applyGravity();
        this.setCollisionBox();
        this.animate();
    }

    /**
     * Defines the size of the collision box for the character.
     */
    setCollisionBox() {
        this.collisionBox.width = 80;
        this.collisionBox.height = 150;
    }

    /**
     * Determines if the character has reached the end of the level.
     * @returns {boolean} True if at level end, false otherwise.
     */
    isAtLevelEnd() {
        return this.x >= this.world.level.level_end_x && this.x <= this.world.level.level_end_x + this.speed;
    }

    /**
     * Starts keyboard and animation update intervals.
     */
    animate() {
        this.setKeyboardInterval();
        this.setAnimationInterval();
    }

    /**
     * Sets interval for updating the character's animation state.
     */
    setAnimationInterval() {
        setStoppableInterval(() => {
            if (this.isDead()) {
                this.deadAnimation();
            } else if (this.isHurt()) {
                this.playAnimationAndSound(this.IMAGES_HURT, 'characterHurt', true);
            } else if (this.isAboveGround()) {
                this.playAnimationAndSound(this.IMAGES_JUMPING, 'jump', true);
            } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimationAndSound(this.IMAGES_WALKING, 'walking', true);
            } else if (this.longIdle) {
                this.playAnimationAndSound(this.IMAGES_LONG_IDLE, 'snoring', false);
            } else {
                this.playAnimation(this.IMAGES_IDLE);
                this.longIdle = false;
                this.setLongIdleTimer();
            }
        }, 70);
    }

    /**
     * Sets a timer to trigger long idle animation after inactivity.
     */
    setLongIdleTimer() {
        if (!this.longIdleTimer) {
            this.longIdleTimer = setTimeout(() => {
                this.longIdle = true;
                this.longIdleTimer = null;
            }, 10000);
        }
    }

    /**
     * Plays an animation and its corresponding sound.
     * Optionally resets the long idle timer.
     * @param {string[]} animation - List of image paths for animation.
     * @param {string} soundName - Sound to play.
     * @param {boolean} resetLongIdle - Whether to reset the long idle state.
     */
    playAnimationAndSound(animation, soundName, resetLongIdle) {
        this.playAnimation(animation);
        sounds.play(soundName);

        if (resetLongIdle) {
            this.resetLongIdle();
        }
    }

    /**
     * Plays the death animation and stops all intervals.
     */
    deadAnimation() {
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
    }

    /**
     * Sets an interval to check for keyboard input.
     */
    setKeyboardInterval() {
        setStoppableInterval(() => {
            this.spaceKeyHit();
            this.rightKeyHit();
            this.leftKeyHit();
            this.upKeyHit();
            this.moveCameraRight();
        }, 1000 / 60);
    }

    /**
     * Moves the camera relative to the character's position.
     */
    moveCameraRight() {
        this.world.camera_x = -this.x + 100;
    }

    /**
     * Handles upward movement when UP key is pressed.
     */
    upKeyHit() {
        if (this.world.keyboard.UP && !this.isAboveGround()) {
            this.jump();
        }
    }

    /**
     * Handles movement to the left when LEFT key is pressed.
     */
    leftKeyHit() {
        if (this.world.keyboard.LEFT) {
            if (this.x > 0) {
                this.moveLeft();
                this.otherDirection = true;
            }
        }
    }

    /**
     * Handles movement to the right when RIGHT key is pressed.
     */
    rightKeyHit() {
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.moveRight();
            this.otherDirection = false;
        }
    }

    /**
     * Handles the throwing of bottles when SPACE key is pressed.
     */
    spaceKeyHit() {
        if (this.world.keyboard.SPACE) {
            this.throwBottle();
        }
    }

    /**
     * Resets long idle state and clears the timer.
     */
    resetLongIdle() {
        this.longIdle = false;
        clearInterval(this.longIdleTimer);
        this.longIdleTimer = null;
    }

    /**
     * Makes the character jump with optional custom speed.
     * @param {number} [adjustedSpeed] - Optional speed value for jump.
     */
    jump(adjustedSpeed) {
        this.speedY = adjustedSpeed != undefined ? adjustedSpeed : 20;
    }

    /**
     * Handles pickup of items like bottles and coins.
     * @param {Object} item - The item to be picked up.
     */
    pickUp(item) {
        this.pickUpBottle(item);
        this.pickUpCoin(item);
        item.deleteMe = true;
    }

    /**
     * Handles logic when collecting a coin.
     * @param {Coin} item - The coin object.
     */
    pickUpCoin(item) {
        if (item instanceof Coin) {
            sounds.play('coin');
            this.energy = Math.min(this.energy + 5, this.maxEnergy);
            this.world.statusBar.setPercentage(this.energy / this.maxEnergy * 100);
        }
    }

    /**
     * Handles logic when collecting a bottle.
     * @param {Bottle} item - The bottle object.
     */
    pickUpBottle(item) {
        if (item instanceof Bottle) {
            sounds.play('collectBottle');
            this.currentAvailableBottles = Math.min(this.currentAvailableBottles + 1, this.maxAvailableBottles);
            this.world.statusBarSecondary.setPercentage(this.currentAvailableBottles / this.maxAvailableBottles * 100);
        }
    }

    /**
     * Throws a bottle if available, updates the UI and disables further throws for a short time.
     */
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

    /**
     * Returns the percentage of bottles available relative to the maximum.
     * @returns {number} Percentage value between 0 and 100.
     */
    getAvailableBottlePercentage() {
        return Math.min(this.currentAvailableBottles / this.maxAvailableBottles * 100.0, 100);
    }
}
