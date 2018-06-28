/*----- constants -----*/
// var sounds = [];
// var player = new Audio();

/*----- app's state (variables) -----*/
var circleSequence = [];
var playerClicks = [];
var gameOver, ignoreClicks;

/*----- cached element references -----*/
var turnEl = document.querySelector('h1');
var startBtn = document.getElementById('startBtn');
var onBtn = document.getElementById('onBtn');
var offBtn = document.getElementById('offBtn');
var circBtn = document.querySelectorAll('circ');

/*----- event listeners -----*/

startBtn.addEventListener('click', startGame);

document.querySelector('section').addEventListener('click', handleCircClick);

/*----- functions -----*/
function initialize() {
    gameOver = true;
    render();
}

// responsible for transfering all state to the DOM
function render() {
    startBtn.disabled = !gameOver;
    turnEl.textContent = gameOver ? 'Click start button.' : circleSequence.length;
}

function startGame() {
    gameOver = false;
    circleSequence = [];
    nextSequence();
    console.log(circleSequence + ' circleSequence');
    console.log(playerClicks + ' playerClicks');
    gameSequence();
    render();
}

function clearState() {
    if (gameOver = true) {
    circleSequence = [];
    }
}

// gameplay functionality

function handleCircClick(evt) {
    if (!evt.target.classList.contains('circ')) return;
    evt.className += ' activated';
    var idx = parseInt(evt.target.id.replace('c', ''));
    playerClicks.push(idx);
    if (idx === circleSequence[playerClicks.length - 1]) {
        console.log('correct')
        if (circleSequence.length === playerClicks.length) {
            nextSequence();
            gameSequence();
        }
        console.log(circleSequence + ' circleSequence');
        console.log(playerClicks + ' playerClicks');
        } else {
            gameOver = true;
            clearState();
        }
    render();
}

function nextSequence() {
    var rand = Math.floor(Math.random() * 4);
    circleSequence.push(rand);
}

function gameSequence() {
    ignoreClicks = true;
    circleSequence.forEach(function(seqIdx, idx) {
        setTimeout(function() {
            var elem = document.getElementById('c' + seqIdx);
            elem.className += ' activated';
            // player.src = sounds[seqIdx];
            setTimeout(function() {
                elem.classList.remove('activated');
                player.pause();
                if (idx === circleSequence.length - 1) ignoreClicks = false;
            }, 800)
        }, 500 + (idx * 1000));
    });
    playerClicks = [];
}

initialize();