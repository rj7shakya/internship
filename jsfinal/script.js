window.onload = function(){
  var canvas = this.document.getElementById("canvas"),
    ctx = canvas.getContext("2d"),
    width = canvas.width = window.innerWidth,
    height = canvas.height = window.innerHeight;

function randomRange(min, max) {
  return min + Math.random() * (max - min);
}
  var c = new particle();
  p0 = {
    x: randomRange(0, width),
    y: randomRange(0, height)
  },
  p1 = {
    x: randomRange(0, width),
    y: randomRange(0, height)
  },
  p2 = {
    x: randomRange(0, width),
    y: randomRange(0, height)
  },
  p3 = {
    x: randomRange(0, width),
    y: randomRange(0, height)
  },
  t = 0,
  direction = 0.1,
  pFinal = {};

  
  function cubicBezier(p0, p1, p2, p3, t, pFinal) {
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
  function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.moveTo(p0.x, p0.y);
    ctx.bezierCurveTo(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);
    ctx.stroke();

    cubicBezier(p0, p1, p2, p3, t, pFinal);
		ctx.beginPath();
		ctx.arc(pFinal.x+10, pFinal.y-7, 10, 0, Math.PI * 2, false);
		ctx.fill();
    console.log(pFinal);
		t += direction;
		if(t > 1 || t < 0) {
			direction = -direction;
		}
  }

  draw();
  this.setInterval(function(){
    draw();
    // check();
  },1000);

  


}