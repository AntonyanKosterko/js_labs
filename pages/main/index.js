import { AccordionComponent } from '../../components/accordion/index.js';
import { ProductPage } from '../product/index.js';

export class MainPage {
  constructor(parent) {
    this.parent = parent;
    this.currentIndex = 0;
    this.data = [];
  }

  getData() {
    fetch('http://localhost:8000/api/dogs')
      .then(response => response.json())
      .then(data => {
        console.log('Данные собак загружены:', data);
        this.data = data;
        this.renderAccordion();
      });
  }

  get pageRoot() {
    return document.getElementById('main-page');
  }

  getHTML() {
    return `
      <div id="main-page" class="d-flex flex-wrap"></div>
    `;
  }

  renderAccordion() {
    this.pageRoot.innerHTML = '';

    this.data.forEach((dog, index) => {
      const accordion = new AccordionComponent(this.pageRoot);
      accordion.render([dog], `accordion-${index}`, this.clickCard.bind(this));
    });
  }

  clickCard(e) {
    const cardId = e.target.dataset.id;
    const productPage = new ProductPage(this.parent, cardId);
    productPage.render();
  }

  render() {
    this.parent.innerHTML = '';
    this.parent.insertAdjacentHTML('beforeend', this.getHTML());

    this.getData();
  }
}
