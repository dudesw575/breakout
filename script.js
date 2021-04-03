var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var brickRowCount = 9;
var brickColumnCount = 5;

let leftArrow = false;
let rightArrow = false;

let LIFE = 3;

const brick = {
    row: 4,
    column: 10,
    width: 55,
    height: 20,
    offSetLeft: 20,
    offSetTop: 20,
    marginTop: 40,
    fillColor: "#2e3548",
    strokeColor: "#FFF",
};

const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: 10,
    speed: 8,
    dx: 7,
    dy: -7,
    visible: true,
};

const paddle = {
    x: canvas.width / 2,
    y: canvas.height - 25,
    w: 90,
    h: 15,
    speed: 8,
    dx: 20,
    visible: true,
};

var interval = setInterval(draw, 10);

let bricks = [];

function createBricks() {
    for (let r = 0; r < brick.row; r++) {
        bricks[r] = [];
        for (let c = 0; c < brick.column; c++) {
            bricks[r][c] = {
                x: c * (brick.offSetLeft + brick.width) + brick.offSetLeft - 11,
                y:
                    r * (brick.offSetTop + brick.height) +
                    brick.offSetTop +
                    brick.marginTop,
                status: true,
            };
        }
    }
}

createBricks();

function drawBricks() {
    for (let r = 0; r < brick.row; r++) {
        for (let c = 0; c < brick.column; c++) {
            let b = bricks[r][c];
            // if the brick isn't broken
            if (b.status) {
                ctx.fillStyle = brick.fillColor;
                ctx.fillRect(b.x, b.y, brick.width, brick.height);

                ctx.strokeStyle = brick.strokeColor;
                ctx.strokeRect(b.x, b.y, brick.width, brick.height);
            }
        }
    }
}

function ballBrickCollision() {
    for (let r = 0; r < brick.row; r++) {
        for (let c = 0; c < brick.column; c++) {
            let b = bricks[r][c];
            // if the brick isn't broken
            if (b.status) {
                if (
                    ball.x + ball.size > b.x &&
                    ball.x - ball.size < b.x + brick.width &&
                    ball.y + ball.size > b.y &&
                    ball.y - ball.size < b.y + brick.height
                ) {
                    //BRICK_HIT.play();
                    ball.dy = -ball.dy;
                    b.status = false; // the brick is broken
                    //SCORE += SCORE_UNIT;
                }
            }
        }
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
}

function moveBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;
}

function ballWallCollision() {
    if (ball.x + ball.size > canvas.width || ball.x - ball.size < 0) {
        ball.dx = -ball.dx;
    }

    if (ball.y - ball.size < 0) {
        ball.dy = -ball.dy;
    }

    if (ball.y + ball.size > canvas.height) {
        LIFE--;
        resetBall();
    }
}

function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = paddle.y - ball.size;
    ball.dx = 6 * (Math.random() * 3 - 1);
    ball.dy = -6;
}

function ballPaddleCollision() {
    if (
        ball.x < paddle.x + paddle.w &&
        ball.x > paddle.x &&
        paddle.y < paddle.y + paddle.h &&
        ball.y > paddle.y
    ) {
        let collidePoint = ball.x - (paddle.x + paddle.w / 2);
        collidePoint = collidePoint / (paddle.w / 2);
        let angle = (collidePoint * Math.PI) / 3;

        ball.dx = ball.speed * Math.sin(angle);
        ball.dy = -ball.speed * Math.cos(angle);
    }
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h);
    ctx.fillStyle = paddle.visible ? "#0095dd" : "transparent";
    ctx.fill();
    ctx.closePath();
}

document.addEventListener("keydown", function (event) {
    if (event.keyCode == 37) {
        leftArrow = true;
    } else if (event.keyCode == 39) {
        rightArrow = true;
    }
});
document.addEventListener("keyup", function (event) {
    if (event.keyCode == 37) {
        leftArrow = false;
    } else if (event.keyCode == 39) {
        rightArrow = false;
    }
});

function movePaddle() {
    if (rightArrow && paddle.x + paddle.w < canvas.width) {
        paddle.x += paddle.dx;
    } else if (leftArrow && paddle.x > 0) {
        paddle.x -= paddle.dx;
    }
}

function draw() {
    drawBricks();
    drawBall();
    drawPaddle();
}

function update() {
    movePaddle();
    moveBall();
    ballWallCollision();
    ballPaddleCollision();
    ballBrickCollision();
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    draw();
    update();
    requestAnimationFrame(gameLoop);
}

gameLoop();

//draw paddle on load
//window.onload = draw();
