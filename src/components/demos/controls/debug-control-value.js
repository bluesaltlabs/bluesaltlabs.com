

class DebugControlValue extends HTMLElement {

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  render() {
    const wrapper = document.createElement('div');
    wrapper.setAttribute('class', 'controls-app');
    this.shadowRoot.innerHTML = `


      <!-- todo: update these values to be dynamic -->

        <p>This is a placeholder control value</p>

    `;
  }
}

customElements.define('debug-control-value', DebugControlValue);
export default DebugControlValue;
