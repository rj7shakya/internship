;(function(){ 
    function Box(parentElement){
        this.x = 10;
        this.y = 10;
        var MAX_WIDTH = 400;
        var MAX_HEIGHT = 400;
        this.speedx =1;
        this.speedy=1;
        this.width = 20;
        this.height =20;
        this.element =null;
        this.parentElement = parentElement;
        var that = this;

        this.init = function(){
            var box = document.createElement('div');
            box.style.height = this.height+'px';
            box.style.width = this.width+'px';
            box.classList.add('box');
            this.parentElement.appendChild(box);
            this.element = box;
            this.element.onclick = this.boxClicked.bind(this);
            this.draw(); 
            return this;
        }

        this.setPostion = function(x, y) {
            this.x = x;
            this.y = y;
        }

        this.boxClicked = function() {
            console.log('boxClicked', this.width);
        }
        this.checkCollision = function(boxes){
            for(var i=0;i<boxes.length-1;i++){
                this.checkborder();
                // if( this.x === boxes[i].x && this.y === boxes[i].y) continue; 
                
                if (this.x < boxes[i].x + boxes[i].width &&
                    this.x + this.width > boxes[i].x &&
                    this.y < boxes[i].y + boxes[i].height &&
                    this.y + this.height > boxes[i].y) {
                        boxes[i].speedx = - boxes[i].speedx;
                        boxes[i].speedy = -boxes[i].speedy;
                        this.speedx = - this.speedx;
                        this.speedy = -this.speedy;
                        // console.log(boxes[i].width)
                }
            }
        }

        this.checkborder = function(){
            if(this.x + this.width > MAX_WIDTH || this.x<0){
                this.speedx =  -this.speedx;
            }else if(this.y + this.width > MAX_HEIGHT || this.y<0){
                this.speedy = -this.speedy;
            }
        }

        this.draw = function() {
            this.element.style.left = this.x + 'px';
            this.element.style.top = this.y + 'px';
        }

        this.move = function() {
            this.x += this.speedx;
            this.y += this.speedy;
            this.draw();
        }
    }    

    function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }

    function Game(parentElement, boxCount){
        var boxes=[];
        var MAX_WIDTH = 400;
        var MAX_HEIGHT = 400;
        this.parentElement = parentElement;
        this.boxCount = boxCount ;
        

        this.checkgen = function(xc,yc){
            for(var i=0;i<boxes.length;i++){
                if (!(xc < boxes[i].x + boxes[i].width &&
                    xc + boxes[i].width > boxes[i].x &&
                    yc < boxes[i].y + boxes[i].height &&
                    yc + boxes[i].height > boxes[i].y)) {
                        // box.setPostion(xc,yc);
                        return true;
                }else{
                    xc=getRandomArbitrary(0, MAX_WIDTH-boxes[i].width)
                    yc=getRandomArbitrary(0, MAX_HEIGHT-boxes[i].height)
                    this.checkgen(xc,yc);
                }
            }
        }

        this.startGame = function() {
            for(var i=0; i < this.boxCount; i++) {
                var box = new Box(parentElement).init();
                var xc,yc ;
                xc=getRandomArbitrary(0, MAX_WIDTH-box.width);
                yc=getRandomArbitrary(0, MAX_HEIGHT-box.height);
                if(this.checkgen(xc,yc)){
                    box.setPostion(xc,yc);
                }
                box.draw();
                boxes.push(box);
            }
            setInterval(this.moveBoxes.bind(this), 10);
        }

            
        this.moveBoxes = function(){
            for(var i=0;i<this.boxCount;i++){
                boxes[i].checkCollision(boxes);
                boxes[i].move();
            }
        }
    }
    var parentElement = document.getElementById('app');
    new Game(parentElement,8).startGame();
})();
