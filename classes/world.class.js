class World {
    character = new Character();
    level;
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
        this.gameOverScreen = new GameOver();
        this.level = getNewLevel1();
        this.draw();
        this.setWorld();
        this.run();
    }

    run() {
        setStoppableInterval(() => {
            this.checkCollisions();
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
            endboss.setStatus('alerting');
            setTimeout(() => { endboss.moveLeftAttackRight() }, 2000);
        }
    }

    checkCollisions() {
        this.checkItemCollisions();
        this.checkEnemyCollisions();
        this.level.enemies = this.level.enemies.filter((enemy) => !enemy.deleteMe);
        this.throwableObjects = this.throwableObjects.filter((bottle) => !bottle.deleteMe);
        this.level.items = this.level.items.filter((item) => !item.deleteMe);
    }

    checkItemCollisions() {
        this.level.items.forEach((item) => {
            if (this.character.isColliding(item)) {
                this.character.pickUp(item);
            }
        });
    }

    checkEnemyCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isCollidingTop(enemy) && this.character.speedY <= 0 && this.character.isAboveGround() && !(enemy.isDead()) && !(enemy instanceof Endboss)) {
                enemy.hit();
                this.character.jump(10);
            } else if (this.character.isColliding(enemy) && !(enemy.isDead())) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy / this.character.maxEnergy * 100);
            };
            this.checkBottleHitsEnemy(enemy);

            this.enemyIsDying(enemy);
        });
    }

    checkBottleHitsEnemy(enemy) {
        this.throwableObjects.forEach((bottle) => {
            if (enemy.isColliding(bottle) && !bottle.destroyed) {
                enemy.hit(this.statusBarEndboss);
                bottle.destroy();
            }
            if (!bottle.isAboveGround()) {
                bottle.destroy();
            }
        });
    }

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

    youWon() {
        this.statusBarEndboss = null;
        let wonScreen = document.getElementById('won');
        wonScreen.classList.remove('d_none');
        let btnStart = document.getElementById('btnStartGame');
        btnStart.classList.remove("d_none");
        let btnMenu = document.getElementById('btnMenu');
        btnMenu.classList.add("d_none");
        btnStart.innerHTML = "Try again!";
    }

    setWorld() {
        this.character.world = this;
    }

    draw() {
        this.drawEnvironment();
        this.drawStatusBars();
        this.drawMovables();

        if (this.gameOver) {
            this.gameOverScreen.draw(this.ctx);
        }

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    drawMovables() {
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.enemies);
        this.addToMap(this.character);
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.items);
        this.ctx.translate(-this.camera_x, 0);
    }

    drawStatusBars() {
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBar);
        this.addToMap(this.statusBarSecondary);
        if (this.statusBarEndboss) {
            this.addToMap(this.statusBarEndboss);
        }
    }

    drawEnvironment() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
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
        //mo.drawFrame(this.ctx);

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
