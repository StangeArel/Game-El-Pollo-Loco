/**
 * Creates a new level instance with predefined enemies, clouds, background objects, and items.
 * 
 * @returns {Level} A new level object.
 */
function getNewLevel1() {
    return new Level(
        generateEnemies(7, 5, 1),
        [new Cloud()],
        getBackgroundObjects(),
        generateItems(9, 11)
    );
}

/**
 * Generates an array of background objects arranged in layers for parallax scrolling.
 * 
 * @returns {BackgroundObject[]} Array of background objects with positions and layer images.
 */
function getBackgroundObjects() {
    let backgroundObjects = [];
    for (let i = -1; i <= 3; i++) {
        let pictureName = Math.abs(i) % 2 + 1;

        backgroundObjects.push(new BackgroundObject('./img/5_background/layers/air.png', 719 * i));
        backgroundObjects.push(new BackgroundObject(`./img/5_background/layers/3_third_layer/${pictureName}.png`, 719 * i));
        backgroundObjects.push(new BackgroundObject(`./img/5_background/layers/2_second_layer/${pictureName}.png`, 719 * i));
        backgroundObjects.push(new BackgroundObject(`./img/5_background/layers/1_first_layer/${pictureName}.png`, 719 * i));
    }
    return backgroundObjects;
}

/**
 * Generates an array of enemies including normal chickens, small chickens, and endbosses.
 * 
 * @param {number} normal - Number of normal chicken enemies to generate.
 * @param {number} small - Number of small chicken enemies to generate.
 * @param {number} endboss - Number of endboss enemies to generate.
 * @returns {(Chicken|ChickenSmall|Endboss)[]} Array of enemy objects.
 */
function generateEnemies(normal, small, endboss) {
    let enemiesArray = [];
    for (let i = 0; i < normal; i++)
        enemiesArray.push(new Chicken());
    for (let i = 0; i < small; i++)
        enemiesArray.push(new ChickenSmall());
    for (let i = 0; i < endboss; i++)
        enemiesArray.push(new Endboss());
    return enemiesArray;
}

/**
 * Generates an array of collectible items including bottles and coins.
 * 
 * @param {number} bottles - Number of bottle items to generate.
 * @param {number} coins - Number of coin items to generate.
 * @returns {(Bottle|Coin)[]} Array of item objects.
 */
function generateItems(bottles, coins) {
    let itemsArray = [];
    for (let i = 0; i < bottles; i++)
        itemsArray.push(new Bottle());
    for (let i = 0; i < coins; i++)
        itemsArray.push(new Coin());
    return itemsArray;
}
