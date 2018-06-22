/*----- constants -----*/

/*----- app's state (variables) -----*/
var board, score;

/*----- cached element references -----*/
var scoreEl = document.querySelector('h1');

/*----- event listeners -----*/
document.querySelector('button').addEventListener('click', handleIncScore);

/*----- functions -----*/
function initialize() {
    board = [null, null, null];
    score = 0;

    render(); // the last thing it does
}

// responsible for transfering all state to the DOM
function render() {
    scoreEl.textContent = score;
}

function handleIncScore() {
    score += 1;
    
    render();
}

initialize();