/*----- constants -----*/

/*----- app's state (variables) -----*/
var board, score, tempColor,runMemory, tempo;

/*----- cached element references -----*/
var countEl = document.querySelector('h1');
var running = false;
var memoryArray = [];
var memoryArrayCounter = 0;
var userArray = [];
var userArrayCounter = 0;
var levelCount = 1;
var matchingArrays = true;


/*----- event listeners -----*/
document.getElementById('startBtn').addEventListener('click', function() { 
    handleUpdateScore(1);
});

/*----- functions -----*/
function initialize() {
    board = [];
    turn = 0;

    render(); // the last thing it does
}

// responsible for transfering all state to the DOM
function render() {
    countEl.textContent = turn;
}

function handleUpdateScore(nextTurn) {
    turn += nextTurn;

    render();
}

initialize();