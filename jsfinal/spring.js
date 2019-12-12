// class Mover{
//   constructor(m,x,y){
//       this.mass = m;
//       this.position = new Vec2(0,0);
//       this.velocity = new Vec2()
//   }
//   checkEdges() {
//       var position= new Vec2(0,0);
//       var velocity= new Vec2(0,0);
//       var acceleration= new Vec2(0,0);
//       var mass;
//       if (position.x > width) {
//         position.x = width;
//         velocity.x *= -1;
//       } else if (position.x < 0) {
//         position.x = 0;
//         velocity.x *= -1;
//       }
  
//       if (position.y > height) {
//         velocity.y *= -1;
//         position.y = height;
//       }
//     }
//     update() {
//         // velocity.add(acceleration);
//         // position.add(velocity);
//         // acceleration.mult(0);
//     }
// }

// var move = new Mover();
// var pos = new Vec2(40,40);
// var velocity = new Vec2(1,0);
// var canvas = document.getElementById('canvas');
// var context = canvas.getContext('2d');
// var radius = 30;

// var update = function(pos){
//     context.beginPath();
//     context.arc(pos.x, pos.y, radius, 0, 2 * Math.PI, false);
//     context.fillStyle = 'green';
//     context.fill();
//     context.lineWidth = 2;
//     context.strokeStyle = '#003300';
//     context.stroke();
// }
// var checkEdges =function(position,velocity){
//     var mass;
//     if (position.x > width){
//       position.x = width;
//       velocity.x *= -1;
//     } else if (position.x < 0) {
//       position.x = 0;
//       velocity.x *= -1;
//     }

//     if (position.y > height) {
//       velocity.y *= -1;
//       position.y = height;
//     }
// }


// var loop = function(){
//     context.clearRect(0, 0, canvas.width, canvas.height);
//     update(pos);
//     pos.y+=2.5;
// }

// update(pos);
// console.log(pos);
// setInterval(function(){
//     loop();

// }, 100);


// var checkWall = function(canvas,position,radius){
//   if(position.x + radius > canvas.width) {
//     velocity.x=-velocity.x;
//     // friction.x=-friction.x;
//   }
//   if(position.x - radius < 0) {
//     velocity.x=-velocity.x;
//     // friction.x=-friction.x;
//   }
//   if(position.y + radius > canvas.height) {
//     velocity.y=-velocity.y;
//   }
//   if(position.y - radius < 0) {
//     // velocity.y=-velocity.y;
//     velocity.y *= -0.15; 
//     velocity.y = canvas.height - radius;
//   }  

// }


  
  
  window.onload = function(){
    var canvas = this.document.getElementById("canvas"),
      context = canvas.getContext("2d"),
      width = canvas.width = window.innerWidth,
      height = canvas.height = window.innerHeight,
      springPoint = new Vec2(width / 2, height / 2),
      p = new particle,
      weight = p.create(Math.random() * width, Math.random() * height, 90, Math.random() * Math.PI * 2),
      k = 0.1;
      
    weight.radius = 20;
    weight.friction = 0.1 ;
  
    update();
    console.log(weight);
    function update(){
      context.clearRect(0, 0, width, height);
      var distance = springPoint.subtract(weight.position);
      var springForce = distance.scale(-k);
      // weight.position.x+=2;
      weight.velocity.add(springForce);
      console.log(weight)
      weight.update();
      context.beginPath();
      context.arc(weight.position.x, weight.position.y, weight.radius,0, Math.PI * 2, false);
      context.fill();
  
      context.beginPath();
      context.arc(springPoint.x, springPoint.y, 4,0, Math.PI * 2, false);
      context.fill();
  
      context.beginPath();
      context.moveTo(weight.position.x, weight.position.y);
      context.lineTo(springPoint.x, springPoint.y);
      context.stroke();
      // requestAnimationFrame(update);
      console.log(weight.position);
    }
    this.setInterval(function(){
      update();
    },100);
    // requestAnimationFrame(update);
  }
  
  
  