const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint = Matter.Constraint;

var snowImg, snowManImg, snowBallImg, boyImg, girlImg;
var girl, boy, snowMan, snowBall;
var engine, world;
var maxFlakes = 10;
var flakes = [];
var snowCreatedFrame = 0;
var slingShot;
var snowFallingMusic;

function preload() {
  snowImg = loadImage("snow2.jpg");
  snowManImg = loadImage("snowman.jpg");
  snowBallImg = loadImage("snowball.png");
  boyImg = loadImage("boy1.jpg");
  girlImg = loadImage("girl1.png");
  snowFallingMusic = loadSound("JoyMusic.mp3");

}

function setup() {
  createCanvas(1280,720);
  snowFallingMusic.loop();
  engine = Engine.create();
  world = engine.world;
  Engine.run(engine);
  snowMan = createSprite(1000, 600);
  snowMan.addImage("snowman",snowManImg);
  snowMan.scale = 0.2;

  boy = createSprite(700, 600);
  boy.addImage("boy",boyImg);
  boy.scale = 0.18;

  girl = createSprite(300, 600);
  girl.addImage("girl", girlImg);
  girl.scale = 0.5;

  snowBall = Bodies.circle(350,600,20);
  World.add(world,snowBall);

  if(frameCount % 5000 === 0){
    for(var i=0; i<maxFlakes; i++){
        flakes.push(new snowFlake(random(0,1280), random(0,720)));
    }
}
slingShot = new SlingShot(this.snowBall,{x:350,y:600});
}

function draw() {
  Engine.update(engine);
  background(snowImg); 
  textSize(30);
  fill("black");
  text("Drag snowball to hit the boy", 400, 30);
  text("Press Space key fr the second chance!!", 320, 60);
  drawSprites();
  slingShot.display();
  imageMode(CENTER)
  image(snowBallImg ,snowBall.position.x,snowBall.position.y,40,40);
  for(var i = 0; i<maxFlakes; i++){
    flakes[i].showFlake();
    flakes[i].update();
}
}
function mouseDragged(){
  Matter.Body.setPosition(this.snowBall,{x:mouseX,y:mouseY});
}
function mouseReleased(){
  slingShot.fly();
}
function keyPressed(){
  if(keyCode === 32){
      slingShot.attach(this.snowBall);
  }
}