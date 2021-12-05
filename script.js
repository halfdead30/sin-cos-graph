let canvasBox = document.getElementById('canvas');
let ctx = canvasBox.getContext('2d');

const CANVAS_HEIGHT = ctx.canvas.height;
const CANVAS_WIDTH = ctx.canvas.width;

const N = 5;
const START = Math.PI / 4;
const END = 5 * Math.PI / 4;
const STEP = Math.PI / N;

const pointsSin = [];
const pointsCos = [];

// TODO
ctx.strokeStyle = "#6f9fd0";
ctx.lineWidth = "3";
ctx.beginPath();

// ---------------- y axis ---------------------------
ctx.moveTo(0, 0);
ctx.lineTo(0, CANVAS_HEIGHT);
ctx.stroke();
// ---------------- // y axis ------------------------

// ---------------- x axis ---------------------------
ctx.moveTo(0, CANVAS_HEIGHT / 2);
ctx.lineTo(CANVAS_WIDTH, CANVAS_HEIGHT / 2);
ctx.stroke();
ctx.closePath();
// ---------------- // x axis ------------------------

// ----------- sinusoidal graph ----------------------
ctx.beginPath();
ctx.strokeStyle = "#ef1f1f";

for (let i = 0; i <= 360; i += STEP) {
    const x = i;
    const y = CANVAS_HEIGHT / 2 - 200 * Math.sin(i * Math.PI / 180);
    ctx.lineTo(x, y);
}

ctx.stroke();
ctx.closePath();
// ----------- // sinusoidal graph -------------------

// ----------- cosinusoidal graph --------------------
ctx.beginPath();
ctx.strokeStyle = "#15fd15";

for (let i = 0; i <= 360; i += STEP) {
    const x = i;
    const y = CANVAS_HEIGHT / 2 - 200 * Math.cos(i * Math.PI / 180);
    ctx.lineTo(x, y);
}

ctx.stroke();
ctx.closePath();
// ----------- // cosinusoidal graph ------------------

// ----------- draw vertical lines N = 5 --------------
ctx.beginPath();
ctx.strokeStyle = "#8d71a6";

for (let i = START; i <= END; i += STEP) {
    const x =  i;
    const xDraw = x * 180 / Math.PI;
    
    const ySin = Math.sin(x);
    const yCos = Math.cos(x);
    
    pointsSin.push([x, ySin]);
    pointsCos.unshift([x, yCos]);
    
    ctx.moveTo(xDraw, 0);
    ctx.lineTo(xDraw, CANVAS_HEIGHT);
}

const points = [].concat(pointsSin, pointsCos);

ctx.stroke();
ctx.closePath();
// ----------- // draw vertical lines N = 5 ---------------

// ----------- draw polygon -------------------------------
ctx.beginPath();
ctx.strokeStyle = "#360068";

for (let i = 0; i < points.length; i++) {
    const x = points[i][0] * 180 / Math.PI;
    const y = 200 - points[i][1] * 200;
    ctx.lineTo(x, y);
}

ctx.stroke();
ctx.fillStyle = "#360068";
ctx.fill();
ctx.closePath();
// ----------- // draw polygon ----------------------------

// ----------- get polygonSquare --------------------------
const HEIGHT = points.length;
const WIDTH = points[0].length;
let sum1 = 0;
let sum2 = 0;

for (let i = 1; i < HEIGHT; i++) {
    const point = points[i][0]
    const point2 = points[i - 1][0];

    for (let j = 1; j > 0; j--) {
        sum1 += point2 * points[i - j + 1][j];
        sum2 += points[i - j][j] * point;
    }
}

const polygonSquare = Math.abs(sum1 - sum2) * 0.5;
console.log(polygonSquare);