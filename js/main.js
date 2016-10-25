import createAsteroides from "./createAsteroids.js";
import Controles from "./controls.js";

// MOVEMENT CONTROLS FOR SHIP

// declare & initialize movement variables
var xPosition = 100;
var yPosition = 100;
var xSpeed = 1;
var ySpeed = 0;
var maxSpeed = 5;

// declare & initialize controller variables
var controles = {
  upPressed : 0,
  downPressed : 0,
  leftPressed : 0,
  rightPressed : 0

}




function slowDownX()
{
  if (xSpeed > 0)
    xSpeed = xSpeed - 1;
  if (xSpeed < 0)
    xSpeed = xSpeed + 1;
}

function slowDownY()
{
  if (ySpeed > 0)
    ySpeed = ySpeed - 1;
  if (ySpeed < 0)
    ySpeed = ySpeed + 1;
}



var shipHealth = 1000;
var loopCounter = 0;
var asteroidCounter = 0;




function gameLoop()
{

  // SPACESHIP MOVEMENT

  // new position
  xPosition = xPosition + xSpeed;
  yPosition = yPosition + ySpeed;

  // actually change on-screen position by adjusting CSS
  document.getElementById('ship').style.left = xPosition;
  document.getElementById('ship').style.top = yPosition;

  // change speed when user presses keys
  if (controles.upPressed == 1)
    ySpeed = Math.max(ySpeed - 1,-1*maxSpeed);
  if (controles.downPressed == 1)
    ySpeed = Math.min(ySpeed + 1,1*maxSpeed)
  if (controles.rightPressed == 1)
    xSpeed = Math.min(xSpeed + 1,1*maxSpeed);
  if (controles.leftPressed == 1)
    xSpeed = Math.max(xSpeed - 1,-1*maxSpeed);

  // deceleration
  if (controles.upPressed == 0 && controles.downPressed == 0)
     slowDownY();
  if (controles.leftPressed == 0 && controles.rightPressed == 0)
     slowDownX();

     // check position of ship on screen
     var shipBox = document.getElementById("ship").getBoundingClientRect();

     // ASTEROID MOVEMENT

     // count how many times we've been through the gameLoop
     loopCounter++;

     // every 33 cycles (three times a second), launch a new asteroid BY GIVING IT A CLASS OF "MOVING"
     // but only do this 100 times
     if (loopCounter >= 32 && asteroidCounter <= 99) {
       document.getElementById("asteroid" + asteroidCounter.toString()).className = "moving";
       asteroidCounter++;
       loopCounter = 0;
     }

     // every cycle, check & update status of each moving asteroid
     var arrayOfMovingAsteroids = document.getElementsByClassName("moving");
     for (var i=0; i < arrayOfMovingAsteroids.length; i++){

       // move current asteroid 2px to the left (but remove it from the "moving" array if it's already offscreen)
       if (parseInt(arrayOfMovingAsteroids[i].style.right) < 3000) {
        arrayOfMovingAsteroids[i].style.right = parseInt(arrayOfMovingAsteroids[i].style.right) + 5 + 'px';
      } else {
        arrayOfMovingAsteroids[i].className = "";
      }

      // get "bounding box" of current asteroid
      var asteroidBox = arrayOfMovingAsteroids[i].getBoundingClientRect();

      // detect if asteroid's bounding box overlaps with space ship's bounding box
      var collision = !(asteroidBox.right < shipBox.left ||
                      asteroidBox.left > shipBox.right ||
                      asteroidBox.bottom < (shipBox.top + 30) ||
                      asteroidBox.top > (shipBox.bottom - 30));

      if (collision) {
        shipHealth = (shipHealth - parseInt(arrayOfMovingAsteroids[i].style.height)); // ship loses number of health points relative to size of asteroid
        if (shipHealth >= 0) {
          document.getElementById("healthCounter").innerHTML = "SHIELDS: " + shipHealth;
        } else {
          document.getElementById("healthCounter").innerHTML = "GAME OVER";
          document.getElementById("ship").remove();  // ship disappears
        }
        var audio = new Audio('explosion.wav');  // load explosion sound (creative commons license: https://www.freesound.org/people/Veiler/sounds/264031/)
        audio.play();  // play explosion sound
        arrayOfMovingAsteroids[i].remove();  // asteroid disappears
      }

     }

  // loop
  setTimeout(gameLoop,10);
}
createAsteroides();
Controles();
gameLoop();

export default controles;
