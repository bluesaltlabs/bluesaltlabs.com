import { LitElement, html } from 'lit-element';

class LayoutBase extends LitElement {
  render() {
    return html`<slot></slot>`;
  }
}

customElements.define('layout-base', LayoutBase);
