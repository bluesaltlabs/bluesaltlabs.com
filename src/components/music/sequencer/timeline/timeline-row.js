import { LitElement, html, css } from 'lit';


class TimelineRow extends LitElement {
  static styles = css`
    :host {
      display: block;
      margin-bottom: 10px;
    }
    .row {
      display: flex;
      justify-content: space-between;
    }
    .step {
      position: relative;
      width: 100%;
      padding-top: 100%; /* 1:1 Aspect Ratio */
      background-color: #f0f0f0;
      border: 1px solid #ccc;
      cursor: pointer;
      box-sizing: border-box;
    }
    .step.active {
      background-color: #0078d7;
    }
    .step-content {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  `;

  static properties = {
    steps: { type: Array },
  };

  constructor() {
    super();
    this.steps = Array(16).fill(false); // Example: 16 steps, all inactive
  }

  toggleStep(index) {
    this.steps = this.steps.map((active, i) => (i === index ? !active : active));
    //console.debug(this.steps)
  }

  render() {
    return html`
      <div class="row">
        ${this.steps.map(
          (active, index) => html`
            <div
              class="step ${active ? 'active' : ''}"
              @click=${() => this.toggleStep(index)}
            >
              <div class="step-content">${index + 1}</div>
            </div>
          `
        )}
      </div>
    `;
  }
}

customElements.define('timeline-row', TimelineRow);
