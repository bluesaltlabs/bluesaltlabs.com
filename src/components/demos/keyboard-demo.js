import { LitElement, html, css } from "lit";
import * as Tone from 'tone';

const keyNotes = {
  1: "C#",  // black key
  2: "D#",  // black key
  3: "F#",  // black key
  4: "G#",  // black key
  5: "A#",  // black key
  6: "C#",  // black key
  7: "D#",  // black key
  8: "F#",  // black key
  9: "G#",  // black key
  10: "A#", // black key
  11: "C",  // white key
  12: "D",  // white key
  13: "E",  // white key
  14: "F",  // white key
  15: "G",  // white key
  16: "A",  // white key
  17: "B",  // white key
  18: "C",  // white key
  19: "D",  // white key
  20: "E",  // white key
  21: "F",  // white key
  22: "G",  // white key
  23: "A",  // white key
  24: "B",  // white key
};

const synthConfig = {
  oscillator: {
    type: "amtriangle",
    harmonicity: 0.5,
    modulationType: "sine",
  },
  envelope: {
    attackCurve: "exponential",
    attack: 0.15,
    decay: 0.5,
    sustain: 0.25,
    release: 1.5,
  },
  portamento: 0.05,
};

class KeyboardDemo extends LitElement {
  /* code source: https://dev.to/codingcss/playable-piano-using-html-css-and-javascript-5g6c */
  static styles = css`
    .keyboard-container__wrapper {
      position: relative;
      width: 100%;
      height: 30em;
    }
    .piano-container {
      user-select: none;
      display: flex;
      position: absolute;
      transform: translate(-50%, -50%);
      left: 50%;
      top: 50%;
      padding: 4em 1em 1em 1em;
      border-radius: 0.62em;
      background-color: #24272e;
      box-shadow: 0 2em 4em rgba(7, 0, 53, 0.25);
    }
    .white-key {
      user-select: none;
      width: 4.37em;
      height: 17.5em;
      background-color: #ffffff;
      border-radius: 0 0 0.3em 0.3em;
      border: 2px solid #24272e;
      box-sizing: border-box;
      cursor: pointer;
    }
    .white-key:hover {
      background-color: #ebebeb;
    }
    .black-key {
      user-select: none;
      width: 2.5em;
      height: 10em;
      border-radius: 0 0 0.3em 0.3em;
      box-sizing: border-box;
      position: absolute;
      background-color: #070a0f;
      cursor: pointer;
    }
    .black-key:hover {
      background-color: #24272e;
    }
    .black-key:nth-child(1) {
      left: 4em;
    }
    .black-key:nth-child(2) {
      left: 8.37em;
    }
    .black-key:nth-child(3) {
      left: 17.12em;
    }
    .black-key:nth-child(4) {
      left: 21.5em;
    }
    .black-key:nth-child(5) {
      left: 25.87em;
    }
    .black-key:nth-child(6) {
      left: 34.62em;
    }
    .black-key:nth-child(7) {
      left: 39em;
    }
    .black-key:nth-child(8) {
      left: 47.75em;
    }
    .black-key:nth-child(9) {
      left: 52.12em;
    }
    .black-key:nth-child(10) {
      left: 56.5em;
    }
    @media screen and (max-width: 1100px) {
      .keyboard-container__wrapper {
        height: 20em;
      }
      .piano-container {
        font-size: 0.7em;
      }
    }
    @media screen and (max-width: 750px) {
      .keyboard-container__wrapper {
        height: 18em;
      }
      .piano-container {
        font-size: 0.5em;
      }
    }
    @media screen and (max-width: 500px) {
      .keyboard-container__wrapper {
        height: 12em;
      }
      .piano-container {
        font-size: 0.3em;
      }
    }
    @media screen and (max-width: 350px) {
      .keyboard-container__wrapper {
        height: 10em;
      }
      .piano-container {
        font-size: 0.2em;
      }
    }
  `;

  static properties = {
    keys: { type: Array, reflect: true },
    octive: { type: Number, reflect: true },
    mouseDown: { type: Boolean, reflect: true },
    audioStarted: { type: Boolean, reflect: true },
    synths: { type: Array }
  };

  constructor() {
    super();
    this.keys = [];
    this.synths = [];
    this.octive = 2;
    this.mouseDown = false;
    this.audioStarted = false;

    this.buildKeys();
  }

