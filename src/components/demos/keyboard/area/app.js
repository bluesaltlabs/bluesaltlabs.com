import settings from './settings.js'
const svgNS = "http://www.w3.org/2000/svg";

/* Keyboard App */
class KeyboardAreaApp {
  constructor() {
    this.updateConfigValues();
    this.buildKeyState();

    console.debug("KeyboardAreaApp config: ", this.c)
  }

  handleEvent(event) {
    console.debug("KeyboardAreaApp event handler:", event)
  }

  updateConfigValues() {
    const h1 = settings?.height_1 ?? 90;
    const h2 = settings?.height_2 ?? 60;
    const w1 = settings?.width_1 ?? 24;
    const w2 = (w1 / 2); // width 02, half of width 1
    const kg = settings?.keyGap ?? 2; // Key gap
    const kw = w1 + w2; // key width
    this.c = {
      octives: settings?.octives ?? 2,
      firstOctive: settings?.firstOctive ?? 2,
      h1,h2,w1,w2,kg,kw,
      bg: {
        c: settings?.background?.color ?? "#339c1a",
        d: settings?.background?.describe ?? ".a green background.",
      },
      k: {
        bk1: {
          f:{
            c:settings?.keys?.black_key_01?.fill?.color??"#000000",
            s:settings?.keys?.black_key_01?.fill?.stroke??"#000000",
            d:settings?.keys?.black_key_01?.fill?.describe??"a black piano key.",
          },
          v:[ // width: (w2+w2)
            {x:0,y:0,z:0},        // 1
            {x:(w2+w2),y:0,z:0},  // 2
            {x:(w2+w2),y:h1,z:0}, // 3
            {x:0,y:h1,z:0},       // 4
          ],
        },
        wk1: {
          f:{
            c:settings?.keys?.white_key_01?.fill?.color??"#FFFFFF",
            s:settings?.keys?.white_key_01?.fill?.stroke??"#000000",
            d:settings?.keys?.white_key_01?.fill?.describe??"a white piano key.",
          },
          v:[// width: (w1+w2)
            {x:0,y:0,z:0},             // 1
            {x:w1,y:0,z:0},            // 2
            {x:w1,y:h1,z:0},           // 3
            {x:(w1+w2),y:h1,z:0},      // 4
            {x:(w1+w2),y:(h1+h2),z:0}, // 5
            {x:0,y:(h1+h2),z:0},       // 6
          ],
        },
        wk2: {
          f:{
            c:settings?.keys?.white_key_02?.fill?.color??"#FFFFFF",
            s:settings?.keys?.white_key_02?.fill?.stroke??"#000000",
            d:settings?.keys?.white_key_02?.fill?.describe??"a white piano key.",
          },
          v: [ // width: (w2+w1)
            {x:w2,y:0,z:0},            // 1
            {x:(w2+w1),y:0,z:0},       // 2
            {x:(w2+w1),y:(h1+h2),z:0}, // 3
            {x:0,y:(h1+h2),z:0},       // 4
            {x:0,y:h1,z:0},            // 5
            {x:w2,y:h1,z:0},           // 6
          ],
        },
        wk3: {
          f:{
            c:settings?.keys?.white_key_03?.fill?.color??"#FFFFFF",
            s:settings?.keys?.white_key_03?.fill?.stroke??"#000000",
            d:settings?.keys?.white_key_03?.fill?.describe??"a white piano key.",
          },
          v: [ // width: (w2+w2+w2)
            {x:w2,y:0,z:0},                    // 1
            {x:(w2+w2),y:0,z:0 },              // 2
            {x:(w2+w2), y: h1, z: 0 },         // 3
            {x:(w2+w2+w2), y: h1, z: 0 },      // 4
            {x:(w2+w2+w2), y: (h1+h2), z: 0 }, // 5
            {x:0,y:(h1+h2),z:0},               // 6
            {x:0,y:h1,z:0},                    // 7
            {x:w2,y:h1,z:0},                   // 8
          ],
        },
      },
    };
  }

  getKeyConfig(keyName) {
    switch(keyName) {
      case "bk1": return this.c.k.bk1; break;
      case "wk1": return this.c.k.wk1; break;
      case "wk2": return this.c.k.wk2; break;
      case "wk3": return this.c.k.wk3; break;
    }
  }

  buildKeyState() {

  }

