import { LitElement, html, css } from 'lit'
import MeterAnalyzerService from '@/services/MeterAnalyzerService'

// todo: see https://hoch.github.io/WAAX/waax/examples/mui/ex-mui-meter.html
//
export class AudioUiMeter extends LitElement {
  static styles = css`
    :host {
    }
  `

  constructor() {
    // todo
  }

  render() {
    return html`
      <div class="">
        <p>Hello, there! I am a placeholder meter ui element</p>
      </div>
    `

  }
}

customElements.define('audio-ui-meter', AudioUiMeter);
