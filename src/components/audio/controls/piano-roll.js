import { LitElement, html, css } from 'lit';

class AudioControlPianoRoll extends LitElement {
  static styles = css`
    :host {
    }
  `;

  render() {
    return html`<p>Hello, there! I am a placeholder piano roll element</p>`;
  }
}

customElements.define('my-lit-element', MyLitElement);
