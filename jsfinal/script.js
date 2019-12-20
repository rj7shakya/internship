
// window.onload = function(){
  var canvas = this.document.getElementById("canvas"),
    ctx = canvas.getContext("2d"),
    width = canvas.width = 700,
    height = canvas.height = 600;
  var c = new particle();
  var car1 = new Veh();
  car1.ang = null;
  var p1=[],p2=[],p3=[],p0=[];
  p3[0] = {x: 1,y: car1.getRandomArbitrary(250,300)};
  for(var i=1;i<17;i++){
    p0[i] = {x: p3[i-1].x-5,y: p3[i-1].y};
    p1[i] = {x: p0[i].x+car1.getRandomArbitrary(200,350),y: car1.getRandomArbitrary(200,400)};
    p2[i] = {x: p0[i].x+car1.getRandomArbitrary(200,350),y: car1.getRandomArbitrary(200,400)};
    p3[i] = {x: p0[i].x+500,y: car1.getRandomArbitrary(200,300)};
  }
  start();
  // var s = new Start();
  // s.show(ctx);
  // ctx.drawImage(s.img,0,50,700,500);
  // s.playbtn(410,520,ctx);
  // check(canvas,s,car1);
  function start(){
    t = 0,
    direction = 0.1,
    i=0;
    pFinal = {};
    car1.car(20,20,ctx,p0,p1,p2,p3,null);
    car1.genpower(p3,p1,3);
    car1.intv =setInterval(function(){
      car1.draw(ctx,p0,p1,p2,p3);
      car1.rotateMeter(35+Math.floor(2*canvas.width/4)+38,canvas.height-95,ctx);
      // car1.rotateWheel(ctx);
    },50);
  }

  function check(canvas,s,car1){
    canvas.addEventListener('click', function(evt) {
      var mousePos = s.getMousePos(canvas, evt);
      if (s.isInside(mousePos,s.btn)) {
          // alert('clicked inside rect');
          document.location.reload();
          clearInterval(car1.intv);
          start();
      }   
    }, false);
  }
  
  
  document.onkeypress = function (e) {
  var keycode;
    if(window.event) {
        keycode = event.keyCode;
    } else if (event.which) {
        keycode = event.which;
    }

    if(keycode === 97){//a key
      if(p0[1].x<-5){
        
        if(car1.air){
          car1.sag=car1.sag-car1.rotV/2;
          car1.generateCurve(car1.carV,p0,p1,p2,p3);
        }else{
          car1.generateCurve(car1.carV,p0,p1,p2,p3);
          car1.sag=car1.sag-0.25;
        }
        car1.move=true;
      }
      car1.imgb.src='images/brake-pressed.png';
      if(car1.gscore>1){
        car1.gscore=car1.gscore-1;
      }
    }
    if(keycode === 100){//d key
      if(p0[1].x>-7700){
        
        car1.generateCurve(-car1.carV,p0,p1,p2,p3);
        
        if((car1.sag>10 && car1.sag<40) && car1.air){
          car1.sag=car1.sag+1;
        }else if(car1.air){
          car1.sag=car1.sag+car1.rotV;
        }
        car1.move=true;
        car1.gscore=car1.gscore+0.25;
      }
      car1.imgg.src='images/gas-pressed.png';
    }
    if(keycode === 114){//r key
      // ctx.clearRect(0,0,canvas.width,canvas.height);
      document.location.reload();
      clearInterval(car1.intv);
      start();
    }
    if(keycode === 120){//x key
      // document.location.reload();
      // clearInterval(car1.intv);
      // var s = new Start();
      // s.show(ctx);
      // s.playbtn(410,520,ctx);
      // check(canvas,s,car1);
    }
  }.bind(this);  
// }