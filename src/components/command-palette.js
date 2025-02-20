// todo: Implement a command palette that opens with a keyboard shortcut (Ctrl+Shift+P)
//       When the command palette is open, it should display a list of available commands.
//       Each command should have a name, a description, and an icon.
//       When the palette is open, a search bar should be displayed on the screen and a shadow should be applied to the background.
// Example Websites:
//   - https://zed.dev (cmd+shift+p)
//   - https://jetbrains.com (cmd+k) [not implemented with dark mode]

const css = `
  <!-- todo -->
`;

const html = `
  <!-- todo -->
`;

class CommandPalette extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    // todo: Implement the command palette logic
    // implement event listeners for keyboard shortcuts. Needs to handle a combination of keys being pressed at once.
    // document.addEventListener('keydown', this.handleKeyDown.bind(this));
  }

  disconnectedCallback() {
    // todo: Implement the command palette logic
    // disconnect event listeners for keyboard shortcuts
    // document.removeEventListener('keydown', this.handleKeyDown.bind(this));
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // todo: Implement the command palette logic
  }

  static get observedAttributes() {
    return ['open', 'query'];
  }

  // todo: shouldn't there be separate methods to handle each attribute?
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'open') {
      if (newValue === 'true') {
        this.open();
      } else {
        this.close();
      }
    }
    if (name === 'query') {

    }
  }

  open() {
    // todo: Implement the command palette logic
  }

  close() {
    // todo: Implement the command palette logic
  }


}

// build the template;
const template = document.createElement('template');
template.innerHTML = `${css}${html}`;

// Define the custom element
customElements.define('command-palette', CommandPalette);
export default CommandPalette;
