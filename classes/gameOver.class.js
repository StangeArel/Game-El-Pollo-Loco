/**
 * Represents the "Game Over" screen that is displayed when the player loses.
 * 
 * Inherits from {@link DrawableObject}.
 */
class GameOver extends DrawableObject {

    /** @type {number} X position on the canvas */
    x = 0;

    /** @type {number} Y position on the canvas */
    y = 0;

    /** @type {number} Width of the Game Over image */
    width = 720;

    /** @type {number} Height of the Game Over image */
    height = 480;

    /**
     * Creates a new GameOver screen and loads the corresponding image.
     */
    constructor() {
        super().loadImage('./img/9_intro_outro_screens/game_over/game over!.png');
    }
}
