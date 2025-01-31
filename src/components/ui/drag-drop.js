import { LitElement, html, css } from 'lit'

// https://github.com/SortableJS/Sortable
//import Sortable from 'sortablejs'

// https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API#examples
// https://www.horuskol.net/blog/2020-08-15/drag-and-drop-elements-on-touch-devices
// https://stackoverflow.com/a/55996629/5121100
// // https://stackoverflow.com/questions/55986356/how-to-make-a-div-draggable-inside-a-shadow-dom
// https://github.com/bevacqua/dragula
//



//  todo: in theory I could just access the slotted children directly and loop through them:
//        see https://lit.dev/docs/components/shadow-dom/#accessing-slotted-children

// temp:
const vehicles = [
  {
    id: 0,
    name: "fire truck",
    src: "https://cdn.glitch.com/20f985bd-431d-4807-857b-e966e015c91b%2Ftruck-clip-art-fire-truck4.png?1519011787956",
  },
  {
    id: 1,
    name: "ambulance",
    src: "https://cdn.glitch.com/20f985bd-431d-4807-857b-e966e015c91b%2Fambulance5.png?1519011787610",
  },
  {
    id: 2,
    name: "car",
    src: "https://cdn.glitch.com/20f985bd-431d-4807-857b-e966e015c91b%2Fcar-20clip-20art-1311497037_Vector_Clipart.png?1519011788408",
  },
  {
    id: 3,
    name: "bicycle",
    src: "https://cdn.glitch.com/20f985bd-431d-4807-857b-e966e015c91b%2Fbicycle-20clip-20art-bicycle3.png?1519011787816",
  }
]

class DragDropApp extends LitElement {


  // todo: binds for external? find documentation on this
  //static _debugEvent = (event) => {}

  /* todo: figure out why some of these files aren't getting applied as expected. is this fixed now?  */
  static styles = css`
    :host {
      height: 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
    .drop-zone {
      position: relative;
      width: 300px;
      height: 300px;
      overflow: hidden;
      background: #878787;
      color: white;
      box-shadow:
        0 19px 38px rgba(0, 0, 0, 0.3),
        0 15px 12px rgba(0, 0, 0, 0.22);
    }
    .drop-zone {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .vehicles ul {
      cursor: pointer;
    }

    .vehicles img {
      visibility: visible;
      opacity: 1;
    }
    .vehicles img.hide {
      visibility: hidden;
      opacity: 0;
    }

    /* media queries */
    @media screen and (max-width: 48em) {
      :host {
        flex-direction: column;
      }
    }
  `

  static properties = {
    vehicles: { type: NodeList },
    moving: { type: Boolean }
  }

  constructor() {
    super()

    console.debug(document.styleSheets)
    //this.vehicles = document.shadowRoot.querySelector(".vehicles")
    //console.debug(this.vehicles)

    //this.addEventListener('click', (e) => console.debug("constructor event", { type: e.type, localName: e.target.localName }))

  }


  _logDebugEvent(event) {
    console.debug("|------------- DEBUG -------------|",
    { type: event.type, localName: event?.target?.localName })
    console.debug("|---------------------------------|")
  }





/*

dropZone.addEventListener("drop", onDrop);
dropZone.addEventListener("dragenter", onDragEnter);
dropZone.addEventListener("dragleave", onDragLeave);
dropZone.addEventListener("dragover", onDragOver);
*/


  // debug
  connectedCallback() {
    super.connectedCallback()
    console.debug("Custom element added to page.");
  }

  // debug
  disconnectedCallback() {
    super.disconnectedCallback()
    console.debug("Custom element removed from page.");
  }

  render() {
    return html`

      <section
        class="drop-zone"

      ></section>

      <section class="drag-vehicle">
        <ul class="vehicles">
          ${vehicles.map(v => (html`
            <li style="list-style-type:none;">
              <!-- draggable objects must have draggable attribute -->
              <img
                style="cursor:pointer;"
                draggable="true"
                alt="${v.name}"
                src="${v.src}"
                drag
              />
            </li>
          `))}
        </ul>
      </section>

    `
  }
}

customElements.define('drag-drop-app', DragDropApp)



// -------------------------------------------------------------------------- //

const OldCode = () => {
  const parkingSimulation = (function () {

    const parkingSimulation = {
      dropZone: document.querySelector(".drop-zone"),
      vehicleArray: [...document.querySelectorAll(".vehicles img")],
      dragged: null,
      areVehiclesFiltered: false,
    };
    return Object.seal(parkingSimulation);
  })();

  function addEventListeners() {
    const filterButton = document.querySelector(
      ".drag-vehicle .filter-vehicles",
    );
    const showButton = document.querySelector(".drag-vehicle .show-all");
    const vehicles = document.querySelector(".vehicles");
    const dropZone = parkingSimulation.dropZone;

    vehicles.addEventListener("dragstart", onDragStart);
    vehicles.addEventListener("dragend", onDragEnd);
    dropZone.addEventListener("drop", onDrop);
    dropZone.addEventListener("dragenter", onDragEnter);
    dropZone.addEventListener("dragleave", onDragLeave);
    dropZone.addEventListener("dragover", onDragOver);
  }

  function onDragStart(event) {
    let target = event.target;
    if (target && target.nodeName == "IMG") {
      // Store a ref. on the dragged elem
      const imgSrc = target.src;
      parkingSimulation.dragged = target;
      event.dropEffect = "linkMove";
      event.dataTransfer.setData("text/uri-list", imgSrc);
      event.dataTransfer.setData("text/plain", imgSrc);

      // Make it half transparent
      event.target.style.opacity = 0.5;
    }
  }

  function onDragEnd(event) {
    if (event.target && event.target.nodeName == "IMG") {
      // Reset the transparency
      event.target.style.opacity = "";
    }
  }

  function contains(list, value) {
    for (let i = 0; i < list.length; ++i) {
      if (list[i] === value) return true;
    }
    return false;
  }

  function onDragOver(event) {
    // Prevent default to allow drop
    event.preventDefault();
  }

  function validateTarget(target) {
    const dropZone = parkingSimulation.dropZone;
    return target.parentNode === dropZone || target === dropZone
      ? dropZone
      : null;
  }

  function onDragLeave(event) {
    const target = validateTarget(event.target);
    target.style.background = "";
  }

  function onDragEnter(event) {
    const target = validateTarget(event.target);
    const dragged = parkingSimulation.dragged;
    if (dragged && target) {
      const isLink = contains(event.dataTransfer.types, "text/uri-list");
      const vehicleType = dragged.alt;
      if (isLink) {
        event.preventDefault();
        // Set the dropEffect to move
        event.dataTransfer.dropEffect = "linkMove";
        target.style.background = "#1f904e";
      } else {
        target.style.backgroundColor = "#d51c00";
      }
    }
  }

  function onDrop(event) {
    const target = validateTarget(event.target);
    const dragged = parkingSimulation.dragged;
    if (dragged && target) {
      const isLink = contains(event.dataTransfer.types, "text/uri-list");
      const vehicleType = dragged.alt;
      target.style.backgroundColor = "";
      if (isLink) {
        event.preventDefault();
        // Get the id of the target and add the moved element to the target's DOM
        dragged.parentNode.removeChild(dragged);
        dragged.style.opacity = "";
        target.appendChild(dragged);
      }
    }
  }



  //addEventListeners();
}
