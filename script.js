var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

//canvas width = 750
//canvas height = 600

var ballRadius = 10;
var x = canvas.width / 2;
var y = canvas.height - 30;
var dx = 2;
var dy = -2;
var interval = setInterval(draw, 10);
let paddleHeight = 10;
let paddleWidth = canvas.width / 9;
let paddleX = (canvas.width - paddleWidth) / 2;
let paddleY = (canvas.height - paddleHeight) / 10;

function drawBall() {
    ctx.beginPath(); //circle center = 375, 570 starting
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
}

window.addEventListener("keydown", movePaddle, false);

function movePaddle(e) {
    switch (e.keyCode) {
        case 37: //left
            if (paddleX > 8) {
                paddleX -= 10;
            } else {
            }
            break;
        case 39: //Right
            if (paddleX + paddleWidth + 8 < canvas.width) {
                paddleX += 10;
            } else {
            }
            break;
    }
    e.preventDefault();
    drawPaddle();
}

function drawPaddle() {
    ctx.beginPath();
    // the rectangle
    ctx.rect(
        paddleX,
        canvas.height - paddleHeight - 8,
        paddleWidth,
        paddleHeight
    );
    ctx.fillStyle = "gray";
    ctx.fill();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if (y + dy < ballRadius) {
        dy = -dy;
    } else if (y + dy > canvas.height - ballRadius - paddleHeight - 8) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        } else {
            alert("GAME OVER");
            document.location.reload();
            clearInterval(interval);
        }
    }

    x += dx;
    y += dy;
}

//draw paddle on load
//window.onload = draw();
