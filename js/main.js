/*----- constants -----*/
var sounds = ['file:///Users/milcahcenteno/code/WDI-DT-59/projects/Simon/sounds/simonSound1.mp3', 'file:///Users/milcahcenteno/code/WDI-DT-59/projects/Simon/sounds/simonSound2.mp3', 'file:///Users/milcahcenteno/code/WDI-DT-59/projects/Simon/sounds/simonSound3.mp3', 'file:///Users/milcahcenteno/code/WDI-DT-59/projects/Simon/sounds/simonSound4.mp3'];
var player = new Audio();
player.src = sounds;

/*----- app's state (variables) -----*/
var circleSequence = [];
var playerClicks = [];
var gameOver, ignoreClicks;

/*----- cached element references -----*/
var turnEl = document.querySelector('h1');
var startBtn = document.getElementById('startBtn');

/*----- event listeners -----*/

startBtn.addEventListener('click', startGame);
document.querySelector('section').addEventListener('click', handleCircClick);
document.getElementById('c0').addEventListener('click', function() {
    player.src = sounds[0];
    player.play();
});
document.getElementById('c1').addEventListener('click', function() {
    player.src = sounds[1];
    player.play();
});
document.getElementById('c2').addEventListener('click', function() {
    player.src = sounds[2];
    player.play();
});
document.getElementById('c3').addEventListener('click', function() {
    player.src = sounds[3];
    player.play();
});
// function disableBtns(){
//     document.getElementsByClassName('circ').disabled = true;
// }
// function enableBtns(){
//     document.getElementsByClassName('circ').disabled = false;
// }

/*----- functions -----*/
function initialize() {
    gameOver = true;
    render();
}

// Responsible for transfering all state to the DOM
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

// Gameplay functionality

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
    freezeBtns();
    circleSequence.forEach(function(seqIdx, idx) {
        setTimeout(function() {
            var elem = document.getElementById('c' + seqIdx);
            elem.className += ' activated';
            player.src = sounds[seqIdx];
            player.play(); 
            setTimeout(function() {
                elem.classList.remove('activated');
                player.pause();
                if (idx === circleSequence.length - 1) ignoreClicks = false;
            }, 800)
        }, 500 + (idx * 1000));
    });
    playerClicks = [];
    unFreezeBtns();
}

function freezeBtns() {
    var elems = document.getElementsByClassName('circ');
    for (var i = 0; i < elems.length; i++) {
        var elem = elems[i];
        elem.addEventListener('click', freezeClicks);
    }
}

function unFreezeBtns() {
    var elems = document.getElementsByClassName('circ');
    for (var i = 0; i < elems.length; i++) {
        var elem = elems[i];
        elem.removeEventListener('click', freezeClicks);
    }
}

function freezeClicks(e) {
    e.preventDefault();
    e.stopPropagation();
    return false;
}

initialize();