export default class SequencerVectors {

  // The base sequencer background container.
  getSequencerContainerVector() {
    const width = 1920;
    const height = 1080;

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.type = 'image/svg+xml';
    svg.setAttribute('id', 'sequencer-vector');
    svg.setAttribute('width', width);
    svg.setAttribute('height', height);
    svg.setAttribute('style', 'max-width:100%;height:auto;margin:0auto;display:block;');
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);

    // Create a background rectangle
    const sBg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
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
    // Create the base vector container
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('y', 850);
    svg.setAttribute('x', 250 + (index * 100));
    svg.setAttribute('width', width);
    svg.setAttribute('height', height);
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);

    // Create the key background rectangle
    const keyBg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    keyBg.setAttribute('width', width);
    keyBg.setAttribute('height', height);
    keyBg.setAttribute('rx', 8);
    keyBg.setAttribute('ry', 8);
    keyBg.setAttribute('fill', 'var(--color-blue-alt, #5555ff)'); // todo: ???
    //keyBg.setAttribute('fill', 'var(--color-gray-300, #333333)'); // todo: ???

    // Create the key face rectangle
    const keyFace = document.createElementNS('http://www.w3.org/2000/svg', 'path');

    keyFace.setAttribute('d',
      'M 5 55 c 0 -10 10 -10 10 -10 h 45 c 0 0 10 0 10 10 v 50 c 0 10 0 10 -10 10 h -45 c -10 0 -10 0 -10 -10 Z'
    );
    keyFace.setAttribute('fill', '#ffff1180'); // temp

    const keyFace2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');

    keyFace2.setAttribute('d',
      'M 6 55 c 0 -7 7 -7 7 -7 h 47 c 0 0 9 0 9 7 v 52 c 0 7 0 7 -7 7 h -49 c -7 0 -7 0 -7 -7 Z'
    );
    keyFace2.setAttribute('fill', '#ffff1180'); // temp

    // create the key light
    const keyLight = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    keyLight.setAttribute('cx', width / 2);
    keyLight.setAttribute('cy', height / 5);
    keyLight.setAttribute('r', height / 10);
    keyLight.setAttribute('fill', 'var(--color-red, #ff2222ee)'); // todo: change this color

    // Glue the key pieces together.
    svg.appendChild(keyBg);
    svg.appendChild(keyFace);
    svg.appendChild(keyFace2);
    svg.appendChild(keyLight);
    return svg;
  }


  // todo: more vectors.


  // todo: temp
  tempGetDemoIconBanner() {

  }

}
