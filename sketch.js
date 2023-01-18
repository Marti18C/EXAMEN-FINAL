let numbers = [];
let count = 1;
let sequence = [];
let index = 0;
let arcs = [];
let biggest = 0;

class ArcColor {
  constructor(start, end, dir) {
    this.start = start;
    this.end = end;
    this.dir = dir;
    this.red = random(50, 255, 20, 30); //COLOR RANDOM
    this.green = random(50, 255, 20, 1); //COLOR RANDOM
    this.blue = random(50, 255, 20, 30); //COLOR RANDOM
  }

  show() {
    let diameter = abs(this.end - this.start++); // AQUI VARIA EL TAMANO DE LOS CUADRADOS
    //let x = windowWidth / 2;
    let x = (this.end + this.start) / 2;
    stroke(this.red, this.green, this.blue); //COLOR RANDOM
    strokeWeight(0.3);
    noFill();
    if (this.dir == 0) {
      square(x - x, 0, diameter);
    }
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  numbers[index] = true;
  sequence.push(index);
}

function step() {
  let next = index - count;
  if (next < 0 || numbers[next]) {
    next = index + count;
  }
  numbers[next] = true;
  sequence.push(next);

  let a = new Arc(index, next, count % 2);
  arcs.push(a);
  index = next;

  if (index > biggest) {
    biggest = index;
  }

  count++;
}

function draw() {
  step();
  translate(windowWidth / 2, windowHeight / 2);
  scale(width / biggest);
  background(0);

  for (let a of arcs) {
    a.show();
  }
}
