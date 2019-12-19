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
    this.gravity = new Vec2(0,3.6);
    this.friction = 0.2;
    this.velocity = new Vec2(0,3);
    this.ang = null;
    this.moving = true;
    this.carV = 6;
    this.carA = 0.005;
    this.rotV = 6;
    this.rotA = 0.01;
    this.val = 0;

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
    this.needle = new Image();
    this.needle.src = 'images/needle.png';
    this.coin5 = new Image();
    this.coin25 = new Image();
    this.coin500 = new Image();
    this.coin100 = new Image();
    this.coin5.src = 'images/5.png';
    this.coin25.src = 'images/25.png';
    this.coin500.src = 'images/500.png';
    this.coin100.src = 'images/100.png';
    this.fwarn = new Image();
    this.fwarn.src = 'images/fuel-warning.png';
      
    this.hill = new Image();
    this.hill.src = 'images/hill1.png';
    this.coins = [this.coin5,this.coin500,this.coin25,this.coin100];
    this.reward=[];  
    this.score=0;
    this.coinNo=0;
    this.health=100;
    var that = this;
    this.wheelRate=0.1;
    }
    set sweightm(y){
      this.weightm.position.y = y;
    }
    set sweightmx(x){
      this.weightm.position.x = x;
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
      var img = new Image();
      img.src='images/Car.png';
      context.drawImage(img,x-10,y-30,100,80);
      
      this.weight.position.x=x+width/2;
      this.drawH(x+width/2,y-10,this.weight,context);
      this.drawCir(x+10,y+height+10,this.weight2,context);
      this.drawCir(x+width-10,y+10+height,this.weight3,context);
      this.sweightm = this.weightm.position.y;
      this.sweightmx = this.weightm.position.x;
      context.restore();
      // this.rotateWheel(x+10,y+height+10,context);
      // this.rotateWheel(x+width-30,y-10+height,context);
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
      if(!this.onair){
        if((this.ang>0&&this.ang<45)){
          this.sag-=this.sag/2;
        }else if((this.ang>90&&this.ang<180)){
          this.sag+=0.5;
        }
        else if((this.ang>180&&this.ang<270)){
          this.sag-=0.5;
        }else if((this.ang>270&&this.ang<360)){
          this.sag+=0.5;
        }
      }
      this.car(this.weightm.position.x,this.weightm.position.y,ctx);
      
      if(this.health>0){
        this.health-=0.05;
      }
    }
    draw(ctx,p0,p1,p2,p3){
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for(var i=1;i<17;i++){
        ctx.beginPath();
        ctx.moveTo(p0[i].x, p0[i].y);
        ctx.bezierCurveTo(p1[i].x, p1[i].y, p2[i].x, p2[i].y, p3[i].x, p3[i].y);
        ctx.lineWidth=40;
        ctx.stroke();
        ctx.strokeStyle='green';
        ctx.lineTo(p3[i].x,canvas.height);
        ctx.lineTo(p0[i].x,canvas.height);
        ctx.closePath();
        ctx.fillStyle ="#66331d";
        ctx.fill();

      }
      if(this.sag>10 && this.sag<40){
        this.generateCurve(-2,p0,p1,p2,p3);
      }else if(this.sag>-40 && this.sag<-10){
        this.generateCurve(2,p0,p1,p2,p3);
      }
      
      this.imgf.src='images/fuel.png';
      var k=0;
      ctx.drawImage(this.imgf,5,10,30,30);

      for(var i=0;i<this.reward.length;i++){
        if (typeof this.reward[i] !== 'undefined') {
          ctx.drawImage(this.reward[i].src,this.reward[i].x,this.reward[i].y,50,50);
        }
      }
      this.checkCollide(ctx);
      this.genpower(p3,p1,null);
      if(this.moving){
        this.carV +=this.carV*this.carA; 
      }else{
        this.carV = 6;
      }
      if(this.air){
        this.rotV +=this.rotV*this.rotA;
      }else{
        this.rotV=6;
      }

      
      //assets
      this.img0.src='images/coin.png';
      ctx.drawImage(this.img0,5,55,30,30);
      ctx.font = "20px Comic Sans MS";
      ctx.fillStyle = "black";
      ctx.fillText('Distance '+Math.floor(this.gscore)+' m', canvas.width/2-50, 28);
      ctx.fillText(this.coinNo,55,78);
      ctx.beginPath();
      ctx.lineWidth=2;
      ctx.strokeStyle='black';
      ctx.rect(50,15,140,20);
      ctx.stroke();
      
      //health with fuel
      var col='';
      if(this.health<30){
        col='#FF0000';
      }else{
        col='#39ff14';
      }
      ctx.fillStyle=col;
      ctx.fillRect(51,16,((this.health/100)*140)-2,18);
      if(this.health<1){
        ctx.drawImage(this.fwarn,canvas.width/3,canvas.height/3);
        clearInterval(this.intv);
      }
      ctx.strokeStyle='green';

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
      // this.rotatet(35+Math.floor(2*canvas.width/4)+38,canvas.height-95,ctx);  
    }

    checkCollide(ctx){
      for(var i=0;i<this.reward.length;i++){
        if (typeof this.reward[i] !== 'undefined') {
          if (this.weightm.position.x < this.reward[i].x + 50 &&
            this.weightm.position.x + 80 > this.reward[i].x &&
            this.weightm.position.y < this.reward[i].y + 50 &&
            this.weightm.position.y + 40 > this.reward[i].y) {
            
              if(this.reward[i].src.src.slice(29,this.reward[i].src.src.length)=='fuel.png'){
                this.health=100;
                delete this.reward[i];
              }else{
                this.coinNo+=parseInt(this.reward[i].src.src.slice(29,this.reward[i].src.src.length-4));
                delete this.reward[i];
              }
          }
            
        }
      }
    }

    // rotateWheel(x,y,context){
    //   var that = this;
    //   // setInterval(function(){
    //     context.save();
    //   //   context.translate(x,y);
    //   //   context.rotate(that.ang*Math.PI/180);
    //   //   context.translate(-x,-y);context.restore();
    //     // that.drawCir(x,y,that.weight2,context);
        
    //   // },50);
    //   var i=0;
    //   // mainLoop(23);
    //   function mainLoop(time) {
        
    //     context.save();
    //     context.translate(x+20, y);
    //     console.log(x,y);
    //     context.rotate(Math.abs(i)/2*Math.PI/180);
    //     that.drawCir(x,y,that.weight2,context);
    //     context.translate(-x-20, -y);
    //     context.restore();
    //     i+=10;
    //     requestAnimationFrame(mainLoop);
    //   }
    //   context.restore();
    // }

    // rotatet(x,y,context){
      // 
      // var that = this;
      // mainLoop(23);
      mainLoop(x,y,context) {
        var i=this.val;
        // console.log(this.needle);
        context.save();
        context.translate(x+2, y+40);
        context.rotate(i*Math.PI/180);
        context.translate(-x-2, -y-40);
        context.drawImage(this.needle,x,y+40,3,40);
        context.restore();
        context.save();
        context.translate(2*x/3+1, y+38);
        context.rotate(i*Math.PI/180);
        context.translate(-2*x/3-1, -y-38);
        context.drawImage(this.needle,2*x/3-25,y+40,3,40);
        context.restore();
        context.save();
        context.translate(this.sweightmx+10, this.sweightm+50);
        context.rotate((i*10)*Math.PI/180);
        context.translate(-this.sweightmx-10, -this.sweightm-50);
        context.drawImage(this.imgc,this.sweightmx-10, this.sweightm+30,40,40);
        context.restore();
        this.val+=1;
        // console.log(i);
        // context.restore();
        // requestAnimationFrame(mainLoop);
      }

      rotateWheel(context){
        // var i;
        if(this.carV>6){
          this.val+=10;
        }else if(!this.move){
          this.val=3;
        }else if(this.carV<6){
          this.val-=10;
        }
        context.save();
        context.translate(this.sweightmx+10, this.sweightm+50);
        context.rotate(-(this.val*10)*Math.PI/180);
        context.translate(-this.sweightmx-10, -this.sweightm-50);
        context.drawImage(this.imgc,this.sweightmx-10, this.sweightm+30,40,40);
        context.restore();
        context.save();
        context.translate(this.sweightmx+70, this.sweightm+50);
        context.rotate(-(this.val*10)*Math.PI/180);
        context.translate(-this.sweightmx-10, -this.sweightm-50);
        context.drawImage(this.imgc,this.sweightmx-10, this.sweightm+30,40,40);
        context.restore();
        this.val+=5;
      }
      
    // }

    checkHill(p1,p0,p2,p3,ctx){
      var i=Math.floor((500-p0[1].x+95)/495);
      var t=(-p0[i].x+50)/495;
      var dis = [];
    for(var g=0;g<80;g++){
      var pt = this.cubicBezier(p0[i],p1[i],p2[i],p3[i],t,pFinal);
      
      if(this.sag>135 && this.sag<225){
        if(pt.y-85<=this.sweightm){//collide
          this.friction=0.2;
          this.velocity=this.velocity.scale(this.friction);
          this.velocity.y=-this.velocity.y;
          this.update(ctx,pt.y-85);
          clearInterval(this.intv);
        }
      }else{
        if(pt.y-80<=this.sweightm){//collide
          this.friction=0.01;
          this.velocity=this.velocity.scale(this.friction);
          this.velocity.y=-this.velocity.y;
          this.update(ctx,pt.y-80);
          this.air=false;
        }else if(pt.y >= this.sweightm+85){//non collide
          this.gravity.y=0.2;
          this.friction=1;
          this.air=true;
        }
      }
        dis[g] = pt.y-this.sweightm-40-40;
        t+=0.002;
      }
      
      var min = Math.min(dis[10],dis[70]);
      var max = Math.max(dis[10],dis[70]);
      this.weightm.y=-min+pt.y;
      var angle = (Math.atan((dis[70]-dis[10])/(70-10)))*180/Math.PI;
      if(!this.air){
        if(Math.abs(this.sag)<60){
          this.sag=angle/2;
        }
      }
    }
    getRandomArbitrary(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    }

    genpower(p3,p1,z){
      for(var i=1;i<16;i++){
        if(i%3==1){
          if ((typeof this.reward[(i-1)*6] != 'undefined')||(z!=null)) {
            this.reward[(i-1)*6]={
              src:this.imgf,
              x:p3[i].x,
              y:p3[i].y-80,
            };  
          }
          for(var j=0;j<6;j++){
            var x = Math.floor(p3[i].y-p1[i+1].y)/3;
            if ((typeof this.reward[j+1+(i-1)*6] != 'undefined')||(z!=null)) {
              this.reward[j+1+(i-1)*6]={
                src:this.coins[((j+4)%3)+1],
                x:p3[i].x+(j+1)*60,
                y:p3[i].y-100-x,
              };
            }
          }
        }
      }
    }
    
  }