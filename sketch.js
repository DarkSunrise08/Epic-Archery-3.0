const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var canvas;
var player, playerBase, playerArcher;
var playerArrows = [];
var angle;


function preload() {
  backgroundImg = loadImage("./assets/background.png");
  baseimage = loadImage("./assets/base.png");
  playerimage = loadImage("./assets/player.png");
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);

  engine = Engine.create();
  world = engine.world;

  angleMode(DEGREES);

  var options = {
    isStatic: true
  };

  playerBase = Bodies.rectangle(200, 350, 180, 150, options);
  World.add(world, playerBase);

  player = Bodies.rectangle(250, playerBase.position.y - 160, 50, 180, options);
  World.add(world,player)

  playerArcher = new PlayerArcher(
    340,
    playerBase.position.y - 112,
    120,
    120
  );
}

function draw() {
  background(backgroundImg);

  Engine.update(engine);
  image(baseimage,playerBase.position.x,playerBase.position.y,180,150)
  image(playerimage,player.position.x,player.position.y,50,180)

  playerArcher.display();

  // Title
  fill("#FFFF");
  textAlign("center");
  textSize(40);
  text("EPIC ARCHERY", width / 2, 100);
  //keyPressed();
  //arrow.showArrows();
  for(var i = 0; i<playerArrows.length; i++){
    showArrows(playerArrows[i]);
  }
  //keyReleased();
  angle = playerArcher.angle;
  console.log(playerArcher);
}

function keyPressed(){
  if(keyCode == 32){
    arrow = new PlayerArrow(340,240,40,10,playerArcher.angle);
    Matter.Body.setAngle(arrow.body,angle)
    playerArrows.push(arrow);
  }
}

function showArrows(arrow){
  if(arrow){
    arrow.display();
  }
}

function keyReleased(){
  if(keyCode == 32){
    arrow.shoot(playerArcher.body.angle);
  }
}



