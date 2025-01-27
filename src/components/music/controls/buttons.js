import { LitElement, html, css } from 'lit'
import AudioService from '@/services/AudioService'

class MusicButton extends LitElement {
  static styles = css`
    :root {
      width: 36px;
      height: 36px;
      margin: 0;
    }
    .music-button {
      font-family: 'Courier New', monospace;
      display: inline-block;
      border: 1px solid #88aaffcc;
      padding: 0.5rem;
      width: 36px;
      height: 36px;
      margin: 0;
      text-decoration: none;
      background: #11088311;
      color: #fff;
      font-family: sans-serif;
      font-size: 1rem;
      cursor: pointer;
      text-align: center;
      transition: background 150ms ease-in-out,
                  border-color 150ms ease-in-out,
                  transform 50ms ease;
      -webkit-appearance: none;
      -moz-appearance: none;



      &:hover, &:focus {
        background: #88aaffcc;
        border-color: #ffffffcc;
      }

      &:focus {
        outline: 1px solid #fff;
        outline-offset: -4px;
      }

      &:active {
        transform: scale(0.99);
      }
    }

  `

  static properties = {
  }

  constructor() {
    super()
  }

  render() {
    return html`
      <button alt="Music Button" class="music-button ">[!]</button>
    `
  }
}

export class ButtonSequencerStep extends MusicButton {

  // todo: alt is variable based on the id of the step

  render() {
    return html`
      <button alt="Sequencer Button" class="music-button music-button__sequencer-step">
        <slot></slot>
      </button>
    `
  }
}
customElements.define('music-button-sequencer-step', ButtonSequencerStep)

export class ButtonPlayPauseNew extends MusicButton {

}
customElements.define('music-button-play-pause-new', ButtonPlayPauseNew)

export class ButtonPlay extends MusicButton {
  static properties = {
  }

  constructor() {
    super()
  }

  render() {
    return html`
      <button alt="Music Play" class="music-button music-button__play">&#x23F5;</button>
    `
  }
}
customElements.define('music-button-play', ButtonPlay)


export class ButtonPause extends MusicButton {


  static properties = {
  }

  constructor() {
    super()
  }

  render() {
    return html`
      <button alt="Music Pause" class="music-button music-button__pause">&#x23F8;</button>
    `
  }
}
customElements.define('music-button-pause', ButtonPause)


export class ButtonPlayPause extends MusicButton {


  static properties = {
  }

  constructor() {
    super()
  }

  render() {
    return html`
      <button alt="Music Play / Pause" class="music-button music-button__play_pause">&#x23EF;</button>
    `
  }
}
customElements.define('music-button-play-pause', ButtonPlayPause)


class ButtonReverse extends MusicButton {


  static properties = {
  }

  constructor() {
    super()
  }

  render() {
    return html`
      <button alt="Music Reverse" class="music-button music-button__reverse">&#x23F4;</button>
    `
  }
}
customElements.define('music-button-reverse', ButtonReverse)


class ButtonStop extends MusicButton {


  static properties = {
  }

  constructor() {
    super()
  }

  render() {
    return html`
      <button alt="Music Stop" class="music-button music-button__stop">&#x23F9;</button>
    `
  }
}
customElements.define('music-button-stop', ButtonStop)


class ButtonFastBackward extends MusicButton {


  static properties = {
  }

  constructor() {
    super()
  }

  render() {
    return html`
      <button alt="Music Fast Backward" class="music-button music-button__fast_backward">&#x23EA;</button>
    `
  }
}
customElements.define('music-button-fast-backward', ButtonFastBackward)


class ButtonFastForward extends MusicButton {


  static properties = {
  }

  constructor() {
    super()
  }

  render() {
    return html`
      <button alt="Music Fast Forward" class="music-button music-button__fast_forward">&#x23E9;</button>
    `
  }
}
customElements.define('music-button-fast-forward', ButtonFastForward)


class ButtonSkipBackward extends MusicButton {


  static properties = {
  }

