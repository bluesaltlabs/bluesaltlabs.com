import { LitElement, html, css } from 'lit'

// todo: link to documentation file and just copy stuff so it works (then make changes I want to make).
export class AudioControlButton extends LitElement {

  // todo: styles
  // todo: etc

  render() {
    html`
      <div class="audio-control-button">
        <p>to do</p>
      </div>
    `
  }
}

customElements.define('audio-control-button', AudioControlButton)


// todo:L temp
export class AudioControlPlayButton extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
      /* todo? */
    }

    :root {
      /* todo: need to either import this or otherwise make sure it's a web safe font*/
      font-family: "Roboto Condensed";
      --btn-color: #37474F;
      --btn-color-active: #03a9f4;
      /* --btn-color: #546e7a; */
      --btn-bg-color: #EF476F;
      --btn-shadow-color: #b0bec5;
      /* --color-btn-bg: #; */
    }

    button {
      display: inline-block;
      box-sizing: border-box;
      vertical-align: middle;
      width: 48px;
      height: 48px;
      background-image: none;
      border-radius: 2px;
      padding: 12px 12px;
      margin: 6px 4px;
      font-size: 0.7rem;
      text-align: center;
      cursor: pointer;
      color: var(--btn-color); /* todo: move this to a stylesheet variable */
      box-shadow: 0 0 0 1px var(--btn-shadow-color);

      /* todo: confirm these values */
      transition: background 150ms ease-in-out,
                  border 150ms ease-in-out,
                  filter 150ms ease-in-out,
                  transform 100ms ease;

      &:disabled {
        opacity: 0.6;
        pointer-events: none;

        */
      }

      &:hover:not(:disabled),
      &:focus:not(:disabled) {
        /* background: #0053ba; /* todo: temp - replace w/ variable */ */
        box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.1), 0 0 1px 1px rgba(0, 0, 0, 0.2);


        /*

        :host(.selected:not([disabled])) {

        }

        */
      }

      &.selected,
      &:focus {
        /* outline: 1px solid #fff; */
        /* outline-offset: -4px; */

        color: var(--btn-color-active);
        background-color: rgba(0, 0, 0, 0.15);
        box-shadow: inset 0 1px 0 0 rgba(0, 0, 0, 0.24), 0 0 0 1px rgba(0, 0, 0, 0.28);
      }

      &:active {
        transform: scale(0.99);
      }

      /*

      :host(:active:not([disabled]), .selected:active:not([disabled])) {
          background-color: rgba(0, 0, 0, 0.1);
          box-shadow: inset 0 1px 0 0 rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.24);
      }
      */

    }

    /* todo: may need to change how this color is applied to this button, but this will work for now. */
    .play-arrow { fill: var(--btn-color); }



    /*




    .title {
        color: #607d8b;
        font-family: 'Roboto Condensed', sans-serif;
        line-height: 1rem;
        text-align: center;
        overflow: hidden;
        margin: 15px -4px;
        }
    .title(.selected) {
        color: #fff;
    }
    */


  `

  static properties = {
    // todo: what properties does a button need?
    //
    // todo: look in the documentation for any properties that need to be added:
    //       onClick (@click?)
  }

  render() {
    return html`
      <button class="audio-button">

        <!-- play-arrow.svg  -->
        <svg height="48" width="48" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" preserveAspectRatio="xMidYMid meet" fit="" style="pointer-events:none;display:block;width:100%;height:100%;">
          <g><path class="play-arrow" d="M8 5v14l11-7z"></path></g>
        </svg>
        <!-- <slot></slot> -->


        <!-- should import stuff like this instead of manually pasting svg code, but whatever.  -->
      <!-- <img .src=$ {playArrow} width="48" height="48" /> -->
      </button>
    `
  }
}


customElements.define('audio-control-play-button', AudioControlPlayButton)
