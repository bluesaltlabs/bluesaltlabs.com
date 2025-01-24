import { LitElement, html } from 'lit-element';

class LayoutNavbar extends LitElement {
  render() {
    return html`
      <nav>
        <button onclick="window.location.href='/'">Home</button>
        <hr />
      </nav>
    `;
  }
}

customElements.define('layout-navbar', LayoutNavbar);
