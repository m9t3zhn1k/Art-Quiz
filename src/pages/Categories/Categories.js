import CategoriesElement from './Categories.html';
import './Categories.css';
import x from '@/assets/data/images.json';
import { Category } from '../../components/Category';
import { doc } from 'prettier';

export class Categories {
  constructor() {
    this.categories = [{name: 'I', position: 0}, {name: 'II', position: 10}, {name: 'III', position: 20}, {name: 'IV', position: 30}, {name: 'V', position: 40}, {name: 'VI', position: 50},{name: 'VII', position: 60}, {name: 'VIII', position: 70}, {name: 'IX', position: 80}, {name: 'X', position: 90}, {name: 'XI', position: 100}, {name: 'XII', position: 110}, {name: 'I', position: 120}, {name: 'II', position: 130}, {name: 'III', position: 140}, {name: 'IV', position: 150}, {name: 'V', position: 160}, {name: 'VI', position: 170},{name: 'VII', position: 180}, {name: 'VIII', position: 190}, {name: 'IX', position: 200}, {name: 'X', position: 210}, {name: 'XI', position: 220}, {name: 'XII', position: 230}];

  };

  async render () {
    return CategoriesElement;
  }

  async after_render () {
    
    const categoriesContainer = document.querySelector('.categories__container');
    if (window.mode === 'artist-quiz') {
      for (let i = 0; i < 12; i++) {
        const newCategory = new Category(this.categories[i].name, this.categories[i].position);
        let item = await newCategory.render();
        categoriesContainer.innerHTML += item;
      }
    } else {
      for (let i = 12; i < this.categories.length; i++) {
        const newCategory = new Category(this.categories[i].name, this.categories[i].position);
        let item = await newCategory.render();
        categoriesContainer.innerHTML += item;
      }
    }

    const childs = categoriesContainer.children;

  };
}
