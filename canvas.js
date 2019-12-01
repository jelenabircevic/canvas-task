var canvas = new fabric.Canvas('board', {
    width: 401,
    height: 401,
    selection: false
});

var handleClick = function ({target}) {
    const {x, y} = target;
    const box = boxes[x][y];
    console.log('you clicked on', x, y);
    if (!box.used) {
        box.set('fill', 'red'); // not sure why box.fill = 'red' didn't work (?)
        box.used = true;
        console.log(box);
        canvas.renderAll();
    } else {
        console.log('already used!');
    }
}

var boxSize = 40;
var boxes = [];

for (var i=0; i<10; i++) {
    boxes.push([]);
    for (var j=0; j<10; j++) {
        var box = new fabric.Rect({
            left: i * boxSize,
            top: j * boxSize,
            width: boxSize,
            height: boxSize,
            fill: 'white',
            selectable: false,
            stroke: 'grey',
            x: i,
            y: j
        });
        box.on('mousedown', handleClick);
        boxes[i].push(box);
        canvas.add(boxes[i][j]);
    }
}

console.log(canvas);