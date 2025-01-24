import { LitElement, html, css } from 'lit';
//import AudioService from '@/services/AudioService.js';

class SequencerDemoUi extends LitElement {
  static styles = css`
    :host {

    }

    .sequencer-demo-ui {
      display: block;
      max-width: 500px;
      margin: 0 auto;
    }

    .sequencer-timeline .sequencer-timeline_row .indicator {
      display: inline-block;
      margin: 0 2px;
    }

    .indicator > span {
      border-radius:50%;
      background:red;
      width:15px;
      height:15px;
      display: block;
      border: 1px solid black;
    }
  `;

  static properties = {

//    service: { type: AudioService },
  };

  constructor() {
    super();
    //this.service = AudioService;

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

          <div class="sequencer-timeline">
            <div class="sequencer-timeline_row">
              <div class="indicator"><span style="">&nbsp;</span></div>
              <div class="indicator"><span style="">&nbsp;</span></div>
              <div class="indicator"><span style="">&nbsp;</span></div>
              <div class="indicator"><span style="">&nbsp;</span></div>
              <div class="indicator"><span style="">&nbsp;</span></div>
              <div class="indicator"><span style="">&nbsp;</span></div>
              <div class="indicator"><span style="">&nbsp;</span></div>
              <div class="indicator"><span style="">&nbsp;</span></div>
            </div>
            <div class="sequencer-timeline_row"></div>
            <div class="sequencer-timeline_row"></div>

          </div>
        </div>

      </div>
    `;
  }
}

customElements.define('sequencer-demo-ui', SequencerDemoUi);
