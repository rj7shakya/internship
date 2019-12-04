var flappy= {
    canvas : document.createElement("canvas"),
    start : function(){
        this.canvas.width=300;
        this.canvas.height=500;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas,document.body.childNodes[0]);
        this.canvas.style.borderStyle='solid';
        this.canvas.style.borderWidth=1+'px';
        this.canvas.style.borderColor='black';
        this.l=0;
    },
    clear : function(){
        this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
    },
    showbg : function(){
        ctx = this.context;
        var img2 = document.createElement('img');
        this.l-=2;
        if(this.l<-250){
            this.l=0;
        }
        var that = this;
        img2.onload = function () {
            ctx.drawImage(img2,that.l,0);
            ctx.drawImage(img2,288+that.l,0);
        };
        img2.src = 'images/background-day.png';
    },
    showscore : function(score){   
        ctx = this.context;
        ctx.font = 30+"px Arial";
        ctx.fillText("score"+score, 10, 60);
    }

}