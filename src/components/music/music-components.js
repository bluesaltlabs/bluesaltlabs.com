import { LitElement, html, css } from 'lit';
//import { ButtonPlay } from './controls/buttons'

import {
  AudioControlPlayButton
} from '@/components/audio/controls/buttons.js'


// import AudioService from '@/services/AudioService'

// todo: add this to the properties to possibly fix issues with them:
//       active: { type: Boolean, reflect: true } // i.e. the `reflect` property

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
        <!-- <music-button-play></music-button-play> -->

        <audio-control-play-button></audio-control-play-button>

      </div>
      <hr />
      <div class="music-components">
        <span>this is here</span>
        <!-- todo: make a basic song here with a play/pause button. -->
        <!-- don't worry about the UI and all that, just make it work. -->


      </div>
    `
  }
}


customElements.define('music-components', MusicComponents);
