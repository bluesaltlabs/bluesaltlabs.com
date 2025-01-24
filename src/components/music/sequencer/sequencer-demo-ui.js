import { LitElement, html, css } from 'lit';
import AudioService from '@/services/AudioService.js';

class SequencerDemoUi extends LitElement {
  static styles = css`
    :host {

    }

    .sequencer-demo-ui {
      display: block;
      max-width: 500px;
      margin: 0 auto;
    }
  `;

  static properties = {
    //const A
  };

  constructor() {
    super();

  }

  play() {
    // todo
  }

  stop() {
    // todo
  }

  render() {
    return html`
      <slot></slot>
      <div class="sequencer-demo-ui">

        <div class="sequencer-header">
          <button @click=${this.play()}>Play</button>
          <button @click=${this.stop()}>Stop</button>
        </div>

        <hr />

        <div class="sequencer-body">
          <p>body content</p>
        </div>





      </div>
    `;
  }
}

customElements.define('sequencer-demo-ui', SequencerDemoUi);
