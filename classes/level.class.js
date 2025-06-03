/**
 * Represents a level in the game, containing enemies, background, items, and clouds.
 */
class Level {

    /** @type {MovableObject[]} Array of enemy objects */
    enemies;

    /** @type {Cloud[]} Array of cloud objects */
    clouds;

    /** @type {BackgroundObject[]} Array of background objects for the level */
    backgroundObjects;

    /** @type {(Coin|Bottle)[]} Array of collectible items in the level */
    items;

    /**
     * X-position where the level ends (e.g., triggers endboss).
     * 
     * @type {number}
     */
    level_end_x = 2000;

    /**
     * Constructs a new level with its components.
     * 
     * @param {MovableObject[]} enemies - Enemies present in the level.
     * @param {Cloud[]} clouds - Cloud objects in the background.
     * @param {BackgroundObject[]} backgroundObjects - Layered background images.
     * @param {(Coin|Bottle)[]} items - Items such as coins and bottles.
     */
    constructor(enemies, clouds, backgroundObjects, items) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.items = items;
    }

    /**
     * Animates all animatable objects in the level, such as enemies and coins.
     */
    animateAll() {
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
