import settings from './settings.js'

const debug = true;
const svgNS = "http://www.w3.org/2000/svg";

const EVENT_TYPE_LOAD         = 'keyboard_app__load';
const EVENT_TYPE_INIT         = 'keyboard_app__init';
const EVENT_TYPE_KEY_ENTER    = 'keyboard_key__enter';
const EVENT_TYPE_KEY_LEAVE    = 'keyboard_key__leave';
const EVENT_TYPE_KEY_PRESS    = 'keyboard_key__press';
const EVENT_TYPE_KEY_RELEASE  = 'keyboard_key__release';


// todo: keyboard state needs to be abstracted out of this.
// todo: state needs to have listeners and set that up on its own.
// todo: svg needs to be generated as its onw thing.
// todo: there needs to be a base key class that each of the 4 key types extend from.
// todo: learn about using drop shadows: https://css-tricks.com/breaking-css-box-shadow-vs-drop-shadow/

/* Keyboard App */
class KeyboardVectorApp extends EventTarget {
  constructor() {
    super();
    this.updateConfigValues(); // this.c
    this.buildKeyState();      // this.s
    // pitches: this.c.p
    this.addEvents();

    this.updateDebug();

    this.dispatchEvent(this.e.load);

    // todo:?
    // window.addEventListener(EVENT_TYPE_KEY_PRESS, this.handleKeyPressedEvent);
    // window.addEventListener(EVENT_TYPE_KEY_RELEASE, this.handleKeyReleasedEvent);

    // todo:?
    // window.removeEventListener(EVENT_TYPE_KEY_PRESS)
    // window.removeEventListener(EVENT_TYPE_KEY_RELEASE)
  }

  addEvents() {

    // const event = new Event("build");
    // todo: should I set these keys somewhere instead of hard-coding them?
    this.e = {
      load: new Event(EVENT_TYPE_LOAD),
      init: new Event(EVENT_TYPE_INIT),
      key_enter: new Event(EVENT_TYPE_KEY_ENTER),
      key_enter: new Event(EVENT_TYPE_KEY_LEAVE),
      key_press: new Event(EVENT_TYPE_KEY_PRESS),
      key_release: new Event(EVENT_TYPE_KEY_RELEASE),
    };

    // todo: fix these
    this.addEventListener(EVENT_TYPE_LOAD, (e) => {
      console.debug("KeyboardAreaApp handling load event :", { e: e ?? null });
    });

    this.addEventListener(EVENT_TYPE_INIT, (e) => {
      console.debug("KeyboardAreaApp handling init event :", { e: e ?? null });
    });

    this.addEventListener(EVENT_TYPE_KEY_PRESS, (e) => {
      console.debug("KeyboardAreaApp handling key press event :", { e: e ?? null });
    });

    this.addEventListener(EVENT_TYPE_KEY_RELEASE, (e) => {
      console.debug("KeyboardAreaApp handling key release event :", { e: e ?? null });
    });

    if(debug) {
      for(let e in this.e) {
        console.debug("what is e?", { e: e, event: this.e[e] })
      }
    }
  }

  handleEvent(event, value) {
    console.debug("KeyboardAreaApp event handler:", event, value)
  }

  updateDebug() {
    for (let i = 0; i < this.s.k.length; i++) {
      try {
        const ta = document.getElementById(`debug_values_${i}`);
        //console.debug("updateDebug", { ta });
        ta.value = JSON.stringify(this.s.k[i], null, 2);
      } catch (e) {
        //this.handleEvent(e);
      }
    }
  }

  // handleKeyPressedEvent(e) {
  //   console.debug("fired handleKeyPressedEvent", { e: e ?? null, this: this })
  // }

  // handleKeyReleasedEvent(e) {
  //   console.debug("fired handleKeyReleasedEvent", { e: e ?? null, this: this })
  // }

