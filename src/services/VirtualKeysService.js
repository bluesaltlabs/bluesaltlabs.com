
class VirtualKeysService {

  constructor() {
    console.debug("calling the VirtualKeysService constructor")

    if (!VirtualKeysService.instance) {
      // todo: go over these:

      // public parameter
      this.label = 'mui-vkey' // todo: change
      this.octave = 0
      this.captureKeyboard = true

      // internal parameter
      this._octaveOffset = 24
      this._octaveStr = '0'
      this._numKeys = 61 // 61keys, 5 octaves

      // key rendering parameters
      this._svgWidth = 787
      this._offset = 80
      this._keyUpperY = 6
      this._keyLowerY = 52
      this._keyWidth = 18
      this._keyHeight = 42
      this._keyPaddingX = 1
      this._keyRadius = 1.5

      // primary svg DOM object
      this._svg = null
      // internal key data strcuture
      this._keys = []
      // previous pitch (for mouse)
      this._prevPitch = null

      // keyCodeMap: zsxdcvgbhnjm q2w3er5t6y7u i
      this._keyCodes = [
        90, 83, 88, 68, 67, 86, 71, 66, 72, 78, 74, 77,
        81, 50, 87, 51, 69, 82, 53, 84, 54, 89, 55, 85, 73
      ]

      // target plug-ins
      this._targets = []

      //

      VirtualKeysService.instance = this
    }

    return VirtualKeysService.instance
  }

  //

  /**
   * Internal methods
   */

  // helper: 2d area detection
  _checkKeyArea(data) {
    if (data) {
      for (var i = 0; i < this._keys.length; i++) {
        var key = this._keys[i];
        // check y first
        if (key.y1 <= data.y && data.y <= key.y2) {
          // then check x
          if (key.x1 <= data.x && data.x <= key.x2) {
            return i;
          }
        }
      }
    }
    return null;
  }

  // helper: check p/mod wheel area
  _checkWheelArea(data) {
    if (data) {
      // check pwheel
      if (6 <= data.x && data.x <= 38) {
        if (6 <= data.y && data.y <= 94) {
          console.log('pwheel touched', (data.y - 6) / 88);
        }
      }
      // check modwheel
      if (44 <= data.x && data.x <= 76) {
        if (6 <= data.y && data.y <= 94) {
          console.log('modwheel touched', (data.y - 6) / 88);
        }
      }
    }
  }

  // helper: key render methods
  _renderKey(key) {
    var rect = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
    rect.setAttribute('x', key.x1);
    rect.setAttribute('y', key.y1);
    rect.setAttribute('rx', this._keyRadius);
    rect.setAttribute('ry', this._keyRadius);
    rect.setAttribute('width', this._keyWidth);
    rect.setAttribute('height', this._keyHeight);
    rect.setAttribute('class', key.white ? 'c-white-key' : 'c-black-key');
    this._svg.appendChild(rect);
    return rect;
  }

  // building keyboard
  _buildKeys() {
    var i = 0, count = 0;
    while (count < this._numKeys) {
      var pclass = i % 14;
      i++;
      if (pclass === 5 || pclass === 13) continue;
      var white = (pclass % 2 === 0),
          x1 = this._offset + i * ((this._keyWidth + this._keyPaddingX) / 2),
          y1 = white ? this._keyLowerY : this._keyUpperY,
          x2 = x1 + this._keyWidth,
          y2 = y1 + this._keyHeight;
      var key = {
        white: white, state: false,
        x1: x1, y1: y1, x2: x2, y2: y2
      };
      key.rect = this._renderKey(key);
      this._keys[count] = key;
      count++;
    }
  }

  // highlight key
  // TO FIX: this needs to be optimized (just change color, not style)
  _highlight(pitch, highlight) {
    var key = this._keys[pitch];
    if (key) {
      if (highlight) {
        key.rect.setAttribute('class', key.rect.getAttribute('class') + ' active');
      } else {
        key.rect.setAttribute('class', key.rect.getAttribute('class').slice(0, 11));
      }
    }
    // if (pitch !== null) {
    //   var key = this._keys[pitch];
    //   if (key) {
    //     key.rect.setAttribute('class', key.rect.getAttribute('class') + ' active');
    //   }
    // }
    // if (this._prevPitch !== null) {
    //   key = this._keys[this._prevPitch];
    //   if (key) {
    //     key.rect.setAttribute('class', key.rect.getAttribute('class').slice(0, 11));
    //   }
    // }
  }

  _displayMessage (msg) {
    this.$.eMsgPanel.textContent = msg;
  }

  // action: { on, off, pitchwheel, modwheel }
  // data: on[pitch, velo] off[pitch,velo] pitchwheel[value], modwheel[value]
  _dispatch(sender, action, data) {
    // dispatch 'action' and 'data' to all connected destination
    for (var i = 0; i < this._targets.length; i++) {
      var plugin = this._targets[i].onData(action, data);
    }
  }


