let keyState = {};
const octives = 2;

// note: Canvas does not work with decimal values - ensure / 2 is an even number
const h1 = 90;
const h2 = 60;

const w1 = 24;
const w2 = (w1 / 2);
const keyGap = 2;

function whiteKey01(keyID = 0) { // (w1+w2)
  fill("#FFFFFF"); // white fill
  beginShape(TESS);
  vertex(0, 0, 0); // 1
  vertex(w1, 0, 0);  // 2
  vertex(w1, h1, 0);   // 3
  vertex( (w1+w2), h1, 0);  // 4
  vertex( (w1+w2), (h1+h2), 0);  // 5
  vertex(0, (h1+h2), 0);  // 6
  // todo: make 1, 5 and 6 biezer vertexes.
  endShape(CLOSE);

  // todo: update this description. include note it will play, state?
  describe('A piano key shape drawn in white.');
}

function whiteKey02(keyID = 0) { // (w2+w1)
  fill("#FFFFFF"); // white fill
  beginShape(TESS);
  vertex(w2, 0, 0); // 1
  vertex( (w2+w1), 0, 0); // 2
  vertex( (w2+w1), (h1+h2), 0); // 3
  vertex(0, (h1+h2), 0); // 4
  vertex(0, h1, 0); // 5
  vertex(w2, h1, 0); // 6
  // todo: make 2, 3 and 4 biezer vertexes.
  endShape(CLOSE);
    // todo: update this description. include note it will play, state?
  describe('A piano key shape drawn in white.');
}

function whiteKey03(keyID = 0) { // (w2+w2+w2)
  fill("#FFFFFF"); // white fill
  beginShape(TESS);
  vertex(w2, 0, 0); // 1
  vertex( (w2+w2), 0, 0); // 2
  vertex( (w2+w2), h1, 0); // 3
  vertex( (w2+w2+w2), h1, 0); // 4
  vertex( (w2+w2+w2), (h1+h2), 0); // 5
  vertex(0, (h1+h2), 0); // 6
  vertex(0, h1, 0); // 7
  vertex(w2, h1, 0); // 8
  // todo: make 3, 5, 6, and 8 biezer vertexes
  endShape(CLOSE);
    // todo: update this description. include note it will play, state?
  describe('A piano key shape drawn in white.');
}

function blackKey01(keyID = 0) { // (w2+w2)
  fill("#000000"); // black fill
  translate(0, -(keyGap/2));
  beginShape(TESS);
  vertex(0, 0, 0); // 1
  vertex( (w2+w2), 0, 0); // 2
  vertex( (w2+w2), h1, 0); // 3
  vertex(0, h1, 0); // 4
  // todo: make 3 and 4 biezer vertexes
  endShape(CLOSE);
  translate(0, (keyGap/2));
    // todo: update this description. include note it will play, state?
  describe('A piano key shape drawn in black.');
}


function bgFill() {
  background("#339c1a");
  describe('.a green background.')
}

function showMousePos() {
  //displays the x and y position of the mouse on the canvas
  fill("#0000FF") // Blue text
  //text(`${mouseX}, ${mouseY}`, 675, 450);
  text(`${mouseX}, ${mouseY}`, mouseX - 25, mouseY + 45);
}

function calcCanvasWidth() {
  return (
    keyGap + (( // Initial space
    (w1+w2+(keyGap/2)) +  // key 01
    (w2+(keyGap/2)) +     // key 02
    (w2+w2+(keyGap/2)) +  // key 03
    (w2+(keyGap/2)) +     // key 04
    (w2+keyGap) +         // key 05
    (w2+(keyGap/2)) +     // key 06
    (w2+(keyGap/2)) +     // key 07
    (w2+w2+(keyGap/2)) +  // key 08
    (w2+(keyGap/2)) +     // key 09
    (w2+w2+(keyGap/2)) +  // key 10
    (w2+(keyGap/2)) +     // key 11
    (w1+w2+w1+keyGap) +   // key 12
    0)*octives) // Octive multiplier
  );
}

function calcCanvasHeight() {
  return (
    keyGap + // top space
    h1 + h2 +// key height
    keyGap // bottom space
  );
}

function drawKeys() {
  for(let i = 0; i < octives; i++) {

    // Create a space on the top and side the width of keyGap
    if(i === 0) { translate(keyGap, keyGap); }

    // draw key 01 (white01, `C`).
    whiteKey01();  // key 01
    // draw key 02 (black01, `C#`), translate +w1
    translate( (w1+(keyGap/2)), 0);
    blackKey01(); // key 02
    // draw key 03 (white03 `D`), translate +w2
    translate( (w2+(keyGap/2)), 0);
    whiteKey03(); // key 03
    // draw key 04 (black01 `D#`), translate +w2*+w2
    translate( (w2+w2+(keyGap/2)), 0);
    blackKey01(); // key 04
    // draw key 05 (white02 `E`), translate +w2
    translate( (w2+(keyGap/2)), 0);
    whiteKey02(); // key 05
    // draw key 06 (white01 `F`), translate +w1+w2
    translate( (w1+w2+keyGap), 0);
    whiteKey01(); // key 06
    // draw key 07 (black01 `F#`), translate +w1
    translate( (w1+(keyGap/2)), 0);
    blackKey01(); // key 07
    // draw key 08 (white03 `G`), translate +w2
    translate( (w2+(keyGap/2)), 0);
    whiteKey03(); // key 08
    // draw key 09 (black01 `G#`), translate +w1
    translate( (w1+(keyGap/2)), 0);
    blackKey01();// key 09
    // draw key 10 (white03 `A`), translate +w2
    translate( (w2+(keyGap/2)), 0);
    whiteKey03();// key 10
    // draw key 11 (black01 `A#`), translate +w1
    translate( (w1+(keyGap/2)), 0);
    blackKey01();// key 11
    // draw key 12 (white02 `B`), translate +w2
    translate((w2+(keyGap/2)), 0);
    whiteKey02();// key 12

    // shift to print additional octives if requested.
    if(i+1 < octives) { translate( (w2+w1+keyGap), 0); }
  }
}

function updateKeyState() {
  keyState = {
    // todo
  };
}

function mousePressed() {
  // todo
}

function keyPressed() {
  // todo
}

function setup() {
  createCanvas( calcCanvasWidth(), calcCanvasHeight() );
  bgFill();
}

function draw() {
  bgFill();

  // Keys (debug)
  // whiteKey01();
  // whiteKey02();
  // whiteKey03();
  // blackKey01();

  showMousePos(); // debug

  drawKeys();
}
