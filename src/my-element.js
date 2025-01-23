import { LitElement, css, html } from 'lit'


/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
export class MyElement extends LitElement {
  static get properties() {
    return {
      /**
       * Copy for the read the docs hint.
       */
      docsHint: { type: String },

      /**
       * The number of times the button has been clicked.
       */
      count: { type: Number },
    }
  }

  constructor() {
    super()
    this.count = 0
  }

  render() {
    return html`

      <div class="card">
        <button @click=${this._onClick} part="button">
          count is ${this.count}
        </button>
        <slot></slot>
      </div>
    `
  }

  _onClick() {
    this.count++
  }

  static get styles() {
    return css`
    `
  }
}

window.customElements.define('my-element', MyElement)
