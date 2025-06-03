/**
 * Represents the main game world.
 */
class World {
    /** @type {Character} The player's character */
    character = new Character();

    /** @type {Level} The current level */
    level;

    /** @type {HTMLCanvasElement} The canvas element */
    canvas;

    /** @type {CanvasRenderingContext2D} The 2D rendering context */
    ctx;

    /** @type {KeyBoard} The keyboard input handler */
    keyboard;

    /** @type {number} The camera's x offset */
    camera_x = 0;

    /** @type {StatusBar} Displays the player's health */
    statusBar = new StatusBar();

    /** @type {StatusBarSecondary} Displays secondary status info (e.g., bottles) */
    statusBarSecondary = new StatusBarSecondary();

    /** @type {StatusBarEndboss|null} Displays endboss health (if active) */
    statusBarEndboss;

    /** @type {GameOver} The game over screen */
    gameOverScreen;

    /** @type {boolean} Whether the endboss fight has started */
    endBossStarted = false;

    /** @type {boolean} Whether the game has ended */
    gameOver = false;

    /** @type {any[]} Array of throwable bottle objects */
    throwableObjects = [];

    /**
     * Creates a new game world.
     * @param {HTMLCanvasElement} canvas - The canvas to draw on.
     * @param {KeyBoard} keyboard - The keyboard handler for input.
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.gameOverScreen = new GameOver();
        this.level = getNewLevel1();
        this.draw();
        this.setWorld();
        this.run();
    }

    /**
     * Starts periodic game checks such as collisions and endboss detection.
     */
    run() {
        setStoppableInterval(() => {
            this.checkCollisions();
            this.checkEndboss();
        }, 200);
    }

    /**
     * Checks whether the endboss should be activated and starts its behavior.
     */
    checkEndboss() {
        let endboss;
        this.level.enemies.forEach((enemy) => {
            if (enemy instanceof Endboss) {
                endboss = enemy;
            }
        });
        if (this.character.isAtLevelEnd() && endboss && !this.endBossStarted) {
            this.endBossStarted = true;
            this.statusBarEndboss = new StatusBarEndboss();
            endboss.setStatus('alerting');
            setTimeout(() => { endboss.moveLeftAttackRight(); }, 2000);
        }
    }

    /**
     * Checks and handles collisions between character, items, enemies, and bottles.
     */
    checkCollisions() {
        this.checkItemCollisions();
        this.checkEnemyCollisions();
        this.level.enemies = this.level.enemies.filter(enemy => !enemy.deleteMe);
        this.throwableObjects = this.throwableObjects.filter(bottle => !bottle.deleteMe);
        this.level.items = this.level.items.filter(item => !item.deleteMe);
    }

    /**
     * Handles item collection logic.
     */
    checkItemCollisions() {
        this.level.items.forEach(item => {
            if (this.character.isColliding(item)) {
                this.character.pickUp(item);
            }
        });
    }

    /**
     * Handles character interactions with enemies, including damage and defeating enemies.
     */
    checkEnemyCollisions() {
        this.level.enemies.forEach(enemy => {
            if (
                this.character.isCollidingTop(enemy) &&
                this.character.speedY <= 0 &&
                this.character.isAboveGround() &&
                !enemy.isDead() &&
                !(enemy instanceof Endboss)
            ) {
                enemy.hit();
                this.character.jump(10);
            } else if (this.character.isColliding(enemy) && !enemy.isDead()) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy / this.character.maxEnergy * 100);
            }

            this.checkBottleHitsEnemy(enemy);
            this.enemyIsDying(enemy);
        });
    }

    /**
     * Checks if a bottle has hit an enemy and handles destruction.
     * 
     * @param {Enemy} enemy - The enemy to check collision with bottles.
     */
    checkBottleHitsEnemy(enemy) {
        this.throwableObjects.forEach(bottle => {
            if (enemy.isColliding(bottle) && !bottle.destroyed) {
                enemy.hit(this.statusBarEndboss);
                bottle.destroy();
            }
            if (!bottle.isAboveGround()) {
                bottle.destroy();
            }
        });
    }

    /**
     * Triggers enemy death animations, sound, and game win logic if needed.
     * 
     * @param {Enemy} enemy - The enemy that may be dying.
     */
    enemyIsDying(enemy) {
        if (enemy.isDead() && !enemy.deadTimer) {
            sounds.play('chickenDying');
            if (enemy instanceof Endboss) {
                sounds.play('endbossDying');
            }
            enemy.deadTimer = setTimeout(() => {
                enemy.deleteMe = true;
                if (enemy instanceof Endboss) {
                    this.youWon();
                }
            }, 1500);
        }
    }

    /**
     * Displays the "You Won" screen and resets the menu buttons.
     */
    youWon() {
        this.statusBarEndboss = null;
        let wonScreen = document.getElementById('won');
        wonScreen.classList.remove('d_none');
        let btnStart = document.getElementById('btnStartGame');
        btnStart.classList.remove('d_none');
        let btnMenu = document.getElementById('btnMenu');
        btnMenu.classList.add('d_none');
        btnStart.innerHTML = "Try again!";
    }

    /**
     * Links the character to this world instance.
     */
    setWorld() {
        this.character.world = this;
    }

    /**
     * Continuously draws the game world.
     */
    draw() {
        this.drawEnvironment();
        this.drawStatusBars();
        this.drawMovables();

        if (this.gameOver) {
            this.gameOverScreen.draw(this.ctx);
        }

        requestAnimationFrame(() => this.draw());
    }

    /**
     * Draws movable game elements such as character, enemies, items, bottles.
     */
    drawMovables() {
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.enemies);
        this.addToMap(this.character);
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.items);
        this.ctx.translate(-this.camera_x, 0);
    }

    /**
     * Draws the status bars (health, bottles, endboss if active).
     */
    drawStatusBars() {
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBar);
        this.addToMap(this.statusBarSecondary);
        if (this.statusBarEndboss) {
            this.addToMap(this.statusBarEndboss);
        }
    }

    /**
     * Draws the static environment (clouds, background).
     */
    drawEnvironment() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
    }

    /**
     * Adds multiple objects to the canvas map.
     * 
     * @param {DrawableObject[]} objects - Array of drawable game objects.
     */
    addObjectsToMap(objects) {
        objects.forEach(o => this.addToMap(o));
    }

    /**
     * Draws a single object to the canvas with optional flipping for direction.
     * 
     * @param {DrawableObject} mo - The movable or drawable object.
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);
        // mo.drawFrame(this.ctx); // Uncomment if frame drawing is needed

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    /**
     * Flips the image horizontally before drawing (e.g., for left direction).
     * 
     * @param {DrawableObject} mo - The object to flip.
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x *= -1;
    }

    /**
     * Reverses image flipping and restores the canvas context.
     * 
     * @param {DrawableObject} mo - The object to flip back.
     */
    flipImageBack(mo) {
        mo.x *= -1;
        this.ctx.restore();
    }
}
