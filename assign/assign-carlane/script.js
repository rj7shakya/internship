lane = document.getElementById('lane3');


function Car(parent){
    this.MAX_WIDTH = 500;
    this.MAX_HEIGHT = 800;
    this.x = 40;
    this.y = 315; 
    this.score ;
    this.element = null;
    this.SHIFT = 150;
    this.parent = parent;
    this.laneno =1;
    var that = this;
    this.carc = null;
    this.h2 = document.createElement('h2');
    this.scoret = document.createElement('h1');
    this.startpg = document.createElement('h2');
    this.speed = 40;
    var f_score;
    this.intv;

    var road = document.createElement('img');
    var car = document.createElement('img');
    var game_over = document.createElement('div');
    var obs_arr;

    this.show = function(car){
        car.style.left = this.x+'px';
        car.style.top = this.y +'px';
    }

    this.movebg = function(road){
        var topVal = parseInt(road.style.top.slice(0,5));
        if(topVal<= -10 && topVal >=-1500){
            topVal+=10;
        }else if(topVal< -1500){
            topVal = -1500;
            topVal-=10;
        }else if(topVal> -10){
            topVal = -1400;
        }
        road.style.top = topVal+'px';
    }

    this.updateScore = function(score){
        this.scoret.innerHTML='Score :'+this.score;
    }

    this.moveobs = function(road){
        var topVal = parseInt(road.style.top.slice(0,5));
        if(topVal<= 500 && topVal >=-800){
            topVal+=10;
        }else if(topVal< -800){
            topVal = -800;
        }else if(topVal> 500){
            var ran2=this.shiftCalc(Math.round(getRandomArbitrary(1,3)));
            var leftVal = parseInt(road.style.left.slice(0,5));
            leftVal = ran2;
            road.style.left=leftVal+'px';
            this.score++;
            if(this.score>5 && this.score<10){
                this.speed-=5;
            }else if(this.score>10 && this<25){
                this.speed-=5;
            }
            this.updateScore(this.score);
            topVal = -800;
            clearInterval(this.intv);
            this.upSpeed(this.speed);
        }
        road.style.top = topVal+'px';
    }

    this.gameOver = function(car,obs_arr,game_over){
        car.style.display ='none';
        obs_arr[0].style.display='none';
        obs_arr[1].style.display='none';
        game_over.style.display='block';
        this.scoret.style.display='none';
        
        f_score = this.score;
        this.h2.innerHTML='Your score is '+f_score;
        clearInterval(this.intv);
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

    this.upSpeed = function(score){
        this.intv =setInterval(function(){
            this.movebg(road);
            this.moveobs(obs_arr[0]);
            this.moveobs(obs_arr[1]);
            this.checkCrash(car,obs_arr,game_over);
        }.bind(this),this.speed);
    }

    this.init  = function(){
        this.score=0;
        road.classList.add('road');
        road.src = 'images/3-lane.png';
        this.parent.appendChild(road);
        road.width = 500;
        road.height = 2000;
        road.style.position = 'absolute';
        road.style.top = -1500 +'px';
        car.classList.add('car');
        car.src = 'images/car.png';
        this.parent.appendChild(car);
        car.width = 130;
        car.height = 200;
        car.style.position = 'absolute';
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
        game_over.style.marginLeft=170+'px';
        game_over.style.marginTop=150+'px';
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
        return 40+this.SHIFT*(laneno-1);
    }
    
    this.shift = function(num){
        this.laneno+=num;
        if(this.laneno<1){
            this.laneno =3;
        }else if(this.laneno>3){
            this.laneno =1;
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
            obs1.src = 'images/ob1.png';
            this.parent.appendChild(obs1);
            obs1.width = 130;
            obs1.height = 200;
            obs1.style.position = 'absolute';
            obs1.style.top = -200 +'px';
            obs1.style.left = that.shiftCalc(Math.round(getRandomArbitrary(1,3)))+'px';

            var obs2 = document.createElement('img');
            obs2.classList.add('road');
            obs2.src = 'images/ob2.png';
            this.parent.appendChild(obs2);
            obs2.width = 130;
            obs2.height = 200;
            obs2.style.position = 'absolute';
            obs2.style.top = -00 +'px';
            obs2.style.left = that.shiftCalc(Math.round(getRandomArbitrary(1,3)))+'px';
            return [obs1,obs2];
        }
    }
}

var c = new Car(lane).init();
