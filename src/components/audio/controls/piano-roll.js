import { LitElement, html, css } from 'lit';


// todo: see https://github.com/hoch/WAAX/blob/ca933954877e307123893ecf8e6ec91402d2dd8c/src/mui/mui-pianoroll/mui-pianoroll.html
//       and https://github.com/hoch/WAAX/blob/ca933954877e307123893ecf8e6ec91402d2dd8c/examples/mui/ex-mui-pianoroll.html
//       and https://github.com/hoch/WAAX/blob/ca933954877e307123893ecf8e6ec91402d2dd8c/examples/mui/ex-mui-pianoroll.html
export class AudioControlPianoRoll extends LitElement {
  static styles = css`
    :host {
    }
  `;

  render() {
    return html`<p>Hello, there! I am a placeholder piano roll element</p>`;
  }
}

customElements.define('audio-control-piano-roll', AudioControlPianoRoll);
