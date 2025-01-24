import sequenceManager from '@/services/sequenceManager.js';

import { LitElement, html, css } from 'lit';

class SequencerGrid extends LitElement {
  static properties = {
    // todo?
  };

  constructor() {
    super();

  }

  render() {
    return html`
      <div class="sequencer-grid">
      </div>
    `;
  }
}

customElements.define('sequencer-grid', SequencerGrid);
