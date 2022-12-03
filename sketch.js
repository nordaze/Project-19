var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  ghost = createSprite(300,300,20,20)
  ghost.addImage("ghost",ghostImg)
  ghost.velocityY = 2.5;
  ghost.scale = 0.3

  doorsGroup = createGroup()
  climbersGroup = createGroup()
  invisibleBlockGroup = createGroup()
} 

function draw() {
  background(200);
  
  if(gameState === "play"){

  if(tower.y > 600){
      tower.y = 0 
    }
  
  if(keyDown("SPACE")){
    ghost.velocityY = -12
  }
  ghost.velocityY = ghost.velocityY + 0.8    

  if(climbersGroup.isTouching(ghost)){
    ghost.velocityY = 0 
  }

  if(keyDown("RIGHT_ARROW")){
    ghost.x += 5
  }

  if(keyDown("LEFT_ARROW")){
    ghost.x += -5  
  }

  if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
    gameState = "end"
  }
  spawnDoor()

  }
 
  if(gameState === "end"){
    background("black")
    fill("yellow") 
    textSize(30)
    text("GAME OVER!", 200, 300) 
    ghost.destroy()
    tower.destroy()
    doorsGroup.destroyEach()
    climbersGroup.destroyEach()
    invisibleBlockGroup.destroyEach()  
  }
  

  drawSprites();
}

function spawnDoor(){ 
  if(frameCount % 360  === 0){  
  door = createSprite(Math.round(random(150,450)),0)
  door.addImage("door",doorImg)
  door.velocityY = 1
  door.scale = 0.75
  door.depth = ghost.depth
  ghost.depth += 1  
  doorsGroup.add(door)
  
  invisibleBlock = createSprite(door.x,65,80,10)
  invisibleBlock.velocityY = 1
  invisibleBlock.visible = false
  invisibleBlockGroup.add(invisibleBlock) 
  
  climber = createSprite(door.x,50)
  climber.addImage("climber",climberImg)
  climber.velocityY = 1
  climber.scale = 0.75 
  climbersGroup.add(climber)
 }
  
}