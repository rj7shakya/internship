var bird;
var obs;
var obss;
var obs_arr= new Array();

function startGame(){
    flappy.start();
    bird = new bird(30,30,10,120);
    for(var i=0;i<2;i++){
        obs_arr[i] = new pipe(10,200,(i+1)*200+100,getRandomInt(4,9)*50);
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


setInterval(function(){
    bird.y+=bird.speed;;
    flappy.showbg();
    bird.update();
    for(var i=0;i<obs_arr.length;i++){
        console.log(obs_arr[i]);
        obs_arr[i].x-=5;
        obs_arr[i].update();
        obs_arr[i].check();
    }
    flappy.clear();
},50)
