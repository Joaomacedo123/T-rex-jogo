
var trex ,trex_running, trex_collided;
var solo, solo_moving, solo_Invisible;
var nuvem, gruponuvem, nuvemimg;
var cacto, grupocacto, cacto1, cacto2, cacto3, cacto4, cacto5, cacto6;
var score;
var gamestate = "PLAY"
var PLAY = 1
var END = 0
var restart, restartimg, gameover, gameoverimg;
var morte, pulo, ponto;

function preload(){
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png")
  solo_moving = loadImage("ground2.png")
  trex_collided = loadAnimation("trex_collided.png")
  nuvemimg = loadImage("cloud.png")
  cacto1 = loadImage("obstacle1.png")
  cacto2 = loadImage("obstacle2.png")
  cacto3 = loadImage("obstacle3.png")
  cacto4 = loadImage("obstacle4.png")
  cacto5 = loadImage("obstacle5.png")
  cacto6 = loadImage("obstacle6.png")
  gameoverimg = loadImage("gameOver.png")
  restartimg = loadImage("restart.png")
  morte = loadSound("die.mp3")
  pulo = loadSound("jump.mp3")
  ponto = loadSound("checkpoint.mp3")

}



function setup(){
  createCanvas(windowWidth,windowHeight)
  
  //crie um sprite de trex
 trex = createSprite(50, windowHeight-30, 20, 50)
 trex.addAnimation("correndo", trex_running)
  trex.scale = 0.5 ;
  trex.addAnimation("morto", trex_collided)



  solo = createSprite(200, windowHeight-20, 400, 10 )
  solo.addImage("chão", solo_moving)

  solo_Invisible = createSprite(200, windowHeight-16, 400, 10)
  solo_Invisible.visible= false

  score = 0

  grupocacto= createGroup();
  gruponuvem= createGroup();

  gameover= createSprite(windowWidth/2, windowHeight/2)
  gameover.addImage(gameoverimg)
  gameover.scale= 0.5

  restart= createSprite(windowWidth/2, windowHeight/2 +40)
  restart.addImage(restartimg)
  restart.scale= 0.5
  
}

function cactos(){
  if(frameCount % 60 === 0 ){
    cacto = createSprite(windowWidth, windowHeight-30, 10, 40)
    cacto.velocityX = -(8 + score/200)

    var a = Math.round(random(1,6))
      switch(a){
      case 1: cacto.addImage(cacto1);
      break;
      case 2: cacto.addImage(cacto2);
      break;
      case 3: cacto.addImage(cacto3);
      break;
      case 4: cacto.addImage(cacto4);
      break;
      case 5: cacto.addImage(cacto5);
      break;
      case 6: cacto.addImage(cacto6);
      break;
    }
  cacto.scale= 0.5
  cacto.lifetime = 1000
  grupocacto.add(cacto)
  }
}
function nuvens(){
  if(frameCount % 60 === 0 ){
  nuvem = createSprite(windowWidth, 50, 40, 10)
  nuvem.velocityX = -3
  nuvem.y = random(10, windowHeight-100)
  nuvem.addImage(nuvemimg)
  nuvem.scale = 0.7
  nuvem.lifetime = 1000
  nuvem.depth = trex.depth
  trex.depth = trex.depth +1
gruponuvem.add(nuvem)
  }
}

function reset() {

gamestate = "PLAY"
grupocacto.destroyEach()
gruponuvem.destroyEach()
score= 0
}


function draw(){
  background("#adadad")
  solo.velocityX = -(8 + score/200)
  text("Placar: " + score, windowWidth-100, 40)
  trex.collide(solo_Invisible)
  drawSprites()
  



  if(gamestate === "PLAY") {
     if( touches.length>0 && trex.isTouching(solo) || keyDown("space") && trex.isTouching(solo)){
    trex.velocityY= -12
    pulo.play()
    touches = []
    } 

    score = score + Math.round(frameRate()/50)
    gameover.visible= false
    restart.visible= false

    trex.changeAnimation("correndo", trex_running)
    

    if(score%200 === 0 && score>0 ) {
    ponto.play()
    }


   
  trex.velocityY = trex.velocityY +0.9

    if(solo.x<0) {
    solo.x = solo.width/2
    }
  cactos()
  nuvens()

    if(grupocacto.isTouching(trex)) {
    gamestate = "END"
    morte.play()
    
    }

} else if(gamestate === "END") {

  grupocacto.setLifetimeEach(-1)
  gruponuvem.setLifetimeEach(-1)
solo.velocityX = 0
trex.velocityY = 0

if(touches(restart) ||mousePressedOver(restart)) {
reset()
}

gameover.visible = true
restart.visible= true

trex.changeAnimation("morto", trex_collided)


grupocacto.setVelocityXEach(0)
gruponuvem.setVelocityXEach(0)

}

}
