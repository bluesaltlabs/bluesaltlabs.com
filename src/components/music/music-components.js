import { LitElement, html, css } from 'lit';
//import { ButtonPlay } from './controls/buttons'

import { AudioControlPlayButton } from '@/components/audio/controls/button'
import { AudioOscillator } from '@/components/audio/audio-oscillator'

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

        <h2>Music Components</h2>
        <hr />
        <audio-control-play-button></audio-control-play-button>
        <hr />
        <audio-oscillator></audio-oscillator>
        <hr />

      </div>
    `
  }
}


customElements.define('music-components', MusicComponents);
