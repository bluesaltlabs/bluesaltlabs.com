import { LitElement, html, css } from 'lit-element';


const year = new Date()?.getFullYear();

export class LayoutFooter extends LitElement {
  static styles = css`
    footer {
      color: #fff;
      background-color: var(--color-gray-400);
      border-top: 1px solid var(--color-blue);
      padding: 25px 16px 40px 16px;
      margin: 30px 0 0 0;
    }

    @media (prefers-color-scheme: dark) {
      footer {
        background-color: var(--color-blue);
        border-color: var(--color-blue-alt);
        color: var(--color-blue-alt);
      }
    }
  `

  render() {
    return html`
      <footer>
        <p>Copyright © ${year} BlueSalt Labs. All rights reserved.</p>
      </footer>
    `;
  }
}

customElements.define('layout-footer', LayoutFooter);
