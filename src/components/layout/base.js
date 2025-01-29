import { LitElement, html, css } from 'lit-element';
import './header.js';
import './navbar.js';
import './footer.js';

class LayoutBase extends LitElement {
  static styles = css`
    .max-w-screen { max-width: 100vw; } /*  */
  `

  constructor() {
    super();
    //this.renderRoot = this
  }

  render() {
    return html`
      <!-- todo: expand upon this layout -->
      <layout-header></layout-header>
      <layout-navbar></layout-navbar>
      <main class="max-w-screen">
        <slot></slot>
      </main>
      <layout-footer></layout-footer>
      `;
  }
}

customElements.define('layout-base', LayoutBase);
