import { LitElement, html, css } from 'lit';

class SequencerControls extends LitElement {
  static properties = {
    tempo: { type: Number }, // todo: pull this from the parent service
  };

  constructor() {
    super();
    this.tempo = 120;
  }

  updateTempo(event) {
    this.tempo = event.target.value;
    this.dispatchEvent(new CustomEvent('tempo-change', { detail: this.tempo }));
  }

  render() {
    return html`
      <div>
        <button @click=${() => this.dispatchEvent(new Event('play'))}>Play</button>
        <button @click=${() => this.dispatchEvent(new Event('stop'))}>Stop</button>
        <label>
          Tempo: ${this.tempo}
          <input type="range" min="60" max="180" .value=${this.tempo} @input=${this.updateTempo} />
        </label>
      </div>
    `;
  }
}

customElements.define('sequencer-controls', SequencerControls);
