import HomeElement from './Home.html';
import './Home.css';

export class Home {
  constructor() {}

  async render () {
    return HomeElement;
  }

  async after_render () {
    const chooseArtistQuizBtn = document.querySelector('.artist-quiz');
    const choosePictureQuizBtn = document.querySelector('.pictures-quiz');
    const logo = document.querySelector('.logotitle');
    const navbar = document.querySelector('.navbar');
    function artistquiz() {
      localStorage.setItem('gameType', 'artist-quiz');
    }
    function picturesquiz() {
      localStorage.setItem('gameType', 'pictures-quiz');
    }
    logo.remove();
    navbar.innerHTML = '';
    chooseArtistQuizBtn.addEventListener('click', artistquiz);
    choosePictureQuizBtn.addEventListener('click', picturesquiz);
  };
}
