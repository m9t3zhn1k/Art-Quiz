import CategoriesElement from './Categories.html';
import './Categories.css';
import { Category } from '../../components/Category';

export class Categories {
  answers;
  constructor() {
    this.categories = [{name: 'I', group: 0}, {name: 'II', group: 1}, {name: 'III', group: 2}, {name: 'IV', group: 3}, {name: 'V', group: 4}, {name: 'VI', group: 5},{name: 'VII', group: 6}, {name: 'VIII', group: 7}, {name: 'IX', group: 8}, {name: 'X', group: 9}, {name: 'XI', group: 10}, {name: 'XII', group: 11}, {name: 'I', group: 12}, {name: 'II', group: 13}, {name: 'III', group: 14}, {name: 'IV', group: 15}, {name: 'V', group: 16}, {name: 'VI', group: 17},{name: 'VII', group: 18}, {name: 'VIII', group: 19}, {name: 'IX', group: 20}, {name: 'X', group: 21}, {name: 'XI', group: 22}, {name: 'XII', group: 23}];
  };

  async render () {
    return CategoriesElement;
  }

  async after_render () {
    this.answers = JSON.parse(localStorage.getItem('answers'));
    const categoriesContainer = document.querySelector('.categories__container');
    if (localStorage.getItem('gameType') === 'artist-quiz') {
      for (let i = 0; i < 12; i++) {
        const newCategory = new Category(this.categories[i].name, this.categories[i].group);
        let item = await newCategory.render();
        newCategory.after_render();
        categoriesContainer.innerHTML += item;
      }
    } else if (localStorage.getItem('gameType') === 'pictures-quiz') {
      for (let i = 12; i < 24; i++) {
        const newCategory = new Category(this.categories[i].name, this.categories[i].group);
        let item = await newCategory.render();
        categoriesContainer.innerHTML += item;
      }
    }
    
    this.showRightAnswersCount();

    categoriesContainer.addEventListener('click', startGame);

    function startGame(event) {
      const target = event.target.closest('.category__image');
      if (!target || !categoriesContainer.contains(target)) {
        return;
      }
      if (target) {
        localStorage.setItem('currentGroup', target.parentElement.dataset.group);
        location.href = './#/game';
      }
    }
  };

  showRightAnswersCount = () => {
    const cards = document.querySelectorAll('.category__item');
    for (let item of cards) {
      let group = item.dataset.group;
      let currentAnswers = this.answers[group];
      let rightAnswersBoard = item.querySelector('.category__result');
      let rightAnswersCounter = currentAnswers.filter(answer => answer).length;
      if (rightAnswersCounter) {
        rightAnswersBoard.textContent = `${rightAnswersCounter}/10`;
        item.querySelector('.category__image').classList.add('category__image_completed');
      }
    }
  }
}
