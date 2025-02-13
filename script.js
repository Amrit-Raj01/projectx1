const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Canvas size
canvas.width = 800;
canvas.height = 400;

// Paddle properties
const paddleWidth = 10, paddleHeight = 80;
const paddleSpeed = 5;

// Left paddle
const leftPaddle = {
    x: 10,
    y: canvas.height / 2 - paddleHeight / 2,
    dy: 0
};

// Right paddle
const rightPaddle = {
    x: canvas.width - 20,
    y: canvas.height / 2 - paddleHeight / 2,
    dy: 0
};

// Ball properties
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    speedX: 4,
    speedY: 4
};

// Draw paddles
function drawPaddle(paddle) {
    ctx.fillStyle = "yellow";
    ctx.fillRect(paddle.x, paddle.y, paddleWidth, paddleHeight);
}

// Draw ball
function drawBall() {
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fill();
}

// Move paddles
function movePaddles() {
    leftPaddle.y += leftPaddle.dy;
    rightPaddle.y += rightPaddle.dy;

    // Prevent paddles from going out of bounds
    if (leftPaddle.y < 0) leftPaddle.y = 0;
    if (leftPaddle.y > canvas.height - paddleHeight) leftPaddle.y = canvas.height - paddleHeight;
    if (rightPaddle.y < 0) rightPaddle.y = 0;
    if (rightPaddle.y > canvas.height - paddleHeight) rightPaddle.y = canvas.height - paddleHeight;
}

// Move ball
function moveBall() {
    ball.x += ball.speedX;
    ball.y += ball.speedY;

    // Ball collision with top and bottom walls
    if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
        ball.speedY *= -1;
    }

    // Ball collision with paddles
    if (
        (ball.x - ball.radius < leftPaddle.x + paddleWidth && 
         ball.y > leftPaddle.y && 
         ball.y < leftPaddle.y + paddleHeight) || 
        (ball.x + ball.radius > rightPaddle.x && 
         ball.y > rightPaddle.y && 
         ball.y < rightPaddle.y + paddleHeight)
    ) {
        ball.speedX *= -1; // Reverse ball direction
    }

    // Reset ball if it goes out
    if (ball.x < 0 || ball.x > canvas.width) {
        ball.x = canvas.width / 2;
        ball.y = canvas.height / 2;
        ball.speedX = -ball.speedX;
    }
}

// Update game frame
function update() {
    movePaddles();
    moveBall();
    
    // Clear canvas
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    drawPaddle(leftPaddle);
    drawPaddle(rightPaddle);
    drawBall();
    
    requestAnimationFrame(update);
}

// Paddle movement controls
document.addEventListener("keydown", (event) => {
    if (event.key === "w") leftPaddle.dy = -paddleSpeed;
    if (event.key === "s") leftPaddle.dy = paddleSpeed;
    if (event.key === "ArrowUp") rightPaddle.dy = -paddleSpeed;
    if (event.key === "ArrowDown") rightPaddle.dy = paddleSpeed;
});

document.addEventListener("keyup", (event) => {
    if (event.key === "w" || event.key === "s") leftPaddle.dy = 0;
    if (event.key === "ArrowUp" || event.key === "ArrowDown") rightPaddle.dy = 0;
});

// Start game loop
update();
