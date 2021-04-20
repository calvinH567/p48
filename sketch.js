var acceleration = 3
var gameState = 1;
var currentWave = 1;
var asteroidHealth = 10;
var waveMultiplier = 10;

var defenseRating = 0;
var defenseOpinion
var kncokbackimg;
var asteroidimg
var knockbackIMG;

var cooldown = 2;
var damage = 1;
var abilityTotal
var ability1Used = 0
var ability2Used = 0
var cooldownCounter = cooldown;
var ability1Cooldown = 10//kncokback
var ability2cooldown = 20//teleport asteroid back
var spaceshipIMG
var asteroidScatter1;
var asteroidScatter2;
var asteroidScatter3;


function preload(){
  spaceshipIMG = loadImage("images.jpg");
  asteroidimg = loadAnimation("Asteroid.gif");
  kncokbackimg = loadImage("kb.jpg");
  knockbackIMG=loadImage("knockback.png");
}

function setup() {
  createCanvas(800,800);
  asteroid = createSprite(400, 0, 50, 50);
  spaceShip = createSprite(400,400,25,25,);
  asteroid.velocityY = 0;
  spaceShip.addImage("spsh",spaceshipIMG)
  spaceShip.scale = 0.2
  asteroid.addAnimation("asteroid",asteroidimg);
  
  asteroid.scale = 0.1
  asteroidScatter1 = new rock(Math.round(random(0,400)),0,asteroidHealth/10,1);
  asteroidScatter2 = new rock(Math.round(random(0,400)),0,asteroidHealth/10,2);
  asteroidScatter3 = new rock(Math.round(random(0,400)),0,asteroidHealth/10,3);
  
}

function draw() {
  background(0);  
  drawSprites();
  if(gameState ==1){
    if(ability1Cooldown>0){
      ability1Cooldown -=0.1;
    }else{
      if(keyDown("1")){
        //effect of ability1; knock everything back slightly
        asteroid.velocityY = -3;
        asteroidScatter1.y = -10;
        asteroidScatter2.y = -10;
        asteroidScatter3.y = -10;
        ability1Cooldown = 10;
        ability1Used = ability1Used + 1;//used to calculate damage increase
      }
    }
    if(ability2cooldown>0){
      ability2cooldown-=0.1;
    }else{
      if(keyDown("2")){
        //effect of ability2; teleport everything back 
        ability2cooldown=20;
        asteroid.y = 0;
        asteroidScatter1.y = -10;
        asteroidScatter2.y = -10;
        asteroidScatter3.y = -10;
        ability2Used = ability2Used + 1;//used to calculate damage gain
      }
    }
    if(asteroid.y>800||asteroidScatter1.y>800||asteroidScatter2.y>800||asteroidScatter3.y>800){
      gameState = 0;
    }
    if(asteroidHealth<1){
      //how asteroid hp is calculated
      if(currentWave%10!==0){
        currentWave = currentWave + 1
        asteroidHealth = waveMultiplier*currentWave;
      }else{
        if(frameCount%100==0){
          currentWave = currentWave + 1
          asteroidHealth = waveMultiplier*currentWave;
        }
      }
      //adds more multiplier every 10 waves
      if(currentWave%10 == 0){
        waveMultiplier = waveMultiplier + 5;
        
          
          textSize(12)
          text("Some of the frontlining spaceships will retreat back to earth, as they have run out of resources. The asteroids become stronger...",50,50);
          textSize(20)
          if(defenseRating>100){
            text("For now, you have done a GREAT job",50,250);
          }if(defenseRating>250){
            text("For now, you have done a OKAY job",50,250);
          }if(defenseOpinion>350){
            text("For now, you have done a DECENT job",50,250);
          }
          if(defenseOpinion<100){
            text("For now, you have done a PERFECT job",50,250);
          }
          
          console.log(currentWave)
        
      }

      //based on amount of abilities used in wave, it will increases damage
      asteroid.y = 0;
      abilityTotal = ability1Used + ability2Used;
      damage = damage + 10///abilityTotal;

    }else{
      //resets all asteroids scatters (unused)
      asteroidScatter1.y = 0;
      asteroidScatter1.health = asteroidHealth /10;

      asteroidScatter2.y = 0;
      asteroidScatter2.health = asteroidHealth /10;

      asteroidScatter3.y = 0;
      asteroidScatter3.health = asteroidHealth /10;
      //resets all asteroids scatters (unused)

      if(asteroidHealth<1){
         currentWave = currentWave + 1;//-------increases difficulty of hp and speed of asteroids
         acceleration = acceleration + 50.5;//speed difficulty increases
         scattershotDown = 0;//resets so it doesn't go up as much
      }
    }
    if(!asteroid.velocityY >=acceleration){
      //only used for the else function
    }else{
      asteroid.velocityY = asteroid.velocityY+0.1//gravitational pull towards earth
    }
    if(spaceShip.isTouching(asteroid)){
      cooldownCounter = cooldownCounter -0.1;
      if(cooldownCounter <0){//----cooldown for attack(spaceship must be touching                                
        cooldownCounter=cooldown//// the asteroid for cooldown to go down)
        asteroidHealth = asteroidHealth - damage;
      }
    
    }//drag movement
    spaceShip.x = mouseX;
    spaceShip.y = mouseY;
    
  
   

    //image(50,50,50,50,spaceshipIMG)

    //tutorial
    text("When an ability pops up, use the 1/2 keys to activate it",10,25);
    text("Hover the space ship over the asteroid",10,10);

    //displays hp
    fill("white")
    text(asteroidHealth,asteroid.x,asteroid.y);
    push ()

    //shows when ability is ready
    if(ability1Cooldown <=0){stroke("blue")}else{stroke("black")}
    fill (rgb(ability1Cooldown*25,ability1Cooldown*25,ability1Cooldown*25));
    image(knockbackIMG,200,700,50,50);

    //shows when ability is ready
    if(ability2cooldown <=0){stroke("blue")}else{stroke("black")}
    fill(rgb(ability2cooldown*12.5,ability2cooldown*12.5,ability2cooldown*12.5));
    image (kncokbackimg,600,700,50,50);

    pop ();
    asteroidScatter1.draw();
    asteroidScatter2.draw();
    asteroidScatter3.draw();
    if(asteroid.y>600){
      textSize(50);
      fill("red");
      text("DANGER ZONE!",400,400);
      defenseRating = defenseRating + 1;
      
    }
}else{

  //defeat text
  fill ("white");
  textSize(25)
  text ("The earth was destroyed! You survived for "+currentWave+" years",50,400);
}
}