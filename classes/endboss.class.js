class Endboss extends MovableObject {
    height = 400;
    width = 250;
    y = 55;
    maxEnergy = 30;
    energy = this.maxEnergy;
    speed = 5;

    statuses = {
        movingLeft: 0,
        movingRight: 0,
        attacking: 0,
        alerting: 0,
        hurt: 0,
        dead: 0,
        waiting: 1
    }

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

    IMAGES_WALKING = [
        './img/4_enemie_boss_chicken/1_walk/G1.png',
        './img/4_enemie_boss_chicken/1_walk/G2.png',
        './img/4_enemie_boss_chicken/1_walk/G3.png',
        './img/4_enemie_boss_chicken/1_walk/G4.png'
    ]

    IMAGES_ATTACK = [
        './img/4_enemie_boss_chicken/3_attack/G13.png',
        './img/4_enemie_boss_chicken/3_attack/G14.png',
        './img/4_enemie_boss_chicken/3_attack/G15.png',
        './img/4_enemie_boss_chicken/3_attack/G16.png',
        './img/4_enemie_boss_chicken/3_attack/G17.png',
        './img/4_enemie_boss_chicken/3_attack/G18.png',
        './img/4_enemie_boss_chicken/3_attack/G19.png',
        './img/4_enemie_boss_chicken/3_attack/G20.png'
    ]

    IMAGES_HURT = [
        './img/4_enemie_boss_chicken/4_hurt/G21.png',
        './img/4_enemie_boss_chicken/4_hurt/G22.png',
        './img/4_enemie_boss_chicken/4_hurt/G23.png'
    ]

    IMAGES_DEAD = [
        './img/4_enemie_boss_chicken/5_dead/G24.png',
        './img/4_enemie_boss_chicken/5_dead/G25.png',
        './img/4_enemie_boss_chicken/5_dead/G26.png'
    ]

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

    hit(statusBar) {
        super.hit();
        this.setStatus('hurt');

        if (statusBar) {
            statusBar.setPercentage(this.energy / this.maxEnergy * 100);
        }
    }

    animate() {
        setStoppableInterval(() => {
            let status = this.getStatus();

            this.playAlertingAnimation(status);

            this.playAttackingAnimation(status);

            this.playWalkingAnimation(status);

            this.playHurtAnimation(status);

            this.playDeadAnimation(status);
        }, 200);
    }

    playDeadAnimation(status) {
        if (this.isDead() || status == 'dead') {
            this.setStatus('dead');
            this.playAnimation(this.IMAGES_DEAD);
        }
    }

    playHurtAnimation(status) {
        if (status == 'hurt') {
            sounds.play('endbossHurt');
            this.playAnimation(this.IMAGES_HURT);
        }
    }

    playWalkingAnimation(status) {
        if (status == 'movingLeft' || status == 'movingRight') {
            this.playAnimation(this.IMAGES_WALKING);
        }
    }

    playAttackingAnimation(status) {
        if (status == 'attacking') {
            sounds.play('endbossAttacking');
            this.playAnimation(this.IMAGES_ATTACK);
        }
    }

    playAlertingAnimation(status) {
        if (status == 'alerting') {
            sounds.play('endbossAlerting');
            this.playAnimation(this.IMAGES_ALERT);
        }
    }

    setStatus(status) {
        Object.keys(this.statuses).forEach(key => {
            this.statuses[key] = 0;
        });
        this.statuses[status] = 1;
    }

    getStatus() {
        let status;

        Object.keys(this.statuses).forEach(key => {
            if (this.statuses[key] == 1) {
                status = key;
            }
        });

        return status;
    }

    isAtMaxLeft() {
        return this.x <= this.maxLeft && this.x >= this.maxLeft - this.speed;
    }

    isAtMaxRight() {
        return this.x >= this.maxRight && this.x <= this.maxRight + this.speed;
    }

    getRandomTime() {
        return Math.random() * 3000.0 + 700.0;
    }

    moveLeftAttackRight() {
        if (this.isDead()) {
            return
        }

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

    attackAndMoveRight() {
        let attackTime = this.getRandomTime();

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