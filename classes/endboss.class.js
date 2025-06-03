/**
 * Represents the endboss enemy in the game.
 * The endboss has multiple states and animations, and follows a movement and attack pattern.
 * 
 * Inherits from {@link MovableObject}.
 */
class Endboss extends MovableObject {

    /** @type {number} Height of the endboss sprite */
    height = 400;

    /** @type {number} Width of the endboss sprite */
    width = 250;

    /** @type {number} Y position on the screen */
    y = 55;

    /** @type {number} Maximum energy of the endboss */
    maxEnergy = 30;

    /** @type {number} Current energy level of the endboss */
    energy = this.maxEnergy;

    /** @type {number} Movement speed of the endboss */
    speed = 5;

    /**
     * An object representing the endboss's current state.
     * Only one state at a time is active (value = 1).
     */
    statuses = {
        movingLeft: 0,
        movingRight: 0,
        attacking: 0,
        alerting: 0,
        hurt: 0,
        dead: 0,
        waiting: 1
    };

    /** @type {string[]} Animation frames for alerting state */
    IMAGES_ALERT = [
        './img/4_enemie_boss_chicken/2_alert/G5.png',
        './img/4_enemie_boss_chicken/2_alert/G6.png',
        './img/4_enemie_boss_chicken/2_alert/G7.png',
        './img/4_enemie_boss_chicken/2_alert/G8.png',
        './img/4_enemie_boss_chicken/2_alert/G9.png',
        './img/4_enemie_boss_chicken/2_alert/G10.png',
        './img/4_enemie_boss_chicken/2_alert/G11.png',
        './img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    /** @type {string[]} Animation frames for walking */
    IMAGES_WALKING = [
        './img/4_enemie_boss_chicken/1_walk/G1.png',
        './img/4_enemie_boss_chicken/1_walk/G2.png',
        './img/4_enemie_boss_chicken/1_walk/G3.png',
        './img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    /** @type {string[]} Animation frames for attacking */
    IMAGES_ATTACK = [
        './img/4_enemie_boss_chicken/3_attack/G13.png',
        './img/4_enemie_boss_chicken/3_attack/G14.png',
        './img/4_enemie_boss_chicken/3_attack/G15.png',
        './img/4_enemie_boss_chicken/3_attack/G16.png',
        './img/4_enemie_boss_chicken/3_attack/G17.png',
        './img/4_enemie_boss_chicken/3_attack/G18.png',
        './img/4_enemie_boss_chicken/3_attack/G19.png',
        './img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    /** @type {string[]} Animation frames for hurt state */
    IMAGES_HURT = [
        './img/4_enemie_boss_chicken/4_hurt/G21.png',
        './img/4_enemie_boss_chicken/4_hurt/G22.png',
        './img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    /** @type {string[]} Animation frames for dead state */
    IMAGES_DEAD = [
        './img/4_enemie_boss_chicken/5_dead/G24.png',
        './img/4_enemie_boss_chicken/5_dead/G25.png',
        './img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    /**
     * Creates the endboss, loads all animation images, and starts its animation loop.
     */
    constructor() {
        super().loadImage(this.IMAGES_ALERT[0]);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 2400;
        this.maxLeft = 2000;
        this.maxRight = this.x;
        this.setCollisionBox();
        this.animate();
    }

    /**
     * Applies a hit to the endboss and updates the status bar if provided.
     * 
     * @param {StatusBarEndboss} [statusBar] - Optional status bar to update.
     */
    hit(statusBar) {
        super.hit();
        this.setStatus('hurt');

        if (statusBar) {
            statusBar.setPercentage((this.energy / this.maxEnergy) * 100);
        }
    }

    /**
     * Starts the animation loop, updating based on the current state.
     */
    animate() {
        setStoppableInterval(() => {
            const status = this.getStatus();
            this.playAlertingAnimation(status);
            this.playAttackingAnimation(status);
            this.playWalkingAnimation(status);
            this.playHurtAnimation(status);
            this.playDeadAnimation(status);
        }, 200);
    }

    /** @param {string} status */
    playDeadAnimation(status) {
        if (this.isDead() || status === 'dead') {
            this.setStatus('dead');
            this.playAnimation(this.IMAGES_DEAD);
        }
    }

    /** @param {string} status */
    playHurtAnimation(status) {
        if (status === 'hurt') {
            sounds.play('endbossHurt');
            this.playAnimation(this.IMAGES_HURT);
        }
    }

    /** @param {string} status */
    playWalkingAnimation(status) {
        if (status === 'movingLeft' || status === 'movingRight') {
            this.playAnimation(this.IMAGES_WALKING);
        }
    }

    /** @param {string} status */
    playAttackingAnimation(status) {
        if (status === 'attacking') {
            sounds.play('endbossAttacking');
            this.playAnimation(this.IMAGES_ATTACK);
        }
    }

    /** @param {string} status */
    playAlertingAnimation(status) {
        if (status === 'alerting') {
            sounds.play('endbossAlerting');
            this.playAnimation(this.IMAGES_ALERT);
        }
    }

    /**
     * Sets the current status and resets all other statuses to 0.
     * 
     * @param {string} status - The status key to activate.
     */
    setStatus(status) {
        Object.keys(this.statuses).forEach(key => {
            this.statuses[key] = 0;
        });
        this.statuses[status] = 1;
    }

    /**
     * Retrieves the currently active status.
     * 
     * @returns {string} The key of the current status.
     */
    getStatus() {
        return Object.keys(this.statuses).find(key => this.statuses[key] === 1);
    }

    /**
     * Checks if the boss has reached the left patrol boundary.
     * 
     * @returns {boolean}
     */
    isAtMaxLeft() {
        return this.x <= this.maxLeft && this.x >= this.maxLeft - this.speed;
    }

    /**
     * Checks if the boss has reached the right patrol boundary.
     * 
     * @returns {boolean}
     */
    isAtMaxRight() {
        return this.x >= this.maxRight && this.x <= this.maxRight + this.speed;
    }

    /**
     * Returns a random time between 700ms and 3700ms.
     * 
     * @returns {number}
     */
    getRandomTime() {
        return Math.random() * 3000 + 700;
    }

    /**
     * Begins the left-to-right patrol and attack loop.
     */
    moveLeftAttackRight() {
        if (this.isDead()) return;

        this.moveLeftInterval = setStoppableInterval(() => {
            if (this.x > this.maxLeft) {
                this.moveLeft();
                this.setStatus('movingLeft');
            }

            if (this.isAtMaxLeft()) {
                this.attackAndMoveRight();
            }
        }, 1000 / 60);
    }

    /**
     * Initiates attack phase and prepares to move right after a delay.
     */
    attackAndMoveRight() {
        const attackTime = this.getRandomTime();

        if (!this.attackTimer) {
            this.setStatus('attacking');
            this.attackTimer = setTimeout(() => {
                this.moveRightInterval = setStoppableInterval(() => {
                    this.moveRightAfterAttack();
                }, 1000 / 60);
            }, attackTime);
        }

        clearInterval(this.moveLeftInterval);
    }

    /**
     * Moves the endboss to the right and resets state once the max position is reached.
     */
    moveRightAfterAttack() {
        if (this.x < this.maxRight) {
            this.moveRight();
            this.setStatus('movingRight');
        }

        if (this.isAtMaxRight()) {
            clearInterval(this.moveRightInterval);
            clearTimeout(this.attackTimer);
            this.attackTimer = null;

            this.setStatus('alerting');
            setTimeout(() => {
                this.moveLeftAttackRight();
            }, this.getRandomTime());
        }
    }
}
