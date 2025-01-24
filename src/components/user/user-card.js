import { LitElement, html } from 'lit-element';

class UserCard extends LitElement {
  render() {
    return html`
      <div class="user-card">
        todo: user card.
      </div>
      `;
  }
}

customElements.define('user-card', UserCard);
