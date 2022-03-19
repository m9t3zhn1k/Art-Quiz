import GameHTML from './Game.html';
import './Game.css';
import data from '../../assets/data/images.json';

export class Game {

  currentNumber;
  rightAnswer;
  constructor() {
  }

  async render () {
    this.currentNumber = localStorage.getItem('currentNumber') || 0;
    this.rightAnswer = data[this.currentNumber];
    return GameHTML;
  }

  async after_render () {
    document.querySelector('.header').innerHTML = '';
    this.formGamePage();
  }

  formGamePage() {
    this.formGameQuestion();
    this.formGamePicture();
    this.formGamePoints();
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
    let answers = [this.rightAnswer];
    while (answers.length < 4) {
      const randomAnswer = data[Math.round(Math.random() * 119)];
      if (data[randomAnswer] !== this.rightAnswer) {
        answers.push(randomAnswer);
      }
    }
    this.shuffle(answers);
    answers.forEach(answer => {
      const div = document.createElement('div');
      div.classList = 'game__answer';
      if (answer === this.rightAnswer) {
        div.dataset.rightAnswer = 'true';
      }
      div.textContent = answer.author;
      answersContainer.append(div);
    })
  }

  shuffle(array) {
    for (let i = 0; i < array.length; i++) {
      let j = Math.floor(Math.random() * array.length);
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

}