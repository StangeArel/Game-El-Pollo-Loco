class Level {
    enemies;
    clouds;
    backgroundObjects;
    items;
    level_end_x = 2000;

    constructor(enemies, clouds, backgroundObjects, items) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.items = items;
    }

    animateAll() {
        this.enemies.forEach(enemy => {
            enemy.animate();
        });

        this.items.forEach(item => {
            if (item instanceof Coin) {
                item.animate();
            }
        });
    }
}