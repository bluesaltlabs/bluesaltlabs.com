import { LitElement, html, css } from 'lit-element';

export class BoxShadowTool extends LitElement {
  static styles = css`

  `

  render() {
    return html`
      <div>
        this is the box shadow tool placeholder
      </div>
    `;
  }
}

customElements.define('box-shadow-tool', BoxShadowTool);
