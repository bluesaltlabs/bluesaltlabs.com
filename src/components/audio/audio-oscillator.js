import { LitElement, html, css } from 'lit';
import AudioService from '@/services/AudioService'

export class AudioOscillator extends LitElement {


  static properties = {
    frequency: { type: Number },
    detune: { type: Number },
    // foo: { type: String },
  }

  constructor() {
    super()
  }


  // todo: create a demo component on this page that is just a play/pause button that initiates
  // the AudioService and plays a random, hard-coded, sequence song.
  // I may need to make notes on some music theory stuff in here somewhere for assistance.

  render() {
    return html`
      <div class="audio-oscillator">
        <!-- todo: add components -->
        <p>todo: create the Audio Oscillator</p>

        <!-- Oscilator visualizer canvas -->
        <div>
          <canvas style="background: white;" width="640" height="240"></canvas>
        </div>



      <!-- todo: oscillator frequency input -->
        <div>
          Frequency: <input id="frequency" type="range" min="0" max="1000" step="1" value="440" oninput="sample.changeFrequency(this.value);">
        </div>

        <!-- todo: oscillator detune input -->
        <div>
          Detune: <input id="detune" type="range" min="-100" max="100" step="5" value="0" oninput="sample.changeDetune(this.value);">
        </div>


        <!-- todo: oscillator type radio buttons -->

        <div>
          <input type="radio" name="ir" value="0" class="effect" checked="" onclick="sample.changeType('sine')">Sine
          <input type="radio" name="ir" value="1" class="effect" onclick="sample.changeType('square')">Square
          <input type="radio" name="ir" value="2" class="effect" onclick="sample.changeType('sawtooth')">Sawtooth
          <input type="radio" name="ir" value="3" class="effect" onclick="sample.changeType('triangle')">Triangle
        </div>

        <!-- todo: oscillator play/pause button -->
        <div><button onclick="sample.toggle()">Play/pause</button></div>

      </div>
    `
  }
}

customElements.define('audio-oscillator', AudioOscillator);

/* -------------------------------------------------------------------------- */




/*
 * Copyright 2013 Boris Smus. All Rights Reserved.

 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/*
/*
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



*/
