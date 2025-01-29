import { LitElement, html, css } from 'lit';

// todo: see https://github.com/hoch/WAAX/blob/ca933954877e307123893ecf8e6ec91402d2dd8c/src/mui/mui-spectrum/mui-spectrum.html
export class AudioUiSpectrum extends LitElement {
  static styles = css`
    :host {
    }
  `;

  render() {
    return html`<p>Hello, there! I am a placeholder spectrum ui element</p>`;
  }
}

customElements.define('audio-ui-spectrum', AudioUiSpectrum);
