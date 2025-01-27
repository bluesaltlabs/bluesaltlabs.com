import { LitElement, html, css } from 'lit';
import AudioService from '@/services/AudioService';
import SequenceService from '@/services/SequenceService';
import { ButtonPlayPause, ButtonSequencerStep } from '@/components/music/controls/buttons'

const num_sequencer_steps = 16;
const num_sequencer_voices = 1;


class MusicSequencerVoiceRow extends LitElement {

  render() {
    return html`
      <div class="music-sequencer-voice-row">
        <slot></slot>
      </div>
    `
  }
}
customElements.define('music-sequencer-voice-row', MusicSequencerVoiceRow)


class MusicSequencer extends LitElement {
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
            ${this.sequences.map((voiceSequence, voiceKey) => (
              voiceSequence.map((sequenceSteps, sequenceKey) => (
                html`
                  <music-sequencer-voice-row.key=${voiceKey}>
                  <music-button-sequencer-step .key=${sequenceKey} .steps=${sequenceSteps}></music-button-sequencer-step>
                </music-sequencer-voice-row>
                `
              ))
            ))}
          </div><!-- end sequencer timeline container -->

        </div>
      </div>
    `
  }
}

customElements.define('music-sequencer', MusicSequencer)
