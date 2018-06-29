/*----- constants -----*/
var sounds = ['https://s3.amazonaws.com/freecodecamp/simonSound1.mp3', 'https://s3.amazonaws.com/freecodecamp/simonSound2.mp3', 'https://s3.amazonaws.com/freecodecamp/simonSound3.mp3', 'https://s3.amazonaws.com/freecodecamp/simonSound4.mp3'];
var player = new Audio();
player.src = sounds;
/*----- app's state (variables) -----*/
var circleSequence = [];
var playerClicks = [];
var gameOver, ignoreClicks;
/*----- cached element references -----*/
var turnEl = document.querySelector('h1');
var startBtn = document.getElementById('start-btn');
var replayBtn = document.getElementById('replay-btn');
/*----- event listeners -----*/
startBtn.addEventListener('click', startGame);
replayBtn.addEventListener('click', replay);
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
/*----- functions -----*/
function initialize() {
	gameOver = true;
    ignoreClicks = true;
	render();
}
// Responsible for transfering all state to the DOM
function render() {
    if (gameOver) circleSequence = [];
    startBtn.disabled = !gameOver;
    replayBtn.disabled = gameOver;
	turnEl.textContent = gameOver ? 'CLICK START BUTTON' : circleSequence.length;
}

function startGame() {
	gameOver = false;
	circleSequence = [];
	getNextTurn();
	console.log(circleSequence + ' circleSequence');
	console.log(playerClicks + ' playerClicks');
	animateSequence();
	render();
}

function replay() {
	initialize();
	startGame();
}

// Gameplay functionality
function handleCircClick(evt) {
	if (ignoreClicks) return;
	if (!evt.target.classList.contains('circ')) return;
	evt.className += ' activated';
	var idx = parseInt(evt.target.id.replace('c', ''));
	playerClicks.push(idx);
	if (idx === circleSequence[playerClicks.length - 1]) {
		console.log('correct')
		if (circleSequence.length === playerClicks.length) {
			getNextTurn();
			animateSequence();
		}
		console.log(circleSequence + ' circleSequence');
		console.log(playerClicks + ' playerClicks');
	} else {
		gameOver = true;
	}
	render();
}

function getNextTurn() {
	var rand = Math.floor(Math.random() * 4);
	circleSequence.push(rand);
}

function animateSequence() {
	ignoreClicks = true;
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
}
initialize();