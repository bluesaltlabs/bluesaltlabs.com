import { LitElement, html, css } from 'lit';


// todo: see https://github.com/hoch/WAAX/blob/ca933954877e307123893ecf8e6ec91402d2dd8c/src/mui/mui-pianoroll/mui-pianoroll.html
//       and https://github.com/hoch/WAAX/blob/ca933954877e307123893ecf8e6ec91402d2dd8c/examples/mui/ex-mui-pianoroll.html
export class AudioControlPianoRoll extends LitElement {
  static styles = css`
    :host {
      /*width: 100%;*/
      display: block;
      overflow: hidden;
      margin-bottom: 5px;
      height: 300px;
    }
    .audio-ui-piano-roll__container {
      /*width: 100%;*/
      position: relative;
      display: block;
      vertical-align: top;
      overflow: hidden;
    }
    .audio-ui-piano-roll__toolbar {
      display: block;
      height: 28px;
      background-color: #eee;
    }
  `

  render() {
    return html`
      <!-- <div class="audio-ui-piano-roll"> -->
      <div class="audio-ui-piano-roll__container">
        <div class="audio-ui-piano-roll__toolbar"></div>
        <canvas class="audio-ui-piano-roll__canvas"></canvas>
      </div>
      <!-- </div> -->
      `
  }
}

customElements.define('audio-control-piano-roll', AudioControlPianoRoll)
