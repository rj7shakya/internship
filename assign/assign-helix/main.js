

function move(b1,x,y){
    this.x=x;
    this.y=y;
    b1.draw();
    // b1.circle(this.x,this.y,10);
    var speed=5;
    var sr=0.5;
    var r=0;
    var fps = 10;
    var now;
    var then = Date.now();
    var interval = 1000/fps;
    var delta;
    var that=this;
    var rad;
    var c=0;
    var d=14;
    var speed=0.88;
    // b1.clear();
    // for(var i=0;i<10;i++){
    //     for(var j=0;j<15;j++){
    //         rad=c+r;
    //         b1.circle(this.x+(j*25),this.y+(i*25),rad);
    //         console.log(r);
    //     }
    // }


    function repeat() {
        requestAnimationFrame(repeat);
        now = Date.now();
        delta = now - then;
        if (delta > interval) {
            then = now - (delta % interval);
            b1.clear();
            for(var k=0;k<2;k++){
                var z = k===0?1:-1;
                c=0;
            for(var i=0;i<15;i++){
                for(var j=0;j<10;j++){
                    var v=y = 250/2 + 90 * Math.sin(z*(that.x+(c*30))/100);
                    // var u=y = 250/2 + 60 * Math.sin(-(that.x+(c*30))/100);
                    b1.circle(that.x+(i*30),v+(j*20),r);
                    // b1.circle(that.x+(i*30),u+(j*20),r);
                }
                c+=0.88;
                // d-=0.88;
                // if(c>=14){
                //     c=0;
                // }else if(c<0){
                //     c=14
                // }
                if(d<0){
                    d=14;    
                }
                r+=speed;
                if(r>=14 ){
                    r=13.2;
                    speed=-speed;
                }else if(r<=0.88){
                    r=0.88;
                    speed=-speed;
                }
            }
            }
            // requestAnimationFrame(repeat);
        }
      }
    repeat();
}


var ball1 = new ball();
var o = new move(ball1,190,100);



// ball1.circle(70,70,10);
// var o = new move(ball1,0,0);