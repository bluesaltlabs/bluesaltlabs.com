import { marked } from 'marked';

class MarkdownParser extends HTMLElement {
  constructor() { super() }

  connectedCallback() {
    try {
      this.innerHTML = marked(`${this.textContent}`.trim());
    } catch (e) { console.error("MarkdownParser error", e); }
  }
}

customElements.define('markdown-parser', MarkdownParser);
export default MarkdownParser;
