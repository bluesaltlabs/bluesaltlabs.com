import { LitElement, html, css } from 'lit'
import AudioService from '@/services/AudioService'

// temp
const oscillatorTypes = ['sine', 'square', 'sawtooth', 'triangle']

export class AudioOscillator extends LitElement {


  static styles = css`
    /* todo: could an overlay be added here instead? */
    /* .audio-oscillator__canvas-container::after {} */

    button {
      padding: 10px 20px;
      border: none;
      background: #0078d7;
      color: white;
      font-size: 1rem;
      cursor: pointer;
      border-radius: 5px;
    }
    button:disabled {
      background: #cccccc;
    }

    .audio-oscillator__canvas {
      background: #fff;
      /* width: 640px; */
      /* height: 240px; */
      /* max-width: 100vw; */
    }

    .audio-oscillator-overlay {
      position: absolute;
      cursor: pointer;
      z-index: 1;
      top: 0;
      left: 0;
      background: rgba(0, 0, 0, 80%);
      width: 100%;
      height: 100%;
      display: none;
      justify-content: center;
      padding-top: 15em;
      box-sizing: border-box;

      &.visible { display: flex; }
    }

    /* todo: figure this out */
    label > radio {
      cursor: pointer;
    }
  `

  static properties = {
    frequency: { type: Number },
    oscillatorType: { type: String },
    detune: { type: Number },
    volume: { type: Number },
    isPlaying: { type: Boolean },
    showOverlay: { type: Boolean, reflect: true }
  }

  constructor() {
    super()

    this.checkAudioContext()

    this.frequency = 150
    this.oscillatorType = "sine"
    this.detune = 0
    this.volume = -16
    this.isPlaying = false
    this.showOverlay = false

    this.ctx = new window.AudioContext() // todo: use _ctx?
    this.osc = null
    this.analyser = null
    this.analyser = this.ctx.createAnalyser() // todo: use _analyser?


    // todo: make this more robust. new function?
    if (this.ctx.state === 'suspended') {
      this.showOverlay = true
      document.addEventListener('click', (event) => {
        try {
          this.ctx?.start() // todo: fix this
        } catch(e) {
          console.debug(e)
        } finally {
          this.showOverlay = false
        }
      }, { once: true })
    }
    if(this.ctx.state === 'running') {
      this.showOverlay = false
    }


    // todo: init a new tone.js oscillator.
    this.initOscillator()
  }

  checkAudioContext() {
    // Check for AudioContext.
    const hasAudioContext = window.hasOwnProperty('AudioContext');
    const hasWebKitAudioContext = window.hasOwnProperty('webkitAudioContext');

    // The browser does not have either prefixed or unprefixed version of
    // AudioContext. Quit immediately.
    // This is for the old version of IE. (before Edge)
    if (!hasWebKitAudioContext && !hasAudioContext) {
      console.log('[Spiral] This browser does not support Web Audio API. Bye.');
      return;
    }

    // The browser only has the prefixed version of AudioContext. Apply patch.
    // This is for Safari.
    if (hasWebKitAudioContext && !hasAudioContext) {
      window.AudioContext = window.webkitAudioContext;
      console.log('[Spiral] This browser still has webkitAudioContext. Patch applied.');
    }

  }


  // todo: temp
  getAnalyserFrameValue() {
		return this.analyser.getValue()
  }

  initOscillator() {
    console.debug("creating oscillator", { frequency: this.frequency, type: this.oscillatorType, volume: this.volume })

    if(this.osc) { this.osc?.stop() }

    // todo: I may not need to create this ieach time
    this.osc = new AudioService.t.Oscillator({
      type: this.oscillatorType,
      frequency: this.frequency,
      detune: this.detune,
      volume: this.volume,
    }).toDestination()

    //this.osc.connect(this.analyser) // todo

    if(this.isPlaying) { this.osc.start() } // todo: may want to check if it's already going.

    console.debug("oscillator", { oscillator: this.osc })
    //this.osc = new AudioService.t.Oscillator(this.frequency,this.oscillatorType).toDestination().start()
  }

