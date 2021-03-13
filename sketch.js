var path,mainCyclist;
var pathImg,mainRacerImg1,mainRacerImg2,cycleBell,
pinkCG,yellowCG,redCG,oppPlayer1,oppPlayer2,oppPlayer3,opI1,opI2,opI3,gameOverI,gameOver,obstacle1,obstacle2,obstacle3,obstacleCG;
var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0;

function preload(){
  
  pathImg = loadImage("Road.png");
  obstacle1 = loadImage("obstacle1.png")
  obstacle2 = loadImage("obstacle2.png")
  obstacle3 = loadImage("obstacle3.png")
  gameOverI = loadImage("gameOver.png")
  cycleBell = loadSound("bell.mp3")
  oppPlayer1 = loadAnimation("opponent1.png","opponent2.png");
  opI1 = loadAnimation("opponent3.png")
  oppPlayer2 = loadAnimation("opponent4.png","opponent5.png")
  opI2 = loadAnimation("opponent6.png")
  oppPlayer3 = loadAnimation("opponent7.png","opponent8.png")
  opI3 = loadAnimation("opponent9.png")
  mainRacerImg1 = loadAnimation("mainPlayer1.png","mainPlayer2.png");
  mainRacerImg2= loadAnimation("mainPlayer3.png");
}

function setup(){
  
createCanvas(500,300);
  
// Moving background
path=createSprite(100,150);
path.addImage(pathImg);
path.velocityX = -5;

//creating boy running
mainCyclist  = createSprite(70,150,20,20);
mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
  mainCyclist.addAnimation("collided",mainRacerImg2);
mainCyclist.scale=0.07;

yellowCG = createGroup();
redCG = createGroup();
pinkCG = createGroup();
obstacleCG = createGroup();
  
gameOver = createSprite(250,150,10,10)  
gameOver.addImage("end Image",gameOverI)  
gameOver.visible = false

mainCyclist.setCollider("rectangle",0,0,3,3)
mainCyclist.debug = false
  
  
}

function draw() {
  background("red");
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: "+ distance,350,30);
  
  if(gameState===PLAY){
  
   mainCyclist.y = World.mouseY;
  
   edges= createEdgeSprites();
   mainCyclist .collide(edges);
   distance = distance + Math.round(getFrameRate()/60)
  //code to reset the background
  if(path.x < 0 ){
    path.x = width/2;
  }
    path.velocityX =  -(6+2*distance/150)  
    redCyclists.velocityX =  -(6+2*distance/150) 
    yellowCyclists.velocityX =  -(6+2*distance/150) 
    pinkCyclists.velocityX =  -(6+2*distance/150) 
    obstacles.velocityX =  -(6+2*distance/150) 
    
    if(keyWentDown("space")){
      cycleBell.play();
    }
    
    var selectPlayer = Math.round(random(1,3));
    
    if(World.frameCount % 150 === 0){
      if(selectPlayer === 3){
        redCyclists()
      }
      else if (selectPlayer === 1){
        yellowCyclists()
      }
      else if(selectPlayer === 2){
        pinkCyclists()
      }
    }
    
    
    if(mainCyclist.isTouching(redCG)||mainCyclist.isTouching(yellowCG)||mainCyclist.isTouching(pinkCG)||mainCyclist.isTouching(obstacleCG)){
      gameState = END
    }
    obstacles();    
    
    
    


}
if (gameState === END ){
  gameOver.visible = true 
  redCG.destroyEach();
  redCG.velocityX = 0
  redCG.setLifetime = -1
  pinkCG.destroyEach();
  pinkCG.velocityX = 0 
  pinkCG.setLifetime = -1
  yellowCG.destroyEach();
  yellowCG.velocity = 0
  yellowCG.setLifetime = -1
  mainCyclist.changeAnimation("collided",mainRacerImg2)
  path.velocityX = 0
  obstacleCG.destroyEach();
  obstacleCG.setLifetime = -1
  
  
  if(keyDown("UP_ARROW")){
    reset();
  }
  
  text("Press up arrow to restart",150,200)
}  
}
    
 



function pinkCyclists(){
  var player1 = createSprite(0,150,10,10 );
  player1.scale = 0.06;
  player1.addAnimation("opponent1",oppPlayer1);
  player1.setLifetime = 170;
  player1.y = Math.round(random(50,250));
  player1.velocityX = 2
  pinkCG.add(player1);
  return pinkCyclists;
  
}

function yellowCyclists(){
  var player2 = createSprite(0,Math.round(random(50,200),10,10 ));
  player2.scale = 0.06;
  player2.addAnimation("opponent2",oppPlayer2);
  player2.setLifetime = 170;
  player2.velocityX = 2
  
  yellowCG.add(player2);
  return yellowCyclists;
  
}

function redCyclists(){
   var player3 = createSprite(0,Math.round(random(50,200)),10,10)
  player3.scale = 0.06;
  player3.addAnimation("opponent3",oppPlayer3);
  player3.setLifetime = 170;
  player3.velocityX = 2
  
  redCG.add(player3);
  return redCyclists;
  
  
}
function reset(){
  gameState = PLAY
  gameOver.visible = false
  distance = 0
  mainCyclist.changeAnimation("SahilRunning",mainRacerImg1)
  
}

function obstacles(){
  if (frameCount % 60 === 0){
   var obstacle = createSprite(500,Math.round(random(50,200)),10,40);
   obstacle.velocityX = -2
   obstacle.scale = 0.1
    obstacle.setLifetime = 170
  obstacleCG.add(obstacle)
    //generate random obstacles
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
    }
  }
  
  
}
