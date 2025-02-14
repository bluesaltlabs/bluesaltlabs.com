import { LitElement, html, css } from 'lit-element';
import './header.js';
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
    .title-container {
      padding: 2px 4%;
      max-width: 1920px;
      margin: auto;
    }
  `

  static properties = {
    title: { type: String, reflect: true },
  }

  constructor(title) {
    super();
    this.title = title;
  }

  //createRenderRoot() { return this }

  render() {
    return html`
      <layout-header><slot name="navbar"></slot></layout-header>

      <main class="max-w-screen">
        ${!this.title ? null : html`
          <div class="title-container">
            <h1>${this.title}</h1>
          </div>
          <hr />
        `}

        <!-- Content -->
        <slot></slot>

      </main>
      <layout-footer></layout-footer>
    `;
  }
}

customElements.define('layout-base', LayoutBase);
