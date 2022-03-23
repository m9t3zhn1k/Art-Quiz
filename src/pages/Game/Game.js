import GameHTML from './Game.html';
import './Game.css';
import data from '../../assets/data/images.json';

export class Game {

  currentNumber;
  currentGroup;
  rightAnswer;
  results;
  constructor() {
    this.results = [];
  }

  async render () {
    this.currentNumber = localStorage.getItem('currentNumber') || 0;
    return GameHTML;
  }

  async after_render () {
    document.querySelector('.header').innerHTML = '';
    this.formGamePage();
  }

  formGamePage() {
    this.rightAnswer = data[this.currentNumber];
    this.formGameQuestion();
    this.formGamePicture();
    this.formGamePoints();
    this.formGameAnswers();
  }

  formGameQuestion() {
    document.querySelector('.game__title').textContent = 'Who is the author of this picture?';
  }

  formGamePicture() {
    document.querySelector('.game__picture_image').style.backgroundImage = `url(../../assets/data/full/${this.currentNumber}full.webp)`;
  }

  formGamePoints() {
    const pointsContainer = document.querySelector('.game__points');
    while (pointsContainer.childElementCount < 10) {
      const point = document.createElement('div');
      point.className = 'game__point';
      pointsContainer.append(point);
    }
  }

  formGameAnswers() {
    const answersContainer = document.querySelector('.game__answers');
    answersContainer.addEventListener('click', this.checkAnswer);
    let answers = [this.rightAnswer];
    while (answers.length < 4) {
      const randomAnswer = data[Math.round(Math.random() * 119)];
      if (answers.every(answer => answer != randomAnswer)) {
        answers.push(randomAnswer);
      } else continue;
    }
    this.shuffle(answers);
    answers.forEach(answer => {
      const div = document.createElement('div');
      div.classList = 'game__answer';
      if (answer === this.rightAnswer) {
        div.dataset.rightAnswer = 'true';
        div.style.color = 'green'
      }
      div.textContent = answer.author;
      answersContainer.append(div);
    });
  }

  shuffle(array) {
    for (let i = 0; i < array.length; i++) {
      let j = Math.floor(Math.random() * array.length);
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  checkAnswer = () => {
    const item = event.target.closest('.game__answer');
    if (!item) return;
    if (item.dataset.rightAnswer === 'true') {
      item.classList.add('game__answer_right');
      this.results.push(true);
    } else {
      item.classList.add('game__answer_wrong');
      this.results.push(false);
    }
    this.formRoundResult();
  }

  formRoundResult() {
    document.querySelector('.game__answers').removeEventListener('click', this.checkAnswer);
    const gameContainer = document.querySelector('.game__container');
    const popup = document.createElement('div');
    const img = document.createElement('div');
    const title = document.createElement('p');
    const subtitle = document.createElement('p');
    const button = document.createElement('button');
    const imgIcon = document.createElement('div');
    img.style.backgroundImage = `url(../../assets/data/img/${this.rightAnswer.imageNum}.webp)`;
    title.textContent = `«${this.rightAnswer.name}»`;
    subtitle.textContent = `${this.rightAnswer.author}, ${this.rightAnswer.year}`;
    button.textContent = 'Next';
    popup.className = 'round-popup';
    img.classList.add('round-popup__image');
    title.className = 'round-popup__title';
    subtitle.className = 'round-popup__subtitle';
    button.className = 'round-popup__button';
    imgIcon.className = 'round-popup__image_icon';
    imgIcon.style.backgroundImage = (this.results[this.results.length - 1]) ?
    'url(../../assets/svg/right-icon.svg)' :
    'url(../../assets/svg/wrong-icon.svg)';
    popup.append(img, title, subtitle, button);
    img.append(imgIcon);
    gameContainer.append(popup);
    button.addEventListener('click', this.checkEndGame);
  }

  checkEndGame = () => {
    if (this.results.length < 10) {
      document.getElementById('page_container').innerHTML = GameHTML;
      this.currentNumber++;
      this.formGamePage();
    } else {
      document.querySelector('.round-popup').remove();
      this.formGameResult();
    }
  }
  formGameResult = () => {
    const gameContainer = document.querySelector('.game__container');
    const popup = document.createElement('div');
    const img = document.createElement('div');
    const title = document.createElement('p');
    const subtitle = document.createElement('p');
    const buttons = document.createElement('div');
    const buttonLeft = document.createElement('button');
    const buttonRight = document.createElement('button');
    popup.className = 'game-popup';
    img.className = 'game-popup__image';
    title.className = 'game-popup__title';
    subtitle.className = 'game-popup__subtitle';
    buttons.className = 'game-popup__buttons';
    buttonLeft.className = 'game-popup__button';
    buttonRight.className = 'game-popup__button';
    switch (this.setGameScore()) {
      case 'top':
        title.textContent = `Grand\nresult`;
        subtitle.textContent = 'Congratulations!';
        img.style.backgroundImage = 'url(../../assets/svg/game-congratulations-icon.svg)';
        img.style.height = '125px';
        buttonLeft.textContent = 'Home';
        buttonRight.textContent = 'Next Quiz';
        break;
      case 'medium':
        subtitle.textContent = 'Congratulations!';
        title.textContent = `${this.results.filter(result => result).length}/${this.results.length}`;
        img.style.backgroundImage = 'url(../../assets/svg/game-finish-icon.svg)';
        buttonLeft.textContent = 'Home';
        buttonRight.textContent = 'Next Quiz';
        break;
      case 'low':
        title.textContent = 'Game over';
        subtitle.textContent = 'Play again?';
        img.style.backgroundImage = 'url(../../assets/svg/game-over-icon.svg)';
        buttonLeft.textContent = 'No';
        buttonRight.textContent = 'Yes';
        break;
    }
    buttons.append(buttonLeft, buttonRight);
    gameContainer.append(popup);
    popup.append(img, title, subtitle, buttons);
  }

  setGameScore = () => {
    let rightAnswers = this.results.filter(result => result).length;
    return rightAnswers === 10 ? 'top' : rightAnswers >= 6 ? 'medium' : 'low';
  }

}