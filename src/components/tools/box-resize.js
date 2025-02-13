import { LitElement, html, css } from 'lit-element';

export class BoxResizeTool extends LitElement {
  static styles = css`

  `

  render() {
    return html`
      <div>
        this is the box resize placeholder
      </div>
    `;
  }
}

customElements.define('box-resize-tool', BoxResizeTool);
