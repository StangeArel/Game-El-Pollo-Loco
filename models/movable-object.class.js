class MovableObject {
    x = 120;
    y = 280;
    img;
    height = 150;
    width = 100;
    imageCache = [];

    // loadImage('img/test.png')
    loadImage(path) {
        this.img = new Image();  // this.img = document.getElementById('image') <img ig="image" src>
        this.img.src = path;
        /*         this.img.onload = () => {
                    console.log(`Bild geladen: ${path}`)
                } */
    }

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache.push(img);
        });
    }

    moveRight() {
        console.log('Moving right')
    }

    moveLeft() {
        console.log('Moving left')
    }
}