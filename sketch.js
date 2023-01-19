let numbers = [];
let count = 1;
let sequence = [];
let index = 0;
let arcs = [];
let biggest = 0;

class Arc {
  constructor(start, end, dir) {
    this.start = start;
    this.end = end;
    this.dir = dir;
  }

  show() {
    let diameter = abs(this.end - this.start++); // AQUI VARIA EL TAMANO DE LOS CUADRADOS
    //let x = windowWidth / 2;
    let x = (this.end + this.start) / 2;

    var r = random(10, 250);
    var g = random(10, 250);
    var b = random(10, 250);

    var c = color(r, g, b);

    stroke(c); //COLOR RANDOM
    //stroke(255);

    var s = random(0.3, 20);

    strokeWeight(s);
    noFill();
    if (this.dir == 0) {
      rectMode(CENTER);
      square(0, 0, diameter);
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

function mousePressed(event) {
  background(0);
}
