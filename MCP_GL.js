// Get the HTML element that displays the player's status
let playerText = document.getElementById('playerStatus')

// Get the restart button element
let restartButtn = document.getElementById('restartButton')

// Get all elements with the class name 'box' (the game board cells) and convert to an array
let gameBoard = Array.from(document.getElementsByClassName('box'))

// Get the CSS custom property value for the winning block color
let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winningBlocks')

// Define the two possible players
const PlayerO = "O"
const PlayerX = "X"

// Set the initial player to PlayerX
let currentPlayer = PlayerX

// Initialize an array to track the state of the game board, with 9 empty slots
let spaces = Array(9).fill(null)

// Initialize a counter to track the number of plays made
let countPlays = 0

// Flag to check if the game is over
let gameOver = false

// Object to keep track of the scores for each player
let scores = {
    X: 0,
    O: 0
}

// Function to start the game by adding click event listeners to each box
const gameStart = () => {
    gameBoard.forEach(box => box.addEventListener('click', boxClicked))
}

// Function that handles what happens when a box is clicked
function boxClicked(e) {
    const id = e.target.id // Get the id of the clicked box

    // Check if the box is empty and if the number of plays is less than 9
    if(!spaces[id] && countPlays < 9) {
        spaces[id] = currentPlayer // Mark the box with the current player's symbol
        e.target.innerText = currentPlayer // Display the symbol in the clicked box

        // Check if the current player has won
        if(playerWon() !== false) {
            playerText.innerHTML = `Status: Player ${currentPlayer} has won!` // Update the status text
            let winning_blocks = playerWon() // Get the winning combination of boxes
            countPlays = 10 // Prevent further clicks by setting the count to 10
            winning_blocks.map(box => gameBoard[box].style.backgroundColor = winnerIndicator) // Highlight the winning boxes
            scoreUpdate(currentPlayer); // Update the score for the winning player
            gameOver = true;
            return
        }
        countPlays++ // Increment the play counter
        currentPlayer = currentPlayer == PlayerX ? PlayerO : PlayerX // Switch the current player
    }

    // If all boxes are filled and no one has won, it's a draw
    if(countPlays === 9) {
        playerText.innerHTML = 'Status: Game Draw! Both Player Lose' 
        gameBoard.forEach(box => box.style.color = 'red') // Change the color of all boxes to red
        resetScores(); // Reset the scores since it's a draw
        gameOver = true; 
    }
}

// Define all the possible winning combinations of box indices
const winCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

// Function to check if the current player has won
function playerWon() {
    for (const condition of winCombos) { // Loop through each winning combination
        let [a, b, c] = condition 

        // Check if the boxes in the current combination are all marked by the same player
        if(spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])) {
            return [a,b,c] // Return the winning combination if found
        }
    }
    return false 
}

// Add an event listener to the restart button to reset the game when clicked
restartButtn.addEventListener('click', restart)

// Function to restart the game
function restart() {
    // Prevent restart if more than two plays have been made and the game is not over
    if (countPlays >= 2 && !gameOver) {
        playerText.innerHTML = 'Status: Cannot restart after two clicked gameBoard unless the game is over!'
        return
    }
    
    spaces.fill(null) // Reset the game board state
    countPlays = 0 // Reset the play counter
    gameOver = false; 
    gameBoard.forEach(box => {
        box.innerText = '' // Clear the text in each box
        box.style.backgroundColor = '' 
        box.style.color = '#f2c14e' 
    })

    playerText.innerHTML = 'Status: None' // Reset the status text
    currentPlayer = PlayerX // Set the current player back to PlayerX
}

// Function to update the score for the current player
function scoreUpdate(turn){
    scores[turn]++; // Increment the score for the current player
    document.getElementById('score-' + turn).innerHTML = scores[turn]; // Update the score display
}

// Function to reset both players' scores
function resetScores() {
    scores.X = 0;
    scores.O = 0;
    document.getElementById('score-X').innerHTML = scores.X; // Update Player X's score display
    document.getElementById('score-O').innerHTML = scores.O; // Update Player O's score display
}

// Start the game by adding event listeners to the game board
gameStart()
