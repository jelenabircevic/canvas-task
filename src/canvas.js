const canvas = new fabric.Canvas('board', {
	width: 401,
	height: 401,
	selection: false,
});

const boxSize = 40;
const boxes = [];

const handleClick = ({ target }) => {
	const { x, y } = target;
	const box = boxes[x][y];
	// console.log('you clicked on', x, y);
	if (!box.used) {
		box.set('fill', '#908cff'); // not sure why box.fill = '#908cff' didn't work (?)
		box.used = true;
		// console.log(box);
		// show possible options

		// canvas.renderAll();
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
		});
		box.on('mousedown', handleClick);
		boxes[i].push(box);
		canvas.add(boxes[i][j]);
	}
}

// console.log(canvas);
