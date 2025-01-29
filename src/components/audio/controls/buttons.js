import { LitElement, html, css } from 'lit'
import playArrow from '@/assets/icons/play-arrow.svg'





//export class AudioControlPlayButton extends AudioControlButton {
export class AudioControlPlayButton extends LitElement {
  static styles = css`
    `

  static properties = {
    // todo: what properties does a button need?
  }

  render() {
    return html`
      <button>
      <img .src=${playArrow} width="100%" height="100%" />
      </button>
    `
  }
}


customElements.define('audio-control-play-button', AudioControlPlayButton)