  handlePointerEvent(e) {
    //console.debug("handlePointerEvent", {
    //  e: e ?? undefined,
    //  this: this,
    //})

    switch(e.type) {
      case "mouseenter":
      //case "mouseover":
      //case "focusin":
      //case "pointerover":
        //console.debug("handle pointerover event for target", { e })
        // make key active
        e.target.classList.add('active'); // todo: this needs to update the key data, not the DOM
        break;
      case "mouseleave":
        //case "mouseout":
        //case "focusout":
        //case "pointerout":
          //console.debug("handle pointerout event for target", { e })
          // make key inactive
          e.target.classList.remove('active'); // todo: this needs to update the key data, not the DOM
          // make key unpressed
          e.target.classList.remove('pressed'); // todo: this needs to update the key data, not the DOM
          // fire keyRelease event
          this.dispatchEvent(this.e.key_release);
          break;
      case "mousedown":
      case "touchstart":
      //case "pointerdown":
        //console.debug("handle pointerdown event for target", { e })
        // make key pressed
        e.target.classList.add('pressed'); // todo: this needs to update the key data, not the DOM
        // fire keyPressed event
        this.dispatchEvent(this.e.key_press);
        break;
      case "mouseup":
      case "touchend":
      //case "pointerup":
        //console.debug("handle pointerup event for target", { e })
        // make key unpressed
        e.target.classList.remove('pressed'); // todo: this needs to update the key data, not the DOM
        // fire keyRelease event
        this.dispatchEvent(this.e.key_release);
        break;


      //default: this.handleEvent(e);
    }
  }

  // todo: handleKeyPressEvent(e) {}
  // todo: handleKeyReleaseEvent(e) {}

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
        console.debug()
        keys.push({
          index: i++,
          pressed: false,
          active: false,
          pitch: `${this.c.p[p]}${octive}`
        });
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
    newPoly.classList.add(keyName);
    //(null, "class", kc.f.s);

    // Add event listeners
    newPoly.addEventListener('mouseenter', (e) => { this.handlePointerEvent(e); });
    newPoly.addEventListener('mouseleave', (e) => { this.handlePointerEvent(e); });
    newPoly.addEventListener('mousedown', (e) => { this.handlePointerEvent(e); });
    newPoly.addEventListener('mouseup', (e) => { this.handlePointerEvent(e); });
    newPoly.addEventListener('touchstart', (e) => { this.handlePointerEvent(e); });
    newPoly.addEventListener('touchend', (e) => { this.handlePointerEvent(e); });

    return newPoly;
  }

  buildKeyVectors() {
    const keyboardContainer = document.getElementById("keyboard-container");

    // Create the keyboard vector
    const kbVector = document.createElementNS(svgNS, 'svg');

    // Add a background element
    const kbBg = document.createElementNS(svgNS, 'rect');
    kbBg.setAttribute('fill', this.c.bg.c);
    kbBg.setAttribute('width', "100%");
    kbBg.setAttribute('height', "100%");
    kbVector.appendChild(kbBg);

    const kbVectorW = this.getVectorWidth();
    const kbVectorH = this.getVectorHeight();
    kbVector.setAttribute('id', 'keyboard-vector');
    kbVector.setAttribute('width', kbVectorW);
    kbVector.setAttribute('height', kbVectorH);
    kbVector.setAttribute('style', 'max-width:100%;margin:0 auto;display:block;');
    kbVector.setAttribute('viewBox', `0 0 ${kbVectorW} ${kbVectorH}`);


    for(let key in this.s.k) {
      const k = parseInt(key);
      // console.debug("key:", { k, val: this.s.k[k], name: this.getKeyTypeName(k) });

      kbVector.appendChild( this.getKeyVector(k) );
    }

    keyboardContainer.appendChild(kbVector);
  }

  init() {
    document.addEventListener("DOMContentLoaded", (event) => {
      this.buildKeyVectors();
      this.dispatchEvent(this.e.init);
    });
  }
}

// Load Page App
let kbVector = new KeyboardVectorApp();
 kbVector.init()
