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
    const headerButton = document.querySelector('.header-button');
    function artistquiz() {
      window.mode = 'artist-quiz';
    }
    function picturesquiz() {
      window.mode = 'pictures-quiz';
    }
    logo.remove();
    navbar.innerHTML = ''
    /* headerButton.classList.add('header-button__settings');
    headerButton.setAttribute('href', '/#/settings'); */
    chooseArtistQuizBtn.addEventListener('click', artistquiz);
    choosePictureQuizBtn.addEventListener('click', picturesquiz);
  };
}
