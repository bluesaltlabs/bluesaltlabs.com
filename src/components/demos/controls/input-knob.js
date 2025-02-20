import InputControl from './input';
//import InputControl, { css as baseCss, html as baseHtml } from './input';


// const css = `${baseCss}`
// const html = `${baseHtml}`


class InputKnobControl extends InputControl {
  constructor() {
    super();
    this.inputNode.type = 'number';
    this.inputNode.value = 0; // set initial value to 0

  }

  //
}

// build the template;
// const template = document.createElement('template');
// template.innerHTML = `${css}${html}`;

// Define the custom element
customElements.define('input-knob-control', InputKnobControl);
export default InputKnobControl;
