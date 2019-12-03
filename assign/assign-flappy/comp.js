function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function bird(width,height,x,y){
    this.width=width;
    this.height=height;
    this.up=100; 
    this.speed =10;
    this.x=x;
    this.y=y;
    var that = this;
    ctx = flappy.context;
    var img = document.createElement('img');
    img.onload = function(){
        ctx.drawImage(img,that.x,that.y);
    };
    img.src = 'images/yellowbird-downflap.png';

    this.update = function(){
        img.onload = function(){
            ctx.drawImage(img,that.x,that.y);
        };
        img.src = 'images/yellowbird-downflap.png';
    }
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
        }
    }
}