import { LitElement, html, css } from 'lit';
import AudioService from '@/services/AudioService';
import SequenceService from '@/services/SequenceService';
import { ButtonPlayPause, ButtonSequencerStep } from '@/components/music/controls/buttons'

const num_sequencer_steps = 16;
const num_sequencer_voices = 1;

class MusicSequencer extends LitElement {
  //static styles = css``

  static properties = {
    _sequences: { type: Object }, // SequencerService
  }

  constructor() { // todo: should the constructor have values for how many voices / steps?
    super();
    this._sequences = SequenceService.sequences

    // duplicates sequencer service params.
    //this.
    //this.sequences = this.getNewSequence()

    // debug: add a new voice to the sequencer on init.

    console.debug("SequenceService", { sequences: this._sequences })

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
          <div class="sequencer-indicators"></div> <!-- todo -->

          <div class="sequencer-timeline">
            ${(this._sequences?.length > 0) ?
                // <!-- todo: need to add row containers and prevent wrapping.  -->
                // <!-- todo: todo: add a note for an empty row if there are no sequences.   -->
              this._sequences.map((voiceSequence, voiceKey) => (
                voiceSequence.map((sequenceSteps, sequenceKey) => (html`
                  <music-sequencer-voice-row.key=${voiceKey}>
                  <music-button-sequencer-step .key=${sequenceKey} .steps=${sequenceSteps}></music-button-sequencer-step>
                </music-sequencer-voice-row>
                `))
              ))
            : html`
              <div>No sequences to show!</div>
            `
          }
        </div>
      </div>
    `
  }
}

customElements.define('music-sequencer', MusicSequencer)


/*
# To Do

- [ ] wire up the play/pause button so it actually can play/pause. add a callback parameter or whatever.
- [ ] add a stop button.
- [ ] add a volume slider.
- [ ] add a status display to show the step, bpm, and other info about the player.
- [ ] update ehe SequenceService so it's wired to the UI.
- [ ] ...
- [ ] ...
- [ ] ...


*/
