
import { LitElement, html, css } from 'lit';

class SequencerPlayhead extends LitElement {
  static properties = {
    // todo?
  };

  constructor() {
    super();

  }

  render() {
    return html`
      <div class="sequencer-playhead">
        <!-- todo: not sure what this is yet. -->
      </div>
    `;
  }
}

customElements.define('sequencer-playhead', SequencerPlayhead);
