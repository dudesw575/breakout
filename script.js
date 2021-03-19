var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");

const paddleHeight = 10;
const paddleWidth = canvas.width / 9;

let paddleX = (canvas.width - paddleWidth) / 2;
let paddleY = (canvas.height - paddleHeight) /10;

window.addEventListener("keydown", moveSomething, false);
  
function moveSomething(e) {
  switch(e.keyCode) {
      case 37: //left
        if (paddleX > 8 ) {
          paddleX -= 10;
        }
        else {}
          break;
      case 39: //Right
      if (paddleX + paddleWidth + 8 < canvas.width ) {
        paddleX += 10;
      }
      else {}
          break;
  }
  e.preventDefault();
  drawPaddle();
}

function drawPaddle() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    // the rectangle
    ctx.rect(paddleX, canvas.height - paddleHeight - 8, paddleWidth, paddleHeight);
    ctx.fillStyle = "gray";
    ctx.fill();
}


//draw paddle on load
window.onload = drawPaddle();