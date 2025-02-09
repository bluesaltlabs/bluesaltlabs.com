import AudioService from '@/services/AudioService'
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
    this.audioStarted = false;
    this.checkAudioContext();
    this.updateConfigValues(); // this.c
    this.buildKeyState();      // this.s.keys
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

  checkAudioContext() {
    // Check for AudioContext.
    const hasAudioContext = window.hasOwnProperty('AudioContext');
    const hasWebKitAudioContext = window.hasOwnProperty('webkitAudioContext');

    // The browser does not have either prefixed or unprefixed version of
    // AudioContext. Quit immediately.
    // This is for the old version of IE. (before Edge)
    if (!hasWebKitAudioContext && !hasAudioContext) {
      console.log('This browser does not support Web Audio API. Bye.');
      return;
    }

    // The browser only has the prefixed version of AudioContext. Apply patch.
    // This is for Safari.
    if (hasWebKitAudioContext && !hasAudioContext) {
      window.AudioContext = window.webkitAudioContext;
      console.log('This browser still has webkitAudioContext. Patch applied.');
    }

  }

  addEvents() {

    // const event = new Event("build");
    // todo: should I set these keys somewhere instead of hard-coding them?
    this.e = {
      load: new Event(EVENT_TYPE_LOAD),
      init: new Event(EVENT_TYPE_INIT),
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
      this.updateDebug();
    });

    this.addEventListener(EVENT_TYPE_KEY_RELEASE, (e) => {
      console.debug("KeyboardAreaApp handling key release event :", { e: e ?? null });
      this.updateDebug();
    });
  }

  handleEvent(event, value) {
    console.debug("KeyboardAreaApp event handler:", event, value)
  }

  updateDebug() {
    for (let i = 0; i < this.s.keys.length; i++) {
      try {
        const ta = document.getElementById(`debug_values_${i}`);
        //console.debug("updateDebug", { ta });
        ta.value = JSON.stringify(this.s.keys[i], null, 2);
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

  // todo: this function needs a lot of work ...
  handlePointerEvent(e, keyIndex) {
    //console.debug("handlePointerEvent", {
    //  e: e ?? undefined,
    //  this: this,
    //})

    const detail = {
      id: e.target.id,
      keyIndex: keyIndex,
      key: this.s.keys[keyIndex],
    };

    // null | activate | deactivate | press | depress
    let eventAction = null;

    // Determine the event action to take based on the event type
    switch(e.type) {
      case "mouseenter":
      // case "mouseover":
      // case "focusin":
      // case "pointerover":
        eventAction = 'activate';
        break;
      case "mouseleave":
      // case "mouseout":
      // case "focusout":
      // case "pointerout":
        eventAction = 'deactivate';
        break;
      case "mousedown":
      case "touchstart":
      //case "pointerdown":
        // make key pressed
        eventAction = 'press';
        break;
      case "mouseup":
      case "touchend":
      //case "pointerup":
        //console.debug("handle pointerup event for target", { e })
        // make key unpressed
        eventAction = 'depress';
        break;
      //default: this.handleEvent(e);
    }


    // first, trigger key stuff, because responsiveness
    if(!this.audioStarted) {
      console.warn("Please start audio first!");
    } else {
      if(eventAction === 'press') {
        // Trigger synth key press
        console.debug("triggering synth attack:", { pitch: this.s.keys[keyIndex].pitch });

        this.s.synth.triggerAttack(this.s.keys[keyIndex].pitch);
      }


      if( eventAction === 'depress' || eventAction === 'deactivate' ) {
        // Trigger key release
        this.s.synth.triggerRelease();
      }
    }

    // then, update DOM and fire events
    // todo: should this be somewhere else?
    if(eventAction === 'activate') {
      // make key active
      this.s.keys[keyIndex].active = true;
      e.target.classList.add('active');
    }

    // todo: should this be somewhere else?
    if(eventAction  === 'deactivate') {
      // make key inactive
      this.s.keys[keyIndex].active = false;
      e.target.classList.remove('active');
    }

    // todo: should this be somewhere else?
    if(eventAction === 'press') {
      // make key pressed
      this.s.keys[keyIndex].pressed = true;
      e.target.classList.add('pressed');
      this.dispatchEvent(new CustomEvent(EVENT_TYPE_KEY_PRESS, { detail }));
    }

    // todo: should this be somewhere else?
    if(eventAction === 'depress') {

      // make key depressed
      this.s.keys[keyIndex].pressed = false;
      e.target.classList.remove('pressed');
      // Trigger key release
      this.dispatchEvent(new CustomEvent(EVENT_TYPE_KEY_RELEASE, { detail }));
    }
  }

  // todo?: handleKeyPressEvent(e) {}
  // todo?: handleKeyReleaseEvent(e) {}

  updateConfigValues() {
    const h1 = settings?.height_1 ?? 90;
    const h2 = settings?.height_2 ?? 60;
    const w1 = settings?.width_1 ?? 24;
    const w2 = (w1 / 2);  // width 02, half of width 1
    const wk2w = (w2+w1); // white key 2 width
    const kg = settings?.keyGap ?? 2; // Key gap
    const hkg = (kg/2); // Half key gap
    const kw = w1 + w2;  // key width
    this.c = { // config
      octives: settings?.octives ?? 2,
      first_octive: settings?.first_octive ?? 2,
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
    const numKeys = this.s.keys.length;
    return this.getKeyOffsetX(numKeys);
  }

  getVectorHeight() {
    return (this.c.kg + this.c.h1 + this.c.h2 + this.c.kg);
  }

  getIndexOffsetX(i) {
    // console.debug("i", { i })
    if (i === 0) { return this.c.kg; }
    switch(i % 12) {
      case 0: return (this.c.w1+this.c.w2+this.c.kg);
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

  buildSynthState() {
    // Build tone synth
    const synth = new AudioService.t.Synth({
      // todo: update these settings, or make them editable
      oscillator: {
					type: "amtriangle",
					harmonicity: 0.5,
					modulationType: "sine",
				},
				envelope: {
					attackCurve: "exponential",
					attack: 0.05,
					decay: 0.2,
					sustain: 0.2,
					release: 1.5,
				},
				portamento: 0.05,
    }).toDestination();

    // Build state values
    this.s = { ...(this.s ?? {}), synth };

    if(debug) {
      console.debug("synth state built: ", { ...this.s });
    }
  }

  buildKeyState() {
    // Build keys
    let keyID = 0;
    let keys = [];

    // For each octive, add a key for each pitch.
    for (let o = 0; o < this.c.octives; o++) {
      const octive = this.c.first_octive + o;

      // For each pitch, add a key.
      for(let p in this.c.p) {
        keys.push({
          index: keyID++,
          pressed: false,
          active: false,
          pitch: `${this.c.p[p]}${octive}`,
        });
      }
    }

    // Build state values
    this.s = { ...(this.s ?? {}), keys };

    if(debug) {
      console.debug("key state built: ", { ...this.s });
    }
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
    newPoly.classList.add('disabled');
    //(null, "class", kc.f.s);

    // Add event listeners
    newPoly.addEventListener('mouseenter', (e) => { this.handlePointerEvent(e, keyIndex); });
    newPoly.addEventListener('mouseleave', (e) => { this.handlePointerEvent(e, keyIndex); });
    newPoly.addEventListener('mousedown', (e) => { this.handlePointerEvent(e, keyIndex); });
    newPoly.addEventListener('mouseup', (e) => { this.handlePointerEvent(e, keyIndex); });
    newPoly.addEventListener('touchstart', (e) => { this.handlePointerEvent(e, keyIndex); });
    newPoly.addEventListener('touchend', (e) => { this.handlePointerEvent(e, keyIndex); });

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


    for(let key in this.s.keys) {
      const k = parseInt(key);
      // console.debug("key:", { k, val: this.s.keys[k], name: this.getKeyTypeName(k) });

      kbVector.appendChild( this.getKeyVector(k) );
    }

    keyboardContainer.appendChild(kbVector);
  }

  startAudio(e) {
    if( !this.audioStarted ) {
      AudioService.t.start();
      this.buildSynthState();    // this.s.synth
      // todo: fire start audio??
    }
    e.target.disabled = true;
    this.audioStarted = true;
  }

  init() {
    document.addEventListener("DOMContentLoaded", (event) => {
      this.buildKeyVectors();
      this.dispatchEvent(this.e.init);

      // todo: clean this up
      const startAudioButton = document.getElementById("btn-start-audio");
      startAudioButton.addEventListener('click', (e) => this.startAudio(e) );
    });
  }
}

// Load Page App
let kbVector = new KeyboardVectorApp();
 kbVector.init()
