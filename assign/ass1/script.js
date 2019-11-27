var points = [
    {x: 10, y: 20},
    {x: 40, y: 40},
    {x: 60, y: 20},
    {x: 60, y: 80},
    {x: 160, y: 90},
    {x: 60, y: 120},
];

var p = document.getElementById("plot");
var ctx = p.getContext("2d");

points.forEach(function(val){
    ctx.beginPath();
    ctx.arc(val['x'], val['y'], 8, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fillStyle="blue";
    ctx.fill()
})