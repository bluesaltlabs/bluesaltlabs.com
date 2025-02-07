
// init key state (todo)
let keyState = {
  1: {},
  2: {},
  3: {},
  4: {},
  5: {},
  6: {},
  7: {},
  8: {},
  9: {},
  10: {},
  11: {},
  12: {},
};

const octives = 2; // default: 2 - can be modified

// note: Canvas does not work with decimal values - ensure / 2 is an even number
const h1 = 90; // default: 90 - can be modified, caution
const h2 = 60; // default: 60 - can be modified, caution

const w1 = 24; // default: 24 - can me modified, caution
const w2 = (w1 / 2); // do not modify
const keyGap = 2; // default: 2 - can be modified, caution, even number!

// App Configuration
const c_app = {
  background: {
    color: "#339c1a",
    describe: ".a green background.",
  },
};

// Black Key 01 Configuration
const c_bk1 = {
  fill: {
    color: "#000000",
    describe: "A piano key shape drawn in black.",
  },
  v: [
    { x: 0, y: 0, z: 0 }, // 1
    { x: (w2+w2), y: 0, z: 0 }, // 2
    { x: (w2+w2), y: h1, z: 0 }, // 3
    { x: 0, y: h1, z: 0 }, // 4
  ],
};

// White Key 01 Configuration
const c_wk1 = {
  fill: {
    color: "#FFFFFF",
    describe: ".a piano key shape drawn in white.",
  },
  v: [
    { x: 0, y: 0, z: 0 }, // 1
    { x: w1, y: 0, z: 0 }, // 2
    { x: w1, y: h1, z: 0 }, // 3
    { x: (w1+w2), y: h1, z: 0 }, // 4
    { x: (w1+w2), y: (h1+h2), z: 0 }, // 5
    { x: 0, y: (h1+h2), z: 0 }, // 6
  ],
};

// White Key 02 Configuration
const c_wk2 = {
  fill: {
    color: "#FFFFFF",
    describe: ".a piano key shape drawn in white.",
  },
  v: [
    { x: w2, y: 0, z: 0 }, // 1
    { x: (w2+w1), y: 0, z: 0 }, // 2
    { x: (w2+w1), y: (h1+h2), z: 0 }, // 3
    { x: 0, y: (h1+h2), z: 0 }, // 4
    { x: 0, y: h1, z: 0 }, // 5
    { x: w2, y: h1, z: 0 }, // 6
  ],
};

// White Key 03 Configuration
const c_wk3 = {
  fill: {
    color: "#FFFFFF",
    describe: ".a piano key shape drawn in white.",
  },
  v: [
    { x: w2, y: 0, z: 0 }, // 1
    { x: (w2+w2), y: 0, z: 0 }, // 2
    { x: (w2+w2), y: h1, z: 0 }, // 3
    { x: (w2+w2+w2), y: h1, z: 0 }, // 4
    { x: (w2+w2+w2), y: (h1+h2), z: 0 }, // 5
    { x: 0, y: (h1+h2), z: 0 }, // 6
    { x: 0, y: h1, z: 0 }, // 7
    { x: w2, y: h1, z: 0 }, // 8
  ],
};

function blackKey01(keyID = 0) { // (w2+w2)
  fill(c_bk1.fill.color); // black fill

  translate(0, -(keyGap/2)); // Translate up
  beginShape(TESS);
  vertex(c_bk1.v[0].x, c_bk1.v[0].y, c_bk1.v[0].z); // 1
  vertex(c_bk1.v[1].x, c_bk1.v[1].y, c_bk1.v[1].z); // 2
  vertex(c_bk1.v[2].x, c_bk1.v[2].y, c_bk1.v[2].z); // 3
  vertex(c_bk1.v[3].x, c_bk1.v[3].y, c_bk1.v[3].z); // 4
  // todo: make 3 and 4 biezer vertexes
  endShape(CLOSE);

  translate(0, (keyGap/2)); // translate back down

    // todo: update this description. include note it will play, state?
  describe(c_bk1.fill.describe);
}


