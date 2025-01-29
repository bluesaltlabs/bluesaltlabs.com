import { LitElement, html, css } from 'lit';
//import { ButtonPlay } from './controls/buttons'

// todo: look at these plugin files and figure out what I need to copy over to this project:
//       https://github.com/hoch/WAAX/tree/ca933954877e307123893ecf8e6ec91402d2dd8c/src/plug_ins

import {
  AudioControlPlayButton
} from '@/components/audio/controls/buttons'

import { AudioUiSpectrum } from '@/components/audio/ui/spectrum'
import { AudioControlPianoRoll } from '@/components/audio/controls/piano-roll'
import { AudioControlVirtualKeys } from '@/components/audio/controls/virtual-keys'


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
        <audio-ui-spectrum></audio-ui-spectrum>
        <audio-control-play-button></audio-control-play-button>
        <audio-control-piano-roll></audio-control-piano-roll>
        <audio-control-virtual-keys></audio-control-virtual-keys>
      </div>
    `
  }
}


customElements.define('music-components', MusicComponents);
