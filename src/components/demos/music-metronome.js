import { LitElement, html, css } from 'lit'
import AudioService from '@/services/AudioService'

const octives = AudioService.enums.OCTIVES;
const oscillators = AudioService.enums.OSCILLATORS;

class MusicMetronome extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: Arial, sans-serif;
    }
    .controls {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    button {
      padding: 10px 20px;
      border: none;
      background: #0078d7;
      color: white;
      font-size: 1rem;
      cursor: pointer;
      border-radius: var(--border-radius, 5px);
    }
    button:disabled {
      background: #cccccc;
    }
    input[type="range"] {
      width: 100%;
    }
  `;

  static properties = {
    loop: { type: Object },
    //pattern: { type: Object },
    FeedbackDelay: { type: Object },
    isPlaying: { type: Boolean },
    tempo: { type: Number },
    pitch: { type: String },
    octive: { type: String },
    duration: { type: String },
    isSharp: { type: Boolean },
    isFlat: { type: Boolean },
  };

  constructor() {
    super();
    this.loop = null;
    this.feedbackDelay = null;
    //this.pattern = null;
    this.tempo = 120; // default BPM
    this.feedbackDelay = new AudioService.t.FeedbackDelay();
    this.isPlaying = AudioService.isPlaying;
    this.pitch = AudioService.enums.PITCHES.C;
    this.octive = AudioService.getOctive(2);
    this.sharpOrFlat = "natural";
    this.isSharp = false;
    this.isFlat = false;
    this.duration = '16n';
    this.oscillator = AudioService.enums.OSCILLATORS.SINE

    //this.updatePattern();
    this.updateSynth();

    // Loop
    this.updateLoop();
  }

  setIsSharp() {
    this.isSharp = true;
    this.isFlat = false;
    this.updateLoop();
  }

  setIsFlat() {
    this.isFlat = true;
    this.isSharp = false;
    this.updateLoop();
  }

  setIsNatural() {
    this.isFlat = false;
    this.isSharp = false;
    this.updateLoop();
  }

  // used for getNote
  getSharpOrFlat() {
    return (
      this.isSharp ? AudioService.enums.SHARP :
        this.isFlat ? AudioService.enums.FLAT : ''
    );
  }

  getNote(pitch = null, sharpOrFlat = null, octive = null) {
    const note = `${pitch ?? this.pitch}${sharpOrFlat ?? this.getSharpOrFlat()}${octive ?? this.octive}`;
    return note;
  }

  updateLoop() {

    this.loop = new AudioService.t.Loop(
      (time) => {
        this.synth.triggerAttackRelease(this.getNote(), this.duration, time);
        //this.synth.triggerAttackRelease(this.getNote(null, AudioService.enums.SHARP), "16n", time + 0.05);
        //this.synth.triggerAttackRelease(this.getNote(), "16n", time + 0.1);
        //this.synth.triggerAttackRelease(this.getNote(null, AudioService.enums.FLAT), "16n", time + 0.15);
      }, '4n');
  }

  loopCallback(time) {

  }

  togglePlayback() {
    AudioService.togglePlayback((isPlaying) => {
      this.isPlaying = !!isPlaying
      this.isPlaying === true ? this.loop.start(0) : this.loop.stop()
    })
  }

  updateSynth(oscillator = null) {
    if(oscillator) {
      this.oscillator = oscillator;
    }

    this.synth = new AudioService.t.MonoSynth({
      oscillator: { type: (oscillator ?? this.oscillator) } // todo: this nesting is annoying..
    }).toDestination();
  }

  updateTempo(event) {
    this.tempo = event.target.value;
    AudioService.t.getTransport().bpm.value = event.target.value;
  }

  updateOctive(event) {
    this.octive = event.target.value;
  }

  updatePitch(event) {
    this.pitch = event.target.value;
  }

  updateSharpFlat(event) {
    switch(event?.target?.value) {
      case "sharp": this.setIsSharp(); break;
      case "flat": this.setIsFlat(); break;
      case "natural":
      default:
        this.setIsNatural();
    }
  }

  updateOscillator(event) {
    this.oscillator = event.target.value;
    this.updateSynth(event.target.value);
  }

  render() {
    return html`
      <div class="metronome">
      <div class="controls">
        <button @click=${this.togglePlayback}>
          ${this.isPlaying === true ? 'Stop' : 'Start'}
        </button>
        <label for="tempo">
          Tempo: ${this.tempo} BPM
          <input
            name="tempo"
            id="tempo"
            type="range"
            .min=${AudioService.enums.TEMPOS.MIN}
            .max=${AudioService.enums.TEMPOS.MAX}
            .value=${this.tempo}
            @input=${this.updateTempo}
          />
          </label>
        </div>

        <div class="controls">
          <label for="octive">
            Octive: ${this.octive}
            <input
              name="octive"
              id="octive"
              type="range"
              .min=${AudioService.getOctive(0)}
              .max=${AudioService.getOctives()[ AudioService.countOctives() - 1 ]}
              .value=${this.octive}
              @input=${this.updateOctive}
            />
          </label>
        </div>



        <!-- todo: figure out why the pure styling isn't appling to these components!! -->
        <div class="pure-g">


          <!-- Control: Pitch -->
          <div style=" pure-u-1-2">
            <div style="width:100%;display:block;">
              <label style="display:block" for="pitch">Pitch</label>
              <select
                style="display:block"
                name="pitch"
                id="pitch"
                .value=${this.pitch}
                @input=${this.updatePitch}
              >
                ${Object.keys(AudioService.getPitches()).map((pitch, pitchKey) =>
                  html`<option
                    .value=${pitch}
                    .key=${pitchKey}
                    .selected=${this.pitch === pitch}
                  >${pitch}</option>`
                )}
              </select>
            </div>
          </div>
          <!--Control: Pitch End -->


          <!-- Control: SharpOrFlat -->
          <div style="pure-u-1-2">
            <div style="width:100%;display:block;">
              <label style="display:block" for="sharp_flat" aria-hidden="true" aria-label="Sharp / Flat">&nbsp;</label>
              <select
                style="display:block"
                name="sharp_flat"
                id="sharp_flat"
                .value=${this.sharpOrFlat}
                @input=${this.updateSharpFlat}
              >
                <option value="flat" .selected=${this.isFlat}>
                  ${AudioService.enums.FLAT_CHAR}
                </option>
                <option value="natural" .selected=${!this.isFlat && !this.isSharp}>
                  ${AudioService.enums.NATURAL_CHAR}
                </option>
                <option value="sharp" .selected=${this.isSharp}>
                  ${AudioService.enums.SHARP_CHAR}
                </option>
              </select>
            </div>
          </div>
          <!--Control: SharpOrFlat End -->

        </div>

        <!-- Control: Oscillator -->
        <div class="controls">
          <label for="oscillator">Oscillator</label>
          <select
            name="oscillator"
            id="oscillator"
            .value=${this.oscillator}
            @input=${this.updateOscillator}
          >
            ${Object.values(oscillators).map((oscillator, oscillatorKey) =>
              html`<option
                .value=${oscillator}
                .key=${oscillatorKey}
                .selected=${this.oscillator === oscillator}
              >${oscillator}</option>`
            )}
          </select>
        </div>
        <!-- Control: Oscillator End -->

      </div>
  `;
  }
}

customElements.define('music-metronome', MusicMetronome);
