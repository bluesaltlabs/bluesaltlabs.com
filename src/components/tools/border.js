import { LitElement, html, css } from 'lit-element';

export class BorderTool extends LitElement {
  static styles = css`

  `

  render() {
    return html`
      <div>
        this is the border tool placeholder
      </div>
    `;
  }
}

customElements.define('border-tool', BorderTool);
