// todo: figure out how to make this import work
//import p5 from "p5";

const h1 = 140;
const h2 = 110;

const w1 = 30;
const w2 = 15;

const keyGap = 2;

function whiteKey01() {
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
  describe('A piano key shape drawn in white. White key One');
}

function whiteKey02() {
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
}

function whiteKey03() {
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
}

function blackKey01() {
  fill("#000000"); // black fill
  beginShape(TESS);
  vertex(0, 0, 0); // 1
  vertex( (w2+w2), 0, 0); // 2
  vertex( (w2+w2), h1, 0); // 3
  vertex(0, h1, 0); // 4
  // todo: make 3 and 4 biezer vertexes
  endShape(CLOSE);
}

function setup() {
  createCanvas(800, 500);
  background("#339c1a");
  describe('.a green background.')
}

function bgFill() {
  background("#339c1a");
  describe('.a green background.')
}

function showMousePos() {
  //displays the x and y position of the mouse on the canvas
  fill("#0000FF") // Blue text
  //text(`${mouseX}, ${mouseY}`, 675, 450);
  text(`${mouseX}, ${mouseY}`, mouseX + 25, mouseY + 45);
}

function drawKeys(octives = 1) {
  for(let i = 0; i < octives; i++) {
    // draw key 01 (white01, `C`).
    whiteKey01();
    // draw key 02 (black01, `C#`), translate +w1
    translate( (w1+(keyGap/2)), 0);
    blackKey01();
    // draw key 03 (white03 `D`), translate +w2
    translate( (w2+(keyGap/2)), 0);
    whiteKey03();
    // draw key 04 (black01 `D#`), translate +w2*2
    translate( (w2+w2+(keyGap/2)), 0);
    blackKey01();
    // draw key 05 (white02 `E`), translate +w2
    translate( (w2+(keyGap/2)), 0);
    whiteKey02();
    // draw key 06 (white01 `F`), translate +w1+w2
    translate( (w1+w2+keyGap), 0);
    whiteKey01();
    // draw key 07 (black01 `F#`), translate +w1
    translate( (w1+(keyGap/2)), 0);
    blackKey01();
    // draw key 08 (white03 `G`), translate +w2
    translate( (w2+(keyGap/2)), 0);
    whiteKey03();
    // draw key 09 (black01 `G#`), translate +w1
    translate( (w1+(keyGap/2)), 0);
    blackKey01();
    // draw key 10 (white03 `A`), translate +w2
    translate( (w2+(keyGap/2)), 0);
    whiteKey03();
    // draw key 11 (black01 `A#`), translate +w1
    translate( (w1+(keyGap/2)), 0);
    blackKey01();
    // draw key 12 (white02 `B`), translate +w2
    translate((w2+(keyGap/2)), 0);
    whiteKey02();

    // shift to print additional octives if requested.
    if(i+1 < octives) { translate( (w2+w1+keyGap), 0); }
  }
}

function draw() {
  bgFill();

  // Keys (debug)
  // whiteKey01();
  // whiteKey02();
  // whiteKey03();
  // blackKey01();

  showMousePos(); // debug

  drawKeys(2);


}
