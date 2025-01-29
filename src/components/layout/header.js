import { LitElement, html, css } from 'lit-element';

export class LayoutHeader extends LitElement {
  static styles = css`
    header {
      background-color: var(--color-blue);
      border-bottom: 1px solid var(--color-blue-alt);
      padding: 8px 16px; /* todo: duplicate this value in the footer by using variables */
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
  render() {
    return html`
      <header>
        <button onclick="window.location.href='/'" alt="Home">Home</button>
      </header>
    `;
  }
}

customElements.define('layout-header', LayoutHeader);
