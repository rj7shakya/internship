class particle{
    constructor(){
      this.position=null;
      this.velocity=null;
      this.mass=1;
      this.radius=0;
      this.bounce=-1;
      this.friction=1;
      this.gravity=0;
    }
  }
  
  particle.prototype.create = function(x, y, speed, direction, grav) {
        var obj = Object.create(this);
        obj.position = new Vec2(x, y);
        obj.velocity = new Vec2(0, 0);
        obj.velocity.setLength(speed);
        obj.velocity.setAngle(direction);
        obj.gravity = new Vec2(0, grav|| 0);
        return obj;
  }
  
  particle.prototype.update= function() {
    console.log(this.velocity);  
    // this.velocity=this.velocity.scale(this.friction);
    // this.velocity=this.velocity.add(this.gravity);
    // this.position=this.position.add(this.velocity);
    // this.velocity.x = this.velocity.x*this.friction+this.gravity.x;
    // this.velocity.y = this.velocity.y*this.friction+this.gravity.y;
    // this.position.x = this.position.x+this.velocity.x;
    // this.position.y = this.position.y+this.velocity.y;
    console.log(this.velocity);
  }
  
  particle.prototype.accelerate= function(accel) {
    this.velocity.add(accel);
  }
  
  particle.prototype.distanceTo= function(p2) {
    var dx = p2.position.x - this.position.x,
      dy = p2.position.y - this.position.y;
  
    return Math.sqrt(dx * dx + dy * dy);
  }
  
  particle.prototype.gravitateTo= function(p2) {
    var grav = new Vec2(0, 0),
      dist = this.distanceTo(p2);
  
    grav.setLength(p2.mass / (dist * dist));
    grav.setAngle(this.angleTo(p2));
    this.velocity.add(grav);
  }
  
  particle.prototype.angleTo= function(p2) {
    return Math.atan2(p2.position.y - this.position.y, p2.position.x - this.position.x);
  }
  