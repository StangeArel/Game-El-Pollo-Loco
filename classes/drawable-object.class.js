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

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawFrame(ctx) {
        if (this instanceof MovableObject) {
            ctx.beginPath();
            ctx.lineWidth = '2';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y + (this.height - this.collisionBox.height), this.collisionBox.width, this.collisionBox.height);
            ctx.stroke();
        }
    }

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    isColliding(mo) {
        return this.x + this.collisionBox.width > mo.x &&
            this.y + (this.height - this.collisionBox.height) + this.collisionBox.height > mo.y + (mo.height - mo.collisionBox.height) &&
            this.x < mo.x + mo.collisionBox.width &&
            this.y + (this.height - this.collisionBox.height) < mo.y + (mo.height - mo.collisionBox.height) + mo.collisionBox.height;
    }

    isCollidingTop(mo) {
        return this.x + this.collisionBox.width > mo.x &&
            this.y + (this.height - this.collisionBox.height) + this.collisionBox.height > mo.y + (mo.height - mo.collisionBox.height) &&
            this.x < mo.x + mo.collisionBox.width &&
            this.y + (this.height - this.collisionBox.height) < mo.y + (mo.height - mo.collisionBox.height) + mo.collisionBox.height &&
            this.y + (this.height - this.collisionBox.height) + this.collisionBox.height < mo.y + (mo.height - mo.collisionBox.height) + mo.collisionBox.height;
    }

    playAnimation(images) {
        if (this.previousImages != images) {
            this.previousImages = images;
            this.currentImage = 0;
        }
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    playAnimationOnce(images, fn) {
        if (this.previousImages != images) {
            this.previousImages = images;
            this.currentImage = 0;
        }

        if (this.currentImage < images.length) {
            let i = this.currentImage % images.length;
            let path = images[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        } else if (typeof fn === 'function') {
            fn();
        }
    }
}