  buildKeys() {
    for (let index in keyNotes) {
      this.keys[index] = {
        index,
        class: index <= 10 ? "black-key" : "white-key",
        note: keyNotes[index],
      };
    }
  }

  buildSynths() {
    for (let index in keyNotes) {
      this.synths[index] = new Tone.Synth(synthConfig).toDestination();
    }
  }

  getOctiveForIndex(index) {
    const i = parseInt(index);
    let secondOctive = 0;

    if( (i > 5 && i < 11) || (i > 17) ) { secondOctive = 1; }

    return (this.octive + secondOctive);

  }

  getNoteString(index) {
    try {
      const noteString = `${keyNotes[index]}${this.getOctiveForIndex(index)}`;
      return noteString;
    } catch (e) {
      console.warn(`Couldn't getNoteString for index: ${index}`, e)
      return ''
    }
  }

  setMouseDown() { this.mouseDown = true; }// console.debug("fired setMouseDown")}
  setMouseUp() { this.mouseDown = false; } //console.debug("fired setMouseUp")}

  handleTouchStartKey(index) {
    // console.debug("fired handleTouchStartKey", { index })
    this.handleNoteTrigger(index)
  }

  handleTouchEndKey(index) {
    // console.debug("fired handleTouchStartKey", { index })
    this.handleNoteRelease(index)
  }

  handleMouseEnterKey(index) {
    if(this.mouseDown) {
      //console.debug("fired handleMouseEnterKey", { index })
      //this.handleNoteTrigger(index)
    }
  }

  handleMouseLeaveKey(index) {
    this.handleNoteRelease(index)

    setTimeout(() => { this.setMouseUp() }, 300);
  }

  handleMouseDownKey(index) {
    //console.debug("fired handleMouseDownKey", { index })
    this.setMouseDown()
    this.handleNoteTrigger(index)
  }

  handleMouseDownContainer() { this.setMouseDown(); }
  handleMouseUpContainer() { this.setMouseUp(); }
  handleMouseLeaveContainer() {
    this.setMouseUp();
    this.handleNoteRelease();
  }

  handleMouseUpKey(index) {
    this.setMouseUp();
    this.handleNoteRelease(index)
  }

  // function to trigger the note - triggered by click, touch, or keyboard.
  handleNoteTrigger(index) {
    // Check if index is valid
    if (index && typeof this.synths[index] !== 'undefined') { // todo: this should check keys and not keyNotes
      const note = this.getNoteString(index);
      console.debug(`playing note: ${note}`);
      this.synths[index].triggerAttack( note );
    }
  }

  // function to release the note -
  // todo: when index is null, release all notes.
  handleNoteRelease(index = null) {
    //console.debug(`releasing note: ${index}`)
    if (index && typeof this.synths[index] !== 'undefined') { // todo: this should check keys and not keyNotes
      this.synths[index].triggerRelease();
    } else {
      // release all
      for(let synthIndex in this.synths) {
        //console.debug(key)
        try {
          this.synths[synthIndex].triggerRelease();
        } catch(e) {}
      }
    }
  }

  startAudio() {
    if(!this.audioStarted) {
      Tone.start();
      this.buildSynths();
    }
  }

  render() {
    return html`
      <div class="keyboard-container__wrapper">
        <button @click=${this.startAudio}>Start Audio</button>
        <div
          class="piano-container"
          @mouseup=${this.handleMouseUpContainer}
          @mousedown=${this.handleMouseDownContainer}
          @mouseleave=${this.handleMouseLeaveContainer}
        >
          ${this.keys.map((key) => {
            return html`
              <div
                keyIndex=${key.index}
                class="${key.class}"
                @mouseenter=${this.handleMouseEnterKey(key.index)}
                @mousedown=${() => this.handleMouseDownKey(key.index)}
                @mouseleave=${() => this.handleMouseLeaveKey(key.index)}
                @mouseup=${() => this.handleMouseUpKey(key.index)}
                @touchstart=${() => this.handleTouchStartKey(key.index)}
                @touchend=${() => this.handleTouchEndKey(key.index)}
              >
                <p
                  style="text-align:center;${key.class === 'white-key' ? 'color:black;' : 'color:white;'}"
                >${key.note}${this.octive}</p>
              </div>
            `;
          })}
        </div>
      </div>
    `;
  }
}

customElements.define("keyboard-demo", KeyboardDemo);
