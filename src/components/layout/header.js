import { LitElement, html, css } from 'lit-element';

// todo: refactor this so it doesn't use lit, but is instead a plain custom component
export class LayoutHeader extends LitElement {
  static styles = css`
    header {
      color: #fff;
      background-color: var(--color-gray-400);
      border-bottom: 1px solid var(--color-blue);
      padding: 8px 16px;
      margin-bottom: 25px;
      display: flex;

      a, button,
      ::slotted(a), ::slotted(button) {
        color: #fefefe;
        text-decoration: none;
        transition:
          box-shadow 100ms ease-in-out,
          color 100ms ease-in-out,
          background-color 100ms ease-in-out,
          border-color 100ms ease-in-out
        ;

        &:active,
        &:hover {
          box-shadow: 0 0 8px 0 var(--color-blue-alt);
          background: var(--color-blue-alt);
          cursor: pointer;
          color: #fff;
          border-color: #fefefe;
        }
      }

      button, ::slotted(button) {
        background: transparent;
        background-image: none;
        border: 1px solid #fff;
      }

      a, ::slotted(a) {
        padding: 0 3px;

        &:active,
        &:hover {
          text-decoration: underline;
        }
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
    }

    @media screen and (max-width: 350px) {
      header {
        .header-title {
          display: none;
        }
      }
    }

    @media (prefers-color-scheme: dark) {
      header {
        background-color: var(--color-blue);
        border-color: var(--color-blue-light);
        color: var(--color-blue-light);

        a, button,
        ::slotted(a), ::slotted(button) {
          color: var(--color-blue-light);

          &:active,
          &:hover {
            box-shadow: 0 0 8px 0 var(--color-blue);
            cursor: pointer;
            color: #fff;
            border-color: #fff;
          }
        }

        button {
          border-color: var(--color-blue-light);
        }
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