function whiteKey01(keyID = 0) { // (w1+w2)
  fill(c_wk1.fill.color); // white fill

  beginShape(TESS);
  vertex(c_wk1.v[0].x, c_wk1.v[0].y, c_wk1.v[0].z); // 1
  vertex(c_wk1.v[1].x, c_wk1.v[1].y, c_wk1.v[1].z); // 2
  vertex(c_wk1.v[2].x, c_wk1.v[2].y, c_wk1.v[2].z); // 3
  vertex(c_wk1.v[3].x, c_wk1.v[3].y, c_wk1.v[3].z); // 4
  vertex(c_wk1.v[4].x, c_wk1.v[4].y, c_wk1.v[4].z); // 5
  vertex(c_wk1.v[5].x, c_wk1.v[5].y, c_wk1.v[5].z); // 6
  // todo: make 1, 5 and 6 biezer vertexes.
  endShape(CLOSE);

  // todo: update this description. include note it will play, state?
 describe(c_wk1.fill.describe);
}

function whiteKey02(keyID = 0) { // (w2+w1)
  fill(c_wk2.fill.color); // white fill

  beginShape(TESS);
  vertex(c_wk2.v[0].x, c_wk2.v[0].y, c_wk2.v[0].z); // 1
  vertex(c_wk2.v[1].x, c_wk2.v[1].y, c_wk2.v[1].z); // 2
  vertex(c_wk2.v[2].x, c_wk2.v[2].y, c_wk2.v[2].z); // 3
  vertex(c_wk2.v[3].x, c_wk2.v[3].y, c_wk2.v[3].z); // 4
  vertex(c_wk2.v[4].x, c_wk2.v[4].y, c_wk2.v[4].z); // 5
  vertex(c_wk2.v[5].x, c_wk2.v[5].y, c_wk2.v[5].z); // 6
  // todo: make 2, 3 and 4 biezer vertexes.
  endShape(CLOSE);
    // todo: update this description. include note it will play, state?
  describe(c_wk2.fill.describe);
}

function whiteKey03(keyID = 0) { // (w2+w2+w2)
  fill(c_wk3.fill.color); // white fill

  beginShape(TESS);
  vertex(c_wk3.v[0].x, c_wk3.v[0].y, c_wk3.v[0].z); // 1
  vertex(c_wk3.v[1].x, c_wk3.v[1].y, c_wk3.v[1].z); // 2
  vertex(c_wk3.v[2].x, c_wk3.v[2].y, c_wk3.v[2].z); // 3
  vertex(c_wk3.v[3].x, c_wk3.v[3].y, c_wk3.v[3].z); // 4
  vertex(c_wk3.v[4].x, c_wk3.v[4].y, c_wk3.v[4].z); // 5
  vertex(c_wk3.v[5].x, c_wk3.v[5].y, c_wk3.v[5].z); // 6
  vertex(c_wk3.v[6].x, c_wk3.v[6].y, c_wk3.v[6].z); // 7
  vertex(c_wk3.v[7].x, c_wk3.v[7].y, c_wk3.v[7].z); // 8

  // todo: make 3, 5, 6, and 8 biezer vertexes
  endShape(CLOSE);
    // todo: update this description. include note it will play, state?
  describe(c_wk3.fill.describe);
}


function bgFill() {
  background(c_app.background.color);
  describe(c_app.background.describe);
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

function drawKeysNew() {

}

function updateKeyState() {
  keyState = {
    1: {},
    2: {},
    3: {},
    4: {},
    5: {},
    6: {},
    7: {},
    8: {},
    9: {},
    10: {},
    11: {},
    12: {},
  };
}

//https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent
function mousePressed(e) {
  // if(e.button === 0) {} // left button
  // todo
  console.log("mousePressed", {
    button: e.button,
    mouseX,
    mouseY,
    offsetX: e.offsetX,
    offsetY: e.offsetY,
    //webkitForce: e.webkitForce,
    relatedTarget: e.relatedTarget,
  });
}

function keyPressed(e) {
  // todo
  console.log("keyPressed", {
    key: key,
    keyCode: keyCode,
  });
}

function setup() {
  createCanvas( calcCanvasWidth(), calcCanvasHeight() );
  bgFill();
}

function draw() {
  bgFill();

  // Keys (debug)
   //whiteKey01();
  // whiteKey02();
  // whiteKey03();
  // blackKey01();

  //showMousePos(); // debug

  drawKeys();
}
