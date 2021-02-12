var trex, treximage, edges, ground, groundimage, invisground,clouds,cloudimage,o1,o2,o3,o4,o5,o6,obstacles,obstaclesgroup,cloudsgroup,gameoverimage,restartimage,gameover,restart,trexpop,diesound,jumpsound,cpsound
var gamestate="play"
var score=0

function preload() {
  treximage = loadAnimation("trex1.png", "trex3.png", "trex4.png")
  groundimage = loadImage("ground2.png");
  cloudimage=loadImage("cloud.png")
  o1=loadImage("obstacle1.png")
    o2=loadImage("obstacle2.png")
    o3=loadImage("obstacle3.png")
    o4=loadImage("obstacle4.png")
    o5=loadImage("obstacle5.png")
    o6=loadImage("obstacle6.png")
  gameoverimage=loadImage("gameOver.png")
  restartimage=loadImage("restart.png")
  trexpop=loadImage("trex_collided.png")
  jumpsound=loadSound("jump.mp3")
  diesound=loadSound("die.mp3")
  cpsound=loadSound("checkPoint.mp3")
  
}

function setup() {
  createCanvas(600, 200);
  trex = createSprite(72, 178, 10, 10);
  trex.addAnimation("t1", treximage);
  trex.scale = 0.5;


ground = createSprite(200, 180, 400, 20);
  ground.addImage("g1", groundimage)

  invisground = createSprite(200, 200, 400, 20)
  invisground.visible = false
 
  obstaclesgroup=new Group()
  cloudsgroup=new Group()

  
  gameover=createSprite(300,80)
  restart=createSprite(300,120)
  gameover.addImage(gameoverimage)
  restart.addImage(restartimage)
  gameover.scale=0.5
  restart.scale=0.5
  gameover.visible=false
  restart.visible=false
  trex.addImage("trexpop",trexpop)
//trex.debug=true
  trex.setCollider("circle",0,0,40)
}

function draw() {
  background("white")
  drawSprites();
  textSize(13)
  text("score:"+score,440,35)
  trex.collide(invisground);
  if (gamestate=="play"){
    if (keyDown("space") && trex.collide(ground)) {
    trex.velocityY = -10
      jumpsound.play()
      
  }
    score=score+Math.round(getFrameRate() /60)
    
    trex.velocityY = trex.velocityY + 0.5
  ground.velocityX = -(5+score/100)
  edges = createEdgeSprites();
  if(score%100==0&&score>0){
    cpsound.play()
  }
    
  if (ground.x < 0) {
    ground.x = ground.width / 2
  
    
  }
    
  cloud();
  obstacle();
    if (obstaclesgroup.isTouching(trex)){
      gamestate="end"
      diesound.play() 
    }
  }
  else if(gamestate=="end"){
   gameover.visible=true
    restart.visible=true
    ground.velocityX=0
    trex.velocityY=0
    obstaclesgroup.setVelocityXEach(0)
    cloudsgroup.setVelocityXEach(0)
    obstaclesgroup.setLifetimeEach(-1)
    cloudsgroup.setLifetimeEach(-1)
    trex.changeImage("trexpop" ,trexpop)
    if (mousePressedOver(restart)){
  reset();
    
    }
    
  }
  
  
  
}

function cloud() {
  if(frameCount %60==0){
  
  var rand=Math.round(random(40,60))
  clouds=createSprite(600,40,10,10);
  clouds.addImage("cloud",cloudimage);
  clouds.scale= 0.5;
  clouds.depth=trex.depth
  trex.depth+=1
  clouds.velocityX=-3
    clouds.y=rand
    clouds.lifetime=200
    cloudsgroup.add(clouds)
  } 


}
  

 function obstacle(){
    if(frameCount %60==0) {
  
  var rand2=Math.round(random(1,6))
  obstacles=createSprite(600,165,10,10);
  obstacles.scale= 0.5;
      obstacles.velocityX=-(5+score/100)
      obstacles.lifetime= 120
      obstacles.depth=trex.depth
      trex.depth+=1
    switch(rand2){
      case 1: obstacles.addImage(o1)
        break
        case 2: obstacles.addImage(o2)
        break
        case 3: obstacles.addImage(o3)
        break
        case 4: obstacles.addImage(o4)
        break
        case 5: obstacles.addImage(o5)
        break
        case 6: obstacles.addImage(o6)
        break
        default:break
      
        
          
        }
        obstaclesgroup.add(obstacles)
      
    }
  
    }
   function reset(){
  gamestate="play"
  obstaclesgroup.destroyEach()
  cloudsgroup.destroyEach()  
     gameover.visible=false
     restart.visible=false
     trex.changeAnimation("t1",treximage)
     score=0
   }
 
 

