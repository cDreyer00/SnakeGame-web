let boardColor = "lime";
let headColor = "orange";
let tailColor = "lime";
let appleColor = "red";

let board;
let context;

let blockSize = 20;
let cols = 20;
let rows = 20;

let appleAudio;
let gameOverAudio;

let snakeX = 0;
let snakeY = 0;
let tail = [];

let foodX = 0;
let foodY = 0;

let score = 0;

let velocityX = 0;
let velocityY = 0;

let gameOver = false;

window.onload = () => {
    board = document.getElementById("board");
    context = board.getContext('2d');

    // appleAudio = new Audio("soundSource");
    // gameOverAudio = new Audio("soundSource");

    board.width = cols * blockSize;
    board.height = rows * blockSize;

    document.addEventListener("keyup", changeDirection);
    board.addEventListener("click", () => {
        gameOver = false;
        score = 0;
    });
    
    foodPlace();
    setInterval(update, 150);
}

function update() {
    // clear screen
    createRect(0, 0, board.width, board.height);

    if (gameOver) {
        createText("Game Over", board.width / 2, board.height / 2 - 25, "center", 50);
        createText(`Score: ${score}`, board.width / 2, board.height / 2 + 25, "center");
        createText("Clicck to Start Again", (cols * blockSize) / 2, board.height - 50, "center");
        return;
    }
    
    // write score
    createText(`Score: ${score}`, 30, 40);

    // create first food
    createRect(foodX, foodY, blockSize, blockSize, appleColor);

    // check if eat
    if (snakeX == foodX && snakeY == foodY) {
        tail.push([foodX, foodY]);
        score += 1;
        //appleAudio.play();
        foodPlace();
    }
    
    // snake tail
    for (let i = tail.length - 1; i > 0; i--) {
        console.log(tail[tail.length]);
        tail[i] = tail[i - 1];
    }

    if (tail.length) {
        tail[0] = [snakeX, snakeY];
    }

    // snake position and head color
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    createRect(snakeX, snakeY, blockSize, blockSize, headColor);

    // create tail
    for (let i = 0; i < tail.length; i++) {
        createRect(tail[i][0], tail[i][1], blockSize, blockSize, tailColor);
    }

    // hit the wall
    if (snakeX < 0 || snakeX > cols * blockSize || snakeY < 0 || snakeY > rows * blockSize) {
        gameOverEvent();
    }

    // hit itselft
    for (let i = 0; i < tail.length; i++) {
        if (snakeX == tail[i][0] && snakeY == tail[i][1]) {
            gameOverEvent()
        }
    }
}

function foodPlace() {
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}

function changeDirection(e) {
    if(e.code == "ArrowUp"){
        if(velocityY == 1)return;
        velocityX = 0;
        velocityY = -1;
    }
    if(e.code == "ArrowDown"){
        if(velocityY == -1)return;
        velocityX = 0;
        velocityY = 1;
    }

    if(e.code == "ArrowLeft"){
        if(velocityX == 1)return;
        velocityX = -1;
        velocityY = 0;
    }
    if(e.code == "ArrowRight"){
        if(velocityX == -1)return;
        velocityX = 1;
        velocityY = 0;
    }    
}

function gameOverEvent() {
    gameOver = true;
    //gameOverAudio.play();
    tail = [];
    snakeX = 0;
    snakeY = 0;
    velocityX = 1;
    velocityY = 0;
 }

function createRect(x, y, width, height, color = "black") { 
    context.fillStyle = color;
    context.fillRect(x, y, width, height);
}

function createText(text, x, y, textAlign = "start", fontSize = 20) { 
    context.fillStyle = "lime";
    context.font = `${fontSize}px Roboto Mono`;
    context.textAlign = textAlign;
    context.fillText(text, x, y);

}


// Scores
const highScores = localStorage.setItem("highScores", JSON.stringify([]));
console.log(JSON.parse(localStorage.getItem("highScores")));
function saveScore(name){
    var ls = localStorage.getItem(name);
    if(ls != null)
        ls.
    localStorage.setItem(name)
}