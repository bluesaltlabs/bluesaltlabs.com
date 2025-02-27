const SVG_NAMESPACE = 'http://www.w3.org/2000/svg';

class VectorService {
  getText(attributes) {
    const { x, y, fontSize, text, ...rest } = attributes;
    const textElement = this.getShape('text', { x, y, 'font-size': fontSize, ...rest });
    textElement.textContent = text;
    return textElement;
  }

  // todo: create a version of this that can accept an array of values to build path data (`d` attribute)
  getPath(attributes) {
    const { d, ...rest } = attributes;
    return this.getShape('path', { d, ...rest });
  }

  getCircle(attributes) {
    const { cx, cy, r, ...rest } = attributes;
    return this.getShape('circle', { cx, cy, r, ...rest });
  }

  getRect(attributes) {
    const { width, height, ...rest } = attributes;
    return this.getShape('rect', { width, height, ...rest });
  }

  getShape(type, attributes) {
    const shape = document.createElementNS(SVG_NAMESPACE, type);
    const { x, y, ...rest } = attributes;

    // Set the shape's required attributes
    shape.setAttribute('x', x ?? 0);
    shape.setAttribute('y', y ?? 0);

    // Set the shape's remaining attributes
    for(let key in rest) { shape.setAttribute(key, rest[key]); }

    return shape;
  }

  getSVG(attributes) {
    const svg = document.createElementNS(SVG_NAMESPACE, 'svg');
    const { width, height, ...rest } = attributes;

    // Set the shape's required attributes
    svg.setAttribute('width', width);
    svg.setAttribute('height', height);
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);

    // Set the shape's remaining attributes
    for(let key in rest) { svg.setAttribute(key, rest[key]); }

    return svg;
  }
}

const instance = new VectorService();
Object.freeze(instance);

export default instance;
