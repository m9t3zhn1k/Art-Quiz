import GameHTML from './Game.html';
import './Game.css';

export class Game {
  constructor() {

  }

  async render () {
    return GameHTML;
  }

  async after_render () {
    document.querySelector('.header').innerHTML = '';
    /* document.querySelector('.test1test').innerHTML = `${localStorage.getItem('currentNumber')}`; */
  }
}