import GameHTML from './Game.html';
import './Game.css';

export class Game {
  constructor() {

  }

  async render () {
    return GameHTML;
  }

  async after_render () {

  }
}