/*----- constants -----*/
var circles = [0, 1, 2, 3];

/*----- app's state (variables) -----*/
var running = false;
var circleSequence = [];

/*----- cached element references -----*/
var turnEl = document.querySelector('h1');
var circBtns = document.querySelectorAll('.circ');
var startBtn = document.getElementById('startBtn');
var onBtn = document.getElementById('onBtn');
var offBtn = document.getElementById('offBtn');
var rand = Math.floor(Math.random()*circles.length);

/*----- event listeners -----*/

onBtn.addEventListener('click', gameOn);

startBtn.addEventListener('click', startGame);

offBtn.addEventListener('click', gameOff);

// circBtns.addEventListener('click', )

/*----- functions -----*/
function initialize() {
    board = [];
    turn = 0;
    startBtn.disabled = true;
    randomColor();
    render(); // the last thing it does
}

// responsible for transfering all state to the DOM
function render() {
    turnEl.textContent = turn;
}

function handleUpdateTurn(nextTurn) {
    turn += nextTurn;
    render();
}

initialize();

function gameOn() {
    startBtn.disabled = false;
}

function gameOff() {
    startBtn.disabled = true;
    onBtn.disabled = false;
    initialize();
}

function startGame() {
    startBtn.disabled = true;
    onBtn.disabled = true;
    running = true;
    handleUpdateTurn(1);
    gameSequence();
}

function randomColor() {
    var rand = Math.floor(Math.random()*circles.length);
    circleSequence.push(circBtns[rand]);
    // render();
}

function gameSequence() {
    circleSequence.forEach(function(elem, idx) {
        setTimeout(function() {
            var intervalId = setInterval(function() {
            if (elem.className === 'circ') {
                elem.className += ' activated';    
            } else {
                elem.className = 'circ';
                clearInterval(intervalId);
            }    
            }, 1000);
        }, 1000 + (idx * 1000));
        })
    render();
}

// function playerSequence() {
    
// }