  // Updates the oscillator instance with values. run on input changes.
  // todo: needs to run on input changes.
  updateOscillator() {
    console.debug("updating oscillator", { frequency: this.frequency, type: this.oscillatorType, volume: this.volume })

    if(this.osc) { this.osc?.stop() }



    // todo: I may not need to create this ieach time
    this.osc = new AudioService.t.Oscillator({
      type: this.oscillatorType,
      frequency: this.frequency,
      detune: this.detune,
      volume: this.volume,
    }).toDestination()

    //this.osc.connect(this.analyser)

    if(this.isPlaying) { this.osc.start() } // todo: may want to check if it's already going.

    console.debug("oscillator", { oscillator: this.osc })
    //this.osc = new AudioService.t.Oscillator(this.frequency,this.oscillatorType).toDestination().start()
  }

  handleFrequencyChange(event) {
    console.debug("frequency changed", { value: event?.target?.value ?? undefined })
    this.frequency = parseInt(event?.target?.value) ?? 0
    this.updateOscillator()
    //this.osc.frequency = this.frequency
  }

  handleDetuneChange(event) {
    console.debug("detune changed", { value: event?.target?.value ?? undefined })
    this.detune = parseInt(event?.target?.value) ?? 0
    this.updateOscillator()
    // this.osc.detune = this.detune
  }

  handleVolumeChange(event) {
      console.debug("volume changed", { value: event?.target?.value ?? undefined })
      this.volume = parseInt(event?.target?.value) ?? -16
      this.updateOscillator()
      // this.osc.volume = this.volume
    }

  handleOscillatorTypeChange(event) {
    console.debug("oscillator type changed", { value: event?.target?.value ?? undefined,  oscillatorType: this.oscillatorType })
    this.oscillatorType = event?.target?.value ?? "sine" // todo: set default
    this.updateOscillator()
    // this.osc.type = this.type
  }

  handlePlayButtonClick(event) {
    console.debug("clicked play button")

    AudioService.togglePlayback((isPlaying) => {
      this.isPlaying = !!isPlaying
      this.isPlaying === true ? this.osc.start() : this.osc.stop()
    })

  }

  render() {
    return html`
      <div
        class="audio-oscillator-overlay ${this.showOverlay ? 'visible' : ''}"
        @click="${this.handleOverlayClick}"
      >
        Click to play
      </div>

      <div class="audio-oscillator">

        <!-- Oscilator visualizer canvas -->
        <div class="audio-oscillator__canvas-container">
          <canvas
            class="audio-oscillator__canvas"
            width="640"
            height="240"
          ></canvas>
        </div>

        <!-- todo: oscillator volume input -->
        <div>
          <label for="volume">
            Volume:
            <input
              id="volume"
              type="range"
              min="-30"
              max="1"
              step="1"
              .value="${this.volume}"
              @input=${this.handleVolumeChange}
            />
          </label>
        </div>



        <!-- todo: oscillator frequency input -->
        <div>
          <label for="frequency">
            Frequency:
            <input
              id="frequency"
              type="range"
              min="0"
              max="1000"
              step="1"
              value="440"
              @input=${this.handleFrequencyChange}
            />
          </label>
        </div>

        <!-- todo: oscillator detune input -->
        <div>
          <label for="detune">
            Detune:
            <input
              id="detune"
              type="range"
              min="-100"
              max="100"
              step="5"
              value="0"
              @input=${this.handleDetuneChange}
            />
          </label>
        </div>

        <!-- todo: oscillatorType type radio buttons -->
        <!-- todo: use enums -->
        <fieldset>
          <legend>Oscillator Type</legend>

          ${oscillatorTypes.map((oscillatorType, typeKey) => (
            html`
              <label .id="${oscillatorType}">
                <input
                  type="radio"
                  name="oscillator-type"
                  .key="${typeKey}"
                  .id="${oscillatorType}"
                  .value="${oscillatorType}"
                  .checked="${this.oscillatorType === oscillatorType}"
                  @click=${this.handleOscillatorTypeChange}
                />
                ${oscillatorType}
              </label>
            `
          ))}
        </fieldset>

        <!-- todo: oscillator play/pause button -->
        <div>
          <button @click=${this.handlePlayButtonClick}>
            ${this.isPlaying ? 'Pause' : 'Play'}
          </button>
        </div>

      </div>
    `
  }
}

customElements.define('audio-oscillator', AudioOscillator)
