function getNewLevel1() {
    return new Level(
        generateEnemies(7, 5, 1),

        [new Cloud()],

        getBackgroundObjects(),

        generateItems(9, 11)
    )
}

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

function generateItems(bottles, coins) {
    let itemsArray = [];
    for (let i = 0; i < bottles; i++)
        itemsArray.push(new Bottle());
    for (let i = 0; i < coins; i++)
        itemsArray.push(new Coin());
    return itemsArray;
}
