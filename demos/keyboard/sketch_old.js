import p5 from 'p5';

class KeyboardP5Sketch {
  constructor(octives = 1) {
    this.p = new p5((p) => this.init(p ?? {}));
    this.octives = octives
    this.h1 = 140;
    this.h2 = 110;
    this.w1 = 30;
    this.w2 = 15;
    this.keyGap = 2;
  }

  whiteKey01(p) {
    p.fill("#FFFFFF"); // white fill
    p.beginShape(TESS);
    p.vertex(0, 0, 0); // 1
    p.vertex(this.w1, 0, 0);  // 2
    p.vertex(this.w1, this.h1, 0);   // 3
    p.vertex( (this.w1+this.w2), this.h1, 0);  // 4
    p.vertex( (this.w1+this.w2), (this.h1+this.h2), 0);  // 5
    p.vertex(0, (this.h1+this.h2), 0);  // 6
    // todo: make 1, 5 and 6 biezer vertexes.
    p.endShape(CLOSE);

    // todo: update this description. include note it will play, state?
    p.describe('A piano key shape drawn in white. White key One');
  }

  whiteKey02(p) {
    p.fill("#FFFFFF"); // white fill
    p.beginShape(TESS);
    p.vertex(this.w2, 0, 0); // 1
    p.vertex( (this.w2+this.w1), 0, 0); // 2
    p.vertex( (this.w2+this.w1), (this.h1+this.h2), 0); // 3
    p.vertex(0, (this.h1+this.h2), 0); // 4
    p.vertex(0, this.h1, 0); // 5
    p.vertex(this.w2, this.h1, 0); // 6
    // todo: make 2, 3 and 4 biezer vertexes.
    p.endShape(CLOSE);
  }

  whiteKey03(p) {
    p.fill("#FFFFFF"); // white fill
    p.beginShape(TESS);
    p.vertex(this.w2, 0, 0); // 1
    p.vertex( (this.w2+this.w2), 0, 0); // 2
    p.vertex( (this.w2+this.w2), this.h1, 0); // 3
    p.vertex( (this.w2+this.w2+this.w2), this.h1, 0); // 4
    p.vertex( (this.w2+this.w2+this.w2), (this.h1+this.h2), 0); // 5
    p.vertex(0, (this.h1+this.h2), 0); // 6
    p.vertex(0, this.h1, 0); // 7
    p.vertex(this.w2, this.h1, 0); // 8
    // todo: make 3, 5, 6, and 8 biezer vertexes
    p.endShape(CLOSE);
  }

  blackKey01(p) {
    p.fill("#000000"); // black fill
    p.beginShape(TESS);
    p.vertex(0, 0, 0); // 1
    p.vertex( (this.w2*2), 0, 0); // 2
    p.vertex( (this.w2*2), this.h1, 0); // 3
    p.vertex(0, this.h1, 0); // 4
    // todo: make 3 and 4 biezer vertexes
    p.endShape(CLOSE);
  }

  bgFill(p) {
    p.background("#339c1a");
    p.describe('.a green background.')
  }

  showMousePos(p) {
    //displays the x and y position of the mouse on the canvas
    p.fill("#0000FF") // Blue text
    //text(`${mouseX}, ${mouseY}`, 675, 450);
    p.text(`${mouseX}, ${mouseY}`, mouseX + 25, mouseY + 45);
  }

  drawKeys(p, octives) {
    for(let i = 0; i < octives; i++) {
      // draw key 01 (white01, `C`).
      whiteKey01(p);
      // draw key 02 (black01, `C#`), translate +w1
      p.translate( (this.w1+(this.keyGap/2)), 0);
      blackKey01(p);
      // draw key 03 (white03 `D`), translate +w2
      p.translate( (this.w2+(this.keyGap/2)), 0);
      whiteKey03(p);
      // draw key 04 (black01 `D#`), translate +w2*2
      p.translate( (this.w2+this.w2+(this.keyGap/2)), 0);
      blackKey01(p);
      // draw key 05 (white02 `E`), translate +w2
      p.translate( (this.w2+(this.keyGap/2)), 0);
      whiteKey02(p);
      // draw key 06 (white01 `F`), translate +w1+w2
      p.translate( (this.w1+this.w2+this.keyGap), 0);
      whiteKey01(p);
      // draw key 07 (black01 `F#`), translate +w1
      p.translate( (this.w1+(this.keyGap/2)), 0);
      blackKey01(p);
      // draw key 08 (white03 `G`), translate +w2
      p.translate( (this.w2+(this.keyGap/2)), 0);
      whiteKey03(p);
      // draw key 09 (black01 `G#`), translate +w1
      p.translate( (this.w1+(this.keyGap/2)), 0);
      blackKey01(p);
      // draw key 10 (white03 `A`), translate +w2
      p.translate( (this.w2+(this.keyGap/2)), 0);
      whiteKey03(p);
      // draw key 11 (black01 `A#`), translate +w1
      p.translate( (this.w1+(this.keyGap/2)), 0);
      blackKey01(p);
      // draw key 12 (white02 `B`), translate +w2
      p.translate((this.w2+(this.keyGap/2)), 0);
      whiteKey02(p);

      // shift to print additional octives if requested.
      if(i+1 < octives) { p.translate( (this.w2+this.w1+this.keyGap), 0); }
    }
  }



  init(p) {
    //console.debug("got here");
    p.setup = () => {
      this.setup(p);
    };

    p.draw = () => {
      this.draw(p);
    };
  }

  setup(p) {
    // Setup code here
    p.createCanvas(800, 500);
    p.background("#339c1a");
    p.describe('.a green background.')
  }

  draw(p) {
    // Draw code here
    bgFill();

    // Keys (debug)
    // whiteKey01();
    // whiteKey02();
    // whiteKey03();
    // blackKey01();

    drawKeys(p, this.octives);

    // showMousePos(); // debug
  }


}




// todo:

//setup();
//draw();
//

let sketch = new KeyboardP5Sketch();
sketch.init();
