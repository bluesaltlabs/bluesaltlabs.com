import { marked } from "marked";
import customHeadingId from "marked-custom-heading-id";
import { gfmHeadingId } from "marked-gfm-heading-id";
import markedCodeFormat from "marked-code-format";

class MarkdownParser extends HTMLElement {
  constructor() { super() }

  connectedCallback() {
    try {
      // Set up marked plugins
      marked.use(customHeadingId());
      marked.use(gfmHeadingId({ prefix: "" }));
      marked.use(markedCodeFormat({ }));

      this.innerHTML = marked(`${this.textContent}`.trim());
    } catch (e) { console.error("MarkdownParser error", e); }
  }
}

customElements.define('markdown-parser', MarkdownParser);
export default MarkdownParser;
