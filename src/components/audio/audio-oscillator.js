import { LitElement, html, css } from 'lit'

// temp
const oscillatorTypes = ['sine', 'square', 'sawtooth', 'triangle']

export class AudioOscillator extends LitElement {


  static styles = css`
    /* todo: could an overlay be added here instead? */
    /* .audio-oscillator__canvas-container::after {} */

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
      cursor: pointer
    }

  `

  // todo: I'm fairly certain these are only required for
  //       [reactive](https://lit.dev/docs/components/properties/) properties.
  // todo: add these attributes. Ideally they would be in the AudioService, but leave them here for now
  static properties = {
    frequency: { type: Number },
    oscillator: { type: String },
    detune: { type: Number },
    isPlaying: { type: Boolean },
    showOverlay: { type: Boolean } // todo: figure out how to make this reactive and internal
  }

  constructor() {
    super()
    this.frequency = 0 // todo
    this.detune = 0 // todo
    this.isPlaying = false
    this.showOverlay = true
    this.oscillator = "sine"
    this.ctx = new (window.AudioContext || window.webkitAudioContext)() // todo: use _ctx?
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


  }

  // todo: I don't know how this works, but it may be required for the canvas.
  setRequestAnimFrame() {
    // window.requestAnimFrame = (function(){
    // return  window.requestAnimationFrame       ||
    //   window.webkitRequestAnimationFrame ||
    //   window.mozRequestAnimationFrame    ||
    //   window.oRequestAnimationFrame      ||
    //   window.msRequestAnimationFrame     ||
    //   function( callback ){
    //   window.setTimeout(callback, 1000 / 60);
    // };
    // })();
  }

  // todo: refactor
  playSound(buffer, time) {
    //source.buffer = buffer;
    //source.connect(context.destination);
    //source[source.start ? 'start' : 'noteOn'](time);
  }

  // todo: refactor
  loadSounds(obj, soundMap, callback) {
    // Array-ify
    // var names = [];
    // var paths = [];
    // for (var name in soundMap) {
    //   var path = soundMap[name];
    //   names.push(name);
    //   paths.push(path);
    // }
    // bufferLoader = new BufferLoader(context, paths, function(bufferList) {
    //   for (var i = 0; i < bufferList.length; i++) {
    //     var buffer = bufferList[i];
    //     var name = names[i];
    //     obj[name] = buffer;
    //   }
    //   if (callback) {
    //     callback();
    //   }
    // });
    // bufferLoader.load();
  }


  handleFrequencyChange(event) {
    console.debug("frequency changed", { value: event?.target?.value ?? undefined })
    this.frequency = parseInt(event?.target?.value) ?? 0
  }

  handleDetuneChange(event) {
    console.debug("detune changed", { value: event?.target?.value ?? undefined })
    this.detune = parseInt(event?.target?.value) ?? 0
  }

  handleOscillatorTypeChange(event) {
    console.debug("oscillator type changed", { value: event?.target?.value ?? undefined,  oscillator: this.oscillator })
    this.oscillator = event?.target?.value ?? null
  }

  handlePlayButtonClick(event) {
    console.debug("clicked play button")
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

        <!-- todo: oscillator type radio buttons -->
        <!-- clean this up. add label elements?  -->
        <!-- <div>
          <input type="radio" name="ir" value="0" class="effect" checked="" onclick="sample.changeType('sine')">Sine
          <input type="radio" name="ir" value="1" class="effect" onclick="sample.changeType('square')">Square
          <input type="radio" name="ir" value="2" class="effect" onclick="sample.changeType('sawtooth')">Sawtooth
          <input type="radio" name="ir" value="3" class="effect" onclick="sample.changeType('triangle')">Triangle
        </div> -->

        <!-- todo: oscillator type radio buttons -->
        <!-- todo: loop over an options array instead of hard-coding -->
        <fieldset>
          <legend>Oscillator</legend>

          ${oscillatorTypes.map((oscillatorType, typeKey) => (
            html`
              <label .id="${oscillatorType}">
                <input
                  type="radio"
                  name="oscillator-type"
                  .key="${typeKey}"
                  .id="${oscillatorType}"
                  .value="${oscillatorType}"
                  .checked="${this.oscillator === oscillatorType}"
                  @click=${this.handleOscillatorTypeChange}
                />
                ${oscillatorType}
              </label>
            `
          ))}


        </fieldset>

        <!-- todo: oscillator play/pause button -->
        <div>
          <button @click=${this.handlePlayButtonClick}>Play/pause</button>
        </div>

      </div>
    `
  }
}

customElements.define('audio-oscillator', AudioOscillator)

/* -------------------------------------------------------------------------- */


const sampleCode = () => {

  function OscillatorSample() {

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
  // context = new (window.AudioContext || window.webkitAudioContext)();

  // if (context.state === 'suspended') {
  //   const overlay = document.getElementById('overlay');
  //   overlay.className = 'visible';
  //   document.addEventListener('click', () => {
  //     context.resume().then(() => {
  //       overlay.className = 'hidden';
  //     });
  //   }, {once: true});
  // }

  // // what the heck is this? backward compatibility?
  // if (!context.createGain)
  //   context.createGain = context.createGainNode;
  // if (!context.createDelay)
  //   context.createDelay = context.createDelayNode;
  // if (!context.createScriptProcessor)
  //   context.createScriptProcessor = context.createJavaScriptNode;

  // todo: is this needed?
  // // shim layer with setTimeout fallback
  // window.requestAnimFrame = (function(){
  // return  window.requestAnimationFrame       ||
  //   window.webkitRequestAnimationFrame ||
  //   window.mozRequestAnimationFrame    ||
  //   window.oRequestAnimationFrame      ||
  //   window.msRequestAnimationFrame     ||
  //   function( callback ){
  //   window.setTimeout(callback, 1000 / 60);
  // };
  // })();


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
