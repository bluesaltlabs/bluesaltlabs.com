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
    attack: 0.05,
    decay: 0.2,
    sustain: 0.2,
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
    keys: { type: Object },
    octive: { type: Number },
    synth: { type: Object },
    mouseDown: { type: Boolean },
  };

  constructor() {
    super();
    this.keys = [];
    this.octive = 2;
    this.mouseDown = false;

    this.initSynth(); // todo: wait to do this until audio context starts.
    this.buildKeys();
  }

  initSynth() {
    this.synth = new Tone.Synth(synthConfig).toDestination();
  }

  buildKeys() {
    for (let index in keyNotes) {
      // Add the key to this element's 'keys' property
      this.keys[index] = {
        index,
        class: index <= 10 ? "black-key" : "white-key",
        note: keyNotes[index],
      };

      // console.debug("adding key", { index: index, key: this.keys[index] });
    }
  }

  getNoteString(index) {
    try {
      const noteString = `${keyNotes[index]}${this.octive}`;
      // console.debug(`noteString: ${noteString}`)
      return noteString;
    } catch (e) {
      console.warn(`Couldn't getNoteString for index: ${index}`, e)
      return ''
    }
  }

  handleTouchStartKey(index) {
    console.debug("fired handleTouchStartKey", { index })
    this.handleNoteTrigger(index)
  }

  handleTouchEndKey(index) {
    console.debug("fired handleTouchStartKey", { index })
    this.handleNoteRelease()
  }

  handleMouseEnterKey(index) {
    if(this.mouseDown) {
      console.debug("fired handleMouseEnterKey", { index })
      this.handleNoteTrigger(index)
    }
  }

  handleMouseLeaveKey(index) {
    setTimeout(function() {
      this.mouseDown = false;
      //console.debug(`mouseDown? ${this.mouseDown ? "TRUE" : "FALSE"}`)
    }, 200);

    //console.debug("fired handleMouseLeaveKey", { index })
    this.handleNoteRelease(index)
  }

  handleMouseDownKey(index) {
    console.debug("fired handleMouseDownKey", { index })
    this.mouseDown = true; // todo: do we need this?
  }

  handleMouseDownContainer() { this.mouseDown = true; }
  handleMouseUpContainer() { this.mouseDown = false; }
  handleMouseLeaveContainer() {
    this.mouseDown = false;
    this.handleNoteRelease()
  }

  handleMouseUpKey(index) {
    this.mouseDown = false;
    this.handleNoteRelease(index)
  }

  // function to trigger the note - triggered by click, touch, or keyboard.
  handleNoteTrigger(index) {
    this.synth.triggerRelease(); // todo :temp
    this.synth.triggerAttack( this.getNoteString(index) );
  }

  // function to release the note -
  // todo: when index is null, release all notes.
  handleNoteRelease(index = null) {
    this.synth.triggerRelease();
  }

  // handleKeyClick(index, noteString) {
  //   console.debug(
  //     `Hello from key ${index <= 10 ? "black-key" : "white-key"} ${index}: ${noteString}${this.octive}!`,
  //   );
  // }

  render() {
    return html`
      <div class="keyboard-container__wrapper">
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
