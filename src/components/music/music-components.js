import { LitElement, html, css } from 'lit';
import { ButtonPlay } from './controls/buttons'



class MusicComponents extends LitElement {


  static properties = {

    // foo: { type: String },
  }

  constructor() {
    super()
  }

  render() {
    return html`
      <div class="music-components">
        <music-button-play></music-button-play>
      </div>
      <hr />
      <div class="">
        <span>this is here</span>
      </div>
    `
  }
}


customElements.define('music-components', MusicComponents);
