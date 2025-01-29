import { LitElement, html, css } from 'lit-element';


const year = new Date()?.getFullYear();

export class LayoutFooter extends LitElement {
  static styles = css`
    footer {
      border-top: 1px solid var(--color-blue-alt);
      padding: 25px 16px 40px 16px;
      margin: 30px 0 0 0;
      background-color: var(--color-blue);
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
