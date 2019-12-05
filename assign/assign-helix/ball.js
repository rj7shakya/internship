function ball(){
    this.canvas = document.createElement("canvas");
    this.speed = 5;
    this.draw = function(){
        this.canvas.width = 700;
        this.canvas.height = 500;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas,document.body.childNodes[0]);
        this.canvas.style.borderStyle='solid';
        this.canvas.style.borderWidth=1+'px';
        this.canvas.style.borderColor='black';
    }

    this.circle = function(x,y,r){
        var ctx= this.context;
        ctx.beginPath();
        ctx.arc(x,y,r,0,2*Math.PI);
        // ctx.stroke();
        ctx.lineWidth=0;
        ctx.fillStyle="#C47B7B";
        ctx.fill();
    }

    this.clear = function(){
        ctx = this.context;
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}
