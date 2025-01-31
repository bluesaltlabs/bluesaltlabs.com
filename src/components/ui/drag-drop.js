import { LitElement, html, css } from 'lit'

// https://github.com/SortableJS/Sortable
//import Sortable from 'sortablejs'

// https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API#examples
// https://www.horuskol.net/blog/2020-08-15/drag-and-drop-elements-on-touch-devices
// https://stackoverflow.com/a/55996629/5121100
//
//


class DragDropApp extends LitElement {

  //createRenderRoot() { return this }

  static styles = css`

    .drag-drop__wrapper {
      display: flex;
      flex-wrap: wrap;
    }

    .drag-drop__container,
    ::slotted(.drag-drop__container) {
      /* width:300px; */
      /* height: 300px; */
      outline: 1px solid blue;
      background-color: #ff441180;

      padding: 1em;
      height: 10em;
      width: 50%;
    }

    .drag-drop__item,
    ::slotted(.drag-drop__item) {
      padding: 10px;
      margin: 5px 0;
      border:1px solid #ffff00;
      background-color: #cc0011;
      cursor: move;
      height: 100%;
      width: 100%;
    }


    /*
    .sortable-ghost,
    ::slotted(.sortable-ghost) {
      opacity: 0.4;
      background-color: #00ff00;
    }

    .sortable-drag,
    ::slotted(.sortable-drag) {
      background-color: #0000ff;
    }
    */
  `


  static properties = {
    moving: { type: Boolean }
  }

  constructor() {
    super()


    //this.addEventListener('click', (e) => console.debug("constructor event", { type: e.type, localName: e.target.localName }))

  }



  //firstUpdated() {
    //const container = this.shadowRoot.querySelector('.drag-drop__container');
    //const container = this.querySelector('.drag-drop__container');

   // console.debug("first updated", { container: container })
   //}

  _pickup(event) {
    this._logDebugEvent(event)
    this.moving = true


    console.debug("before", {
      height: event.target.style.height,
      width: event.target.style.width,
      position: event.target.style.position,
    })

    event.target.style.height = event.target.clientHeight
    event.target.style.width = event.target.clientWidth
    event.target.style.position = 'fixed'


    console.debug("after", {
      height: event.target.style.height,
      width: event.target.style.width,
      position: event.target.style.position,
    })
  }

  _dragOver(event) {
    event.preventDefault()
  }

  _move(event) {
    //this._logDebugEvent(event) // todo: throttle this or something D:
    // note: I intentionally did not abstract things into variables here for the sake of efficiency.
    //       I don't know if that matters or not in JS? that would be an interesting performance test.

    // track movement
    if (this.moving) {
      if(event.clientX) {
        // mousemove
        console.debug({ x: event.clientX, y: event.clientY })
        event.target.style.left = event.clientX - event.target.clientWidth/2;
        event.target.style.top = event.clientY - event.target.clientHeight/2;
      } else {
        // touchmove - assuming a single touchpoint
        console.debug({ x: event.event.changedTouches[0].clientX, y: event.event.changedTouches[0].clientY })
        event.target.style.left = event.changedTouches[0].clientX - event.target.clientWidth/2;
        event.target.style.top = event.changedTouches[0].clientY - event.target.clientHeight/2;
      }
    }
  }

  _drop(event) {
    this._logDebugEvent(event)
    this.moving = false
  }

  _logDebugEvent(event) {
    console.debug("|------------- DEBUG -------------|",
    { type: event.type, localName: event?.target?.localName })
    console.debug("|---------------------------------|")
  }


  // todo: add a drag handle, or make it so dragging in certain places prevents drag.

  render() {
    return html`
      <div class="drag-drop__wrapper">

        <div class="drag-drop__container container-left">
          <div
            class="drag-drop__item"
            @mousedown="${this._pickup}"
            @touchstart="${this._pickup}"
            @mousemove="${this._move}"
            @touchmove="${this._move}"
            @dragover="${this._dragOver}"
            @mouseup="${this._drop}"
            @touchend="${this._drop}"
          >
            Hi there
          </div>
          <!-- <div class="drag-drop__item">item 2</div> -->
        </div>

        <div class="drag-drop__container container-right"></div>


          <!-- <slot></slot> -->
      </div>
    `
  }
}



customElements.define('drag-drop-app', DragDropApp)
