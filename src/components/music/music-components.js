import { LitElement, html, css } from 'lit';

class MusicComponents extends LitElement {
  static styles = css`

  `

  static properties = {

    // foo: { type: String },
  }

  constructor() {
    super()
  }

  render() {
    return html`
      <div class="music-components">

      </div>
    `
  }
}


customElements.define('music-components', MusicComponents);
