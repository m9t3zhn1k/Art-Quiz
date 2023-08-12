import HeaderElement from './Header.html';
import './Header.css';

export class Header {
  constructor() {}

  async render () {
    return HeaderElement;
  }

  async after_render () {};
}
