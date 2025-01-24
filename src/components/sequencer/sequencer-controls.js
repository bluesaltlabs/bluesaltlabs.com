import { LitElement, html } from 'lit-element';

class SequencerControls extends LitElement {
  render() {
    return html`<slot></slot>`;
  }
}

customElements.define('sequencer-controls', SequencerControls);
