class Boat {
    constructor(x, y, width, height,Sreeram,boatAnimation) {
      var options = {
        restitution: 0.8,
        friction: 1.0,
        density: 1.0,
      };
      this.image = loadImage("assets/boat.png");
      this.width = width;
      this.height = height;
      this.Sreeram = Sreeram;
      this.boatAnimation=boatAnimation
      this.speed=0.05
      this.body = Bodies.rectangle(x, y, this.width, this.height, options);
    
      World.add(world, this.body);
    }
    remove(index) {
      this.boatAnimation=brokenboatAnimation
        this.speed=0.05
        this.width = 300;
        this.height = 300;  
        setTimeout(() => { 
        Matter.World.remove(world, boats[index].body);
        boats.splice(index, 1);
        },2000)
      }
    animate(){
      this.speed+=0.02
    }
    display() {
      var pos = this.body.position;
      var angle = this.body.angle;
      var index = floor(this.speed % this.boatAnimation.length);
      push()
      translate(pos.x, pos.y);
      rotate(angle);
      imageMode(CENTER);
      image(this.boatAnimation[index],  0, this.Sreeram, this.width, this.height);
      pop()
    }
  }
  