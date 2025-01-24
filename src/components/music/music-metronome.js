import { LitElement, html, css } from 'lit';
import * as Tone from 'tone';

import MusicEnum from '@/enums/MusicEnum.js'

const pitches = MusicEnum.PITCHES; // todo: fix this.
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
    tempo: { type: Number },
    pitch: { type: String },
    octive: { type: String },
    duration: { type: String },
    isPlaying: { type: Boolean },
  };

  constructor() {
    super();
    this.tempo = 120; // default BPM
    this.pitch = pitches.C;
    this.octive = octives[2];
    this.duration = '16n';
    this.oscillator = oscillators.SINE
    this.isPlaying = false;

    // Tone.js setup
    //this.synth = new Tone.Synth().toDestination();
    this.updateSynth();

    // Loop
    this.updateLoop();

  }

  getNote() {
    return `${this.pitch}${this.octive}`;
  }

  updateLoop() {
    this.loop = new Tone.Loop((time) => this.loopCallback(time) , '4n');
  }

  loopCallback(time) {
    this.synth.triggerAttackRelease(this.getNote(), this.duration, time);
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

  updated() {
    console.log("ran updated"); // todo: why doesn't this function?
    //console.log("testing from updated()", { musicEnum: MusicEnum });
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
        <label for "temo">
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

      <div class="debug">
        <pre><code>

        </code></pre>
      </div>

    `;
  }
}

customElements.define('music-metronome', MusicMetronome);
