
const css = `
  .grid-sequencer-test {
  }

  .grid-container {
    display: grid;
    grid-template-columns: repeat(16, 1fr);
    grid-template-rows: repeat(4, 1fr);
    gap: 10px;
    padding: 10px;
  }

  .grid-item {
    background-color: #80808080; /* todo: change this color */
    color: #ffffff80; /* todo: change this color */
    width: 75px;
    height: 75px;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 3px;
    text-align: center;

    &.playing {
      background-color: #80808080; /* todo: change this color */
      color: #ffffff80; /* todo: change this color */

      &:hover, &.hover {
        background-color: #80808080; /* todo: change this color */
        color: #ffffff80; /* todo: change this color */
      }
    }

    &.selected {
      background-color: #80808080; /* todo: change this color */
      color: #ffffff80; /* todo: change this color */

      &:hover, &.hover {
        background-color: #80808080; /* todo: change this color */
        color: #ffffff80; /* todo: change this color */
      }
    }

    &.disabled {
      background-color: #80808080; /* todo: change this color */
      color: #ffffff80; /* todo: change this color */

      &:hover, &.hover {
        background-color: #80808080; /* todo: change this color */
        color: #ffffff80; /* todo: change this color */
      }
    }
  }
`;

const html = `
  <div class="grid-sequencer-test">
    <!-- create a grid with 4 rows and 16 columns, populate cells with buttons -->
    <div class="grid-container">
    <!-- todo: update these styles so they match what I want them to look like.  -->
      <div class="grid-item">normal</div>
      <div class="grid-item disabled">disabled</div>
      <div class="grid-item playing">playing</div>
      <div class="grid-item selected">selected</div>
      <div class="grid-item playing selected">playing, selected</div>
      <div class="grid-item selected disabled">selected, disabled</div>
      <div class="grid-item">07</div>
      <div class="grid-item">08</div>
      <div class="grid-item">09</div>
      <div class="grid-item">10</div>
      <div class="grid-item">11</div>
      <div class="grid-item">12</div>
      <div class="grid-item">13</div>
      <div class="grid-item">14</div>
      <div class="grid-item">15</div>
      <div class="grid-item">16</div>

      <div class="grid-item hover">hover, normal</div>
      <div class="grid-item hover disabled">hover, disabled</div>
      <div class="grid-item hover playing">hover, playing</div>
      <div class="grid-item hover selected">hover, selected</div>
      <div class="grid-item hover playing selected">hover, playing, selected</div>
      <div class="grid-item hover selected disabled">hover, selected, disabled</div>
      <div class="grid-item">23</div>
      <div class="grid-item">24</div>
      <div class="grid-item">25</div>
      <div class="grid-item">26</div>
      <div class="grid-item">27</div>
      <div class="grid-item">28</div>
      <div class="grid-item">29</div>
      <div class="grid-item">30</div>
      <div class="grid-item">31</div>
      <div class="grid-item">32</div>

      <div class="grid-item">33</div>
      <div class="grid-item">34</div>
      <div class="grid-item">35</div>
      <div class="grid-item">36</div>
      <div class="grid-item">37</div>
      <div class="grid-item">38</div>
      <div class="grid-item">39</div>
      <div class="grid-item">40</div>
      <div class="grid-item">41</div>
      <div class="grid-item">42</div>
      <div class="grid-item">43</div>
      <div class="grid-item">44</div>
      <div class="grid-item">45</div>
      <div class="grid-item">46</div>
      <div class="grid-item">47</div>
      <div class="grid-item">48</div>

      <div class="grid-item">49</div>
      <div class="grid-item">50</div>
      <div class="grid-item">51</div>
      <div class="grid-item">52</div>
      <div class="grid-item">53</div>
      <div class="grid-item">54</div>
      <div class="grid-item">55</div>
      <div class="grid-item">56</div>
      <div class="grid-item">57</div>
      <div class="grid-item">58</div>
      <div class="grid-item">59</div>
      <div class="grid-item">60</div>
      <div class="grid-item">61</div>
      <div class="grid-item">62</div>
      <div class="grid-item">63</div>
      <div class="grid-item">64</div>
    </div>
  </div>
`;


class GridSequencerTest extends HTMLElement {

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    // todo: init shadow dom and create child elements.

    this.init();
  }

  connectedCallback() {
    // todo: attach event listeners?
  }

  init() {
    // todo
  }

}

const template = document.createElement('template');
template.innerHTML = `<style>${css}</style>${html}`;

customElements.define('grid-sequencer-test', GridSequencerTest);
export default GridSequencerTest;
