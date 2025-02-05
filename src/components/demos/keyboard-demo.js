import { LitElement, html, css } from "lit"

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


// keyboard features:
// bind user keyboard (with a toggle switch) such that pressing keys plays the keyboard (like a normal DAW)
//  - ability to turn this on and off
// one octive is one section, create the keyboard as an SVG and duplicate per octive?
//


class KeyboardDemo extends LitElement {
  /* code source: https://dev.to/codingcss/playable-piano-using-html-css-and-javascript-5g6c */
  static styles = css`
    .keyboard-container__wrapper {
      position: relative;
      width: 100%;
      height: 30em;
    }

    /* -------------------------------------------------------------------------- */

    /* code source: https://dev.to/codingcss/playable-piano-using-html-css-and-javascript-5g6c */
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
  };

  constructor() {
    super();
    this.keys = [];
    this.octive = 2;

    this.buildKeys();
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

  handleKeyClick(index, noteString) {
    console.debug(
      `Hello from key ${index <= 10 ? "black-key" : "white-key"} ${index}: ${noteString}${this.octive}!`,
    );

    // todo: play audio tone based on assigned note (fill out array above first).
  }


  render() {
    return html`
      <div class="keyboard-container__wrapper">
        <div class="piano-container">
          ${this.keys.map((key) => {
            return html`
              <div class="${key.class}" @click=${() => this.handleKeyClick(key.index, key.note)}>
                <p style="text-align:center;${key.class=== 'white-key' ? 'color:black;' : 'color:white;'}">${key.note}${this.octive}</p>
              </div>
            `;
          })}
        </div>
      </div>
    `;
  }
}

customElements.define("keyboard-demo", KeyboardDemo);
