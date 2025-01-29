// import { LitElement, html, css } from 'lit'
// import playArrow from '@/assets/icons/play-arrow.svg'





// //export class AudioControlPlayButton extends AudioControlButton {
// export class AudioControlPlayButton extends LitElement {
//   static styles = css``

//   static properties = {
//     // todo: what properties does a button need?
//   }

//   getIcon() {
//     html`
//       <img .src=${playArrow} width="100%" height="100%" />
//     `
//   }
// }


// customElements.define('audio-control-play-button', AudioControlPlayButton)


// //import AudioService from '@/services/AudioService'


// todo: figure out how to implement this as a mixin so I can extend a base thing and just add the icon.
//       I don't want to duplicate this functionality for every button.


// const AudioControlButtonMixin = (superClass) => class extends superClass {
//   /* class fields & methods to extend superClass with */
// };

// export class AudioControlButton extends LitElement {
//   // original source: [hoch/WAAX](https://github.com/hoch/WAAX/blob/master/src/mui/mui-button/mui-button.html)

//   static properties = {
//     // todo  : should this just have a type attribute and get the icon from there?
//     active: { type: Boolean, reflect: true }
//   }

//   static styles = css`
//     :host {
//       display: inline-block;
//       box-sizing: border-box;
//       -moz-box-sizing: border-box;
//       vertical-align: middle;
//       width: 48px;
//       height: 48px;
//       background-image: none;
//       border-radius: 2px;
//       padding: 12px 12px;
//       margin: 6px 4px;
//       font-size: 0.7rem;
//       cursor: pointer;
//       color: #546e7a;
//       box-shadow: 0 0 0 1px #b0bec5;
//     }
//     :host([disabled]) {
//       opacity: 0.6;
//       pointer-events: none;
//     }
//     /*:host(.outline) {
//       box-shadow: 0 0 0 1px ;
//     }*/
//     :host(:hover:not([disabled])) {
//       box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.1), 0 0 1px 1px rgba(0, 0, 0, 0.2);
//     }
//     :host(.selected:not([disabled])) {
//       color: #03a9f4;
//       /*background-color: #039be5;*/
//       background-color: rgba(0, 0, 0, 0.15);
//       box-shadow: inset 0 1px 0 0 rgba(0, 0, 0, 0.24), 0 0 0 1px rgba(0, 0, 0, 0.28);
//     }
//     :host(:active:not([disabled]), .selected:active:not([disabled])) {
//       background-color: rgba(0, 0, 0, 0.1);
//       box-shadow: inset 0 1px 0 0 rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.24);
//     }
//     core-icon {
//       pointer-events: none;
//     }
//     .title {
//       color: #607d8b;
//       font-family: 'Roboto Condensed', sans-serif;
//       line-height: 1rem;
//       text-align: center;
//       overflow: hidden;
//       margin: 15px -4px;
//     }
//     .title(.selected) {
//       color: #fff;
//     }
//   `;

//   getIcon() { return null }

//   render() {
//     return html`
//       <button>
//         <!--<slot></slot>-->
//         ${this.getIcon() ?? html`<span>!</span>`}
//       </button>
//     `
//   }
// }

//customElements.define('audio-control-button', AudioControlButton)

// todo?: class LitAudioButton extends LitElement {}
//       class AudioButton {}
