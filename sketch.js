const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world;
var canvas, angle, tower, ground, cannon;
var balls = []
var boats= []
var boatAnimation=[]
var brokenboatAnimation=[]
var waterAnimation=[]
var score=0

function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  boatSpritedata = loadJSON("assets/boat/boat.json");
  boatSpritesheet = loadImage("assets/boat/boat.png");
  brokenboatSpritedata = loadJSON("assets/boat/broken_boat.json");
  brokenboatSpritesheet = loadImage("assets/boat/broken_boat.png");
  waterSpritedata = loadJSON("assets/water_splash.json");
waterSpritesheet = loadImage("assets/water_splash.png");
  backgroundsound=loadSound('assets/background_music.mp3')
}

function setup() {
  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;
  tower = new Tower(150, 350, 160, 310);
  ground = new Ground(0, height - 1, width * 2, 1);
  backgroundsound.play()
  backgroundsound.setVolume(0.5)
   //PI = 180
  cannon=new Cannon(180,110,110,50,-PI/4)
  var boatFrames = boatSpritedata.frames;
  for (var i = 0; i < boatFrames.length; i++) {
    var pos = boatFrames[i].position;
    var img = boatSpritesheet.get(pos.x, pos.y, pos.w, pos.h);
    boatAnimation.push(img);
  }
  var brokenboatFrames = brokenboatSpritedata.frames;
  for (var i = 0; i < brokenboatFrames.length; i++) {
    var pos = brokenboatFrames[i].position;
    var img = brokenboatSpritesheet.get(pos.x, pos.y, pos.w, pos.h);
    brokenboatAnimation.push(img);
  }
  var waterFrames = waterSpritedata.frames;
  for (var i = 0; i < waterFrames.length; i++) {
    var pos = waterFrames[i].position;
    var img = waterSpritesheet.get(pos.x, pos.y, pos.w, pos.h);
    waterAnimation.push(img);
  }
  
}

function draw() {
  background(189);
  image(backgroundImg, 0, 0, width, height);
  fill("green")
  textSize(40);
  text("Score : "+ score,width - 300, 50 )
  Engine.update(engine);

  tower.display();
  cannon.display()

  //!== not equal
  for (var i = 0; i < balls.length; i++) {
    showCannonBalls(balls[i], i);
    for (var j = 0; j < boats.length; j++) {
      if(balls[i]!==undefined && boats[i]!==undefined){
        if(Matter.SAT.collides(balls[i].body, boats[j].body).collided){
          score+=10
          boats[j].remove(j);
          Matter.World.remove(world, balls[i].body);
          balls.splice(i, 1);
          i--;
        }
      }  
    }
  }

  showBoats()
}

function keyPressed(){
  if(keyCode===DOWN_ARROW){
    var cannonBall = new CannonBall(cannon.x, cannon.y);
    balls.push(cannonBall);
  }
}

function showCannonBalls(ball, index) {
  ball.display();
  ball.animate();
  if (ball.body.position.x >= width || ball.body.position.y >= height - 50) {
    if (!ball.isSink) {
      ball.remove(index);
    }
  }
}

function keyReleased(){
  if(keyCode===DOWN_ARROW){
    balls[balls.length - 1].shoot()
  }
}

function showBoats() {
  if (boats.length > 0) {
    if (
      boats.length < 4 &&
      boats[boats.length - 1].body.position.x < width - 300
    ) {
      var positions = [-130, -100, -120, -80];
      var position = random(positions);
      var boat = new Boat(width,height - 10, 200, 200, position,boatAnimation);
      boats.push(boat);
    }

    for (var i = 0; i < boats.length; i++) {
      Matter.Body.setVelocity(boats[i].body, {
        x: -0.9,
        y: 0
      });

      boats[i].display();
      boats[i].animate();
      if(Matter.SAT.collides(tower.body,boats[i].body).collided){
        swal({
          title:"Game Over",
          confirmButtonText: "Play Again"
        },
        function(isConfirm){
          if(isConfirm){
            location.reload()
          }
        }
        )
      }
    }
  } else {
    var boat = new Boat(width, height - 10, 200, 200, -100,boatAnimation);
    boats.push(boat);
  }
}
