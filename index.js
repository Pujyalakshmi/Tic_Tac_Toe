// Step 1: Fetch elements needed
const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info")
const newGameBtn = document.querySelector(".btn");

// Step 2: Variables
let currentPlayer;
let gameGrid;

let winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// Step 4: let's create a function to initialise the game
function initGame(){
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    // UI pe bhi empty krna padega saare boxes isliye loop lagayenge
    boxes.forEach((box,index)=>{
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        // Initialise box with css properties again
        box.classList = `box box${index+1}`;
    })
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

initGame();

// Step 7
function swapTurn(){
    if(currentPlayer === 'X')
        currentPlayer = 'O';
    else
        currentPlayer = 'X';

    // UI me update 
    gameInfo.innerText = `Current Player - ${currentPlayer}`
}

// Step 8
function checkGameOver(){
    let winner = "";

    winningPositions.forEach((position)=>{
        // all 3 boxes should be non-empty and exactly same in value
        if( (gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") && (gameGrid[position[0]] == gameGrid[position[1]]) && (gameGrid[position[1]] == gameGrid[position[2]])){
            // check if the winner is X
            if(gameGrid[position[0]] == "X")
                winner = "X";
            else
                winner = "O";

            // dispable pointerEvents as we got the winner so no player can play afterwards
            boxes.forEach((box)=>{
                box.style.pointerEvents = "none";
            })

            // Add a background color to the winner's position
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });

    // We have a winner
    if(winner !== ""){
        gameInfo.innerText = `Winner Player- ${winner}`;
        newGameBtn.classList.add("active");
    }

    // No Winner Found, Game Draw/Tie
    let fillCount = 0;
    gameGrid.forEach((box)=>{
        if(box !== "")
            fillCount++;
    })

    // board is filled, Game is TIE
    if(fillCount == 9){
        gameInfo.innerText = "Game Tied !";
        newGameBtn.classList.add("active");
    }
       
}

// Step 6
function handleClick(index){
    if(gameGrid[index] === ""){
        boxes[index].innerText = currentPlayer; /* UI Me chnage krti hai ye line*/
        gameGrid[index] = currentPlayer; /* Hmane jo gameGrid banaya hai usme change karo */
        boxes[index].style.pointerEvents = "none";
        // swap turn
        swapTurn();
        // check koi jeet toh nhi gaya 
        checkGameOver();
    }
}

// Step 5
boxes.forEach((box,index)=>{
    // Har ek box ke liye ye wala code execute hoga
    box.addEventListener("click",()=>{
        handleClick(index);
    });

})

newGameBtn.addEventListener("click",initGame);
