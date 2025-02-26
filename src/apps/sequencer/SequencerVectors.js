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
    keyBg.setAttribute('rx', '8');
    keyBg.setAttribute('ry', '8');
    keyBg.setAttribute('fill', 'var(--color-gray-300, #333333)'); // todo: ???


    //sqKey.setAttribute('fill', 'var(--color-blue, #0000ff)'); // todo: change this color

    // append the key background to the svg container
    svg.appendChild(keyBg);
    return svg;
  }

  // todo: vector s


}
