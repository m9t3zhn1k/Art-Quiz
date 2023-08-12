import FooterElement from './Footer.html';
import './Footer.css';

export class Footer {
  constructor() {}

  async render () {
    return FooterElement;
  }

  async after_render () {};
}
