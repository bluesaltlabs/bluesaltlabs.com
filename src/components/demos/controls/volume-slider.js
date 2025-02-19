
const css = `
  <style>
    /* todo */
  </style>
`;

const html = `
  <input type="range" min="0" max="100" value="50" />
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
  }

  showDebugMessage(message, value) {
    if(this.debug === true) {
      console.debug(`VolumeSliderControl: ${message}`, { value });
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
    this.inputNode.addEventListener('change', this.setValue)
    //this.inputNode.addEventListener('change', (e) => console.debug("fired change on input", {e, this: this, value: this.value}))
  }

  disconnectedCallback () {
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
