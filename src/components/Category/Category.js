export class Category {
  constructor(name, number) {
    this.categoryName = name;
    /* this.completed = false; */
    this.group = number;
    this.imageNumber = Math.floor(Math.random() * 10) + +(number + '0');
  }

  async render () {
    let element = `
    <div class="category__item" data-group=${this.group}>
      <div class="category__header">
        <span class="category__title">${this.categoryName}</span>
        <span class="category__result"></span>
      </div>
      <img class="category__image" src="../../assets/data/img/${this.imageNumber}.webp"></img>
    </div>
    `;
    return element;
  }

  async after_render () {
  };
}
