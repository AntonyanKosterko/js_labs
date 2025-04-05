import {ProductComponent} from "../../components/product/index.js";
import {BackButtonComponent} from "../../components/back-button/index.js";
import {MainPage} from "../main/index.js";

export class ProductPage {
  constructor(parent, id) {
    this.parent = parent;
    this.id = id;
    this.data = [];
  }

  getData() {
    this.data = fetch(`http://localhost:8000/api/dogs/${this.id}`)
      .then(response => response.json())
      .then(data => {
        console.log('Данные собаки загружены:', data);
        this.data = data;
        this.renderProduct();
      })
      .catch(error => console.error('Ошибка загрузки данных:', error));
    return this.data[this.id]
  }

  get pageRoot() {
    return document.getElementById('product-page');
  }

  getHTML() {
    return `
        <div
          id="product-page"
          class="d-flex flex-column justify-content-center align-items-center"
          style="min-height: 100vh;"
        >
        </div>
    `;
  }

  clickBack() {
    const mainPage = new MainPage(this.parent);
    mainPage.render();
  }

  renderProduct() {
    this.parent.innerHTML = '';
    const html = this.getHTML();
    this.parent.insertAdjacentHTML('beforeend', html);

    const data = this.getData();

    //console.log(data);
    if (!data || !data.title) {
        this.pageRoot.innerHTML = `<p>Продукт не найден</p>`;
        return;
    }

    const product = new ProductComponent(this.pageRoot);
    product.render(data);

    const backButton = new BackButtonComponent(this.pageRoot);
    backButton.render(this.clickBack.bind(this));
  }

  render() {
    this.getData();
  }
}
