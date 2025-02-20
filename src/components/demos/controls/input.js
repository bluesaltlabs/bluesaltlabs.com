

export const css = `
  <style>
  input {
    appearance: none;
    -webkit-appearance: none;
    background: transparent; /* Otherwise white in Chrome */
    border: none;
    color: inherit;
  }
  </style>
`;

export const html = `
  <input />
`;

class InputControl extends HTMLElement {
  static get observedAttributes() {
    //return [...super().observedAttributes, 'value', 'disabled'];
    return ['value', 'disabled'];
  }

  constructor() {
    super();
    this.debug = true; // debug

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.inputNode = this.shadowRoot.querySelector('input');


    // Add all properties on input to element
    for (let i = 0; i < this.attributes.length; i++) {
      this.inputNode.setAttribute(
        this.attributes[i].nodeName,
        this.attributes[i].nodeValue
      )
    }

    this.value  = this.inputNode.value;

    this.throttlingDelay = 200;
    this.throttlingValue = false;
    this.throttlingTimer = null;

  }

  showDebugMessage(message, value) {
    if(this.debug === true) {
      console.debug(`InputControl: ${message}`, { ...(value ?? {}) });
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
customElements.define('input-control', InputControl);
export default InputControl;
