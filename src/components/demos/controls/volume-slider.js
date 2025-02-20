// https://css-tricks.com/styling-cross-browser-compatible-range-inputs-css/
const css = `
  <style>
  input[type=range] {
    -webkit-appearance: none; /* Hides the slider so that custom slider can be made */
    width: 100%; /* Specific width is required for Firefox. */
    background: transparent; /* Otherwise white in Chrome */
  }

  input[type=range]::-webkit-slider-thumb {
    -webkit-appearance: none;
  }

  input[type=range]:focus {
    /* outline: none; /* Removes the blue border. You should probably do some kind of focus styling for accessibility reasons though. */
  }

  input[type=range]::-ms-track {
    width: 100%;
    cursor: pointer;

    /* Hides the slider so custom styles can be added */
    background: transparent;
    border-color: transparent;
    color: transparent;
  }

  /* Special styling for WebKit/Blink */
  input[type=range]::-webkit-slider-thumb {
    -webkit-appearance: none;
    border: 1px solid #000000;
    height: 36px;
    width: 16px;
    border-radius: 3px;
    background: var(--color-blue-alt);
    cursor: pointer;
    margin-top: -14px; /* You need to specify a margin in Chrome, but in Firefox and IE it is automatic */
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d; /* Add cool effects to your sliders! */
  }

  /* All the same stuff for Firefox */
  input[type=range]::-moz-range-thumb {
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
    border: 1px solid #000000;
    height: 36px;
    width: 16px;
    border-radius: 3px;
    background: var(--color-blue-alt);
    cursor: pointer;
  }

  /* All the same stuff for IE */
  input[type=range]::-ms-thumb {
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
    border: 1px solid #000000;
    height: 36px;
    width: 16px;
    border-radius: 3px;
    background: var(--color-blue-alt);
    cursor: pointer;
  }
  input[type=range]::-webkit-slider-runnable-track {
    width: 100%;
    height: 8.4px;
    cursor: pointer;
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
    background: #3071a9;
    border-radius: 1.3px;
    border: 0.2px solid #010101;
  }

  input[type=range]:focus::-webkit-slider-runnable-track {
    background: #367ebd;
  }

  input[type=range]::-moz-range-track {
    width: 100%;
    height: 8.4px;
    cursor: pointer;
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
    background: var(--color-blue);
    border-radius: 1.3px;
    border: 0.2px solid #010101;
  }

  input[type=range]::-ms-track {
    width: 100%;
    height: 8.4px;
    cursor: pointer;
    background: transparent;
    border-color: transparent;
    border-width: 16px 0;
    color: transparent;
  }
  input[type=range]::-ms-fill-lower {
    background: #2a6495;
    border: 0.2px solid #010101;
    border-radius: 2.6px;
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  }
  input[type=range]:focus::-ms-fill-lower {
    background: var(--color-blue);
  }
  input[type=range]::-ms-fill-upper {
    background: #3071a9;
    border: 0.2px solid #010101;
    border-radius: 2.6px;
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  }
  input[type=range]:focus::-ms-fill-upper {
    background: #367ebd;
  }
  </style>
`;

const html = `
  <input type="range" />
`;

class VolumeSliderControl extends HTMLElement {
  static get observedAttributes() {
    return ['value', 'min', 'max', 'disabled'];
  }

  constructor() {
    super();
    this.debug = true; // debug


    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.inputNode = this.shadowRoot.querySelector('input');
    this.inputNode.value = 0; // todo: set initial value

    // Add all properties on input to element
    for (let i = 0; i < this.attributes.length; i++) {
      this.inputNode.setAttribute(
        this.attributes[i].nodeName,
        this.attributes[i].nodeValue
      )
    }

    // this.value  = this.inputNode.value;
    // this.min    = this.inputNode.min;
    // this.max    = this.inputNode.max;
    // this.step   = this.inputNode.step;

    this.throttlingDelay = 100;
    this.throttlingValue = false;
    this.throttlingTimer = null;

  }

  showDebugMessage(message, value) {
    if(this.debug === true) {
      console.debug(`VolumeSliderControl: ${message}`, { ...(value ?? {}) });
    }
  }


  setThrottledValue(event) {
    if(this.throttlingValue === false) {
      this.throttlingValue = true;
      this.throttlingTimer = setTimeout(() => {
          this.showDebugMessage("value is", { value: parseInt(this.value) });
        this.inputNode.setAttribute('value', this.value);
        this.throttlingValue = false;
      }, this.throttlingDelay);
    }
  }

  // getters and setters
  get value () { if(this.inputNode) { return this.inputNode.value } }
  set value (newValue) { if(this.inputNode) { this.inputNode.value = newValue }  }

  get min() { if(this.inputNode) { return this.inputNode.min } }
  set min(newValue) { if(this.inputNode) { this.inputNode.min = newValue } }

  get max() { if(this.inputNode) { return this.inputNode.max } }
  set max(newValue) { if(this.inputNode) { this.inputNode.max = newValue } }

  get step() { if(this.inputNode) { return this.inputNode.step } }
  set step(newValue) { if(this.inputNode) { this.inputNode.step = newValue } }

  get disabled() { if(this.inputNode) { return this.inputNode.disabled } }
  set disabled(newValue) { if(this.inputNode) { this.inputNode.disabled = newValue } }


  connectedCallback () {
    this.inputNode.addEventListener('change', this.setValue);
    this.inputNode.addEventListener('input', (e) => this.setThrottledValue(e))
  }

  disconnectedCallback () {
    this.inputNode.removeEventListener('change', this.setValue);
    this.inputNode.removeEventListener('input', (e) => this.setThrottledValue(e));
  }

  attributeChangedCallback (name, oldValue, newValue) {
    if (name === 'value') {
      this.inputNode.value = newValue
    }
  }

}

// build the template;
const template = document.createElement('template');
template.innerHTML = `${css}${html}`;

// Define the custom element
customElements.define('volume-slider-control', VolumeSliderControl);
export default VolumeSliderControl;
