import { SVG_NAMESPACE, sample_keys, sample_names, sample_urls } from './constants';
import VectorService from '@/services/VectorService';

class SequencerVectors {

  // The base sequencer background container.
  getSequencerContainerVector() {
    const width = 1920;
    const height = 1080;

    const svg = VectorService.getSVG({
      width, height,
      id: 'sequencer-vector',
      style: 'max-width:100%;height:auto;margin:0 auto;display:block;'
    });

    // Create a background rectangle
    const sBg = VectorService.getRect({
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
    const svg = VectorService.getSVG({ width, height, id });
    svg.setAttribute('x', 250 + (column * 100));
    svg.setAttribute('y', 50 + (row * 145));

    // Create the key background rectangle
    const keyBg = VectorService.getRect({
      width, height, rx, ry, fill
    });

    // Create the key face rectangles
    const keyFaceBack = VectorService.getPath({
      d: 'M 5 55 c 0 -10 10 -10 10 -10 h 45 c 0 0 10 0 10 10 v 50 c 0 10 0 10 -10 10 h -45 c -10 0 -10 0 -10 -10 Z',
      fill: 'var(--color-green, #55ff55)'
    });

    const keyFaceFront = VectorService.getPath({
      d: 'M 6 55 c 0 -7 7 -7 7 -7 h 47 c 0 0 9 0 9 7 v 52 c 0 7 0 7 -7 7 h -49 c -7 0 -7 0 -7 -7 Z',
      fill: 'var(--color-blue, #5555ff)'
    });

    // create the key light
    const keyLight = VectorService.getCircle({
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

    return svg;
  }

}

const instance = new SequencerVectors();

export default instance
