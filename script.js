var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var brickRowCount = 9;
var brickColumnCount = 5;

const brickInfo = {
    w: 70,
    h: 20,
    padding: 10,
    offsetX: 20,
    offsetY: 20,
    visible: true,
};
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: 10,
    speed: 4,
    dx: 2,
    dy: -2,
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

const bricks = [];
for (let i = 0; i < brickRowCount; i++) {
    bricks[i] = [];
    for (let j = 0; j < brickColumnCount; j++) {
        const x = i * (brickInfo.w + brickInfo.padding) + brickInfo.offsetX;
        const y = j * (brickInfo.h + brickInfo.padding) + brickInfo.offsetY;
        bricks[i][j] = { x, y, ...brickInfo };
    }
}

function drawBricks() {
    bricks.forEach((column) => {
        column.forEach((brick) => {
            ctx.beginPath();
            ctx.rect(brick.x, brick.y, brick.w, brick.h);
            ctx.fillStyle = brick.visible ? "#0095dd" : "transparent";
            ctx.fill();
            ctx.closePath();
        });
    });
}

bricks.forEach((column) => {
    column.forEach((brick) => {
        if (brick.visible) {
            if (
                ball.x - ball.size > brick.x && // left brick side check
                ball.x + ball.size < brick.x + brick.w && // right brick side check
                ball.y + ball.size > brick.y && // top brick side check
                ball.y - ball.size < brick.y + brick.h // bottom brick side check
            ) {
                ball.dy *= -1;
                brick.visible = false;

                increaseScore();
            }
        }
    });
});

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
    ball.dx = 3 * (Math.random() * 2 - 1);
    ball.dy = -3;
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

// window.addEventListener("keydown", movePaddle, false);

// function movePaddle(e) {
//     switch (e.keyCode) {
//         case 37: //left
//             if (paddle.x > 8) {
//                 paddle.x -= paddle.dx;
//             } else {
//             }
//             break;
//         case 39: //Right
//             if (paddle.x + paddle.w + 8 < canvas.width) {
//                 paddle.x += paddle.dx;
//             } else {
//             }
//             break;
//     }
//     e.preventDefault();
//     drawPaddle();
// }

document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

function keyDown(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        paddle.dx = paddle.speed;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        paddle.dx = -paddle.speed;
    }
}

function keyUp(e) {
    if (
        e.key === "Right" ||
        e.key === "ArrowRight" ||
        e.key === "Left" ||
        e.key === "ArrowLeft"
    ) {
        paddle.dx = 0;
    }
}

function movePaddle() {
    paddle.x += paddle.dx;

    // Wall detection
    if (paddle.x + paddle.w > canvas.width) {
        paddle.x = canvas.width - paddle.w;
    }

    if (paddle.x < 0) {
        paddle.x = 0;
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
