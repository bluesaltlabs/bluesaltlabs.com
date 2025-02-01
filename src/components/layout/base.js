import { LitElement, html, css } from 'lit-element';
import './header.js';
import './navbar.js';
import './footer.js';

export class LayoutBase extends LitElement {
  static styles = css`
    .max-w-screen { max-width: 100vw; } /*  */
    /* todo: update this so I don't have to put this here and in styles.css  */
    hr {
      height: 2px;
      border: none;
      background-color: var(--color-blue-alt);
    }
  `

  static properties = {
    title: { type: String, reflect: true }
  }

  constructor(title) {
    super();
    this.title = title

    //
  }

  //createRenderRoot() { return this }

  render() {
    return html`
      <div>
        <!-- todo: expand upon this layout -->
        <layout-header></layout-header>
        <layout-navbar></layout-navbar>
        <main class="max-w-screen">
          ${!this.title ? null : html`
            <div class="pure-g">
              <div class="pure-u pure-u-lg w-100 mx-auto" style="padding:2px 8px;">
                <h1>${this.title}</h1>
              </div>
              <hr />
            </div>
          `}
          <slot></slot>
        </main>
        <layout-footer></layout-footer>
      </div>
      `;
  }
}

customElements.define('layout-base', LayoutBase);
