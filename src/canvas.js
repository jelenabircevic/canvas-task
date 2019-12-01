const canvas = new fabric.Canvas('board', {
	width: 401,
	height: 401,
	selection: false,
});

const boxSize = 40;
const boxes = [];

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
	return moves;
};

const handleClick = ({ target }) => {
	const { x, y } = target;
	const activeBox = boxes[x][y];
	// console.log('you clicked on', x, y);
	if (!activeBox.used && activeBox.possible) {
		activeBox.set('fill', '#908cff'); // not sure why box.fill = '#908cff' didn't work (?)
		activeBox.used = true;
		// console.log(box);
		// find possible options
		const possibleMoves = getPossibleMoves(x, y);
		// console.log(possibleMoves);
		const validMoves = possibleMoves.filter(([a, b]) => {
			if (a >= 0 && a < 10 && b >= 0 && b < 10) {
				return !boxes[a][b].used;
			}
			return false;
		});
		boxes.forEach((boxGroup) => boxGroup.forEach((box) => {
			if (!box.used) {
				box.set('fill', '#ffffff');
				box.possible = false;
			}
		}));
		validMoves.forEach(([a, b]) => {
			boxes[a][b].set('fill', '#c3baff');
			boxes[a][b].possible = true;
		});

		canvas.renderAll();
	} else {
		// console.log('invalid move!');
	}
};

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

// console.log(canvas);
