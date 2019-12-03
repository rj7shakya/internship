lane = document.getElementById('lane3');


function Car(parent){
    this.MAX_WIDTH = 300;
    this.MAX_HEIGHT = 800;
    this.x = 30;
    this.y = 485; 
    this.score ;
    this.element = null;
    this.SHIFT = 110;
    this.parent = parent;
    this.laneno =1;
    var that = this;
    this.carc = null;
    this.h2 = document.createElement('h2');
    this.scoret = document.createElement('h1');
    this.startpg = document.createElement('h2');
    this.speed = 5;
    var f_score;
    this.intv;
    var firebullet=false;
    var isBullet = true;
    var fireNum =0;
    var road = document.createElement('img');
    var car = document.createElement('img');
    var game_over = document.createElement('div');
    var bull;
    var topValu;
    var obst = new obs(this.parent);
    var obs_arr =[];
    // var bull = new fire(this.parent);

    this.show = function(car){
        car.style.left = this.x+'px';
        car.style.top = this.y +'px';
    }

    this.movebg = function(road){
        var topVal = parseInt(road.style.top.slice(0,5));
        if(topVal<= -10 && topVal >=-1500){
            topVal+=this.speed;
        }else if(topVal< -1500){
            topVal = -1500;
            // topVal-=this.speed;
        }else if(topVal> -10){
            topVal = -1400;
        }
        road.style.top = topVal+'px';
    }
    this.movebullet = function(){
        if(firebullet ){
            topValu = parseInt(bull.style.top.slice(0,5));
            if(topValu<500 && topValu >-80){
                topValu-=10;
            }else if(topValu<-80){
                fireNum=1;
                topValu=-90;
                bull.remove();
            }
            bull.style.top = topValu+'px';
            this.checkRemove(bull);        
        }
        
    }

    this.checkRemove = function(bull){
        for(var i=0;i<obs_arr.length;i++){
            rect1x=parseInt(bull.style.left.slice(0,5));
            rect1y=parseInt(bull.style.top.slice(0,5));
            rect2x=parseInt(obs_arr[i].style.left.slice(0,5));
            rect2y=parseInt(obs_arr[i].style.top.slice(0,5));
            if (rect1x < rect2x + obs_arr[i].width &&
                rect1x + bull.width > rect2x &&
                rect1y < rect2y + obs_arr[i].height &&
                rect1y + bull.height > rect2y) {
                 obs_arr[i].style.top=-200+'px'; 
                 bull.remove();
                 bull.style.top =-800+'px';
            }
        }
    }

    this.updateScore = function(score){
        this.scoret.innerHTML='Score :'+this.score;
    }

    this.moveobs = function(road){
        var topVal = parseInt(road.style.top.slice(0,5));
        if(topVal<= 600 && topVal >=-800){
            topVal+=this.speed;
        }else if(topVal> 600){
            var ran2=this.shiftCalc(Math.round(getRandomArbitrary(1,3)));
            var leftVal = parseInt(road.style.left.slice(0,5));
            leftVal = ran2;
            road.style.left=leftVal+'px';
            this.score++;
            this.speed++;
            this.updateScore(this.score);
            topVal = -300;
        }
        road.style.top = topVal+'px';
    }

    this.gameOver = function(car,obs_arr,game_over){
        car.style.display ='none';
        obs_arr[0].style.display='none';
        obs_arr[1].style.display='none';
        game_over.style.display='block';
        this.scoret.style.display='none';
        bull.style.display='none';
        f_score = this.score;
        this.h2.innerHTML='Your score is '+f_score;
        clearInterval(this.intv);
        // console.log(bull);
    }

    this.checkCrash = function(car,obs_arr,game_over){
        for(var i=0;i<obs_arr.length;i++){
            var rect1x,rect2x,rect1y,rect2y;
            rect1x=parseInt(car.style.left.slice(0,5));
            rect1y=parseInt(car.style.top.slice(0,5));
            rect2x=parseInt(obs_arr[i].style.left.slice(0,5));
            rect2y=parseInt(obs_arr[i].style.top.slice(0,5));
            if(rect1x == rect2x){
                if (rect1y < rect2y + obs_arr[i].height &&
                    rect1y + car.height > rect2y) {
                    this.gameOver(car,obs_arr,game_over);
                }
            }    
        }
    }

    this.upSpeed = function(){
        this.intv =setInterval(function(){
            this.movebg(road);
            this.moveobs(obs_arr[0]);
            this.moveobs(obs_arr[1]);
            this.checkCrash(car,obs_arr,game_over);
            this.movebullet();
        }.bind(this),50);
    }

    this.init  = function(){
        this.score=0;
        road.classList.add('road');
        road.src = 'images/3-lane.png';
        this.parent.appendChild(road);
        road.width = 350;
        road.height = 2000;
        road.style.position = 'absolute';
        road.style.top = -1400 +'px';
        car.classList.add('car');
        car.src = 'images/car.png';
        this.parent.appendChild(car);
        car.width = 70;
        car.height = 120;
        car.style.position = 'absolute';
        car.style.transition = 'left 0.5s ';
        this.carc = car;
        this.show(car);
        var obst = new obs(this.parent);
        obs_arr = obst.createObs();
        
        var scor = document.createElement('div');
        this.parent.appendChild(scor);
        scor.appendChild(this.scoret);
        scor.style.position = 'absolute';
        this.scoret.innerHTML='Score :'+this.score;
        scor.style.marginLeft=180+'px'; 

        this.parent.appendChild(game_over);
        game_over.style.position = 'absolute';
        var h1 = document.createElement('h1');
        var h3 = document.createElement('h2');
        var text = document.createTextNode("Game Over");
        h3.innerHTML="press 'r' to restart";
        h1.appendChild(text);
        game_over.appendChild(h1);
        game_over.appendChild(h3);
        game_over.appendChild(this.h2);
        game_over.style.color='red';
        game_over.style.marginLeft=95+'px';
        game_over.style.marginTop=220+'px';
        game_over.style.display='none';

        this.parent.appendChild(this.startpg);
        this.startpg.style.position = 'absolute';
        this.startpg.innerHTML="press 's' to start";
        this.startpg.style.color='blue';
        this.startpg.style.marginLeft=170+'px';
        this.startpg.style.marginTop=150+'px';
        this.startpg.style.display='none';
        
        this.upSpeed(this.speed);
        return this;
    }

    this.shiftCalc = function(laneno){
        return 30+this.SHIFT*(laneno-1);
    }
    
    this.shift = function(num){
        this.laneno+=num;
        if(this.laneno<1){
            this.laneno =1;
        }else if(this.laneno>3){
            this.laneno =3;
        }
        if(this.laneno == 1){
            this.x=this.shiftCalc(this.laneno);
            this.show(this.carc);
        }else if(this.laneno == 2){
            this.x= this.shiftCalc(this.laneno);
            this.show(this.carc);
        }else if(this.laneno == 3){
            this.x= this.shiftCalc(this.laneno);
            this.show(this.carc);
        }
    }
    document.onkeypress = function(evt) {
        evt = evt || window.event;
        var charCode = evt.keyCode || evt.which;
        var charStr = String.fromCharCode(charCode);
        if(charStr == 'a'){
            that.shift(-1);
        }else if(charStr == 'd'){
            that.shift(1);
        }else if(charStr == 'r'){
            var c = new Car(lane).init();
        }else if(charStr == 's'){
            var c = new Car(lane).init();
        }else if(charStr == ' '){
            bull = new fire(that.parent);
            firebullet=true;
            fireNum++;
        }
    };

    function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }

    function obs(parent){
        this.x=0;
        var obs1 = document.createElement('img');
        this.y=0;
        this.parent = parent;
        this.getRandomlane = function(){
            return getRandomArbitrary(1,3);
        }
        this.createObs = function(){
            obs1.classList.add('road');
            var r = Math.round(getRandomArbitrary(1,2));
            obs1.src = 'images/ob1.png';
            this.parent.appendChild(obs1);
            obs1.width = 70;
            obs1.height = 120;
            obs1.style.position = 'absolute';
            obs1.style.top = -Math.round(getRandomArbitrary(1,2))*150 +'px';
            obs1.style.left = that.shiftCalc(Math.round(getRandomArbitrary(1,3)))+'px';

            var obs2 = document.createElement('img');
            obs2.classList.add('road');
            obs2.src = 'images/ob2.png';
            this.parent.appendChild(obs2);
            obs2.width = 70;
            obs2.height = 120;
            obs2.style.position = 'absolute';
            obs2.style.top = -00 +'px';
            obs2.style.left = that.shiftCalc(Math.round(getRandomArbitrary(1,3)))+'px';
            return [obs1,obs2];
            // return obs1;
        }
    }

    function fire(parent){
        // console.log(car.style.left);
        this.x = parseInt(car.style.left.slice(0,5))+car.width/3+'px';
        this.y = parseInt(car.style.top.slice(0,5))-car.height/3+'px';
        this.parent = parent;
        // this.parent.appendChild(this.bullet);
        this.bullet = document.createElement('img');
        this.bullet.src = 'images/fire.png';
        this.bullet.classList.add('fire');
        this.bullet.width = 60;
        this.bullet.height = 80;
        this.bullet.style.left=this.x;
        this.bullet.style.top = this.y;
        // console.log(this.bullet.style.top);
        this.parent.appendChild(this.bullet);
        this.bullet.style.position='absolute';
        return this.bullet;
    }
}

var c = new Car(lane).init();
