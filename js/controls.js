import controles from "./main.js"
function Controles (){

  document.addEventListener ("keyDown", (e) =>{

    if (e.keyCode == 38)
    controles.upPressed = 1;
    if (e.keyCode == 40)
    controles.downPressed = 1;
    if (e.keyCode == 37)
    controles.leftPressed = 1;
    if (e.keyCode == 39)
    controles.rightPressed = 1;
  });

  document.addEventListener ("keyUp", (e) =>{
    if (e.keyCode == 38)
    controles.upPressed = 0;
    if (e.keyCode == 40)
    controles.downPressed = 0;
    if (e.keyCode == 37)
    controles.leftPressed = 0;
    if (e.keyCode == 39)
    controles.rightPressed = 0;

  });

}
export default Controles;
