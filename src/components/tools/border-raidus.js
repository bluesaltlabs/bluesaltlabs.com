import { LitElement, html, css } from 'lit-element';

export class BorderRadiusTool extends LitElement {
  static styles = css`

  `

  render() {
    return html`
      <div>
        this is the border radius tool placeholder
      </div>
    `;
  }
}

customElements.define('border-radius-tool', BorderRadiusTool);
