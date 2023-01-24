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
	background(0);
	numbers[index] = true;
	sequence.push(index);
	frameRate(30);
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
	print(biggest);
	count++;
}

function draw() {
	step();
	translate(windowWidth / 2, windowHeight / 2);
	scale(5);
	background(0, 10);

	for (let [i, a] of arcs.entries()) {
		if (arcs.diameter > 200) {
			// es mejor con arcs.lenght
			arcs.splice(5);
		} else if (a.show()) {
		} //else if (arcs.lenght < 20) {a.show()}
	}

	if (biggest > 1000) {
		resetAll();
		print(biggest);
	}
}

function resetAll() {
	arcs = [];
	sequence = [];
	count = 0;
	index = 0;
	biggest = 0;
}

function mousePressed() {
	background(255);
	frameRate = interval = ceil(random(10, 40));
}
