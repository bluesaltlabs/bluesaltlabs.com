const SVG_NAMESPACE = 'http://www.w3.org/2000/svg';

class VectorService {
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
    for(let key in rest) { shape.setAttribute(key, rest[key]); }

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
    for(let key in rest) { svg.setAttribute(key, rest[key]); }

    return svg;
  }
}

const instance = new VectorService();
Object.freeze(instance);

export default instance;
