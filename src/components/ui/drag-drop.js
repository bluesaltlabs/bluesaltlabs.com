import { LitElement, html, css } from 'lit'

// https://github.com/SortableJS/Sortable
//import Sortable from 'sortablejs'

// todo: look into this: https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API
// todo: also look at this: https://www.horuskol.net/blog/2020-08-15/drag-and-drop-elements-on-touch-devices
//
//


class DragDropApp extends LitElement {

  //createRenderRoot() { return this }

  static styles = css`

    .drag-drop__wrapper {
      display: flex;
      flex-wrap: wrap;
    }

    .drag-drop__container {
      width:300px;

      border:1px solid #fff;
      background-color:#ff4411;
      padding: 10px;
    }

    .drag-drop__item,
    ::slotted(.drag-drop__item) {
      padding: 10px;
      margin: 5px 0;
      border:1px solid #ffff00;
      background-color: #cc0011;
      cursor: move;
    }


    .sortable-ghost,
    ::slotted(.sortable-ghost) {
      opacity: 0.4;
      background-color: #00ff00;
    }

    .sortable-drag,
    ::slotted(.sortable-drag) {
      background-color: #0000ff;
    }
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
    this.moving = true
  }

  _handleTestEvent(event) {
    console.debug("handling test event", { type: event.type, localName: event.target.localName })
  }

  render() {
    return html`
      <div class="drag-drop__wrapper">

        <div class="drag-drop__container container-left">

          <div class="drag-drop__left">
            <div
              @mousedown="${this._handleTestEvent}"
              @touchstart="${this._handleTestEvent}"
              class="drag-drop__item"
            >
              item 1
            </div>
            <!-- <div class="drag-drop__item">item 2</div> -->
          </div>
        </div>

        <div class="drag-drop__container container-right">
          <div class="drag-drop__right">
            <!-- <div class="drag-drop__item">item 3</div> -->
          </div>
        </div>


          <!-- <slot></slot> -->
      </div>
    `
  }
}



customElements.define('drag-drop-app', DragDropApp)
