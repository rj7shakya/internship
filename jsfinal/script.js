class Veh{
  constructor(){
  var p = new particle();
    this.weightm = p.create(50, 50, 10, 0.2,0.9);
    this.weightm.width = 80;
    this.weightm.height = 40;
    this.weight = p.create(this.weightm.position.x, this.weightm.position.y, 10, 0.2);
    this.weight2 = p.create(this.weightm.position.x, this.weightm.position.y, 10, 0.2);
    this.weight3 = p.create(this.weightm.position.x, this.weightm.position.y, 10, 0.9);
    this.k = 0.1;
    this.springLength = 0;
    // this.weight.radius = 10;
    // this.weight.friction = 0.9;
    // this.weight2.radius = 20;
    // this.weight2.friction = 0.9;
    // this.weight3.radius = 20;
    // this.weight3.friction = 0.9;
    this.gravity = new Vec2(0,3.6);
    this.friction = 0.2;
    this.velocity = new Vec2(0,3);
    this.ang = null;
    this.moving = true;
    this.onair = true;
    this.intv = null;
    this.fuel = null;
    this.imgc = new Image();
    this.imgf = new Image();
    this.img0 = new Image();
    this.imgb = new Image();
    this.imgb.src='images/brake-normal.png';
    this.imgg = new Image();
    this.imgg.src='images/gas-normal.png';
    this.boost = new Image();
    this.boost.src = 'images/meter-boost.png';
    this.rpm = new Image();
    this.rpm.src = 'images/meter-rpm.png';
    this.hill = new Image();
    this.hill.src = 'images/hill1.png';
    this.needle = new Image();
    this.needle.src = 'images/needle.png';
    this.score=0;
  }
  set sweightm(y){
    this.weightm.position.y = y;
  }
  get sweightm(){
    return this.weightm.position.y;
  }
  get sweightmx(){
    return this.weightm.position.x;
  }

  set sag(a){
    this.ang = a;
  }
  get sag(){
    return this.ang;
  }
  get move(){
    return this.moving;
  }
  set move(a){
    this.moving = a;
  }
  set air(y){
    this.onair = y;
  }
  get air(){
    return this.onair;
  }
  get gscore(){
    return this.score;
  }
  set gscore(s){
    this.score=s;
  }
  
  car(x,y,context){
    var width=80;
    var height=40;
    context.beginPath();
    context.save();
    // context.clearRect(0, 0, canvas.width, canvas.height);
    // this.draw(context,p0,p1,p2,p3);
    if(this.ang>360){
      this.ang = this.ang%360;
    }else if(this.ang<-360){
      this.ang = this.ang%360;
    }
    if(this.ang){
      // context.save();
      context.translate(this.sweightmx+80/2,this.sweightm+40/2);
      context.rotate(this.ang*Math.PI/180);
      context.translate(-this.sweightmx-80/2,-this.sweightm-40/2);
      // context.restore();
    }
    
    
    // context.rect(x, y, width, height);
    // context.stroke();
    // context.fillStyle='black';
    // context.fill();
    var img = new Image();
    img.src='images/Car.png';
    context.drawImage(img,x-10,y-30,100,80);
    
    this.weight.position.x=x+width/2;
    // this.weight.position.y=y-10;
    // this.weight2.position.x=x+10;
    // this.weight2.position.y=y+height+10;
    // this.weight3.position.x=x+width-10;
    // this.weight3.position.y=y+10+height;
    this.drawH(x+width/2,y-10,this.weight,context);
    this.drawCir(x+10,y+height+10,this.weight2,context,null);
    this.drawCir(x+width-10,y+10+height,this.weight3,context,null);
    context.restore();
  }
  drawCir(x,y,weight,context){
    var springPoint = new Vec2(x,y);
    var distance = springPoint.subtract(weight.position);
    distance.setLength(distance.length()-this.springLength);
    var springForce = distance.scale(this.k);
    weight.velocity=weight.velocity.add(springForce);
    weight.update(canvas);
    context.beginPath();
    this.imgc.src='images/tire.png';
    context.drawImage(this.imgc,x-20,y-20,40,40);
  }
  drawH(x,y,weight,context){
    var springPoint = new Vec2(x,y);
    var distance = springPoint.subtract(weight.position);
    distance.setLength(distance.length()-this.springLength);
    var springForce = distance.scale(this.k);
    weight.velocity=weight.velocity.add(springForce);
    weight.update(canvas);
    context.beginPath();
    var imgh = new Image();
    imgh.src='images/head.png';
    context.drawImage(imgh,x-20,y-20,40,40);
  }

  cubicBezier(p0, p1, p2, p3, t, pFinal) {
    pFinal = pFinal || {};
    pFinal.x = Math.pow(1 - t, 3) * p0.x + 
          Math.pow(1 - t, 2) * 3 * t * p1.x + 
          (1 - t) * 3 * t * t * p2.x + 
          t * t * t * p3.x;
    pFinal.y = Math.pow(1 - t, 3) * p0.y + 
          Math.pow(1 - t, 2) * 3 * t * p1.y + 
          (1 - t) * 3 * t * t * p2.y + 
          t * t * t * p3.y;
    return pFinal;
  }
  generateCurve(delta,p0,p1,p2,p3){
    for(var i=1;i<17;i++){
      p0[i] = {x: p0[i].x+delta,y: p0[i].y};
      p1[i] = {x: p1[i].x+delta,y: p1[i].y};
      p2[i] = {x: p2[i].x+delta,y: p2[i].y};
      p3[i] = {x: p0[i].x+500,y: p3[i].y};
    }  
  }

  update(ctx,y){
    this.move=false;
    this.velocity = this.velocity.add(this.gravity);
    this.weightm.position.y +=this.velocity.y;
    if(y){
      this.weightm.position.y = y;
    }
   
    // this.weightm.update(canvas);
    // context.restore();
    // context.save();
    // requestAnimationFrame(update);
    // console.log(this.move);
    if(!this.onair){
      if((this.ang>0&&this.ang<90)){
        this.sag-=0.5;
      }else if((this.ang>90&&this.ang<180)){
        this.sag+=0.5;
      }
      else if((this.ang>180&&this.ang<270)){
        this.sag-=0.5;
      }else if((this.ang>270&&this.ang<360)){
        this.sag+=0.5;
      }
    }
    // ctx.clearRect(0,0,canvas.width,canvas.height);
    this.car(this.weightm.position.x,this.weightm.position.y,ctx);
    this.gscore=this.gscore+5;
  }
  draw(ctx,p0,p1,p2,p3){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(var i=1;i<17;i++){
      // var i=1;
      ctx.beginPath();
      ctx.moveTo(p0[i].x, p0[i].y);
      ctx.bezierCurveTo(p1[i].x, p1[i].y, p2[i].x, p2[i].y, p3[i].x, p3[i].y);
      ctx.lineWidth=20;
      ctx.stroke();
      ctx.strokeStyle='green';
      ctx.lineTo(p3[i].x,canvas.height);
      // if(i==6){
      ctx.lineTo(p0[i].x,canvas.height);
      // }
      ctx.closePath();
      ctx.fillStyle ="#66331d";
      ctx.fill();
      
    } 
    
    this.imgf.src='images/fuel.png';
    ctx.drawImage(this.imgf,5,0,30,30);
    
    this.img0.src='images/coin.png';
    ctx.drawImage(this.img0,5,35,30,30);
    ctx.font = "20px Comic Sans MS";
    ctx.fillText(this.gscore, 40, 58);
    
    ctx.drawImage(this.imgb,35+Math.floor(0*canvas.width/4),canvas.height-100,80,80);  
    ctx.drawImage(this.boost,35+Math.floor(1*canvas.width/4),canvas.height-100,80,80);
    ctx.drawImage(this.needle,35+Math.floor(1*canvas.width/4)+38,canvas.height-95,5,40);
    ctx.drawImage(this.rpm,35+Math.floor(2*canvas.width/4),canvas.height-100,80,80);  
    ctx.drawImage(this.needle,35+Math.floor(2*canvas.width/4)+38,canvas.height-95,5,40);
    ctx.drawImage(this.imgg,Math.floor(4*canvas.width/4)-120,canvas.height-100,80,80);
    this.imgb.src='images/brake-normal.png';
    this.imgg.src='images/gas-normal.png';
    this.checkHill(p1,p0,p2,p3,ctx); 
    ctx.beginPath();
    this.update(ctx,null);
  }
  checkHill(p1,p0,p2,p3,ctx){
    var i=Math.floor((500-p0[1].x+95)/495);
    var t=(-p0[i].x+50)/495;
    var dis = [];
  for(var g=0;g<80;g++){
    var pt = this.cubicBezier(p0[i],p1[i],p2[i],p3[i],t,pFinal);
    
    if(this.sag>135 && this.sag<225){
      if(pt.y-65<=this.sweightm){//collide
        this.friction=0.2;
        this.velocity=this.velocity.scale(this.friction);
        this.velocity.y=-this.velocity.y;
        this.update(ctx,pt.y-55);
        clearInterval(this.intv);
      }
    }else{
      if(pt.y-75<=this.sweightm){//collide
        this.friction=0.01;
        this.velocity=this.velocity.scale(this.friction);
        this.velocity.y=-this.velocity.y;
        // c1.position.y=pt.y;
        // ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.update(ctx,pt.y-75);
      }else if(pt.y >= this.sweightm+75){//non collide
        this.gravity.y=0.6;
        this.friction=1;
      }
    }
      if(pt.y-100<=this.sweightm){
        this.air=false;
      }else{
        this.air=true;
      }
      dis[g] = pt.y-this.sweightm-40-40;
      t+=0.002;
    }
    
    var min = Math.min(dis[10],dis[70]);
    var max = Math.max(dis[10],dis[70]);
    var angle = (Math.atan((dis[70]-dis[10])/(70-10)))*180/Math.PI;
    if(!this.air){
      if(Math.abs(this.sag)<60){
        this.sag=angle/2;
      // }else if(angle<40){
      //   this.sag+=5;
      // }else if(angle>40){
      //   this.sag-=5;
      }
      
    }
    
    // console.log(min,max,angle,this.air);
  }
  getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
}


