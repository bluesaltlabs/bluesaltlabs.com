
// import VolumeSliderControl from './volume-slider.js';
import './debug-control-value.js'
import './volume-slider.js';

class ControlsApp extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  // todo: save state of the volume slider control here, update state of debug and volume slider control on change

  connectedCallback() {

  }

  disconnect

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
        <p>This is a demo of the controls app!!</p>
        <volume-slider-control value="50"></volume-slider-control>
        <debug-control-value value="10"></debug-control-value>
      </div>
    `;
  }
}

customElements.define('controls-app', ControlsApp);
export default ControlsApp;
