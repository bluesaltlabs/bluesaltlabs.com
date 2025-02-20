
// import VolumeSliderControl from './volume-slider.js';
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

  connectedCallback() {

  }

  disconnectedCallback() {

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
