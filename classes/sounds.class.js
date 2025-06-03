/**
 * Manages all game sounds and their playback state.
 */
class Sounds {

    /**
     * Indicates whether sound is enabled.
     * 
     * @type {boolean}
     */
    soundEnabled = true;

    /**
     * A map of all available sound names to their corresponding Audio objects.
     * 
     * @type {Object<string, HTMLAudioElement>}
     */
    SOUNDS = {
        backgroundChicken: new Audio('./audio/backgroundChicken.mp3'),
        backgroundMusic: new Audio('./audio/backgroundMusic.mp3'),
        bottleBreak: new Audio('./audio/bottleBreak.mp3'),
        chickenDying: new Audio('./audio/chickenDying.mp3'),
        coin: new Audio('./audio/coin.mp3'),
        menuSound: new Audio('./audio/menuSound.mp3'),
        throw: new Audio('./audio/throw.mp3'),
        walking: new Audio('./audio/walking.mp3'),
        collectBottle: new Audio('./audio/collectingBottles.mp3'),
        characterDying: new Audio('./audio/characterDying.mp3'),
        characterHurt: new Audio('./audio/characterHurt.mp3'),
        jump: new Audio('./audio/jump.mp3'),
        snoring: new Audio('./audio/snoring.mp3'),
        endbossDying: new Audio('./audio/endbossDying.mp3'),
        endbossAlerting: new Audio('./audio/endbossAlerting.mp3'),
        endbossAttacking: new Audio('./audio/endbossAttacking.mp3'),
        endbossHurt: new Audio('./audio/endbossHurt.mp3')
    };

    /**
     * Enables or disables sound playback and stores the preference in localStorage.
     * 
     * @param {boolean} value - Whether sound should be enabled.
     */
    setSoundEnabled(value) {
        this.soundEnabled = value;
        localStorage.setItem('soundEnabled', value);
    }

    /**
     * Gets the current sound enabled status.
     * Will read from localStorage if available.
     * 
     * @returns {boolean} True if sound is enabled, otherwise false.
     */
    getSoundEnabled() {
        let savedSetting = JSON.parse(localStorage.getItem('soundEnabled'));
        if (savedSetting != null) {
            this.soundEnabled = savedSetting;
            return savedSetting;
        }
        return this.soundEnabled;
    }

    /**
     * Plays a named sound if sound is enabled.
     * 
     * @param {string} name - The name of the sound to play.
     * @param {boolean} [loop=false] - Whether the sound should loop.
     */
    play(name, loop) {
        if (this.getSoundEnabled()) {
            this.SOUNDS[name].play();
            this.SOUNDS[name].loop = loop;
        }
    }

    /**
     * Pauses a named sound.
     * 
     * @param {string} name - The name of the sound to pause.
     */
    pause(name) {
        this.SOUNDS[name].pause();
    }

    /**
     * Pauses all currently playing sounds.
     */
    pauseAll() {
        Object.keys(this.SOUNDS).forEach((sound) => {
            this.SOUNDS[sound].pause();
        });
    }
}
