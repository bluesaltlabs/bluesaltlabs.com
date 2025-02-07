import settings from './settings.js'
const svgNS = "http://www.w3.org/2000/svg";

/* Keyboard App */
class KeyboardAreaApp {
  constructor() {
    this.updateConfigValues(); // this.c
    this.buildKeyState();      // this.s
    // pitches: this.c.p

    this.handleEvent(
      new Event("init"), { c: this.c, s: this.s }
    );
  }

  handleEvent(event, value) {
    console.debug("KeyboardAreaApp event handler:", event, value)
  }

  updateConfigValues() {
    const h1 = settings?.height_1 ?? 90;
    const h2 = settings?.height_2 ?? 60;
    const w1 = settings?.width_1 ?? 24;
    const w2 = (w1 / 2);  // width 02, half of width 1
    const wk2w = (w2+w1); // white key 2 width
    const kg = settings?.keyGap ?? 2; // Key gap
    const hkg = (kg/2); // Half key gap
    const kw = w1 + w2;  // key width
    this.c = {
      octives: settings?.octives ?? 2,
      firstOctive: settings?.firstOctive ?? 2,
      h1,h2,w1,w2,kg,kw,hkg,wk2w,
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
      p: settings.pitches,
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

  getKeyTypeName(keyIndex) {
    switch(keyIndex % 12) {
      case 0: return "wk1"; break;
      case 1: return "bk1"; break;
      case 2: return "wk3"; break;
      case 3: return "bk1"; break;
      case 4: return "wk2"; break;
      case 5: return "wk1"; break;
      case 6: return "bk1"; break;
      case 7: return "wk3"; break;
      case 8: return "bk1"; break;
      case 9: return "wk3"; break;
      case 10: return "bk1"; break;
      case 11: return "wk2"; break;
    }
  }

  getVectorWidth() {
    const numKeys = this.s.k.length;
    return this.getKeyOffsetX(numKeys);
  }

  getVectorHeight() {
    return (this.c.kg + this.c.h1 + this.c.h2 + this.c.kg);
  }

   getIndexOffsetX(i) {
     // console.debug("i", { i })
     if (i === 0) { return this.c.kg; }
     switch(i % 12) {
       case 0:  return (this.c.w1+this.c.w2+this.c.kg);
       case 1: return (this.c.w1+this.c.hkg);
       case 2: return (this.c.w2+this.c.hkg);
       case 3: return (this.c.w1+this.c.hkg);
       case 4: return (this.c.w2+this.c.hkg);
       case 5: return (this.c.wk2w+this.c.kg);
       case 6: return (this.c.w1+this.c.hkg);
       case 7: return (this.c.w2+this.c.hkg);
       case 8: return (this.c.w1+this.c.hkg);
       case 9: return (this.c.w2+this.c.hkg);
       case 10: return (this.c.w1+this.c.hkg);
       case 11: return (this.c.w2+this.c.hkg);
     }
     return 0;
   }

  getKeyOffsetX(keyIndex) {
    const ki = parseInt(keyIndex);
    let offset = 0;

    for (let i = ki; i >= 0; i--) {
      offset += this.getIndexOffsetX(i);
    }

    return offset;
  }

  getKeyOffsetY(keyIndex) {
    const ki = parseInt(keyIndex) % 12;
    // this.c.hkg for black keys
    if(ki === 1 || ki === 3 || ki === 6 || ki === 8 || ki === 10) {
      return this.c.hkg;
    } else {
      return this.c.kg;
    }
  }

  buildKeyState() {
    let i = 0;
    let keys = [];

    for (let o = 0; o < this.c.octives; o++) {
      const octive = this.c.firstOctive + o;

      // todo: this shouldn't be here - there should just be 12 pitches
      for(let p in this.c.p) {
        keys.push({ index: i++, p: `${p}${octive}` });
        if(p !== "B" && p !== "E") {
          keys.push({ index: i++, p: `${p}#${octive}` });
        }
      }
    }

    // state
    this.s = {
      k: keys, // keys (state)
    };
  }

  getKeyVector(keyIndex) {
    const keyName = this.getKeyTypeName(keyIndex);
    // console.debug("keyName", { keyIndex ,keyName });
    const shiftX = this.getKeyOffsetX(keyIndex);
    // console.debug("shiftX", { keyIndex, shiftX })
    const shiftY = this.getKeyOffsetY(keyIndex);
    const kc = this.getKeyConfig(keyName);

    let points = '';
    for(let p in kc.v) {
      // console.debug({ v: v[p] })
      points = `${points} ${kc.v[p].x + shiftX},${kc.v[p].y + shiftY}`;
    }

    const newPoly = document.createElementNS(svgNS, 'polygon');

    newPoly.setAttributeNS(null, "id", `key-${keyName}-${keyIndex}`);
    newPoly.setAttributeNS(null, "width", "100%");
    newPoly.setAttributeNS(null, "height", "100%");
    newPoly.setAttributeNS(null, "points", points);

    newPoly.setAttributeNS(null, "fill", kc.f.c);
    newPoly.setAttributeNS(null, "stroke", kc.f.s);

    return newPoly;
  }

  buildKeyVectors() {
    //const keyboardContainer = document.getElementById("keyboard-container");
    const kbVector = document.getElementById("keyboard-vector");

    for(let key in this.s.k) {
      const k = parseInt(key);
      // console.debug("key:", { k, val: this.s.k[k], name: this.getKeyTypeName(k) });

      kbVector.appendChild( this.getKeyVector(k) );

      const kbVectorW = this.getVectorWidth();
      const kbVectorH = this.getVectorHeight();
      kbVector.setAttribute('width', kbVectorW);
      kbVector.setAttribute('height', kbVectorH);
      kbVector.setAttribute('viewBox', `0 0 ${kbVectorW} ${kbVectorH}`);
    }
  }

  init() {
    document.addEventListener("DOMContentLoaded", (event) => {
      this.buildKeyVectors();

      // todo:
      this.handleEvent( new Event("app_load") );
    });
  }
}

// Load Page App
let kbArea = new KeyboardAreaApp();
 kbArea.init()
