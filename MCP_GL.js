let playerText = document.getElementById('playerStatus')
let restartButtn = document.getElementById('restartButton')
let gameBoard = Array.from(document.getElementsByClassName('box'))

let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winningBlocks')

const PlayerO = "O"
const PlayerX = "X"
let currentPlayer = PlayerX
let spaces = Array(9).fill(null)
let countPlays = 0

let gameOver = false; // New flag to track if the game is over

let scores = {
    X: 0,
    O: 0
}

const gameStart = () => {
    gameBoard.forEach(box => box.addEventListener('click', boxClicked))
}

function boxClicked(e) {
    const id = e.target.id

    if(!spaces[id] && countPlays < 9) {
        spaces[id] = currentPlayer
        e.target.innerText = currentPlayer

        if(playerWon() !== false) {
            playerText.innerHTML = `Status: Player ${currentPlayer} has won!`
            let winning_blocks = playerWon()
            countPlays = 10
            winning_blocks.map(box => gameBoard[box].style.backgroundColor = winnerIndicator)
            scoreUpdate(currentPlayer); // Pass the currentPlayer to scoreUpdate
            gameOver = true; // Set gameOver to true when a player wins
            return
        }
        countPlays++
        currentPlayer = currentPlayer == PlayerX ? PlayerO : PlayerX
    }

    if(countPlays === 9) {
        playerText.innerHTML = 'Status: Game Draw! Both Player Lose'
        gameBoard.forEach(box => box.style.color = 'red')
        resetScores(); // Reset the scores when the game is a draw
        gameOver = true; // Set gameOver to true when the game ends in a draw
    }
}

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

function playerWon() {
    for (const condition of winCombos) {
        let [a, b, c] = condition

        if(spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])) {
            return [a,b,c]
        }
    }
    return false
}

restartButtn.addEventListener('click', restart)

function restart() {
    if (countPlays >= 2 && !gameOver) {
        playerText.innerHTML = 'Status: Cannot restart after two clicked gameBoard unless the game is over!'
        return
    }
    
    spaces.fill(null)
    countPlays = 0
    gameOver = false; // Reset gameOver flag
    gameBoard.forEach(box => {
        box.innerText = ''
        box.style.backgroundColor = ''
        box.style.color = '#f2c14e'
    })

    playerText.innerHTML = 'Status: None'
    currentPlayer = PlayerX
}

function scoreUpdate(turn){
    scores[turn]++;
    document.getElementById('score-' + turn).innerHTML = scores[turn];
}

function resetScores() {
    scores.X = 0;
    scores.O = 0;
    document.getElementById('score-X').innerHTML = scores.X;
    document.getElementById('score-O').innerHTML = scores.O;
}

gameStart()