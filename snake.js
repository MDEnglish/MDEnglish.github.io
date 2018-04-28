

//settings
var snakeX = 2;
var snakeY = 2;
var height = 28;
var width = 50;
var interval = 100;
var increment = 4;

//game variables
var length = 0;
var tailX = [snakeX];
var tailY = [snakeY];
var fX;
var fY;
var running = false;
var gameOver = false;
var direction = -1; // up = 0, down = -1, left = 1, right = 2
var int;
var score = 0;
//temporary direction (this fixes users pressing keys too quickly and turning into themselves)
var tempdir = direction;

/**
* entry point of the game
*/
function run(){
    init();
    int = setInterval(gameLoop, interval);
}

function init(){
    createMap();
    createSnake();
    createFruit();
    alert("Feed your snake at least 6 cookies to continue!");
    alert("Use WASD to move.");
}

/**
* Generates the map for the snake
*/
function createMap(){
    document.write("<table>");

    for( var y = 0; y < height; y++){
        document.write("<tr>");
        for( var x = 0; x < width; x++){
            if(x == 0 || x == width -1 || y == 0 || y == height -1){
                document.write("<td class='wall' id='"+ x + "-" + y +"'></td>");
            }else{
                document.write("<td class='blank' id='"+ x + "-" + y +"'></td>");
            }
        }
        document.write("</tr>");
    }

    document.write("</table>");

}



function createSnake(){
    set(snakeX, snakeY, "snake");
}

function get(x,y){
    return document.getElementById(x+"-"+y);
}

function set(x,y,value){
    if(x != null && y != null)
        get(x,y).setAttribute("class", value);
}

function rand(min,max){
    return Math.floor(Math.random() * (max - min) + min);
}

function getType(x,y){
    return get(x,y).getAttribute("class");
}

function createFruit(){
    var found = false;
    while(!found && (length < (width-2)*(height-2)+1)){
        var fruitX = rand(1,width-1);
        var fruitY = rand(1,height-1);
        if(getType(fruitX, fruitY) == "blank")
            found = true;
    }
    set(fruitX, fruitY, "fruit");
    fX = fruitX;
    fY = fruitY;
}

/**
 * NOTE: notice use of new variable tempdir
 */
window.addEventListener("keypress", function key(event){
    //if key is W set direction up
    var key = event.keyCode;
    if(direction != -1 && (key == 119 || key == 87))
        tempdir = 0;
    //if key is S set direction down
    else if(direction != 0 && (key == 115 || key == 83))
        tempdir = -1;
    //if key is A set direction left
    else if(direction != 2 && (key == 97 || key == 65))
        tempdir = 1;
    //if key is D set direction right
    else if(direction != 1 && (key == 100 || key == 68))
        tempdir = 2;
    if(!running)
        running = true;
    else if(key == 32)
        running = false;
});

function gameLoop(){
    if(running && !gameOver){
        update();
    }else if(gameOver){
        if(length > 6){
          alert("You win! Wooooooooooooooo! On to the final challenge!");
          localStorage.setItem("taskNumber", 3);
          location.href = "./drag.html";
        } else {
          alert("Uh oh, you lost. Refreshing to try again.");
          location.reload();
        }
        clearInterval(int);
    }
}

/**
 * NOTE: notice use of new variable tempdir
 */
function update(){
    direction = tempdir;
    //prevents fruit from not showing up
    set(fX, fY, "fruit");
    //update the tail
    updateTail();
    //sets the last segment of the tail to blank  before moving the snake
    set(tailX[length], tailY[length], "blank");
    //updates the position of the snake according to the direction
    if(direction == 0)
        snakeY--;
    else if(direction == -1)
        snakeY++;
    else if(direction == 1)
        snakeX--;
    else if(direction == 2)
        snakeX++;
    //draws the head of the snake on the tail
    set(snakeX, snakeY, "snake");
    //checks for collisions with self
    for(var i = tailX.length-1; i >=0; i--){
        if(snakeX == tailX[i] && snakeY == tailY[i]){
            gameOver = true;
            break;
        }
    }
    //checks for collision with wall
    if(snakeX == 0 || snakeX == width-1 || snakeY == 0 || snakeY == height-1)
        gameOver = true;
    //checks for collisions with fruit
    else if(snakeX == fX && snakeY == fY){
        //adds 4 to the score
        score+=4;
        //creates new fruit, which automatically replaces the old one
        createFruit();
        //adds the set increment to the length of the snake making it longer
        length+=increment;
    }
    //set
    document.getElementById("score").innerHTML = "Score: "+ score;
}

function updateTail(){
    for(var i = length; i > 0; i--){
        tailX[i] = tailX[i-1];
        tailY[i] = tailY[i-1];
    }
    tailX[0] = snakeX;
    tailY[0] = snakeY;
}

run();
