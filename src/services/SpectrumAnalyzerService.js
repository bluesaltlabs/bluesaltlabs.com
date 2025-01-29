
class SpectrumAnalyzerService {


  constructor() {
    // super()
    console.debug("calling the SpectrumAnalyzerService constructor")

    if (!SpectrumAnalyzerService.instance) {
      this._ctx = null
      this._inlet = null
      this._buffer = null
      this._freeze = false
      this._keys = []
      this._settings = { // todo: should these be initialized in properties too?
        octave: 10,
        freqBands: [30, 65, 125, 250, 500, 1000, 2000, 4000, 8000, 16000],
        nyquist: null,
        logBase: 2.0,
        binCount: null,
        binSize: null,
        logMax: null,
        baseX: null,
        unitX: null,
        scaleY: null,
        smoothing: 0.5,
        maxdB: 0.0,
        mindB: -60.0,
        scale: 'log',
        grid: true,
        gridColor: '#90a4ae',
        spectrumColor: '#03a9f4',
      }

      SpectrumAnalyzerService.instance = this
    }

    return SpectrumAnalyzerService.instance
  }


  // todo: refactor this function
  _initializeAnalyzer() {
      this._inlet = WX.Analyzer();
      var bc = this._inlet.frequencyBinCount;
      this._buffer = new Float32Array(bc);
      this._settings.nyquist = WX.srate * 0.5;
      this._settings.binCount = bc;
      this._settings.binSize = WX.srate / bc;
      this._settings.logMax = Math.log((bc - 1) / 1.0, 2.0);
      this._settings.baseX = 0.0;
      this._settings.unitX = 0.0;
      this._settings.scaleY = 0.0;
    }

    // todo: refactor this function
    _resize() {
      this._ctx.canvas.style.width = '100%';
      this._ctx.canvas.width = this.clientWidth;
      this._ctx.canvas.height = this.clientHeight;
      this._settings.baseX = this._ctx.canvas.width / 4.0;
      this._settings.unitX = this._ctx.canvas.width / this._buffer.length;
      this._settings.scaleY = this._ctx.canvas.height;
    }

    // todo: refactor this function
    _clearCanvas() {
      this._ctx.fillStyle = '#222';
      this._ctx.fillRect(0, 0, this.clientWidth, this.clientHeight);
    }

    _drawForeground() {
      // todo?
    }

    // todo: refactor this function
    _drawBackground() {
      var c = this._ctx,
          s = this._settings,
          numGrid = s.mindB / -6.0;
      c.lineWidth = 0.4;
      c.strokeStyle = this._settings.gridColor;
      c.fillStyle = this._settings.gridColor;
      c.beginPath();
      // freq grid
      for (var oct = 0; oct < s.octave; oct++) {
        var x = oct * c.canvas.width / s.octave;
        var f = s.nyquist * Math.pow(2.0, oct - s.octave);
        c.moveTo(x, 0.0);
        c.lineTo(x, c.canvas.height);
        c.fillText(~~(f) + "Hz", x + 4, c.canvas.height - 6);
      }
      // db grid
      for (var grid = 0; grid < numGrid; grid++) {
        var y = grid * c.canvas.height / numGrid;
        var d = 0.0 + (6 * grid);
        c.moveTo(0.0, y);
        c.lineTo(c.canvas.width, y);
        c.fillText(~~(d) + "dB", c.canvas.width - 26, y - 6);
      }
      c.stroke();
    }

    // todo: refactor this function
    _drawSpectrum() {
      var c = this._ctx,
          s = this._settings;
      // clear and draw grids
      c.clearRect(0, 0, c.canvas.width, c.canvas.height);
      if (s.grid) {
        this._drawBackground();
      }
      // drawing spectrum
      c.lineWidth = 1.2;
      c.strokeStyle = s.spectrumColor;
      c.beginPath();
      this._inlet.getFloatFrequencyData(this._buffer);
      for(var i = 1; i < s.binCount; i++) {
        if (s.scale === 'lin') {
          c.moveTo(i * s.unitX, s.scaleY);
          c.lineTo(i * s.unitX, (this._buffer[i] * -0.01) * s.scaleY);
        } else {
          var x = c.canvas.width * Math.log(i / 1, s.logBase) / s.logMax;
          c.lineTo(x, (this._buffer[i] * -0.01) * s.scaleY);
        }
      }
      c.stroke();
    }

    // todo: refactor this function
    _draw() {
      // this._clearCanvas();
      //
      ////this._drawBackground();
      ////this._drawSpectrum();
      ////this._drawForeground();
    }

    // todo: refactor this function
    update() {
      if (!this._freeze) {
        this._draw();
      }
      // requestAnimationFrame(this.update.bind(this)); // todo: figure out how to replecate this
    }

    // todo: refactor this function
    _listenKeyDown(event) {
      if (this._keys[event.keyCode]) return;
      this._keys[event.keyCode] = true;
      // console.log(event.keyCode);
      switch (event.keyCode) {
        // case 46: // delete key
        //   this._deleteSelectedNotes();
      }
    }

    // todo: refactor this function
    _listenKeyUp(event) {
      if (!this._keys[event.keyCode]) return;
      this._keys[event.keyCode] = false;
    }

    // todo: refactor this function
    ready() {

      // create 2d context
      this._ctx = this.$.eOnScreenCanvas.getContext('2d');

      // initialization
      this._initializeAnalyzer();
      this._resize();

      // UI specific vars
      var prevData, uy;

      // todo: figure out how to replicate this:
      // // mouse responder
      // var mouseResponder = MUI.MouseResponder(
      //   this.label,
      //   this.$.eOnScreenCanvas,
      //   function (sender, action, data) {
      //     // TODO: needs to be refactored!
      //     switch (action) {
      //       case 'clicked':
      //         break;
      //       case 'dragged':
      //         break;
      //       case 'released':
      //         break;
      //     }
      //     prevData = data;
      //   }.bind(this)
      // );

      // keyboard responder
      // window.addEventListener('keydown', this._listenKeyDown.bind(this), false);
      // window.addEventListener('keyup', this._listenKeyUp.bind(this), false);

      // start
      this.update();
    }

}

const instance = new SpectrumAnalyzerService()
// Object.freeze(instance)

export default instance
