import { LitElement, html, css } from 'lit';
// import AudioService from '@/services/AudioService';
import { ButtonPlayPause, ButtonSequencerStep } from '@/components/music/controls/buttons'

const num_sequencer_steps = 16;
const num_sequencer_voices = 1;

class SequencerDemoUi extends LitElement {
  //static styles = css``

  static properties = {
    sequences: { type: Array },
  }

  constructor() {
    super();
    this.sequences = this.getNewSequence()

    console.debug("sequence", this.sequences)

  }

  getNewSequence() {
    return Array.from(
      { length: num_sequencer_voices },
      () => new Array(num_sequencer_steps).fill(0)
    )
  }

  render() {
    return html`
      <slot></slot>
      <div class="sequencer-demo-ui">

        <div class="sequencer-header">
          <div class="control-button-container">
            <music-button-play-pause></music-button-play-pause>
          </div>

          <span>here is the sequencer header</span>
        </div>

        <hr />

        <div class="sequencer-body">


          <!-- todo: need to add row containers and prevent wrapping.  -->
          <div class="sequencer-timeline">
            ${this.sequences.map((voiceSequence) => {
              return voiceSequence.map((sequenceSteps) => (
                html`
                  <music-button-sequencer-step></music-button-sequencer-step>
                `
              ))
            })}

          </div>

        </div>
      </div>
    `;
  }
}

customElements.define('sequencer-demo-ui', SequencerDemoUi);
