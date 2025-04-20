import { urls } from "../../modules/urls.js";
import { ProductComponent } from "../../components/product/index.js";
import { BackButtonComponent } from "../../components/back-button/index.js";
import { MainPage } from "../main/index.js";

export class ProductPage {
  constructor(parent, id) {
    this.parent = parent;
    this.id = id;
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

  render() {
    this.parent.innerHTML = '';
    const html = this.getHTML();
    this.parent.insertAdjacentHTML('beforeend', html);

    fetch(urls.getProductByIndex(this.id))
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Ошибка запроса: ${response.status} ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        if (!data || !data.title) {
          this.pageRoot.innerHTML = `<p>Продукт не найден</p>`;
          return;
        }
        const product = new ProductComponent(this.pageRoot);
        product.render(data);

        const backButton = new BackButtonComponent(this.pageRoot);
        backButton.render(this.clickBack.bind(this));
      })
      .catch((error) => {
        console.error("Ошибка при загрузке товара:", error);
        this.pageRoot.innerHTML = `<p>Произошла ошибка при загрузке товара</p>`;
      });
  }

  get pageRoot() {
    return document.getElementById('product-page');
  }
}
