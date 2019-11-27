

var c = document.getElementsByClassName("b");
var width=c.width;
var height=c.height;
var ball = document.getElementsByClassName("ball");
document.getElementsByClassName("ball").top='20px';

// var ctx = c.getContext("2d");

// function draw(y){
//     ctx.clearRect(0, 0, c.width, c.height);
//     ctx.beginPath();
//     ctx.arc(width/2, y, 50, 0, 2 * Math.PI);
//     ctx.fillStyle='blue';
//     ctx.fill();
// }

// draw(50);
// var up=false;
// y=50;
// setInterval(function(){
//     console.log(y,up)
//     if(y<=height-51){
//         if(y<50){
//             y=51;
//             up=false;
//         }
//         if(!up){
//             y+=20;
//             draw(y);
//         }else if(up){
//             y-=20;
//             draw(y);
//         }
//     }else if(y>=height-51){
//         y=height-51;
//         up=true;
//     }
// },100);