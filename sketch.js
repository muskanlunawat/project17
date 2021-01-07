//GameStates
var PLAY = 1;
var END = 0;
var gameState = PLAY;

//hungry monkey
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score, food, ground;

function preload(){
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
   createCanvas(600,400);
  
//Monkey
  monkey = createSprite(50, 250, 10, 10);
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale = 0.1;
  
  
  //Ground
  ground = createSprite(70, 390, 1200, 20);
  ground.velocityX = -4;
  ground.x=ground.width/2;
  ground.shapeColor = "yellow";
   //score
  score = 0;
  
  //Groups
  FoodGroup = createGroup();
  obstacleGroup = createGroup();
  
}


function draw() {
  
   background ("lightBlue");
  
   //displaying score
  stroke("black");
    fill("black");
      textSize(15);
  text("Score:"+  score, 480, 50);
  
   //Monkey
  monkey.collide(ground);
  
  //PLAY
  if(gameState === PLAY){
      
  if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //jump when the space key is pressed
    if(keyDown("space")&&monkey.y >= 240) {
        monkey.velocityY = -12;
    }    
  
  if(FoodGroup.isTouching(monkey)) {
      FoodGroup.destroyEach();
      score = score+1;
    }
   
  //Gravity
  monkey.velocityY = monkey.velocityY + 0.8;
  
    
  //Adding Functions
  food();
  obstacles();
    
     if(obstacleGroup.isTouching(monkey)){
        
        gameState = END;
      
    }
  }
  
 //END
   if (gameState === END) {
      ground.velocityX = 0;
    
    monkey.y = 235;
    monkey.scale = 0.12;
   
  
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
    fill("red")
    stroke("black")
    textSize(30);
    text("GAMEOVER!!!", 220, 170);
    fill("black");
    textSize(15);
    text("Press 'R' to play again", 240, 200);
    
    if (keyDown("r")){
      FoodGroup.destroyEach();
      obstacleGroup.destroyEach();
      monkey.changeAnimation("monkey", monkey_running);
      score = 0;
      bananaScore = 0;
      gameState = PLAY; 
    }
  }
   monkey.collide(ground);
     
 drawSprites();
}

//Banana
function food() {
  if (frameCount % 80 === 0) {
    banana = createSprite(400,350,40,10);
    banana.addImage(bananaImage);
    banana.y = Math.round(random(120,200));
    banana.scale = 0.1;
    banana.velocityX = -3;
    banana.lifetime = 200;
    FoodGroup.add(banana);
  }
}

//Obstacles
function obstacles() {
  if (frameCount % 300 === 0){
    obstacle = createSprite(250,365,10,10);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -3;
    obstacle.lifetime = 200;
    obstacle.scale = 0.1 ;
    obstacleGroup.add(obstacle);
  }

}








