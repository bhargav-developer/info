// game constants
let inputdir = { x: 0, y: 0 };
const foodsound = new Audio('img/food.mp3')
const gameover = new Audio('img/gameover.mp3');
const movesound = new Audio("img/move.mp3");
let speed = 7;
let score = document.getElementById('score');
let lastpainttime = 0;
let snakearr = [
    { x: 13, y: 15 }
]
food = { x: 6, y: 7 };
// game functions 
function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if ((ctime - lastpainttime) / 1000 < 1 / speed) {
        return;
    }
    lastpainttime = ctime;
    gameEngine();

}

function isCollide(snake) {
    // if u bump into yourself.
    for (let i = 1; i < snakearr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {

            return true;
        }
    }
    // if u clash in brick
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true;

    }
}
function gameEngine() {
    // part1: updating the snake array.
    if (isCollide(snakearr)){

    gameover.play()
        inputdir = { x: 0, y: 0 };
        alert("Game Over. press any ENTER to restart !")
        snakearr = [{ x: 13, y: 15 }];
        score = 0;

    }
    // if u have eaten the food , incerement the score and regenerate the food.
    if (snakearr[0].y === food.y && snakearr[0].x === food.x) {
        foodsound.play();
        score += 1;
        if (score > hiscoreval) {
            hiscoreval = score;
            localStorage.setItem('hiscore', JSON.stringify(hiscoreval));
            hiscorebox.innerHTML = "high score: " + hiscoreval;



        }
        scorebox.innerHTML = "score : " + score;
        snakearr.unshift({ x: snakearr[0].x + inputdir.x, y: snakearr[0].y + inputdir.y });
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
    }

    // moving the snake.
    for (let i = snakearr.length - 2; i >= 0; i--) {
        // const element = array[i];
        snakearr[i + 1] = { ...snakearr[i] }

    }
    snakearr[0].x += inputdir.x;
    snakearr[0].y += inputdir.y;


    //part2: render the snake and food.
    board.innerHTML = "";
    snakearr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    // display the food.
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);


}




// main logic will start here
let hiscore = localStorage.getItem('hiscorebox');
if (hiscore === null) {
    hiscoreval = 0;
    localStorage.setItem('hiscore', JSON.stringify(hiscoreval));
}
else {
    hiscoreval = JSON.parse(hiscore);
    hiscorebox.innerHTML = "high score: " + hiscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inpytdir = { x: 0, y: 0 }; // start the game.
    movesound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log('ArrowUp');
            inputdir.x = 0;
            inputdir.y = -1;

            break;
        case "ArrowDown":
            console.log('ArrowDown');
            inputdir.x = 0;
            inputdir.y = 1;

            break;
        case "ArrowLeft":
            console.log('ArrowLeft');
            inputdir.x = -1;
            inputdir.y = 0;

            break;
        case "ArrowRight":
            console.log('ArrowRight');
            inputdir.x = 1;
            inputdir.y = 0;

            break;
        // case "ArrowUp":
        //     console.log('ArrowUp')
        // break;

        default:
            break;
    }
});

