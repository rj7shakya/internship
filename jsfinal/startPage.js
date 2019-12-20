class Start{
  constructor(){
    
    // this.img.src = 'images/start.jpg';
    this.btn=null;
  }
  show(ctx){
    // this.img.src = 'images/start.jpg';
    this.img = new Image();
    this.img.onload = function(){
      ctx.drawImage(this.img,0,50,700,500);
      // ctx.font = "40px Comic Sans MS";
      // ctx.fillStyle = "white";
      // ctx.fillText('Press space to start', 410, 520);
    }
    this.img.src = 'images/start.jpg';
  }
  playbtn(x,y,context){
    context.beginPath();
    context.rect(x+80, y-50, 150, 50); 
    this.btn = {
      x:x+80,
      y:y-50,
      width:150,
      height:50
    };
    context.fillStyle = '#4a220c'; 
    context.fillRect(25,72,32,32);
    context.fill(); 
    context.lineWidth = 2;
    context.strokeStyle = '#000000'; 
    context.stroke();
    context.closePath();
    context.font = '35pt Kremlin Pro Web';
    context.fillStyle = '#00ef00';
    context.fillText('Start', x+110, y-10);
  }
  getMousePos(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
  }
  isInside(pos, rect){
    return pos.x > rect.x && pos.x < rect.x+rect.width && pos.y < rect.y+rect.height && pos.y > rect.y
  }
}