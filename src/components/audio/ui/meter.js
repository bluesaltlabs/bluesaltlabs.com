import { LitElement, html, css } from 'lit';

// todo: see https://hoch.github.io/WAAX/waax/examples/mui/ex-mui-meter.html
//
export class AudioUiMeter extends LitElement {
  static styles = css`
    :host {
    }
  `;

  render() {
    return html`<p>Hello, there! I am a placeholder meter ui element</p>`;
  }
}

customElements.define('audio-ui-meter', AudioUiMeter);
