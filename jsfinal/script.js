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
    this.weight.radius = 10;
    this.weight.friction = 0.9;
    this.weight2.radius = 20;
    this.weight2.friction = 0.9;
    this.weight3.radius = 20;
    this.weight3.friction = 0.9;
    this.gravity = new Vec2(0,3.6);
    this.friction = 0.2;
    this.velocity = new Vec2(0,3);
  }
  set sweightm(y){
    this.weightm.position.y = y;
  }
  get sweightm(){
    return this.weightm.position.y;
  }
  
  car(x,y,context,ang){
    var width=80;
    var height=40;
    context.beginPath();
    context.save();
    // context.clearRect(0, 0, canvas.width, canvas.height);
    // this.draw(context,p0,p1,p2,p3);
    if(ang){
      context.translate(this.weightm.x+80/2,this.weightm.y+40/2);
      context.rotate(6*Math.PI/180);
      context.translate(-this.weightm.x-80/2,-this.weightm.y-40/2);
    }
    
    
    context.rect(x, y, width, height);
    context.stroke();
    context.fillStyle='black';
    context.fill();
    this.weight.position.x=x+width/2;
    this.weight.position.y=y-10;
    this.weight2.position.x=x+10;
    this.weight2.position.y=y+height+10;
    this.weight3.position.x=x+width-10;
    this.weight3.position.y=y+10+height;
    this.drawCir(x+width/2,y-10,this.weight,context);
    this.drawCir(x+10,y+height+10,this.weight2,context);
    this.drawCir(x+width-10,y+10+height,this.weight3,context);
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
    context.arc(weight.position.x, weight.position.y, weight.radius,0, Math.PI * 2, false);
    context.fill();
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

  update(context,y,ang){
    // context.save();
    // context.clearRect(0, 0, canvas.width, canvas.height);
    // context.translate(this.weightm.x+80/2,this.weightm.y+40/2);
    // context.rotate(56*Math.PI/180);
    // context.translate(-this.weightm.x-80/2,-this.weightm.y-40/2);
    // context.restore();
    this.velocity = this.velocity.add(this.gravity);
    this.weightm.position.y +=this.velocity.y;
    if(y){
      this.weightm.position.y = y;
    }
    this.car(this.weightm.position.x,this.weightm.position.y,context,ang);
    // this.weightm.update(canvas);
    context.restore();
    // context.save();
    // requestAnimationFrame(update);
    
  }
  draw(ctx,p0,p1,p2,p3){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(var i=1;i<17;i++){
      ctx.beginPath();
      ctx.moveTo(p0[i].x, p0[i].y);
      ctx.bezierCurveTo(p1[i].x, p1[i].y, p2[i].x, p2[i].y, p3[i].x, p3[i].y);
      ctx.lineWidth=10;
      ctx.stroke();
      // ctx.strokeStyle='blue';
      // ctx.lineTo(p0[1].x-((i-1)*500),height);
      // if(i==6){
      //   ctx.lineTo(p3[i].x,height);
      // }
      // ctx.fillStyle ="red";
      // ctx.fill();
      
    } 
    this.checkHill(p1,p0,p2,p3,ctx); 
    ctx.beginPath();
    this.update(ctx);
  }
  checkHill(p1,p0,p2,p3,ctx){
    var i=Math.floor((500-p0[1].x+95)/500);
    var t=(-p0[i].x+50)/485;
    for(var g=0;g<80;g++){
      var pt = this.cubicBezier(p0[i],p1[i],p2[i],p3[i],t,pFinal);

      if(pt.y-80<=this.sweightm){//collide
        this.friction=0.2;
        this.velocity=this.velocity.scale(this.friction);
        this.velocity.y=-this.velocity.y;
        // c1.position.y=pt.y;
        // ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.update(ctx,pt.y-80);
        // console.log('not air');
      }else if(pt.y >= this.sweightm+80){//non collide
        this.gravity.y=0.6;
        this.friction=1;
        console.log('air');
      }else if(pt.y-60<=this.sweightm){//collide
        // this.friction=0.2;
        // this.velocity=this.velocity.scale(this.friction);
        // this.velocity.y=-this.velocity.y;
        // // c1.position.y=pt.y;
        // // ctx.clearRect(0, 0, canvas.width, canvas.height);
        // this.update(ctx,pt.y-70);
        console.log('not air');
      }
      t+=0.002;
    }
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
  car1.car(20,20,ctx,p0,p1,p2,p3);

  
  // car1.draw(ctx,p0,p1,p2,p3);
  this.setInterval(function(){
    car1.draw(ctx,p0,p1,p2,p3);
  },100);
  
  document.onkeypress = function (e) {
  var keycode;
    if(window.event) {
        keycode = event.keyCode;
    } else if (event.which) {
        keycode = event.which;
    }
    if(keycode === 97){//a key
      if(p0[1].x<-5){
        car1.generateCurve(6,p0,p1,p2,p3);
        // ctx.clearRect(0,0,canvas.width,canvas.height);
        // car1.car(car1.weightm.x,car1.weightm.y,context,-6);
      }
    }
    if(keycode === 100){//d key
      if(p0[1].x>-13200){
        car1.generateCurve(-6,p0,p1,p2,p3);
        // ctx.clearRect(0,0,canvas.width,canvas.height);
        // car1.update(ctx,null,6);
        // car1.car(car1.weightm.x,car1.weightm.y,context,6);
      }
    }
    if(keycode === 119){//w key
      // ctx.save();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // ctx.translate(car1.weightm.x+80/2,car1.weightm.y+40/2);
      // ctx.rotate(6*Math.PI/180);
      // ctx.translate(-car1.weightm.x-80/2,-car1.weightm.y-40/2);
      // ctx.restore();
      // car1.draw(ctx,p0,p1,p2,p3);
    }
  }.bind(this);  
}