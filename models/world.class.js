class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    statusBarSecondary = new StatusBarSecondary();
    throwableObjects = [];

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkEndboss();    
        }, 200);
    }

    checkEndboss() {
        let endboss;

        this.level.enemies.forEach((enemy) => {
            if (enemy instanceof Endboss) {
                endboss = enemy;
            }
        })

        if (this.character.isAtLevelEnd() && endboss && !this.endBossStarted) {
            this.endBossStarted = true;
            this.statusBarEndboss = new StatusBarEndboss();

            setTimeout(() => {endboss.moveLeftAttackRight()}, 2000);
        }
    }

    checkThrowObjects() {
        if (this.keyboard.SPACE) {
            this.character.throwBottle();
        }
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && !(enemy.isDead())) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy / this.character.maxEnergy * 100);
            };

            this.throwableObjects.forEach((bottle) => {
                if (enemy.isColliding(bottle) && !bottle.destroyed) {
                    enemy.hit(this.statusBarEndboss);
                    bottle.destroy();
                }
                if (!bottle.isAboveGround()) {
                    bottle.destroy();
                }
            })

            if (enemy.isDead() && !this.deadTimer) {
                this.deadTimer = setTimeout(() => {
                    enemy.deleteMe = true;
                    if (this.statusBarEndboss) {
                        this.statusBarEndboss = null;
                    }
                }, 1500);
            }
        });

        this.level.enemies = this.level.enemies.filter((enemy) => !enemy.deleteMe);
        this.throwableObjects = this.throwableObjects.filter((bottle) => !bottle.deleteMe);
    }

    setWorld() {
        this.character.world = this;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);

        // Space for fixed object
        this.ctx.translate(-this.camera_x, 0); // Back
        this.addToMap(this.statusBar);
        this.addToMap(this.statusBarSecondary);
        if (this.statusBarEndboss) {
            this.addToMap(this.statusBarEndboss);
        }
        this.ctx.translate(this.camera_x, 0); // Forwards 


        this.addToMap(this.character);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);

        this.ctx.translate(-this.camera_x, 0);

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);
/*         mo.drawFrame(this.ctx);
 */
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}
