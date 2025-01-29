import { LitElement, html, css } from 'lit-element';

class UiButton extends LitElement {
  // static properties = {
  //   click: {},
  //   alt: {}
  // }

  static styles = css`
    header {
      background-color: var(--color-blue);
      border-bottom: 1px solid var(--color-gray-300);
      padding: 8px 16px;
      margin-bottom: 25px;

      button {
        background: transparent;
        background-image: none;
        border: 1px solid var(--color-blue-alt);
        color: var(--color-blue-alt);

        /* todo:transitions & stuff */

        &:active,
        &:hover {
          /* background: var(--color-blue); */
          cursor: pointer;
          background: var(--color-blue-alt);
          color: #fff;
          border-color: #fff;
        }
      }
    }
  `

  click(event) {
    // todo: // todo: figure out how to set this up correctly as a directive.
  }

  render() {
    return html`
      <button
        @click=${this.click}
      ><slot></slot></button>
    `;
  }
}

customElements.define('ui-button', UiButton);
