import { LitElement, html, css } from 'lit';

class MusicArpeggiator extends LitElement {
  static properties = {
  //  synth: { type: Object }
  };

  constructor() {
    super();

  }

  // playNote() {
  //   this.synth.triggerAttackRelease('C4', '8n');
  // }

  render() {
    return html`
      <div class="music-demo">
        <slot></slot>
      </div>
      `
  }
}

customElements.define('music-arpeggiator', MusicArpeggiator);
