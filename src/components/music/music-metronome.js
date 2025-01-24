import { LitElement, html, css } from 'lit';
import * as Tone from 'tone';

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
    tempo: { type: Number },
    isPlaying: { type: Boolean },
  };

  constructor() {
    super();
    this.tempo = 120; // default BPM
    this.isPlaying = false;

    // Tone.js setup
    this.synth = new Tone.MembraneSynth().toDestination();
    this.loop = new Tone.Loop((time) => {
      this.synth.triggerAttackRelease('C4', '8n', time);
    }, '4n');
  }

  togglePlayback() {
    if (this.isPlaying) {
      this.loop.stop();
      Tone.getTransport().stop();
    } else {
      Tone.getTransport().start();
      this.loop.start(0);
    }
    this.isPlaying = !this.isPlaying;
  }

  updateTempo(event) {
    this.tempo = event.target.value;
    Tone.getTransport().bpm.value = this.tempo;
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
    `;
  }
}

customElements.define('music-metronome', MusicMetronome);
