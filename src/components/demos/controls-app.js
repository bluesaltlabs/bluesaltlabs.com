


class ControlsApp extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
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
        <p>This is a demo of the controls app!!</p>
      </div>
    `;
  }
}

customElements.define('controls-app', ControlsApp);
