import InputControl from './input';
//import InputControl, { css as baseCss, html as baseHtml } from './input';


// const css = `${baseCss}`
// const html = `${baseHtml}`


class InputKnobControl extends InputControl {
  constructor() {
    super();
    this.value = 25;
  }

  //
}

// build the template;
// const template = document.createElement('template');
// template.innerHTML = `${css}${html}`;

// Define the custom element
customElements.define('input-knob-control', InputKnobControl);
export default InputKnobControl;
