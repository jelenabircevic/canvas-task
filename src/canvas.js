const canvas = new fabric.Canvas('board', {
	width: 401,
	height: 401,
	selection: false,
});

const overlay = document.getElementById('overlay-message');
const backgroundOverlay = document.querySelector('.overlay');
const winMessage = document.getElementById('win');
const loseMessage = document.getElementById('lose');

const yesButton = document.getElementById('yes');
const noButton = document.getElementById('no');

const resetButton = document.getElementById('reset');

const clearMessages = () => {
	overlay.classList.remove('show');
	backgroundOverlay.classList.remove('show');
	winMessage.classList.remove('show');
	loseMessage.classList.remove('show');
};

const clearBoard = () => {
	canvas.clear();
	drawGrid();
};

yesButton.addEventListener('click', () => {
	clearMessages();
	clearBoard();
});
noButton.addEventListener('click', () => {
	clearMessages();
});
resetButton.addEventListener('click', () => {
	clearBoard();
});

const boxSize = 40;
let boxes;
let remainingBoxes;

const showOverlay = (won) => {
	overlay.classList.add('show');
	backgroundOverlay.classList.add('show');
	if (won) {
		winMessage.classList.add('show');
	} else {
		loseMessage.classList.add('show');
	}
};

const getPossibleMoves = (x, y) => {
	const moves = [];
	moves.push([x + 3, y]);
	moves.push([x - 3, y]);
	moves.push([x, y + 3]);
	moves.push([x, y - 3]);
	moves.push([x + 2, y + 2]);
	moves.push([x + 2, y - 2]);
	moves.push([x - 2, y + 2]);
	moves.push([x - 2, y - 2]);
	return moves.filter(([a, b]) => {
		if (a >= 0 && a < 10 && b >= 0 && b < 10) {
			return !boxes[a][b].used;
		}
		return false;
	});
};

const handleClick = ({ target }) => {
	const { x, y } = target;
	const activeBox = boxes[x][y];
	if (!activeBox.used && activeBox.possible) {
		activeBox.set('fill', '#908cff'); // not sure why box.fill = '#908cff' didn't work (?)
		activeBox.used = true;
		remainingBoxes -= 1;
		// find possible options
		const possibleMoves = getPossibleMoves(x, y);
		boxes.forEach((boxGroup) => boxGroup.forEach((box) => {
			if (!box.used) {
				box.set('fill', '#ffffff');
				box.possible = false;
			}
		}));
		if (possibleMoves.length === 0) {
			showOverlay(remainingBoxes === 0);
		} else {
			possibleMoves.forEach(([a, b]) => {
				boxes[a][b].set('fill', '#c3baff');
				boxes[a][b].possible = true;
			});
		}

		canvas.renderAll();
	}
};

const drawGrid = () => {
	boxes = [];
	remainingBoxes = 100;
	for (let i = 0; i < 10; i += 1) {
		boxes.push([]);
		for (let j = 0; j < 10; j += 1) {
			const box = new fabric.Rect({
				left: i * boxSize,
				top: j * boxSize,
				width: boxSize,
				height: boxSize,
				fill: '#ffffff',
				selectable: false,
				stroke: '#eeeeee',
				x: i,
				y: j,
				possible: true,
			});
			box.on('mousedown', handleClick);
			boxes[i].push(box);
			canvas.add(boxes[i][j]);
		}
	}
};

drawGrid();
