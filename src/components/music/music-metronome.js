import { LitElement, html, css } from 'lit';
import AudioService from '@/services/AudioService';
// import

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
      border-radius: 5px;
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
    this.isSharp = false;
    this.isFlat = false;
    this.duration = '16n';
    this.oscillator = AudioService.enums.OSCILLATORS.SINE

    //this.updatePattern();
    this.updateSynth();

    // Loop
    this.updateLoop();
  }

  setIsSharp(isSharp) {
    this.isSharp = !!isSharp;
    this.isFlat = false;
    this.updateLoop();
  }

  setIsFlat(isFlat) {
    this.isFlat = !!isFlat;
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
    //console.debug("getSharpOrFlat", { sharp: this.isSharp, flat: this.isFlat })
    return (
      this.isSharp ? AudioService.enums.SHARP :
        this.isFlat ? AudioService.enums.FLAT : ''
    );
  }

  getNote(pitch = null, sharpOrFlat = null, octive = null) {
    const note = `${pitch ?? this.pitch}${sharpOrFlat ?? this.getSharpOrFlat()}${octive ?? this.octive}`;
    //console.debug(`Note: ${note}`);
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

  updateOscillator(event) {
    this.oscillator = event.target.value;
    this.updateSynth(event.target.value);
  }

  render() {
    return html`
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
            min="40"
            max="240"
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
            min="${AudioService.getOctive(0)}"
            max="${AudioService.getOctives()[ AudioService.countOctives() - 1 ]}"
            .value=${this.octive}
            @input=${this.updateOctive}
          />
        </label>
      </div>


      <div class="controls">
        <label for="flat">
          <input
            id="flat"
            value="Flat"
            name="sharp_flat"
            type="radio"
            .checked=${!!this.isFlat}
            @input=${this.setIsFlat()}
          />
          flat (b)
        </label>
      <div/>

      <div class="controls">
        <label for="sharp">
          <input
            id="sharp"
            value="Sharp"
            name="sharp_flat"
            type="radio"
            .checked=${!!this.isSharp}
            @input=${this.setIsSharp()}
          />
          sharp (#)
        </label>
      <div/>

      <div class="controls">
        <label for="natural">
          <input
            id="natural"
            value="Natural"
            name="sharp_flat"
            type="radio"
            .checked=${!this.isFlat && !this.isSharp}
            @input=${this.setIsNatural()}
          />
          natural (reset)
        </label>
      <div/>

      <div class="controls">
        <label for="pitch">
          Pitch
        </label>
        <select
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

      <div class="controls">
        <label for="oscillator">
          Oscillator
        </label>
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

    `;
  }
}

customElements.define('music-metronome', MusicMetronome);
