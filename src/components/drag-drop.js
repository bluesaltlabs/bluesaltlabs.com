import { LitElement, html, css } from 'lit'

// https://github.com/SortableJS/Sortable
import Sortable from 'sortablejs'



class DragDrop extends LitElement {
  static styles = css`
    :root {

    }

    .drag-drop__container {
      width:300px;
      height:150px;
      border:1px solid #fff;
      background-color:#ff4411;
      padding: 10px;
    }

    .drag-drop__item {
      padding: 10px;
      margin: 5px 0;
      background-color: #cc0011;
      cursor: move;
    }


    .sortable-ghost {
      opacity: 0.4;
      background-color: #00ff00;
    }

    .sortable-drag {
      background-color: #0000ff;
    }

  `

  static properties = {
    sortableInstance: { type: Object },
    onDragStart: { type: Function, attribute: 'drag-start' },
    onDragEnd: { type: Function, attribute: 'drag-end' },
  }

  firstUpdated() {
    const container = this.shadowRoot.querySelector('.drag-drop__container');

    this.sortableInstance = new Sortable(container, {
      animation: 150,
      ghostClass: 'sortable-ghost',
      dragClass: 'sortable-drag',
      //setData: (event) => this.handleSortableEvent('setData', event),
      //onChoose: (event) => this.handleSortableEvent('onChoose', event),
      //onUnchoose: (event) => this.handleSortableEvent('onUnchoose', event),
      //onAdd: (event) => this.handleSortableEvent('onAdd', event),
      //onUpdate: (event) => this.handleSortableEvent('onUpdate', event),
      //onSort: (event) => this.handleSortableEvent('onSort', event),
      //onRemove: (event) => this.handleSortableEvent('onRemove', event),
      //onFilter: (event) => this.handleSortableEvent('onFilter', event),
      //onMove: (event) => this.handleSortableEvent('onMove', event),
      //onClone: (event) => this.handleSortableEvent('onClone', event),
      //onChange: (event) => this.handleSortableEvent('onChange', event),
      onStart: this.onDragStart ?? this.handleDragStart,
      onEnd: this.onDragEnd ?? this.handleDragEnd,
    })
  }

  handleSortableEvent(eventName, event) {
    console.debug(eventName ?? "handleSortableEvent", { event: event, sortable: this.sortableInstance })
  }


  handleDragStart(event) {
    console.debug("onStart", { event: event, sortable: this.sortableInstance })
  }

  handleDragEnd(event) {
    console.debug("onEnd", { event: event, sortable: this.sortableInstance })
  }


  constructor() {
    super()


    //

  }

  render() {
    return html`
      <div class="drag-drop__container" >
        <div class="drag-drop__item">
          Hello!
        </div>
        <div class="drag-drop__item">
          Hey There!
        </div>
        <div class="drag-drop__item">
          What's going on?
        </div>
      </div>
    `
  }
}

customElements.define('drag-drop', DragDrop)
