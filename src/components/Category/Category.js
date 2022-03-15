export class Category {
  constructor(name, number) {
    this.rightAnswers = 0;
    this.categoryName = name;
    this.completed = false;
    this.dataPosition = number;
  }

  async render () {
    let element = `
    <a class="category__item" href="/#/game">
      <div class="category__header">
        <span class="category__title">${this.categoryName}</span>
        <span class="category__result">${this.rightAnswers}/10</span>
      </div>
      <img class="category__image" src="../../assets/data/img/${this.dataPosition}.webp"></img>
    </a>
    `;
    return element;
  }

  async after_render () {
    
  };
}