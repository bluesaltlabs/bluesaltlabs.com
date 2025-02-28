import { SVG_NAMESPACE, sample_keys, sample_names, sample_urls } from './constants';
import VectorService from '@/services/VectorService';

class SequencerVectors {

  // The base sequencer background container.
  getSequencerContainerVector() {
    const width = 1920;
    //const height = 1080;
    const height = 220;


    const svg = VectorService.getSVG({
      width, height,
      class: 'sequencer-vector',
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
    //const id = `sequencer-pad-${row}-${column}`;
    const sampleKey = this.getSampleKey(column);
    const id = `sequencer-pad-${sampleKey}`;

    // Create the base vector container
    const svg = VectorService.getSVG({
      width, height, id,
      class: 'sequencer-pad inactive',
      'data-sample-key': sampleKey
    });
    svg.setAttribute('x', 200 + (column * 100));
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
      fill: '#882222ee'
    });

    // Glue the key pieces together.
    svg.appendChild(keyBg);
    svg.appendChild(keyFaceBack);
    svg.appendChild(keyFaceFront);
    svg.appendChild(keyLight);

    // add a click event listener to the SVG
    svg.addEventListener('click', (e) => {
      //console.debug(`SVG ${sampleKey} click triggered!!`, { e });
      document.dispatchEvent(
        new CustomEvent(`sample_${sampleKey}_play`, { detail: { sampleKey, action: 'play' } })
      );
    });

    return svg;
  }

  getSampleKey(column) {
    switch(column) {
      case 0: return 'accent';
      case 1: return 'bass_drum';
      case 2: return 'snare_drum';
      case 3: return 'low_tom';
      case 4: return 'mid_tom';
      case 5: return 'high_tom';
      case 6: return 'rim_shot';
      case 7: return 'hand_clap';
      case 8: return 'low_conga';
      case 9: return 'mid_conga';
      case 10: return 'high_conga';
      case 11: return 'claves';
      case 12: return 'maracas';
      case 13: return 'cowbell';
      case 14: return 'cymbal';
      case 15: return 'open_hat';
      case 16: return 'closed_hat';
    }
  }

}

const instance = new SequencerVectors();

export default instance