  constructor() {
    super()
  }

  render() {
    return html`
      <button alt="Music Skip Backward" class="music-button music-button__skip_backward">&#x23EE;</button>
    `
  }
}
customElements.define('music-button-skip-backward', ButtonSkipBackward)


class ButtonSkipForward extends MusicButton {


  static properties = {
  }

  constructor() {
    super()
  }

  render() {
    return html`
      <button alt="Music Skip Forward" class="music-button music-button__skip_forward">&#x23ED;</button>
    `
  }
}
customElements.define('music-button-skip-forward', ButtonSkipForward)


class ButtonRecord extends MusicButton {


  static properties = {
  }

  constructor() {
    super()
  }

  render() {
    return html`
      <button alt="Music Record" class="music-button music-button__record">&#x23FA;</button>
    `
  }
}
customElements.define('music-button-record', ButtonRecord)


class ButtonEject extends MusicButton {


  static properties = {
  }

  constructor() {
    super()
  }

  render() {
    return html`
      <button alt="Music Eject" class="music-button music-button__eject">&#x23CF;</button>
    `
  }
}
customElements.define('music-button-eject', ButtonEject)


class ButtonShuffle extends MusicButton {


  static properties = {
  }

  constructor() {
    super()
  }

  render() {
    return html`
      <button alt="Music Shuffle" class="music-button music-button__shuffle">&#x1F500;</button>
    `
  }
}
customElements.define('music-button-shuffle', ButtonShuffle)


class ButtonRepeat extends MusicButton {


  static properties = {
  }

  constructor() {
    super()
  }

  render() {
    return html`
      <button alt="Music Repeat" class="music-button music-button__repeat">&#x1F501;</button>
    `
  }
}
customElements.define('music-button-repeat', ButtonRepeat)


class ButtonRepeatOnce extends MusicButton {


  static properties = {
  }

  constructor() {
    super()
  }

  render() {
    return html`
      <button alt="Music Repeat Once" class="music-button music-button__repeat_once">&#x1F502;</button>
    `
  }
}
customElements.define('music-button-repeat-once', ButtonRepeatOnce)


class ButtonReload extends MusicButton {


  static properties = {
  }

  constructor() {
    super()
  }

  render() {
    return html`
      <button alt="Music Reload" class="music-button music-button__reload">&#x1F503;</button>
    `
  }
}
customElements.define('music-button-reload', ButtonReload);


class ButtonRefresh extends MusicButton {


  static properties = {
  }

  constructor() {
    super()
  }

  render() {
    return html`
      <button alt="Music Refresh" class="music-button music-button__refresh">&#x1F504;</button>
    `
  }
}
customElements.define('music-button-refresh', ButtonRefresh)


class ButtonVolumeUp extends MusicButton {


  static properties = {
  }

  constructor() {
    super()
  }

  render() {
    return html`
      <button alt="Music Volume Up" class="music-button music-button__volume_up">&#x1F50A;</button>
    `
  }
}
customElements.define('music-button-volume-up', ButtonVolumeUp)


class ButtonVolume extends MusicButton {


  static properties = {
  }

  constructor() {
    super()
  }

  render() {
    return html`
      <button alt="Music Volume" class="music-button music-button__volume">&#x1F509;</button>
    `
  }
}
customElements.define('music-button-volume', ButtonVolume)


class ButtonVolumeDown extends MusicButton {


  static properties = {
  }

  constructor() {
    super()
  }

  render() {
    return html`
      <button alt="Music Volume Down" class="music-button music-button__volume_down">&#x1F508;</button>
    `
  }
}
customElements.define('music-button-volume-down', ButtonVolumeDown)


class ButtonVolumeMute extends MusicButton {


  static properties = {
  }

  constructor() {
    super()
  }

  render() {
    return html`
      <button alt="Music Volume Mute" class="music-button music-button__volume_mute">&#x1F507;</button>
    `
  }
}
customElements.define('music-button-volume-mute', ButtonVolumeMute)
