import { LitElement, html, css } from 'lit';

class ToneDemo extends LitElement {


  static properties = {

    // foo: { type: String },
  }

  constructor() {
    super()
  }

  render() {
    return html`
      <div class="container">

        <h2>Tone.js Demo</h2>
        <hr />

      </div>
    `
  }
}


customElements.define('tone-demo', ToneDemo);
