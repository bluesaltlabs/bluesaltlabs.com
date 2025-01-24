import { LitElement, html, css } from 'lit';
import * as Tone from 'tone';

import MusicEnum from '@/enums/MusicEnum.js'

const pitches = MusicEnum.PITCHES;
const octives = MusicEnum.OCTIVES;
const oscillators = MusicEnum.OSCILLATORS;

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
    tempo: { type: Number },
    pitch: { type: String },
    octive: { type: String },
    duration: { type: String },
    isPlaying: { type: Boolean },
    isSharp: { type: Boolean },
    isFlat: { type: Boolean },
  };

  constructor() {
    super();
    this.loop = null;
    this.feedbackDelay = null;
    //this.pattern = null;
    this.tempo = 120; // default BPM
    this.feedbackDelay = new Tone.FeedbackDelay();

    this.pitch = pitches.C;
    this.octive = octives[2];
    this.isSharp = false;
    this.isFlat = false;
    this.duration = '16n';
    this.oscillator = oscillators.SINE
    this.isPlaying = false;

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
    console.debug("getSharpOrFlat", { sharp: this.isSharp, flat: this.isFlat })
    return (
      this.isSharp ? MusicEnum.SHARP :
        this.isFlat ? MusicEnum.FLAT : ''
    );
  }

  getNote(pitch = null, sharpOrFlat = null, octive = null) {
    const note = `${pitch ?? this.pitch}${sharpOrFlat ?? this.getSharpOrFlat()}${octive ?? this.octive}`;
    console.debug(`Note: ${note}`);
    return note;
  }

  updateLoop() {

    this.loop = new Tone.Loop(
      (time) => {
        this.synth.triggerAttackRelease(this.getNote(), this.duration, time);
        //this.synth.triggerAttackRelease(this.getNote(null, MusicEnum.SHARP), "16n", time + 0.05);
        //this.synth.triggerAttackRelease(this.getNote(), "16n", time + 0.1);
        //this.synth.triggerAttackRelease(this.getNote(null, MusicEnum.FLAT), "16n", time + 0.15);
      }, '4n');
  }

  loopCallback(time) {

  }

  togglePlayback() {
    Tone.start().then(() => {
      if (this.isPlaying) {
        this.loop.stop();
        Tone.getTransport().stop();
      } else {
        Tone.getTransport().start();
        this.loop.start(0);
      }
      this.isPlaying = !this.isPlaying;
    }).catch((error) => {
      console.error('Error starting Tone.js:', error);
    });
  }

  updateSynth(oscillator = null) {
    if(oscillator) {
      this.oscillator = oscillator;
    }

    this.synth = new Tone.MonoSynth({
      oscillator: { type: (oscillator ?? this.oscillator) } // todo: this nesting is annoying..
    }).toDestination();
  }

  updateTempo(event) {
    this.tempo = event.target.value;
    Tone.getTransport().bpm.value = event.target.value;
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
          ${this.isPlaying ? 'Stop' : 'Start'}
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
            min="${octives[0]}"
            max="${octives[ Object.keys(octives).length - 1 ]}"
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
          ${Object.keys(pitches).map((pitch, pitchKey) =>
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
