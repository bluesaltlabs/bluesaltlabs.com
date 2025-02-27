import { SVG_NAMESPACE, sample_keys } from './constants';



export default class SequencerVectors {

  // The base sequencer background container.
  getSequencerContainerVector() {
    const width = 1920;
    const height = 1080;

    const svg = this.getBaseSVG({ width, height });
    svg.setAttribute('id', 'sequencer-vector');
    svg.setAttribute('width', width);
    svg.setAttribute('height', height);
    svg.setAttribute('style', 'max-width:100%;height:auto;margin:0 auto;display:block;');
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);

    // Create a background rectangle
    const sBg = document.createElementNS(SVG_NAMESPACE, 'rect');
    sBg.setAttribute('width', width);
    sBg.setAttribute('height', height);
    sBg.setAttribute('rx', '5');
    sBg.setAttribute('ry', '5');
    sBg.setAttribute('fill', 'var(--color-gray-500, #111111)');
    svg.appendChild(sBg);

    return svg;
  }

  // The base sequencer pad key vector.
  getBaseSequencerPadKeyVector(index) {
    const width = 75;
    const height = 120;
    const rx = 8, ry = 8;
    const fill = 'var(--color-blue-alt, #5555ff)';

    // Create the base vector container
    const svg = this.getBaseSVG({ width, height });
    svg.setAttribute('x', 250 + (index * 100));
    svg.setAttribute('y', 850);

    // Create the key background rectangle
    const keyBg = this.getBasicRect({
      width, height, rx, ry, fill
    });

    // Create the key face rectangle
    const keyFaceBack = document.createElementNS(SVG_NAMESPACE, 'path');

    keyFaceBack.setAttribute('d',
      'M 5 55 c 0 -10 10 -10 10 -10 h 45 c 0 0 10 0 10 10 v 50 c 0 10 0 10 -10 10 h -45 c -10 0 -10 0 -10 -10 Z'
    );
    keyFaceBack.setAttribute('fill', '#ffff1180'); // temp

    const keyFaceFront = document.createElementNS(SVG_NAMESPACE, 'path');

    keyFaceFront.setAttribute('d',
      'M 6 55 c 0 -7 7 -7 7 -7 h 47 c 0 0 9 0 9 7 v 52 c 0 7 0 7 -7 7 h -49 c -7 0 -7 0 -7 -7 Z'
    );
    keyFaceFront.setAttribute('fill', '#ffff1180'); // temp

    // create the key light
    const keyLight = document.createElementNS(SVG_NAMESPACE, 'circle');
    keyLight.setAttribute('cx', width / 2);
    keyLight.setAttribute('cy', height / 5);
    keyLight.setAttribute('r', height / 10);
    keyLight.setAttribute('fill', 'var(--color-red, #ff2222ee)'); // todo: change this color

    // Glue the key pieces together.
    svg.appendChild(keyBg);
    svg.appendChild(keyFaceBack);
    svg.appendChild(keyFaceFront);
    svg.appendChild(keyLight);

    return svg;
  }


  // todo: return a vector with a nameplate to place next to the patch sequencer pad buttons.
  getInstrumentNamePlate(sampleName) {
    const width = 120;
    const height = 50;
    const svg = this.getBaseSVG({ width, height });

    // create name plate background
    const rect = document.createElementNS(SVG_NAMESPACE, 'rect');
    rect.setAttribute('x', 0);
    rect.setAttribute('y', 0);
    rect.setAttribute('width', width);
    rect.setAttribute('height', height);
    rect.setAttribute('fill', '#ffff1180'); // temp

    // create name plate text
    const text = document.createElementNS(SVG_NAMESPACE, 'text');
    text.setAttribute('x', width / 2);
    text.setAttribute('y', height / 2);
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('dominant-baseline', 'middle');
    text.setAttribute('fill', '#000');
    text.textContent = sampleName;

    // Glue the nameplate pieces together.
    svg.appendChild(rect);
    svg.appendChild(text);

    return svg;
  }

  // todo: more vectors.


  // todo: temp
  tempGetDemoIconBanner() {

  }


  getBaseSVG(attributes) {
    const svg = document.createElementNS(SVG_NAMESPACE, 'svg');

    const { width, height, ...rest } = attributes;

    svg.setAttribute('width', width);
    svg.setAttribute('height', height);
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);

    for(let key in rest) {
      svg.setAttribute(key, rest[key]);
    }

    console.debug(svg); // debug

    return svg;
  }

  getBasicRect(attributes) {
    const { width, height, ...rest } = attributes;

    const rect = this.getBasicShape('rect', { width, height, ...rest });

    return rect;
  }

  getBasicShape(type, attributes) {
    const shape = document.createElementNS(SVG_NAMESPACE, type);
    const { x, y, ...rest } = attributes;

    shape.setAttribute('x', x ?? 0);
    shape.setAttribute('y', y ?? 0);

    // Set the shape's attributes
    for(let key in rest) {
      shape.setAttribute(key, rest[key]);
    }

//    console.debug(shape); // debug

    return shape;
  }

}
