const board = document.querySelector(".board");

var up = false;
var down = false;
var left = false;
var right = false;
var snakePositions = [];
var snakePositionsPrev = [];
var appleLocation;
var canChangeDirection = true;

var endGameSideWalls = false;
var endGameCollideSelf = true;
var gameSpeed = 300;
var score = 0;
var gameOver = false;
var color1 = 0;
var color2 = 255;


for(var i = 0; i < 144; i++){
    const tile = document.createElement("div");
    tile.classList.add("tile");
    // tile.textContent = i + 1;
    tile.id = "pos" + (i+1);
    board.append(tile);
}

var moveSnakeInterval = setInterval(moveSnake, gameSpeed);

function moveSnake(){
    snakePositionsPrev = [];
    for(var i = 0; i < snakePositions.length; i++){
        snakePositionsPrev.push(snakePositions[i]);
    }

    

    for(var i = 0; i < snakePositions.length; i++){
        document.getElementById("pos" + snakePositions[i]).style.background = null;
    }

    

    if(up == true){
        snakePositions[0] = snakePositions[0] - 12;
        if(snakePositions[0] <= 0){
            if(endGameSideWalls == true){
                clearInterval(moveSnakeInterval);
                console.log("Game over!");
                gameOver = true;
                return;
            }
            snakePositions[0] = snakePositionsPrev[0] + 132;
        }
        for(var i = 1; i < snakePositions.length; i++){
            snakePositions[i] = snakePositionsPrev[i - 1];
        }
    }

    if(right == true){
        snakePositions[0] = snakePositions[0] + 1;
        if(snakePositions[0]%12 == 1){
            if(endGameSideWalls == true){
                clearInterval(moveSnakeInterval);
                console.log("Game over!");
                gameOver = true;
                return;
            }
            snakePositions[0] = snakePositionsPrev[0] - 11;
        }
        for(var i = 1; i < snakePositions.length; i++){
            snakePositions[i] = snakePositionsPrev[i - 1];
        }
    }

    if(left == true){
        snakePositions[0] = snakePositions[0] - 1;
        if(snakePositions[0]%12 == 0){
            if(endGameSideWalls == true){
                clearInterval(moveSnakeInterval);
                console.log("Game over!");
                gameOver = true;
                return;
            }
            snakePositions[0] = snakePositionsPrev[0] + 11;
        }
        for(var i = 1; i < snakePositions.length; i++){
            snakePositions[i] = snakePositionsPrev[i - 1];
        }
    }

    if(down == true){
        snakePositions[0] = snakePositions[0] + 12;
        if(snakePositions[0] >= 145){
            if(endGameSideWalls == true){
                clearInterval(moveSnakeInterval);
                console.log("Game over!");
                gameOver = true;
                return;
            }
            snakePositions[0] = snakePositionsPrev[0] - 132;
        }
        for(var i = 1; i < snakePositions.length; i++){
            snakePositions[i] = snakePositionsPrev[i - 1];
        }

    

    }

    if(snakePositions[0] == appleLocation){
        snakePositions.push(snakePositions[snakePositions.length - 1]);
        document.querySelector(".apple").classList.remove("apple");
        createApple();
        score++;
        document.getElementById("score").textContent = "Score: " + score;
    }

    for(var i = 0; i < snakePositions.length; i++){
        color1 = i * 10;
        if(color1 >= 255){
            color1 = 255;
            color2 -=10;
            document.querySelector(".apple").style.background = "red";
            if(color2<=0){
                color2= 0;
            }
        }
        document.getElementById("pos"+snakePositions[i]).style.background = `rgb(${color2},0,${color1})`;
    }

    if(snakePositions.filter(item => item == snakePositions[0]).length == 2 && endGameCollideSelf == true){
        clearInterval(moveSnakeInterval);
        console.log("Game Over");
        gameOver = true;
        return;
    }

    canChangeDirection = true;
}



function createSnake(){

    var snakeStartPosition = Math.floor(Math.random() * 105);
    while (snakeStartPosition < 40){
        snakeStartPosition = Math.floor(Math.random() * 105);
    }

    snakeStartPosition = 53;
    var snakeStartLength = 4;
    for(var i = 0; i < snakeStartLength; i++){
        document.getElementById("pos"+ (snakeStartPosition + (i * 12))).style.background = "red";
        snakePositions.push(snakeStartPosition + (i * 12));
    }
}

function createApple(){
    var randomInt = Math.floor(Math.random()*144);
    while(snakePositions.includes(randomInt) || randomInt == 0){
        console.log("Chosen new apple location!")
        randomInt = Math.floor(Math.random()*144);
    }
    console.log(randomInt);
    document.getElementById("pos" + randomInt).classList.add("apple");
    appleLocation = randomInt;
}

document.body.addEventListener("keydown", (e)=>{
    if(canChangeDirection == true){
        if(e.code == "ArrowUp" && down == false){
            up = true;
            down = false;
            left = false;
            right = false;
            canChangeDirection = false;
        }
        if(e.code == "ArrowDown" && up == false){
            up = false;
            down = true;
            left = false;
            right = false;
            canChangeDirection = false;
        }
        if(e.code == "ArrowLeft" && right == false){
            up = false;
            down = false;
            left = true;
            right = false;
            canChangeDirection = false;
        }
        if(e.code == "ArrowRight" && left == false){
            up = false;
            down = false;
            left = false;
            right = true;
            canChangeDirection = false;
        }
    }

    if(e.code == "Space" && gameOver == true){
        for(var i = 0; i < snakePositions.length; i++){
            document.getElementById("pos" + snakePositions[i]).style.background = null;
        }
        document.querySelector(".apple").classList.remove("apple");
        snakePositions = [];
        snakePositionsPrev = [];
        createSnake();
        createApple();
        up = false;
        down = false;
        left = false;
        right = false;
        gameOver = false;
        moveSnakeInterval = setInterval(moveSnake, gameSpeed);
        score = 0;
        document.getElementById("score").textContent = "Score: " + score;
    }

})

document.getElementById("endGameSideWallsCheckbox").addEventListener("change" ,()=>{
    if(endGameSideWalls == true){
        endGameSideWalls = false;
    }else{
        endGameSideWalls = true;
    }
})

document.getElementById("endGameCollideSelfCheckbox").addEventListener("change" ,()=>{
    if(endGameCollideSelf == true){
        endGameCollideSelf = false;
    }else{
        endGameCollideSelf = true;
    }
})

document.getElementById("gameSpeedBox").addEventListener("change" ,()=>{
    gameSpeed = document.getElementById("gameSpeedBox").value;
    clearInterval(moveSnakeInterval);
    moveSnakeInterval = setInterval(moveSnake, gameSpeed);
})



createSnake();
createApple();