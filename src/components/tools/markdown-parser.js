import { marked } from 'marked';

class MarkdownParser extends HTMLElement {
  constructor() {
    super();

    // this.originalTextContent = this.textContent;
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' });
    const template = document.createElement('template');

    try {
      template.innerHTML = marked(`${this.textContent}`.trim());
    } catch (e) {
      console.error("MarkdownParser error", e);
    }

    shadow.appendChild(template.content.cloneNode(true));

    // console.debug("fired MarkdownParser connectedCallback", { this: this });
  }
}

customElements.define('markdown-parser', MarkdownParser);
export default MarkdownParser;
