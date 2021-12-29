var bg, bgImg
var bottomGround
var topGround
var boy,boyImg
var BoySideImg
var bg2Img
var droneImg, drone, droneGroup
var energyDrinkImg, energyDrink
var boosterImg, booster
var gameOver, gameOverImg
var restart, restartImg
var heart1, heart1Img, heart2, heart2Img, heart3, heart3Img
var score = 0
var lives = 3
var PLAY = 1
var END = 0
var gamestate = PLAY  

function preload() 
{

  bgImg = loadImage("assets/cyber city.png")
  bg2Img = loadImage("assets/cybercity2Img.jpeg")

  boyImg = loadAnimation("assets/boy.png", "assets/boyfire.png")
  boySideImg = loadAnimation("assets/boyBlueSide.png", "assets/boyRedSide.png", "assets/boyOrangeSide.png", )

  droneImg = loadImage("assets/droneImg.png")
  boosterImg = loadImage("assets/boosterImg.png")
  energyDrinkImg = loadImage("assets/energydrinkImg.png")

  gameOverImg = loadImage("assets/gameOver.png")
  restartImg = loadImage("assets/restart.png")

  heart1Img = loadImage("assets/heart_1.png")
  heart2Img = loadImage("assets/heart_2.png")
  heart3Img = loadImage("assets/heart_3.png")
}

function setup(){

//background image
  createCanvas(windowWidth,windowHeight);
  bg = createSprite(165,485,500,500);
  bg.addImage(bgImg);
  bg.scale = 1.3
  bg.velocityX = -3;
  bg.x = bg.width/4 ;

//creating top and bottom grounds
  bottomGround = createSprite(200,390,800,20);
  bottomGround.visible = false;

  topGround = createSprite(200,10,800,20);
  topGround.visible = false;
      
//creating boy    
  boy = createSprite(100,200,20,50);
  boy.addAnimation("boy", boyImg);
  boy.addAnimation("boySide", boySideImg )
  boy.scale = 0.3;  

  gameOver = createSprite(500,300);
  gameOver.addImage("gameOver", gameOverImg)
  gameOver.scale = 0.5
  gameOver.visible = true

  restart = createSprite(500,300);
  restart.addImage("restart", restartImg)
  restart.scale = 0.5
  restart.visible = true

  heart1 = createSprite(displayWidth -100, 30);
  heart1.addImage("heart1", heart1Img)
  heart1.scale = 0.4
  heart1.visible = false


  heart2 = createSprite(displayWidth -150, 30);
  heart2.addImage("heart2", heart2Img)
  heart2.scale = 0.4
  heart2.visible = false

  heart3 = createSprite(displayWidth -200, 30);
  heart3.addImage("heart3", heart3Img)
  heart3.scale = 0.4
  heart3.visible = false

  droneGroup = new Group();

}

function draw() {
  
  background("black");
        
          if(gamestate === PLAY)
          {
            score = score + Math.round(frameCount/60);

            restart.visible = false
            gameOver.visible = false

            if(lives === 3)
            {
              heart3.visible = true
              heart1.visible = false
              heart2.visible = false
            }

            if(lives === 2)
            {
              heart2.visible = true
              heart1.visible = false
              heart3.visible = false
            }

            if(lives === 1)
            {
              heart1.visible = true
              heart2.visible = false
              heart3.visible = false
            }

            if(lives === 0)
            {
              gameState = END
            }

            if(keyDown("space")) 
            {
              boy.velocityY = -6 ;
            }
  
            if(boy.y < 220)
            {
              boy.changeAnimation("boySide", boySideImg); 
            }
  
            //adding gravity
            boy.velocityY = boy.velocityY + 2;
  
            
            if(bg.x <= 0)
            {
            bg.x = bg.width/2 ;
            }    
            
        drawSprites();
        spawnObstacles();
        spawnEnergyDrinks();
        spawnBooster();

        text("score:" + score, displayWidth -100, 30)
        textSize(20)

        if(droneGroup.isTouching(boy))
        {
          lives -= 1
        }
          
}
        if(gameState = END)
        {
          gameOver.visible = true
          gameOver.depth += 1 
          restart.visible = true
          restart.depth += 1 
          drone.velocityX = 0
          energyDrink.velocityX = 0
          booster.velocityX = 0
        }

}

function spawnObstacles(){
  if(World.frameCount%100 === 0)
  {
    drone = createSprite(1000,100,10,10)
    drone.addImage("drone", droneImg);
    drone.scale = 0.15;
    
    drone.velocityX = -4;

    drone.y = Math.round(random(10,600))
    drone.lifetime = 400

    droneGroup.add(drone);
  }
}

function spawnEnergyDrinks(){
  if(World.frameCount%150 === 0)
  {
    energyDrink = createSprite(1000,100,10,10)
    energyDrink.addImage("energyDrink", energyDrinkImg);
    energyDrink.scale = 0.15;
    
    energyDrink.velocityX = -4;

    energyDrink.y = Math.round(random(10,600))
    energyDrink.lifetime = 400
  }

}

function spawnBooster(){
if(World.frameCount%200 === 0){
    booster = createSprite(1000,100,10,10)
    booster.addImage("booster", boosterImg);
    booster.scale = 0.15;
    
    booster.velocityX = -4;

    booster.y = Math.round(random(10,600))
    booster.lifetime = 400
}
}

