function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function bird(width,height,x,y){
    this.width=width;
    this.height=height;
    this.up=70; 
    this.speed =8;
    this.x=x;
    this.y=y;
    var that = this;
    ctx = flappy.context;
    var img = document.createElement('img');
    img.onload = function(){
        ctx.drawImage(img,that.x,that.y);
    };
    img.src = 'images/yellowbird-downflap.png';

    this.update = function(score){
        img.onload = function(){
            ctx.drawImage(img,that.x,that.y);
            ctx.font = 30+"px Arial";
            ctx.fillStyle = 'white';
            ctx.fillText(score, 60, 60);
        };
    img.src = 'images/yellowbird-downflap.png';
    }
}

function start(height,width,x,y){
    this.width=width;
    this.height=height;
    this.x=x;
    this.y=y;
    var that =this;
    ctx = flappy.context;
    img = document.createElement('img');
    img.onload = function () {
        ctx.drawImage(img,that.x,that.y);
    };
    img.src = 'images/message.png';
}

function pipe(width,height,x,y){
    this.width=width;
    this.height=height;
    this.x=x;
    this.y=y;
    var that = this;
    ctx = flappy.context;
    var img = document.createElement('img');
    img.onload = function () {
        ctx.drawImage(img,that.x,that.y);
    };
    img.src = 'images/pipe-green.png';

    var imgd = document.createElement('img');
    imgd.onload = function () {
        ctx.drawImage(imgd,that.x,that.y-470);
    };
    imgd.src = 'images/pipe-green-d.png';
    this.update = function(){
        img.onload = function () {
            ctx.drawImage(img,that.x,that.y);
            ctx.drawImage(imgd,that.x,that.y-470);
        };
        img.src = 'images/pipe-green.png';
        imgd.src = 'images/pipe-green-d.png';
    }
    this.check = function(){
        if(this.x < -70){
            this.x=300;
            this.y=getRandomInt(4,9)*50;
            return true;
        }
    }
    this.checkCollision = function(bird){
        var collision = false;
        if (bird.x < this.x + this.width &&
            bird.x + bird.width > this.x &&
            bird.y < this.y + this.height &&
            bird.y + bird.height > this.y){
                collision=true;
        }else if(bird.x < this.x + this.width &&
            bird.x + bird.width > this.x &&
            bird.y < this.y-470 + this.height &&
            bird.y + bird.height > this.y-470) {
                collision=true;  
        }else if(bird.y+bird.height>=flappy.canvas.height){
                collision=true;
        }
        return collision;
    }
}
