/**
 * Represents a game object that can move, jump, take damage, and be affected by gravity.
 * 
 * Inherits from {@link DrawableObject}.
 */
class MovableObject extends DrawableObject {

    /** @type {number} Horizontal movement speed */
    speed = 0.15;

    /** @type {boolean} Whether the object is facing left (true) or right (false) */
    otherDirection = false;

    /** @type {number} Vertical speed (used for jumping/falling) */
    speedY = 0;

    /** @type {number} Gravity acceleration affecting vertical movement */
    acceleration = 1.5;

    /** @type {number} Current energy/health level (0–100) */
    energy = 100;

    /** @type {number} Timestamp (ms) of the last hit received */
    lastHit = 0;

    /**
     * Applies gravity to the object by continuously updating its vertical position and speed.
     * Will only act if the object is above the ground or moving upward.
     */
    applyGravity() {
        this.gravity = setStoppableInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    /**
     * Checks if the object is above the ground (y < 180).
     * 
     * @returns {boolean} True if the object is in the air, otherwise false.
     */
    isAboveGround() {
        return this.y < 180;
    }

    /**
     * Reduces the object's energy by 5 and updates the last hit time.
     * Ensures energy does not go below 0.
     */
    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Checks if the object was recently hit (within the last second).
     * 
     * @returns {boolean} True if the object is currently hurt, otherwise false.
     */
    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 1000;
        return timePassed < 1;
    }

    /**
     * Checks whether the object is dead (energy is 0 or below).
     * 
     * @returns {boolean} True if the object has no energy left.
     */
    isDead() {
        return this.energy <= 0;
    }

    /**
     * Moves the object to the right by increasing its x position.
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * Moves the object to the left by decreasing its x position.
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Makes the object jump by setting an upward vertical speed.
     */
    jump() {
        this.speedY = 30;
    }
}
