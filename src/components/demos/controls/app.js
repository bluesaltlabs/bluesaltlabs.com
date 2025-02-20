
import './volume-slider.js';
import './debug-control-value.js'
import './input-knob.js';
import './input.js';

class ControlsApp extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  // todo: save state of the volume slider control here, update state of debug and volume slider control on change
  handleInputChange(event) {
    console.debug("handling input change", { event });
  }


  handleSlotChange() {
    console.debug("handling slot change");


    // // querySelectorAll the input elements slotted in this component
    const inputElements = this.querySelectorAll('input');
    console.debug("inputElements", {inputElements})
    inputElements.forEach(input => {
      console.debug("attaching to input element", { element: input })
      input.addEventListener('change', this.handleInputChange);
    });

  }

  // todo: for some reason this isn't attaching the event listener to the input elements. figure out why.
  connectedCallback() {
    const slot = this.shadowRoot.querySelector('slot');
    slot.addEventListener('slotchange', this.handleSlotChange);
  }

  disconnectedCallback() {
    const slot = this.shadowRoot.querySelector('slot');
    slot.removeEventListener('slotchange', this.handleSlotChange);
  }

  render() {
    const wrapper = document.createElement('div');
    wrapper.setAttribute('class', 'controls-app');
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }
      </style>
      <div>
        <slot></slot>
      </div>
    `;
  }
}

customElements.define('controls-app', ControlsApp);
export default ControlsApp;
