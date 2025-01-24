import { LitElement, html, css } from 'lit';
import * as Tone from 'tone';

class MusicArpeggiator extends LitElement {
  static properties = {
    synth: { type: Object }
  };

  constructor() {
    super();
    this.synth = new Tone.Synth().toDestination();
  }

  start() {


  }

  playNote() {
    this.synth.triggerAttackRelease('C4', '8n');
  }
}

customElements.define('music-arpeggiator', MusicArpeggiator);
