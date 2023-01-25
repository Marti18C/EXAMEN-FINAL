var attackLevel = 1.0;
var releaseLevel = 0;

var attackTime = 0.001;
var decayTime = 0.2;
var susPercent = 0.2;
var releaseTime = 0.5;

let numbers = [];
let count = 1;
let sequence = [];
let index = 0;
let arcs = [];
let biggest = 0;
let osc;

class Arc {
  constructor(start, end, dir) {
    this.start = start;
    this.end = end;
    this.dir = dir;
    this.r = random(10, 250);
    this.g = random(10, 250);
    this.b = random(10, 250);
  }

  show() {
    let diameter = abs(this.end - this.start++); // AQUI VARIA EL TAMANO DE LOS CUADRADOS
    //let x = windowWidth / 2;
    let x = (this.end + this.start) / 2;

    var c = color(this.r, this.g, this.b);

    stroke(c); //COLOR RANDOM
    //stroke(255);

    var sw = 1;

    strokeWeight(sw);
    noFill();

    if (this.dir == 0) {
      rectMode(CENTER);
      square(0, 0, diameter);
    }
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(30);
  background(0);

  env = new p5.Env();
  env.setADSR(attackTime, decayTime, susPercent, releaseTime);
  env.setRange(attackLevel, releaseLevel);

  osc = new p5.Oscillator();
  osc.setType("sine");
  //osc.freq(240);
  osc.amp(env);
  osc.start();

  //env.play();

  numbers[index] = true;
  sequence.push(index);
  angleMode(DEGREES);
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

  let n = (index % 25) + 24;

  let freq = pow(2, (n - 49) / 12) * 440;
  console.log(index, freq);
  osc.freq(freq);
  env.play();

  if (index > biggest) {
    biggest = index;
  }
  //print(biggest);
  count++;
}

function draw() {
  step();
  translate(windowWidth / 2, windowHeight / 2);
  scale(8);
  background(0, 30);

  // for (let [i, a] of arcs.entries()) {
  // if (arcs.diameter > 200) {
  //   // es mejor con arcs.lenght
  //    arcs.splice(5);
  //  } else if (a.show()) {
  //  } else if (arcs.lenght < 20) {
  //    a.show();
  //  }
  //}

  for (let [i, a] of arcs.entries()) {
    if (biggest > 1000) {
      resetAll();
    } else if (a.show()) {
    } else if (arcs.lenght < 20) {
      a.show();
    }

    print(biggest);
  }
}

function resetAll() {
  var girar = random(0, 360);
  rotate(girar);
  arcs = [];
  sequence = [];
  count = 0;
  index = 0;
  biggest = 0;
  var c = color(this.r, this.g, this.b);
}

function mousePressed() {
  background(255);
  frameRate = interval = ceil(random(1, 40));
}
