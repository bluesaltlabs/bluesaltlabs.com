import { LitElement, html, css } from 'lit';
import AudioService from '@/services/AudioService'

export class AudioOscillator extends LitElement {


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
      <div class="audio-oscillator">
        <!-- todo: add components -->
        <p>todo: create the Audio Oscillator</p>
      </div>
    `
  }
}

customElements.define('audio-oscillator', AudioOscillator);
