class Vec2{
    constructor(x,y){
        this.x=x;
        this.y=y;
    }
    length(){
        return Math.sqrt(this.x*this.x+this.y*this.y);
    }
    add(vec){
        return new Vec2(vec.x+this.x,vec.y+this.y);
    }
    subtract(vec){
        return new Vec2(this.x - vec.x, this.y - vec.y);
    }
    scale(n){
        return new Vec2(this.x*n,this.y*n);
    }
    
    dot(vec){
        return (this.x*vec.x+this.y*vec.y);
    }
    cross(vec){
        return (this.x*vec.y-this.y*vec.x);
    }
    normalize(){
        var len = this.length();
        if(len>0){
            len = 1/len; 
        }
        return new Vec2(this.x*len,this.y*len);
    }
    distance(vec){
        return Math.sqrt((this.x-vec.x)*(this.x-vec.x)+(this.y-vec.y)*(this.y-vec.y))
    }
    getAngle(){
        return Math.atan2(this.y,this.x);
    }
    setLength(len) {
		var angle = this.getAngle();
		this.x = Math.cos(angle) * len;
		this.y = Math.sin(angle) * len;
    }
    setAngle(angle) {
		var length = this.length();
		this.x = Math.cos(angle) * length;
		this.y = Math.sin(angle) * length;
	}
}

Vec2.prototype.rotate = function(center,angle){
    var r=[];//anticlockwise
    r[0]=(this.x-center.x)*Math.cos(angle)-(this.y-center.y)*Math.sin(angle);
    r[1]=(this.x-center.x)*Math.sin(angle)+(this.y-center.y)*Math.cos(angle);
    return new Vec2(r[0],r[1]);
}

Vec2.prototype.multiply = function(vec){
    return new Vec2(this.x*vec.x,this.y*vec.y);
}

// Vec2.prototype.add = function(vec){
//     return new Vec2(vec.x+this.x,vec.y+this.y);
// }