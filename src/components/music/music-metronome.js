import { LitElement, css, html } from "lit";

export class MusicMetronome extends LitElement {
  static get properties() {
    return {
      isPlaying: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.isPlaying = false;
  }

  static get styles() {
    return css`
      button {
        font-size: 1.5rem;
        padding: 0.5rem 1rem;
        border: none;
        border-radius: 4px;
        background-color: #007bff;
        color: white;
        cursor: pointer;
      }
    `;
  }

  togglePlay() {
    this.isPlaying = !this.isPlaying;
    if (this.isPlaying) {
      this.start();
    } else {
      this.stop();
    }
  }

  start() {
    // todo
    console.log("Music Metronome: start");
  }

  stop() {
    // todo
    console.log("Music Metronome: stop");
  }

  render() {
    return html`
      <button @click=${this.togglePlay}>
        ${this.isPlaying ? "Stop" : "Start"}
      </button>
    `;
  }

}

customElements.define('music-metronome', MusicMetronome);
