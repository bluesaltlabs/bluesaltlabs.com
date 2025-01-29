import { LitElement, html, css } from 'lit'
//import { VirtualKeysService } from '@/services/VirtualKeysService'

// todo: see https://github.com/hoch/WAAX/blob/ca933954877e307123893ecf8e6ec91402d2dd8c/src/mui/mui-vkey/mui-vkey.html
//       and https://github.com/hoch/WAAX/blob/ca933954877e307123893ecf8e6ec91402d2dd8c/examples/mui/ex-mui-pianoroll.html
export class AudioControlVirtualKeys extends LitElement {
  static styles = css`
    /* todo: refactor and confirm these styles */
    :host {
      display: block;
      overflow: hidden;
    }
    .mui-vkey-container {
    }
    .mui-vkey-header {
      margin: 0 0 6px 0;
    }
    .mui-vkey-header .button {
      padding: 2px 2px;
      width: 28px;
      height: 28px;
      box-shadow: none;
      box-shadow: 0 0 0 1px #cfd8dc;
      margin: 1px;
    }
    /*.header .button:hover {
      box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(0, 0, 0, 0.1);
    }*/
    .c-display {
      display: inline-block;
      vertical-align: middle;
      text-align: center;
      font-family:'Roboto Condensed', sans-serif;
      font-size: 0.7rem;
      height: 25px;
      line-height: 25px;
      padding-top: 3px;
      border-radius: 1px;
      color: #00796b;
      background-color: #b2dfdb;
      box-shadow: inset 0 1px 1px 1px rgba(0, 0, 0, 0.2), 0px 0px 1px 0px rgba(0, 0, 0, 0.24);
    }
    .mui-vkey-octave {
      width: 48px;
    }
    .mui-vkey-message {
      float: right;
      width: 100px;
      margin: 1px;
    }
    .c-vkey {
      display: block;
      cursor: move;
      background-color: #cfd8dc;
      border-radius: 1px;
    }
    .c-wheel {
      stroke: #78909c;
      stroke-width: 1px;
      fill: #fff;
    }
    .c-wheel-pos {
      fill: #039be5;
    }
    .c-white-key {
      fill: #fff;
    }
    .c-black-key {
      fill: #607d8b;
    }
    .active {
      fill: #039be5;
    }
  `

  render() {
    return html`
      <div class="mui-vkey-container">
        <div class="mui-vkey-header">
          <div id="eMsgPanel" class="c-display mui-vkey-message">HELLO</div>
          <mui-button class="mui-vkey-header button" icon="hardware:keyboard" type="toggle" on-click="{{ toggleKeyboardInput }}" active="true"></mui-button>
          <mui-button class="mui-vkey-header button" icon="chevron-left" on-click="{{ octaveDown }}"></mui-button>
          <div class="c-display mui-vkey-octave">{{ _octaveStr }} oct.</div>
          <mui-button class="mui-vkey-header button" icon="chevron-right" on-click="{{ octaveUp }}"></mui-button>
        </div>
        <svg id="eTouchable" class="c-vkey" height="100" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <rect class="c-wheel" x="6" y="6" width="32" height="88" rx="2" ry="2"></rect>
          <rect class="c-wheel" x="44" y="6" width="32" height="88" rx="2" ry="2"></rect>
          <rect id="ePitWhlPos" class="c-wheel-pos" x="7" y="50" width="30" height="2"></rect>
          <rect id="eModWhlPos" class="c-wheel-pos" x="45" y="88" width="30" height="2"></rect>
        </svg>
      </div>
      `
  }
}

customElements.define('audio-control-virtual-keys', AudioControlVirtualKeys)
