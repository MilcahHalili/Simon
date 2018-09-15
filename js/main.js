/*----- constants -----*/
var sounds = ['https://s3.amazonaws.com/freecodecamp/simonSound1.mp3', 'https://s3.amazonaws.com/freecodecamp/simonSound2.mp3', 'https://s3.amazonaws.com/freecodecamp/simonSound3.mp3', 'https://s3.amazonaws.com/freecodecamp/simonSound4.mp3'];
var player = new Audio();
var circles = [c0, c1, c2, c3];
/*----- app's state (variables) -----*/
var circleSequence = [];
var playerClicks = [];
var gameOver, ignoreClicks;
/*----- cached element references -----*/
var startBtn = document.getElementById('start-btn');
var replayBtn = document.getElementById('replay-btn');
/*----- event listeners -----*/
startBtn.addEventListener('click', startGame);
replayBtn.addEventListener('click', startGame);
document.querySelector('section').addEventListener('click', handleCircClick);
/*----- functions -----*/
function initialize() {
	gameOver = true;
    ignoreClicks = true;
	render();
}
function render() {
    startBtn.disabled = !gameOver;
    replayBtn.disabled = gameOver;
	document.querySelector('h2').textContent = gameOver ? 'click start button' : circleSequence.length;
}
function startGame() {
	gameOver = false;
	circleSequence = [];
	getNextTurn();
	animateSequence();
	render();
}
function getNextTurn() {
	circleSequence.push(Math.floor(Math.random() * 4));
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
function handleCircClick(evt) {
	if (ignoreClicks) return;
	if (!evt.target.classList.contains('circ')) return;
	evt.className += ' activated';
	var idx = parseInt(evt.target.id.replace('c', ''));
	player.src = sounds[idx];
	player.play();
	playerClicks.push(idx);
	if (idx === circleSequence[playerClicks.length - 1]) {
		if (circleSequence.length === playerClicks.length) {
			getNextTurn();
			animateSequence();
		}
	} else {
		gameOver = true;
	}
	render();
}
initialize();