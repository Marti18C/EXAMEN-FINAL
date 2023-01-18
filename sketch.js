let numbers = [];
let count = 1;
let sequence = [];
let index = 0;

function setup() {
  createCanvas(600, 400);
  background(0);
  numbers[index] = true;
  sequence.push(index);

  for (let i = 0; i < 11; i++) {
    step();
  }
  console.log(sequence);
}

function step() {
  let next = index - count;
  if (next < 0 || numbers[next]) {
    next = index + count;
  }
  numbers[next] = true;
  sequence.push(next);
  index = next;
  count++;
}

function draw() {}
