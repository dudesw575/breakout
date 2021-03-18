var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");
var deltaX = 0;
var deltaY = 0;

window.addEventListener("keydown", keysPressed, false);
window.addEventListener("keyup", keysReleased, false);

var keys = [];

function keysPressed(e) {
    keys[e.keyCode] = true;
    // left
    if (keys[37]) {
        if (deltaX != 10)
      deltaX -= 10;
    }
    // right
    if (keys[39]) {
      deltaX += 10;
    }
    // down
    if (keys[38]) {
      deltaY -= 10;
    }
    // up
    if (keys[40]) {
      deltaY += 10;
    }
    e.preventDefault();
 
    drawRectangle();
}
 
function keysReleased(e) {
    keys[e.keyCode] = false;
}       


function drawRectangle() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    // the rectangle
    ctx.rect(337.5 + deltaX , 550 + deltaY, 75, 25);
    ctx.fillStyle = "gray";
    ctx.fill();
}

