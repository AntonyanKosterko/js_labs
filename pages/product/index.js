import { BackButtonComponent } from '../../components/back-button/index.js';
import { MainPage } from '../main/index.js';

export class ProductPage {
  constructor(parent, id) {
    this.parent = parent;
    this.id = id;
    this.data = [];
  }

  getData() {
    fetch(`http://localhost:8000/api/dogs/${this.id}`)
      .then(response => response.json())
      .then(data => {
        console.log('Данные собаки загружены:', data);
        this.data = data;
        this.renderProduct();
      })
      .catch(error => console.error('Ошибка загрузки данных:', error));
  }

  get pageRoot() {
    return document.getElementById('product-page');
  }

  getHTML() {
    return `
      <div id="product-page" class="d-flex flex-column align-items-center mt-5">
        <h2>${this.data.title}</h2>
        <img src="${this.data.src}" class="img-fluid" alt="${this.data.title}" />
        <p>${this.data.text}</p>
      </div>
    `;
  }

  clickBack() {
    const mainPage = new MainPage(this.parent);
    mainPage.render();
  }

  renderProduct() {
    this.parent.innerHTML = '';
    this.parent.insertAdjacentHTML('beforeend', this.getHTML());

    const backButton = new BackButtonComponent(this.pageRoot);
    backButton.render(this.clickBack.bind(this));
  }

  render() {
    this.getData();
  }
}
