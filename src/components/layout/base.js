import { LitElement, html } from 'lit-element';
import './navbar.js';

class LayoutBase extends LitElement {
  render() {
    return html`
      <layout-navbar></layout-navbar>
      <slot></slot>
      `;
  }
}

customElements.define('layout-base', LayoutBase);
