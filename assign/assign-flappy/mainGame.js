var bird;
var obs;
var obss;
var obs_arr= new Array();
var int;
var scored=0;

function startGame(){
    flappy.start();
    bird = new bird(34,24,10,120);
    for(var i=0;i<2;i++){
        obs_arr[i] = new pipe(50,320,(i+1)*200+100,getRandomInt(4,9)*50);
    }
}
document.onkeypress = function(evt) {
    evt = evt || window.event;
    var charCode = evt.keyCode || evt.which;
    var charStr = String.fromCharCode(charCode);
    if(charStr == ' '){
        bird.y-=bird.up;
    }else if(charStr == 's'){
        bird.speed =0;
    }
}.bind(this);


var s = setInterval(function(){
    bird.y+=bird.speed;
    flappy.showbg();
    bird.update();
    flappy.showscore(scored);
    for(var i=0;i<obs_arr.length;i++){
        obs_arr[i].x-=5;
        obs_arr[i].update();
        var pass = obs_arr[i].check();
        if(pass){
            scored++;
        }
        // flappy.showscore(scored);
    }
    for(var i=0;i<obs_arr.length;i++){
        int = obs_arr[i].checkCollision(bird);
        if(int){
            clearInterval(s);
        }
    }
    flappy.clear();
},50)

startGame();
