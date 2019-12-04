var bird;
var obs;
var obss;
var obs_arr= new Array();
var int;
var scored=0;
var flapp = new flappy();


function startGame(flap){
    flap.start();
    flap.showbg();
    var st = new start(100,100,60,60,flap);
    play = function(){
        flap.showbg();
        bird = new bird(34,24,10,120,flap);
        for(var i=0;i<2;i++){
            obs_arr[i] = new pipe(50,320,(i+1)*200+100,getRandomInt(4,9)*50,flap);
        }
        var s = setInterval(function(){
            bird.y+=bird.speed;
            flap.showbg();
            for(var i=0;i<obs_arr.length;i++){
                obs_arr[i].x-=5;
                obs_arr[i].update();
                var pass = obs_arr[i].check();
                if(pass){
                    scored++;
                }
            }
            bird.update(scored);
            for(var i=0;i<obs_arr.length;i++){
                int = obs_arr[i].checkCollision(bird);
                if(int){
                    clearInterval(s);
                    flap.clear();
                    var gm = new gameover(100,100,60,230,flap);
                }
            }
            flap.clear();
        },100)
    }
    flap.canvas.addEventListener('click', function() {
        play(); 
    }, false);
}
document.onkeypress = function(evt) {
    evt = evt || window.event;
    var charCode = evt.keyCode || evt.which;
    var charStr = String.fromCharCode(charCode);
    if(charStr == ' '){
        bird.y-=bird.up;
    }else if(charStr == 's'){
        bird.speed =0;
    }else if(charStr == 'r'){
        startGame(flapp);
    }
}.bind(this);



startGame(flapp);

var f = new flappy();
// startGame(f);