import { SVG_NAMESPACE, sample_keys, sample_names, sample_urls } from './constants';



export default class SequencerVectors {

  // The base sequencer background container.
  getSequencerContainerVector() {
    const width = 1920;
    const height = 1080;

    const svg = this.getBaseSVG({
      width, height,
      id: 'sequencer-vector',
      style: 'max-width:100%;height:auto;margin:0 auto;display:block;'
    });

    // Create a background rectangle
    const sBg = this.getBasicRect({
      width, height,
      rx: 5,
      ry: 5,
      fill: 'var(--color-gray-500, #111111)'
    });

    svg.appendChild(sBg);

    return svg;
  }

  // The base sequencer pad key vector.
  getBaseSequencerPadKeyVector(row, column) {
    const width = 75;
    const height = 120;
    const rx = 8, ry = 8;
    const fill = 'var(--color-blue-alt, #5555ff)';
    const id = `sequencer-pad-${row}-${column}`;

    // Create the base vector container
    const svg = this.getBaseSVG({ width, height, id });
    svg.setAttribute('x', 250 + (column * 100));
    svg.setAttribute('y', 50 + (row * 145));

    // Create the key background rectangle
    const keyBg = this.getBasicRect({
      width, height, rx, ry, fill
    });

    // Create the key face rectangles
    const keyFaceBack = this.getBasicPath({
      d: 'M 5 55 c 0 -10 10 -10 10 -10 h 45 c 0 0 10 0 10 10 v 50 c 0 10 0 10 -10 10 h -45 c -10 0 -10 0 -10 -10 Z',
      fill: 'var(--color-green, #55ff55)'
    });

    const keyFaceFront = this.getBasicPath({
      d: 'M 6 55 c 0 -7 7 -7 7 -7 h 47 c 0 0 9 0 9 7 v 52 c 0 7 0 7 -7 7 h -49 c -7 0 -7 0 -7 -7 Z',
      fill: 'var(--color-blue, #5555ff)'
    });

    // create the key light
    const keyLight = this.getBasicCircle({
      cx: width / 2,
      cy: height / 5,
      r: height / 10,
      fill: 'var(--color-red, #ff2222ee)'
    });

    // Glue the key pieces together.
    svg.appendChild(keyBg);
    svg.appendChild(keyFaceBack);
    svg.appendChild(keyFaceFront);
    svg.appendChild(keyLight);

    // add test event listener
    // svg.addEventListener('click', () => {
    //   console.log(`Key ${id} clicked!`);
    // });

    return svg;
  }

  // todo: this needs more work.
  getSequencerPadRowNameplate(row) {
    const width = 175;
    const height = 75; // temp
    const x = 0 ; // temp
    const y = 0 + (row * height); // temp
    const text = "Hello there!!"; // todo: temp;

    //
    const svg = this.getBaseSVG({
      width, height,
      x, y
    });

    const textElement = this.getBasicText({
      text,
      x: 0, y: (height / 2),
      fill: '#fff',
      fontSize: 30
    });

    svg.appendChild(textElement);

    return svg;
  }


  // todo: return a vector with a nameplate to place next to the patch sequencer pad buttons.
  getInstrumentNamePlate(sampleName) {
    const width = 120;
    const height = 50;
    const svg = this.getBaseSVG({ width, height });

    // create name plate background
    const bg = this.getBasicRect({
      x: 0,
      y: 0,
      width,
      height,
      fill: '#ffff1180', // temp
    });

    // create name plate text
    const text = this.getBasicText({
      x: 0,
      y: 0,
      width, height, // todo: temp
      fill: '#fff' // todo: temp
    });

    text.textContent = sampleName;

    // Glue the nameplate pieces together.
    svg.appendChild(bg);
    svg.appendChild(text);

    return svg;
  }



  // todo: temp
  tempGetDemoIconBanner() {

  }



  // todo: these methods should move to their own class designed specifically for building SVGs //

  // todo: double-check that this functions as expected
  getBasicText(attributes) {
    const { x, y, fontSize, text, ...rest } = attributes;
    const textElement = this.getBasicShape('text', { x, y, 'font-size': fontSize, ...rest });
    textElement.textContent = text;
    return textElement;
  }

  getBasicPath(attributes) {
    const { d, ...rest } = attributes;
    return this.getBasicShape('path', { d, ...rest });
  }

  getBasicCircle(attributes) {
    const { cx, cy, r, ...rest } = attributes;
    return this.getBasicShape('circle', { cx, cy, r, ...rest });
  }

  getBasicRect(attributes) {
    const { width, height, ...rest } = attributes;
    return this.getBasicShape('rect', { width, height, ...rest });
  }

  getBasicShape(type, attributes) {
    const shape = document.createElementNS(SVG_NAMESPACE, type);
    const { x, y, ...rest } = attributes;

    // Set the shape's required attributes
    shape.setAttribute('x', x ?? 0);
    shape.setAttribute('y', y ?? 0);

    // Set the shape's remaining attributes
    for(let key in rest) {
      shape.setAttribute(key, rest[key]);
    }

    return shape;
  }

  getBaseSVG(attributes) {
    const svg = document.createElementNS(SVG_NAMESPACE, 'svg');
    const { width, height, ...rest } = attributes;

    // Set the shape's required attributes
    svg.setAttribute('width', width);
    svg.setAttribute('height', height);
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);

    // Set the shape's remaining attributes
    for(let key in rest) {
      svg.setAttribute(key, rest[key]);
    }

    return svg;
  }

}
