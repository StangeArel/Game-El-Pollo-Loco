class DrawableObject {
    height = 150;
    width = 100;
    x = 120;
    y = 280;
    img;
    imageCache = {};
    currentImage = 0;

    collisionBox = {};

    setCollisionBox() {
        this.collisionBox.width = this.width;
        this.collisionBox.height = this.height;
    }

    // loadImage('img/test.png')
    loadImage(path) {
        this.img = new Image();  // this.img = document.getElementById('image') <img ig="image" src>
        this.img.src = path;
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Item) {
            ctx.beginPath();
            ctx.lineWidth = '2';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y+(this.height-this.collisionBox.height), this.collisionBox.width, this.collisionBox.height);
            ctx.stroke();
        }
    } 

    /**
 * 
 * @param {Array} arr - ['img/image1.png', 'img/image2.png', ...] 
 */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    isColliding(mo) {
        return this.x + this.collisionBox.width > mo.x &&
            this.y+(this.height-this.collisionBox.height) + this.collisionBox.height > mo.y+(mo.height-mo.collisionBox.height) &&
            this.x < mo.x &&
            this.y+(this.height-this.collisionBox.height) < mo.y+(mo.height-mo.collisionBox.height) + mo.collisionBox.height;
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    playAnimationOnce(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }
}