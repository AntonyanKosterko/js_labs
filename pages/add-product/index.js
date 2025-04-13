import { ajax } from "../../modules/ajax.js";
import { urls } from "../../modules/urls.js";
import { MainPage } from "../main/index.js";
import { HeaderComponent } from "../../components/header/index.js";

export class AddProductPage {
  constructor(parent) {
    this.parent = parent;
  }

  getHTML() {
    return `
      <div>
        <h1 class="text-center mt-4">Добавить новый товар</h1>
        <p class="text-center">Введите данные для нового товара.</p>
        <div class="d-flex justify-content-center mt-3">
          <form id="add-product-form" style="width: 600px;">
            <div class="mb-3">
              <label for="product-title" class="form-label">Название товара</label>
              <input type="text" class="form-control" id="product-title" required />
            </div>
            <div class="mb-3">
              <label for="product-text" class="form-label">Описание</label>
              <textarea class="form-control" id="product-text" rows="3"></textarea>
            </div>
            <div class="mb-3">
              <label for="product-src" class="form-label">Ссылка на изображение</label>
              <input type="text" class="form-control" id="product-src" />
            </div>
            <button type="submit" class="btn btn-primary">Добавить</button>
          </form>
        </div>
      </div>
    `;
  }

  handleSubmit(event) {
    event.preventDefault();
    const title = document.getElementById("product-title").value.trim();
    const text = document.getElementById("product-text").value.trim();
    const imageLink = document.getElementById("product-src").value.trim();
    const data = { title, text, src: imageLink };
    ajax.post(urls.createProduct(), data, () => {
      const mainPage = new MainPage(this.parent);
      mainPage.render();
    });
  }

  render() {
    this.parent.innerHTML = "";
    const header = new HeaderComponent(this.parent, true);
    header.render();
    this.parent.insertAdjacentHTML("beforeend", this.getHTML());
    const formEl = document.getElementById("add-product-form");
    formEl.addEventListener("submit", this.handleSubmit.bind(this));
  }
}
