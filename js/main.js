/*----- constants -----*/

/*----- app's state (variables) -----*/
var circleSequence = [];
var playerClicks = [];
var gameOver, ignoreClicks;

/*----- cached element references -----*/
var turnEl = document.querySelector('h1');
var circBtns = document.querySelectorAll('.circ');
var startBtn = document.getElementById('startBtn');
var onBtn = document.getElementById('onBtn');
var offBtn = document.getElementById('offBtn');

// var flashCirc = document.createElement('style');

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

// gameplay functionality

function handleCircClick(evt) {
    if (!evt.target.classList.contains('circ')) return;
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
    }
    render();
}

function nextSequence() {
    var rand = Math.floor(Math.random() * 4);
    circleSequence.push(rand);
}

function gameSequence() {
    ignoreClicks = true;
    circleSequence.forEach(function(elem, idx) {
        // setTimeout(function() {
        //     add activated class that highlights to circle for elem 
        //     optionally play sound
        //     circBtn.classList.add('activated');
        //     setTimeout(function() {
        //             remove activated class that highlighted
        //             stop playing (myPlayer.pause())
        //             div.classList.remove("foo");
        //         if (idx === circleSequence.length - 1) ignoreClicks = false;
        //     }, 900);
        // }, 1000 + (idx * 1000));
    });
    playerClicks = [];
}

initialize();