window.onload = function(){
  var canvas = this.document.getElementById("canvas"),
    ctx = canvas.getContext("2d"),
    width = canvas.width = window.innerWidth,
    height = canvas.height = window.innerHeight;
  var c = new particle();
  var car1 = new Veh();
  car1.ang = null;
  var p1=[],p2=[],p3=[],p0=[];
  p3[0] = {x: 1,y: car1.getRandomArbitrary(250,300)};
  for(var i=1;i<17;i++){
    p0[i] = {x: p3[i-1].x-5,y: p3[i-1].y};
    p1[i] = {x: p0[i].x+car1.getRandomArbitrary(200,400),y: car1.getRandomArbitrary(200,500)};
    p2[i] = {x: p0[i].x+car1.getRandomArbitrary(200,400),y: car1.getRandomArbitrary(200,500)};
    p3[i] = {x: p0[i].x+500,y: car1.getRandomArbitrary(200,300)};
  }
  t = 0,
  direction = 0.1,
  pFinal = {};
  car1.car(20,20,ctx,p0,p1,p2,p3,null);

  car1.intv = this.setInterval(function(){
    car1.draw(ctx,p0,p1,p2,p3);
  },50);
  
  document.onkeypress = function (e) {
  var keycode;
    if(window.event) {
        keycode = event.keyCode;
    } else if (event.which) {
        keycode = event.which;
    }

    if(keycode === 97){//a key
      if(p0[1].x<5){
        // car1.generateCurve(6,p0,p1,p2,p3);
        if(car1.air){
          car1.sag=car1.sag-12;
        }else{
          car1.generateCurve(6,p0,p1,p2,p3);
        }
        this.move=true;
      }
      car1.imgb.src='images/brake-pressed.png';
    }
    if(keycode === 100){//d key
      if(p0[1].x>-13200){
        car1.generateCurve(-6,p0,p1,p2,p3);
        if(car1.air){
          car1.sag=car1.sag+4;
        }
        this.move=true;
      }
      car1.imgg.src='images/gas-pressed.png';
    }
    if(keycode === 119){//w key
      
    }
  }.bind(this);  
}