  /**
   * dispatch helpers
   */

  _keyOn(pitch, velocity) {
    if (pitch !== null) {
      var xpitch = pitch + this._octaveOffset + this.octave * 12;
      this._dispatch(this.label, 'noteon', {
        pitch: xpitch,
        velocity: velocity,
        time: WX.now
      });
      this._displayMessage('NOTE ON ' + xpitch);
      this._highlight(pitch, true);
    }
  }

  _keyOff(pitch) {
    var xpitch = pitch + this._octaveOffset + this.octave * 12;
    this._dispatch(this.label, 'noteoff', {
      pitch: xpitch,
      velocity: 0,
      time: WX.now
    });
    this._displayMessage('NOTE OFF');
    this._highlight(pitch, false);
  }

  _setPitchWheel(value) {
    this._dispatch(this.label, 'pitchwheel', { value: value });
    this._displayMessage('PWHEEL ' + value.toFixed(2));
    this.$.ePitWhlPos.setAttribute('y', 7 + (84 - value * 84));
  }

  _setModWheel(value) {
    this._dispatch(this.label, 'modwheel', { value: value });
    this._displayMessage('MWHEEL ' + value.toFixed(2));
    this.$.eModWhlPos.setAttribute('y', 7 + (84 - value * 84));
  }

  /**
   * Key Event Hanlders
   */

  _listenKeyDown(event) {
    if (!this.captureKeyboard) return;
    var pitch = this._keyCodes.indexOf(event.keyCode);
    if (pitch > -1) {
      if (this._keys[pitch].state) return;
      this._keys[pitch].state = true;
      this._keyOn(pitch + this._octaveOffset + this.octave * 12, 100);
    }
  }

  _listenKeyUp(event) {
    if (!this.captureKeyboard) return;
    var pitch = this._keyCodes.indexOf(event.keyCode);
    if (pitch > -1) {
      if (this._keys[pitch].state) {
        this._keys[pitch].state = false;
        this._keyOff(pitch + this._octaveOffset + this.octave * 12);
      }
    }
  }

  // return action, data1, data2
  // TO FIX: redesign interaction...
  _mouseCallback(sender, action, data) {
    if (data) {
      if (6 <= data.y && data.y <= 94) {
        switch (action) {
          case 'clicked':
            if (6 <= data.x && data.x <= 38) { // check pwheel
              this._setPitchWheel(1.0 - (data.y - 6) / 88);
            } else if (44 <= data.x && data.x <= 76) { // check modwheel
              this._setModWheel(1.0 - (data.y - 6) / 88);
            } else if (this._offset <= data.x && data.x <= this._svgWidth) { // check keys
              for (var i = 0; i < this._keys.length; i++) {
                var key = this._keys[i];
                // check y first
                if (key.y1 <= data.y && data.y <= key.y2) {
                  // then check x
                  if (key.x1 <= data.x && data.x <= key.x2) {
                    this._keyOn(i, 100);
                    this._prevPitch = i;
                  }
                }
              }
            }
            break;

          case 'dragged':
            if (6 <= data.x && data.x <= 38) { // check pwheel
              this._setPitchWheel(1.0 - (data.y - 6) / 88);
            } else if (44 <= data.x && data.x <= 76) { // check modwheel
              this._setModWheel(1.0 - (data.y - 6) / 88);
            } else if (this._offset <= data.x && data.x <= this._svgWidth) { // check keys
              var validKeyFound = false;
              for (var i = 0; i < this._keys.length; i++) {
                var key = this._keys[i];
                // check y first
                if (key.y1 <= data.y && data.y <= key.y2) {
                  // then check x
                  if (key.x1 <= data.x && data.x <= key.x2) {
                    // check for transition and then trigger
                    if (this._prevPitch !== i) {
                      this._keyOff(this._prevPitch);
                      this._keyOn(i, 100);
                      this._prevPitch = i;
                    }
                    // found a key. break the loop.
                    validKeyFound = true;
                    break;
                  }
                }
              }
              // pointer is at invalid area. release previous pitch.
              if (!validKeyFound) {
                if (this._prevPitch) {
                  this._keyOff(this._prevPitch);
                  this._prevPitch = null;
                }
              }
            }
            break;

          case 'released':
            if (this._offset <= data.x && data.x <= this._svgWidth) { // check keys
              for (var i = 0; i < this._keys.length; i++) {
                var key = this._keys[i];
                // check y first
                if (key.y1 <= data.y && data.y <= key.y2) {
                  // then check x
                  if (key.x1 <= data.x && data.x <= key.x2) {
                    this._keyOff(i);
                    this._prevPitch = null;
                  }
                }
              }
            }
            break;
        }
      } else {
        // invalid area, release previous pitch
        if (this._prevPitch) {
          this._keyOff(this._prevPitch);
          this._prevPitch = null;
        }
      }
    }
  }

}

const instance = new VirtualKeysService()
// Object.freeze(instance)

export default instance
