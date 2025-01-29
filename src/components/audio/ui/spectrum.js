import { LitElement, html, css } from 'lit';

import SpectrumAnalyzerService from '@/services/SpectrumAnalyzerService'

// todo: see https://github.com/hoch/WAAX/blob/ca933954877e307123893ecf8e6ec91402d2dd8c/src/mui/mui-spectrum/mui-spectrum.html
export class AudioUiSpectrum extends LitElement {
  static styles = css`
    /* todo: double-check these styles work as expected. */
    /* :host { */
    .audio-ui-spectrum {
      /* width: 100%; */
      display: block;
      overflow: hidden;
      margin-bottom: 5px;
    }

    .audio-ui-spectrum__container {
      /* width: 100%; */
      position: relative;
      display: block;
      vertical-align: top;
      overflow: hidden;
    }

    .audio-ui-spectrum__toolbar {
      display: block;
      height: 28px;
      background-color: #eee;
    }
  `

  static properties = {
    _sas: { type: Object },
  }

  constructor() {
    super()
    this._sas = SpectrumAnalyzerService
  }

  render() {
    return html`
      <div class="audio-ui-spectrum">
        <div class="audio-ui-spectrum__container">
          <div class="audio-ui-spectrum__toolbar"></div>
          <canvas class="audio-ui-spectrum__canvas"></canvas>
        </div>
      </div>
      `
  }
}

customElements.define('audio-ui-spectrum', AudioUiSpectrum)
