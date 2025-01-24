import { LitElement, html, css } from 'lit';

class SequencerDemoUi extends LitElement {
  static properties = {
    // todo?
  };

  constructor() {
    super();

  }

  // updateTempo(event) {
  //   this.tempo = event.target.value;
  //   this.dispatchEvent(new CustomEvent('tempo-change', { detail: this.tempo }));
  // }

  render() {
    return html`
      <slot></slot>
      <div class="sequencer-demo-ui">
        <!-- <button @click=${() => this.dispatchEvent(new Event('play'))}>Play</button>
        <button @click=${() => this.dispatchEvent(new Event('stop'))}>Stop</button>
        <label>
          Tempo: ${this.tempo}
          <input type="range" min="60" max="180" .value=${this.tempo} @input=${this.updateTempo} />
        </label> -->
      </div>
    `;
  }
}

customElements.define('sequencer-demo-ui', SequencerDemoUi);
