var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var survivalTime=0;
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
   
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale=0.1
  
  ground=createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.X=ground.width/2;
  console.log(ground.x)
  
  bananaGroup=new Group();
  obstacleGroup=new Group();
  
}

function spawnFood(){
  
  if(frameCount%80===0){
    banana=createSprite(600,250,40,10);
    banana.y=random(120,200);
    banana.velocityX =-5;
    
    banana.lifetime = 300;
    
    banana.addImage(bananaImage);
    banana.scale=0.05;
    
    bananaGroup.add(banana);
  }
}

function spawnObstacles(){
  if(frameCount%300===0){
    obstacle=createSprite(600,310,40,10);
    obstacle.lifetime = 300;
    obstacle.addImage(obstacleImage);
    obstacleGroup.add(obstacle);
    obstacle.velocityX = -5;
    obstacle.scale = 0.2;
  }
}

function draw() {
   background(255);
  
  if(ground.x<0){
    ground.x=ground.width/2;
  }
  if(keyDown("space"))  {
    monkey.velocityY=-12;
  }
  console.log(monkey.y);
  monkey.velocityY=monkey.velocityY +0.8;
  
  monkey.collide(ground);
  
  
  stroke("white");
  textSize(20);
  fill("white");
  text("score: "+ score , 500,50);
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate())
  text("Survival Time:"+ survivalTime,100,50);
  
  if(obstacleGroup.isTouching(monkey)){
    ground.velocityX = 0;
    monkey.velocity = 0;
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
  }
  
  spawnFood();
  spawnObstacles();
  
drawSprites();
}
