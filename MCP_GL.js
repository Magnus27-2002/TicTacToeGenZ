let playerText = document.getElementById('playerStatus')
let restartBtn = document.getElementById('restartBtn')
let boxes = Array.from(document.getElementsByClassName('box'))

let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks')

const O_TEXT = "O"
const X_TEXT = "X"
let currentPlayer = X_TEXT
let nextPlayer = O_TEXT
let spaces = Array(9).fill(null)
let count_plays = 0

let gameOver = false; // New flag to track if the game is over

let scores = {
    X: 0,
    O: 0
}

const startGame = () => {
    boxes.forEach(box => box.addEventListener('click', boxClicked))
}

function boxClicked(e) {
    const id = e.target.id

    if(!spaces[id] && count_plays < 9) {
        spaces[id] = currentPlayer
        e.target.innerText = currentPlayer

        if(playerHasWon() !== false) {
            playerText.innerHTML = `Status: Player ${currentPlayer} has won!`
            let winning_blocks = playerHasWon()
            count_plays = 10
            winning_blocks.map(box => boxes[box].style.backgroundColor = winnerIndicator)
            scoreUpdate(currentPlayer); // Pass the currentPlayer to scoreUpdate
            gameOver = true; // Set gameOver to true when a player wins
            return
        }
        count_plays++
        currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT
    }

    if(count_plays === 9) {
        playerText.innerHTML = 'Status: Game Draw! Both player Lose'
        boxes.forEach(box => box.style.color = 'red')
        resetScores(); // Reset the scores when the game is a draw
        gameOver = true; // Set gameOver to true when the game ends in a draw
    }
}

const winningCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

function playerHasWon() {
    for (const condition of winningCombos) {
        let [a, b, c] = condition

        if(spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])) {
            return [a,b,c]
        }
    }
    return false
}

restartBtn.addEventListener('click', restart)

function restart() {
    if (count_plays >= 2 && !gameOver) {
        playerText.innerHTML = 'Status: Cannot restart after two clicked boxes unless the game is over!'
        return
    }
    
    spaces.fill(null)
    count_plays = 0
    gameOver = false; // Reset gameOver flag
    boxes.forEach(box => {
        box.innerText = ''
        box.style.backgroundColor = ''
        box.style.color = '#f2c14e'
    })

    playerText.innerHTML = 'Status: None'
    currentPlayer = X_TEXT
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

startGame()