  getKeyVector(keyName, shiftX = 0, shiftY = 0) {
    const kc = this.getKeyConfig(keyName);

    let points = '';
    for(let p in kc.v) {
      //console.debug({ v: v[p] })
      points = `${points} ${kc.v[p].x + shiftX},${kc.v[p].y + shiftY}`;
    }

    const newPoly = document.createElementNS(svgNS, 'polygon');

    newPoly.setAttributeNS(null, "id", "new-poly");
    newPoly.setAttributeNS(null, "width", "100%");
    newPoly.setAttributeNS(null, "height", "100%");
    newPoly.setAttributeNS(null, "points", points);

    newPoly.setAttributeNS(null, "fill", kc.f.c); // todo
    newPoly.setAttributeNS(null, "stroke", kc.f.s); // todo

    return newPoly;
  }

  init() {
    document.addEventListener("DOMContentLoaded", (event) => {
      //const keyboardContainer = document.getElementById("keyboard-container");
      const testVector = document.getElementById("test-vector");

      // value shortcuts
      const w1 = this.c.w1; // width 1
      const w2 = this.c.w2; // width 2
      const kg = this.c.kg; // key gap width
      const hkg = (kg/2);   // Half key gap width

      // key width value shortcuts
      const bk1w = (w2+w2);    // black key 1 width
      const wk1w = (w1+w2);    // white key 1 width
      const wk2w = (w2+w1);    // white key 2 width
      const wk3w = (w2+w2+w2); // white key 3 width

      // testVector.appendChild(this.getKeyVector("bk1"));
      // testVector.appendChild(this.getKeyVector("wk1"));
      // testVector.appendChild(this.getKeyVector("wk2"));
      // testVector.appendChild(this.getKeyVector("wk3"));

      // todo: should I save this offset value in the key?
      let offsetX = 0;

      testVector.appendChild(this.getKeyVector("wk1", offsetX, kg));  // key 01
      offsetX += w1+hkg;
      testVector.appendChild(this.getKeyVector("bk1", offsetX, hkg)); // key 02
      offsetX += w2+hkg;
      testVector.appendChild(this.getKeyVector("wk3", offsetX, kg));  // key 03
      offsetX += w1+hkg;
      testVector.appendChild(this.getKeyVector("bk1", offsetX, hkg)); // key 04
      offsetX += w2+hkg;
      testVector.appendChild(this.getKeyVector("wk2", offsetX, kg));  // key 05
      offsetX += wk2w+kg;
      testVector.appendChild(this.getKeyVector("wk1", offsetX, kg));  // key 06
      offsetX += w1+hkg;
      testVector.appendChild(this.getKeyVector("bk1", offsetX, hkg)); // key 07
      offsetX += w2+hkg;
      testVector.appendChild(this.getKeyVector("wk3", offsetX, kg));  // key 08
      offsetX += w1+hkg;
      testVector.appendChild(this.getKeyVector("bk1", offsetX, hkg)); // key 09
      offsetX += w2+hkg;
      testVector.appendChild(this.getKeyVector("wk3", offsetX, kg));  // key 10
      offsetX += w1+hkg;
      testVector.appendChild(this.getKeyVector("bk1", offsetX, hkg)); // key 11
      offsetX += w2+hkg;
      testVector.appendChild(this.getKeyVector("wk2", offsetX, kg));  // key 12


      // todo
      // if(octive > 1) { offsetX += kg };

      // todo:
      this.handleEvent( new Event("app_load") );
    });
  }
}

// Load Page App
let kbArea = new KeyboardAreaApp(1, 4);
 kbArea.init()

// -------------------------------------------------------------------------- //

/*
<map name="infographic">
  <area
    shape="poly"
    coords="129,0,260,95,129,138"
    href="https://developer.mozilla.org/docs/Web/HTTP"
    target="_blank"
    alt="HTTP" />
  <area
    shape="poly"
    coords="260,96,209,249,130,138"
    href="https://developer.mozilla.org/docs/Web/HTML"
    target="_blank"
    alt="HTML" />
  <area
    shape="poly"
    coords="209,249,49,249,130,139"
    href="https://developer.mozilla.org/docs/Web/JavaScript"
    target="_blank"
    alt="JavaScript" />
  <area
    shape="poly"
    coords="48,249,0,96,129,138"
    href="https://developer.mozilla.org/docs/Web/API"
    target="_blank"
    alt="Web APIs" />
  <area
    shape="poly"
    coords="0,95,128,0,128,137"
    href="https://developer.mozilla.org/docs/Web/CSS"
    target="_blank"
    alt="CSS" />
</map>
<img usemap="#infographic" src="/media/examples/mdn-info.png" alt="MDN infographic" />
 */
