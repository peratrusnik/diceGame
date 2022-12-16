
let roundNumberBox = document.querySelector('.round-number')
let winnerBox = document.querySelector('.footer')

let dices = [
    null,
    'img/dice-1.png',
    'img/dice-2.png',
    'img/dice-3.png',
    'img/dice-4.png',
    'img/dice-5.png',
    'img/dice-6.png'
]

let playerOne = {
    name: 'Player 1',
    score: 0,
    throwDices: [],
    playerBox: document.querySelector(".player-one"),
    currentDice: document.querySelector('.player-one .dice'),
    throwDicesBox: document.querySelector('.player-one .rolled-dice'),
};
let playerTwo = {
    name: 'Player 2',
    score: 0,
    throwDices: [],
    playerBox: document.querySelector(".player-two"),
    currentDice: document.querySelector('.player-two .dice'),
    throwDicesBox: document.querySelector('.player-two .rolled-dice'),
};

let maxRound = 10;
let rounCounter = 1;
let players = [playerOne, playerTwo];
let currentPlayer = null;
let playersIndex = null;

startGame()

function switchPlayer() {
    players.reverse()
    currentPlayer = players[playersIndex]
}

function displayWinner() {
    if (playerOne.score > playerTwo.score) {
        winnerBox.innerHTML = `WINNER IS ${playerOne.name} - ${playerOne.score}`
        playerOne.playerBox.classList.add('winner')
    }
    else if (playerOne.score < playerTwo.score) {
        winnerBox.innerHTML = `WINNER IS ${playerTwo.name} - ${playerTwo.score}`
        playerTwo.playerBox.classList.add('winner')
        
    } else {
        winnerBox.innerHTML = 'NO WINNER'
    }
    playerOne.currentDice.outerHTML = playerOne.score
    playerTwo.currentDice.outerHTML = playerTwo.score
}


function renderThrowDices() {
    let textHtml = ""
    currentPlayer.throwDices.forEach(function(diceNumber){
        textHtml += `<img src="${dices[diceNumber]}" />`
    });
    currentPlayer.throwDicesBox.innerHTML=textHtml
}
function renderRountCounter() {
    roundNumberBox.innerHTML = rounCounter
}

function saveThrow(currentDice) {
    currentPlayer.score += currentDice
    currentPlayer.throwDices.push(currentDice)
    renderThrowDices()
    renderRountCounter()
    if (playerOne.throwDices.length === playerTwo.throwDices.length) {
        rounCounter++
    }
    switchPlayer()
    if (playerOne.throwDices.length === maxRound && playerTwo.throwDices.length === maxRound) {
        displayWinner()
    } else {
        rollDice()        
    }
}

function rollDice() {
    let currentDice = randomNum(1, 7)
    let interval = setInterval(function () {
        currentPlayer.currentDice.setAttribute('src', dices[randomNum(1,7)])
    }, 100)
    
    setTimeout(function () {
        clearInterval(interval)
        currentPlayer.currentDice.setAttribute('src', dices[currentDice])
        saveThrow(currentDice)
    }, 1000)
}

function startGame() {
    playersIndex = randomNum(0, 2);
    currentPlayer = players[playersIndex];
    rollDice();
}

function randomNum(min, max) {
    return Math.floor(Math.random() * (max -  min) + min)
}