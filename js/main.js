/*----- app's state (variables) -----*/
let simon = {
	gameOver: true,
	ignoreClicks: true,
	circleSequence: [],
	playerClicks: [],
	circle: [document.getElementById('c0'), document.getElementById('c1'), document.getElementById('c2'), document.getElementById('c3')],
	sounds: ['https://s3.amazonaws.com/freecodecamp/simonSound1.mp3', 'https://s3.amazonaws.com/freecodecamp/simonSound2.mp3', 'https://s3.amazonaws.com/freecodecamp/simonSound3.mp3', 'https://s3.amazonaws.com/freecodecamp/simonSound4.mp3']
}

/*----- cached element references -----*/
const player = new Audio();
const startBtn = document.getElementById('start-btn');
const replayBtn = document.getElementById('replay-btn');

/*----- event listeners -----*/
startBtn.addEventListener('click', startGame);
replayBtn.addEventListener('click', startGame);
document.querySelector('section').addEventListener('click', handleCircClick);

/*----- functions -----*/
function initialize() {
	simon.gameOver;
	simon.ignoreClicks;
	render();
}

function render() {
	startBtn.disabled = !simon.gameOver;
	replayBtn.disabled = simon.gameOver;
	document.querySelector('h2').textContent = simon.gameOver
		? 'CLICK START' 
		: circleSequence.length;
}

function startGame() {
	simon.gameOver = false;
	circleSequence = [];
	getNextTurn();
	animateSequence();
	render();
}

function getNextTurn() {
	circleSequence.push(Math.floor(Math.random() * 4));
}

function play(audio) {
  player.src = simon.sounds[audio];
  player.play();
}

function animateSequence() {
	simon.ignoreClicks = true;
	circleSequence.forEach((seqIdx, idx) => {
		setTimeout(() => {
			let elem = simon.circle[seqIdx];
			elem.className += ' activated';
			play(seqIdx)
			setTimeout(() => {
				elem.classList.remove('activated');
				player.pause();
				if (idx === circleSequence.length - 1) simon.ignoreClicks = false;
			}, 800)
		}, 500 + (idx * 1000));
	});
	playerClicks = [];
}

function handleCircClick(evt) {
	if (simon.ignoreClicks) return;
	if (!evt.target.classList.contains('circ')) return;
	let idx = parseInt(evt.target.id.replace('c', ''));
	play(idx);
	playerClicks.push(idx);
	if (idx === circleSequence[playerClicks.length - 1]) {
		if (circleSequence.length === playerClicks.length) {
			getNextTurn();
			animateSequence();
		}
	} else {
		simon.gameOver = true;
	}
	render();
}

initialize();