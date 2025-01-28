import { LitElement, html, css } from 'lit';
import { ButtonPlay } from './controls/buttons'



class MusicComponents extends LitElement {


  static properties = {

    // foo: { type: String },
  }

  constructor() {
    super()
  }


  // todo: create a demo component on this page that is just a play/pause button that initiates
  // the AudioService and plays a random, hard-coded, sequence song.
  // I may need to make notes on some music theory stuff in here somewhere for assistance.

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
