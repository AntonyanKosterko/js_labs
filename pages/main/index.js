import { CardAccordionComponent } from "../../components/card-accordion/index.js";
import { ProductPage } from "../product/index.js";
import { AnalyticsPage } from "../analytics/index.js";
import { AddProductPage } from "../add-product/index.js";
import { HeaderComponent } from "../../components/header/index.js";
import { urls } from "../../modules/urls.js";

export class MainPage {
  constructor(parent) {
    this.parent = parent;
    this.products = [];
    this.sortAscending = true;
  }

  getInitialData() {
    fetch(urls.getAllProducts())
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.renderProducts(data);
      })
      .catch((err) => {
        console.error("Ошибка при получении товаров:", err);
      });
  }

  get pageRoot() {
    return document.getElementById("main-page");
  }

  clickCard(index) {
    const productPage = new ProductPage(this.parent, index);
    productPage.render();
  }

  goToAnalytics() {
    const analyticsPage = new AnalyticsPage(this.parent);
    analyticsPage.render();
  }

  addProduct() {
    const addProductPage = new AddProductPage(this.parent);
    addProductPage.render();
  }

  sortProducts() {
    this.products.sort((a, b) => {
      const compareResult = a.title.localeCompare(b.title);
      return this.sortAscending ? compareResult : -compareResult;
    });
    this.sortAscending = !this.sortAscending;
    this.renderProducts();
  }

  renderProducts(items) {
    if (items) {
      this.products = items;
    }
    if (!this.products || !this.products.length) {
      this.pageRoot.innerHTML = "<p>Нет товаров</p>";
      return;
    }
    const productsContainer = this.pageRoot;
    productsContainer.innerHTML = "";
    const fixedContainer = document.createElement("div");
    fixedContainer.style.width = "600px";
    fixedContainer.style.margin = "0 auto";
    productsContainer.appendChild(fixedContainer);
    const rowEl = document.createElement("div");
    rowEl.className = "row";
    fixedContainer.appendChild(rowEl);

    this.products.forEach((item, index) => {
      const colEl = document.createElement("div");
      colEl.className = "col-6 mb-4";
      rowEl.appendChild(colEl);
      const cardAccordion = new CardAccordionComponent(colEl);
      cardAccordion.render(
        [item],
        `cardAccordion-${index}`,
        this.clickCard.bind(this, index)
      );
    });
  }

  getHTML() {
    return `
      <div>
        <h1 class="text-center mt-4">Моя корзина Wildberries</h1>
        <p class="text-center">Здесь вы можете посмотреть товары и перейти к подробному описанию.</p>
        <div id="main-page" class="mt-3"></div>
        <div class="d-flex justify-content-center mt-4 gap-2">
          <button class="btn btn-success analytics-btn" id="add-button">
            Добавить товар
          </button>
          <button class="btn btn-warning analytics-btn" id="sort-button">
            Сортировать по названию
          </button>
          <button class="btn btn-info analytics-btn" id="analytics-button">
            Аналитика
          </button>
        </div>
      </div>
    `;
  }

  render() {
    this.parent.innerHTML = "";
    const header = new HeaderComponent(this.parent, false);
    header.render();
    this.parent.insertAdjacentHTML("beforeend", this.getHTML());
    this.getInitialData();
    document
      .getElementById("add-button")
      .addEventListener("click", () => this.addProduct());
    document
      .getElementById("sort-button")
      .addEventListener("click", () => this.sortProducts());
    document
      .getElementById("analytics-button")
      .addEventListener("click", () => this.goToAnalytics());
  }
}
