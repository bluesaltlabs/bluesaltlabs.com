import { LitElement, html, css } from 'lit';
import * as Tone from 'tone';

import MusicEnum from '@/enums/MusicEnum.js'

// define note and pitch enums
// // todo: move these to a separate file.
//const pitches = { C: 'C', D: 'D', E: 'E', F: 'F', G: 'G', A: 'A', B: 'B'};
const pitches = MusicEnum.PITCH; // todo: fix this.
//const octives = { 0: '0', 1: '1', 2: '2', 3: '3', 4: '4', 5: '5', 6: '6', 7: '7', 8: '8'};
const octives = MusicEnum.OCTIVE;
const sharp = '#';
const flat = 'b';

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
    this.duration = '16n'
    this.isPlaying = false;

    // Tone.js setup
    //this.synth = new Tone.Synth().toDestination();
    this.synth = new Tone.MonoSynth({
      oscillator: { type: "sine" }
    }).toDestination();
    this.synth.toDestination();

    // Loop
    //this.tone = new Tone()
    this.loop = new Tone.Loop((time) => this.loopCallback(time) , '4n');

  }

  getNote() {
    return `${this.pitch}${this.octive}`;
  }

  loopCallback(time) {
    this.synth.triggerAttackRelease(this.getNote(), this.duration, time);
  }

  // todo: set note(pitch, octive) {}
  // todo: get note() {}

  togglePlayback() {
    if (this.isPlaying) {
      this.loop.stop();
      Tone.getTransport().stop();
    } else {
      Tone.start();
      Tone.getTransport().start();
      this.loop.start(0);
    }
    this.isPlaying = !this.isPlaying;
  }

  updated() {
    console.log("ran updated");
    //console.log("testing from updated()", { musicEnum: MusicEnum });
  }

  updateTempo(event) {
    this.tempo = event.target.value;
    Tone.getTransport().bpm.value = this.tempo;
  }

  updateOctive(event) {
    console.log("ran updated");
    this.octive = event.target.value;
  }

  render() {

    return html`
      <div class="controls">
        <button @click=${this.togglePlayback}>
          ${this.isPlaying ? 'Stop' : 'Start'}
        </button>
        <label>
          Tempo: ${this.tempo} BPM
          <input
            type="range"
            min="40"
            max="240"
            .value=${this.tempo}
            @input=${this.updateTempo}
          />
        </label>
      </div>
      <div class="controls">
      <label>
        Octive: ${this.octive}
        <input
          type="range"
          min="${octives[0]}"
          max="${octives[ Object.keys(octives).length - 1 ]}"
          .value=${this.octive}
          @input=${this.updateOctive}
        />
      </label>
      </div>

    `;
  }
}

customElements.define('music-metronome', MusicMetronome);
