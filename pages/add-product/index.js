import { urls } from "../../modules/urls.js";
import { MainPage } from "../main/index.js";
import { HeaderComponent } from "../../components/header/index.js";

export class AddProductPage {
  constructor(parent, isEdit = false, productId = null) {
    this.parent = parent;
    this.isEdit = isEdit;
    this.productId = productId;
    this.productData = null;
  }

  getHTML() {
    const pageTitle = this.isEdit
      ? "Редактировать товар"
      : "Добавить новый товар";
    const buttonTitle = this.isEdit
      ? "Обновить товар"
      : "Добавить";

    return `
      <div>
        <h1 class="text-center mt-4">${pageTitle}</h1>
        <p class="text-center">
          ${this.isEdit
            ? "Измените нужные поля и сохраните."
            : "Введите данные для нового товара."
          }
        </p>
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
            <button type="submit" class="btn btn-primary">${buttonTitle}</button>
          </form>
        </div>
      </div>
    `;
  }

  fillForm() {
    if (!this.productData) return;
    document.getElementById("product-title").value = this.productData.title || "";
    document.getElementById("product-text").value = this.productData.text || "";
    document.getElementById("product-src").value = this.productData.src || "";
  }

  handleSubmit(event) {
    event.preventDefault();
    const title = document.getElementById("product-title").value.trim();
    const text = document.getElementById("product-text").value.trim();
    const imageLink = document.getElementById("product-src").value.trim();
    const data = { title, text, src: imageLink };

    if (this.isEdit && this.productId) {
      fetch(urls.patchProduct(this.productId), {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
        .then((res) => {
          if (!res.ok) {
            return Promise.reject(res.statusText);
          }
          const mainPage = new MainPage(this.parent);
          mainPage.render();
          return res.json();
        })
        .then(() => {
          const mainPage = new MainPage(this.parent);
          mainPage.render();
        })
        .catch((err) => {
          console.error("Ошибка при обновлении товара:", err);
        });
    } else {
      fetch(urls.createProduct(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
        .then((res) => {
          if (!res.ok) {
            return Promise.reject(res.statusText);
          }
          const mainPage = new MainPage(this.parent);
          mainPage.render();
          return res.json();
        })
        .then(() => {
          const mainPage = new MainPage(this.parent);
          mainPage.render();
        })
        .catch((err) => {
          console.error("Ошибка при добавлении товара:", err);
        });
    }
  }

  loadProductData() {
    if (!this.productId) {
      return;
    }
    fetch(urls.getProductByIndex(this.productId))
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(res.statusText);
        }
        return res.json();
      })
      .then((product) => {
        this.productData = product;
        this.fillForm();
      })
      .catch((err) => {
        console.error("Ошибка при загрузке товара:", err);
      });
  }

  render() {
    this.parent.innerHTML = "";
    const header = new HeaderComponent(this.parent, true);
    header.render();
    this.parent.insertAdjacentHTML("beforeend", this.getHTML());

    if (this.isEdit) {
      this.loadProductData();
    }

    const formEl = document.getElementById("add-product-form");
    formEl.addEventListener("submit", this.handleSubmit.bind(this));
  }
}
