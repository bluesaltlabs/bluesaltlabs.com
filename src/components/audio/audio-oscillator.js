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

  // todo: I'm fairly certain these are only required for
  //       [reactive](https://lit.dev/docs/components/properties/) properties.
  // todo: add these attributes. Ideally they would be in the AudioService, but leave them here for now
  static properties = {
    frequency: { type: Number },
    oscillatorType: { type: String },
    detune: { type: Number },
    volume: { type: Number },
    isPlaying: { type: Boolean },
    showOverlay: { type: Boolean } // todo: figure out how to make this reactive and internal
  }

  constructor() {
    super()
    this.frequency = 150
    this.oscillatorType = "sine"
    this.detune = 0
    this.volume = -16
    this.isPlaying = false
    this.showOverlay = false

    this.ctx = new (window.AudioContext || window.webkitAudioContext)() // todo: use _ctx?
    this.osc = null
    this.analyser = null
    this.analyser = this.ctx.createAnalyser() // todo: use _analyser?


    // todo: make this more robust. new function?
    if (this.ctx.state === 'suspended') {
      this.showOverlay = true
      document.addEventListener('click', (event) => {
        try {
          this.ctx?.resume() // todo: fix this
          this.showOverlay = false
        } catch(e) {
          console.debug(e)
        }
      }, { once: true })
    }
    if(this.ctx.state === 'running') {
      this.showOverlay = false
    }


    // todo: init a new tone.js oscillator.
    this.initOscillator()
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

/* -------------------------------------------------------------------------- */

const oscillatorSample = () => {

  function OscillatorSample() {
    this.isPlaying = false;
    this.canvas = document.querySelector('canvas');
    this.WIDTH = 640;
    this.HEIGHT = 240;
  }

  OscillatorSample.prototype.play = function() {
    // Create some sweet sweet nodes.
    this.oscillator = context.createOscillator();
    this.analyser = context.createAnalyser();

    // Setup the graph.
    this.oscillator.connect(this.analyser);
    this.analyser.connect(context.destination);

    this.oscillator[this.oscillator.start ? 'start' : 'noteOn'](0);

    requestAnimFrame(this.visualize.bind(this));
  };

  OscillatorSample.prototype.stop = function() {
    this.oscillator.stop(0);
  };

  OscillatorSample.prototype.toggle = function() {
    (this.isPlaying ? this.stop() : this.play());
    this.isPlaying = !this.isPlaying;

  };

  OscillatorSample.prototype.changeFrequency = function(val) {
    this.oscillator.frequency.value = val;
  };

  OscillatorSample.prototype.changeDetune = function(val) {
    this.oscillator.detune.value = val;
  };

  OscillatorSample.prototype.changeType = function(type) {
    this.oscillator.type = type;
  };

  OscillatorSample.prototype.visualize = function() {
    this.canvas.width = this.WIDTH;
    this.canvas.height = this.HEIGHT;
    var drawContext = this.canvas.getContext('2d');

    var times = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteTimeDomainData(times);
    for (var i = 0; i < times.length; i++) {
      var value = times[i];
      var percent = value / 256;
      var height = this.HEIGHT * percent;
      var offset = this.HEIGHT - height - 1;
      var barWidth = this.WIDTH/times.length;
      drawContext.fillStyle = 'black';
      drawContext.fillRect(i * barWidth, offset, 1, 1);
    }
    requestAnimFrame(this.visualize.bind(this));
  };
}



const sharedSampleCode = () => {
  // Start off by initializing a new context.
  context = new (window.AudioContext || window.webkitAudioContext)();

  if (context.state === 'suspended') {
    const overlay = document.getElementById('overlay');
    overlay.className = 'visible';
    document.addEventListener('click', () => {
      context.resume().then(() => {
        overlay.className = 'hidden';
      });
    }, {once: true});
  }

  if (!context.createGain)
    context.createGain = context.createGainNode;
  if (!context.createDelay)
    context.createDelay = context.createDelayNode;
  if (!context.createScriptProcessor)
    context.createScriptProcessor = context.createJavaScriptNode;

  // shim layer with setTimeout fallback
  window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame    ||
    window.oRequestAnimationFrame      ||
    window.msRequestAnimationFrame     ||
    function( callback ){
    window.setTimeout(callback, 1000 / 60);
  };
  })();


  function playSound(buffer, time) {
    var source = context.createBufferSource();
    source.buffer = buffer;
    source.connect(context.destination);
    source[source.start ? 'start' : 'noteOn'](time);
  }

  function loadSounds(obj, soundMap, callback) {
    // Array-ify
    var names = [];
    var paths = [];
    for (var name in soundMap) {
      var path = soundMap[name];
      names.push(name);
      paths.push(path);
    }
    bufferLoader = new BufferLoader(context, paths, function(bufferList) {
      for (var i = 0; i < bufferList.length; i++) {
        var buffer = bufferList[i];
        var name = names[i];
        obj[name] = buffer;
      }
      if (callback) {
        callback();
      }
    });
    bufferLoader.load();
  }




  function BufferLoader(context, urlList, callback) {
    this.context = context;
    this.urlList = urlList;
    this.onload = callback;
    this.bufferList = new Array();
    this.loadCount = 0;
  }

  BufferLoader.prototype.loadBuffer = function(url, index) {
    // Load buffer asynchronously
    var request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.responseType = "arraybuffer";

    var loader = this;

    request.onload = function() {
      // Asynchronously decode the audio file data in request.response
      loader.context.decodeAudioData(
        request.response,
        function(buffer) {
          if (!buffer) {
            alert('error decoding file data: ' + url);
            return;
          }
          loader.bufferList[index] = buffer;
          if (++loader.loadCount == loader.urlList.length)
            loader.onload(loader.bufferList);
        },
        function(error) {
          console.error('decodeAudioData error', error);
        }
      );
    }

    request.onerror = function() {
      alert('BufferLoader: XHR error');
    }

    request.send();
  };

  BufferLoader.prototype.load = function() {
    for (var i = 0; i < this.urlList.length; ++i)
    this.loadBuffer(this.urlList[i], i);
  };

}
