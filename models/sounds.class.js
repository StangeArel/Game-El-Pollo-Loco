class Sounds {
    soundEnabled = true;

    SOUNDS = {
        backgroundChicken : new Audio('./audio/backgroundChicken.mp3'),
        backgroundMusic : new Audio('./audio/backgroundMusic.mp3'),
        bottleBreak : new Audio('./audio/bottleBreak.mp3'),
        chickenDying : new Audio('./audio/chickenDying.mp3'),
        coin : new Audio('./audio/coin.mp3'),
        menuSound : new Audio('./audio/menuSound.mp3'),
        throw : new Audio('./audio/throw.mp3'),
        walking : new Audio('./audio/walking.mp3')
    }

    play(name, loop) {
        if (this.soundEnabled) {
            this.SOUNDS[name].play();
            this.SOUNDS[name].loop = loop;
        }
    }

    pause(name) {
        this.SOUNDS[name].pause();
    }

    pauseAll() {
        Object.keys(this.SOUNDS).forEach((sound) => {
            this.SOUNDS[sound].pause();
        });
    }
}