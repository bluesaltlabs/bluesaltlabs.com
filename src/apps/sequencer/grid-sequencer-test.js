import AudioService from '@/services/AudioService'

// todo: figure out why this doesn't work on mobile (although it's just a test grid so it probably doesn't matter)
const css = `
  .sequencer-grid {
    display: grid;
    place-items: center;
    justify-content: center;
    grid-template-columns: repeat(17, 1fr);
    grid-template-rows: repeat(4, 1fr);
    gap: 4px;
    padding: 4px;
    overflow-x: auto;
    border: 2px inset var(--color-blue-alt);
    border-radius: var(--border-radius, 5px);

  }
  sequencer-button,
  button {
    width: 64px;
    height: 64px;
  }
  button {
    border-radius: var(--border-radius, 5px);
    border: 2px outset var(--color-gray-400);
    color: #fff;
    background-color: var(--color-gray-100);
    transition: background-color 150ms ease-in-out,
                border-color 150ms ease-in-out;

    &:not(.disabled) {
      cursor: pointer;
      &.selected {
        border-style: inset;
        border-color: var(--color-blue);
        background-color: var(--color-blue-alt);
        &.playing {
           background-color: var(--color-blue-light);
        }
        &:hover, &.hover {
          border-color: color-mix(in srgb, var(--color-blue-light) 50%, var(--color-gray-100));
          background-color: color-mix(in srgb, var(--color-blue-light) 50%, var(--color-gray-100));
        }
      }
      &:hover, &.hover {
        transition: background-color 100ms ease-in-out,
                    border-color 100ms ease-in-out;
        border-style: groove;
        border-color: var(--color-blue-alt);
        background-color: color-mix(in srgb, var(--color-gray-500) 33%, #ffffff);
      }
      &.playing {
        border-color: var(--color-green);
      }
    }

    &.disabled {
      pointer-events: none;
      cursor: not-allowed;
      border-style: groove;
      border-color: var(--color-gray-100);
      background-color: var(--color-gray-400);
    }
  }
`;

/* GridSequencerTest */
export class GridSequencerTest extends HTMLElement {
  constructor() {
    super();
    this.init();
  }

  connectedCallback() {

    document.addEventListener('sequencer-button-clicked', (e) => {
      console.debug('Button clicked:', e.detail);
      // todo: handle sequencer button click event.
    });
  }

  init() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `<style>${css}</style>`;

    const template = document.createElement('template');
    const grid = document.createElement('div');
    grid.className = 'sequencer-grid';

    // todo: save the state of all of this somehow and send events to the console when state changes.
    for (let r = 0; r < 17; r++) {
      let rowName = document.createElement('div');
      rowName.innerText = `Row ${r}`;
      grid.appendChild(rowName);
      for (let c = 0; c < 16; c++) {
        let gb = document.createElement('sequencer-button')
        gb.id = `button-${r}-${c}`;
        gb.setAttribute('data-row', r);
        gb.setAttribute('data-col', c);
        gb.innerHTML = `test${r}${c}`;
        gb.disabled = true;
        grid.appendChild(gb);
      }
    }
    template.content.appendChild(grid);

    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

}

/* SequencerButton */
export class SequencerButton extends HTMLElement {
  static get observedAttributes() { return ["id","class", "disabled"]; }

  constructor() {
    super();
    this.selected = false;
    this.playing  = false;
    this.init();
  }

  init() {
    // todo: build the button template
    this.innerHTML = `
      <button><slot></slot></button>
    `;

    // Listen for 'toggle-selected' event
    this.addEventListener('toggle-selected', (e) => {
      const { row, col } = this.dataset;
      this.selected = !this.selected;
      this.classList.toggle('selected', this.selected);
      console.debug(`toggle-selected sequencer button ${this.id}`, { e, row, col, selected: this.selected });
    });

    // Listen for 'toggle-playing' event
    this.addEventListener('toggle-playing', (e) => {
      const { row, col } = this.dataset;
      this.playing = !this.playing;
      this.classList.toggle('playing', this.playing);
      console.debug(`toggle-playing sequencer button ${this.id}`, { e, row, col, playing: this.playing });
    });

    // Fire 'toggle' event when button is clicked
    this.addEventListener('click', (e) => {
      this.dispatchEvent(new CustomEvent('toggle-selected', { detail: { e, selected: this.selected } }));
    });
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // console.debug(`attributeChangedCallback`, { name, oldValue, newValue });
    if (name === "id") {
      this.querySelector("button").id = `${newValue}`;
    }
    if (name === "class") {
      this.querySelector("button").className = `${newValue}`;
      return;
    }
    if (name === "disabled") {
      this.querySelector("button").disabled = (newValue || newValue === "") ? "disabled" : "";
      return;
    }
  }
}

customElements.define('grid-sequencer-test', GridSequencerTest);
customElements.define('sequencer-button', SequencerButton);

export default GridSequencerTest;
