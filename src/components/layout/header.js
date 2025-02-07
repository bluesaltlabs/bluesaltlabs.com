import { LitElement, html, css } from 'lit-element';

export class LayoutHeader extends LitElement {
  static styles = css`
    header {
      background-color: var(--color-blue);
      border-bottom: 1px solid var(--color-blue-alt);
      padding: 8px 16px; /* todo: duplicate this value in the footer by using variables */
      margin-bottom: 25px;
      display: flex;
    }

    button {
      background: transparent;
      background-image: none;
      border: 1px solid var(--color-blue-alt);
    }


    a, button,
    ::slotted(a) {
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

      /* todo: figure out why these styles aren't working correctly, clean them up.  */
      a,
      ::slotted(a) {
        text-decoration: none;
        padding: 0 3px;
      }
      a:active,
      a:hover,
      ::slotted(a):active,
      ::slotted(a):hover {
        text-decoration: underline;
        color: #fff;
      }

      .header-left {
        margin: 0 3px;
      }
      .header-title {
        padding-left: 6px;
      }

      .header-right {
        margin: 0 3px;
        padding: 0px 3px;
        /* border-left: 1px solid var(--color-blue-alt); */
      }
      @media screen and (max-width: 350px) {
        .header-title {
          display: none;
        }
      }
  `

  render() {
    return html`
      <header>
        <div class="header-left">
          <button onclick="window.location.href='/'" alt="Home">Home</button>
          <span class='header-title'><code>| simple.bluesaltlabs.com</code></span>
        </div>
        <div class="header-right">
          <slot></slot>
        </div>
      </header>
    `;
  }
}

customElements.define('layout-header', LayoutHeader);
