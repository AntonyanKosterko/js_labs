import { AccordionComponent } from '../../components/accordion/index.js';
import { ProductPage } from '../product/index.js';
import { AnalyticsPage } from '../analytics/index.js';

export class MainPage {
  constructor(parent) {
    this.parent = parent;
    this.products = [];
    this.currentIndex = 0;
  }

  async fetchProducts() {
    try {
      const response = await fetch('http://localhost:8000/api/dogs');
      const data = await response.json();
      console.log('Данные товаров загружены:', data);
      this.products = data.map(item => ({
        title: item.title || 'Без названия',
        src: item.src || 'Без названия',
        text: item.text || 'Без названия',
      }));
      console.log(this.products);
      this.renderProducts();
    } catch (error) {
      console.error('Ошибка загрузки данных:', error);
      // Запасные данные на случай ошибки
      this.products = this.getFallbackData();
      this.renderProducts();
    }
  }

  getFallbackData() {
    return [
      {
        title: 'Товар 1',
        content: `
          <img
            src="https://via.placeholder.com/300"
            class="img-fluid"
            alt="Запасной товар"
          />
          <p>Данные временно недоступны</p>
        `
      }
    ];
  }

  get pageRoot() {
    return document.getElementById('main-page');
  }

  clickCard(index, e) {
    const productPage = new ProductPage(this.parent, index);
    productPage.render();
  }

  goToAnalytics() {
    const analyticsPage = new AnalyticsPage(this.parent);
    analyticsPage.render();
  }

  addProduct() {
    if (this.products.length > 0) {
      const firstProduct = JSON.parse(JSON.stringify(this.products[0]));
      firstProduct.title = `${firstProduct.title}`;
      this.products.push(firstProduct);
      this.renderProducts();
    }
  }

  removeProduct() {
    if (this.products.length > 0) {
      this.products.pop();
      this.renderProducts();
    }
  }

  renderProducts() {
    const productsContainer = this.pageRoot;
    productsContainer.innerHTML = '';
    
    this.products.forEach((item, index) => {
      const accordion = new AccordionComponent(productsContainer);
      accordion.render([item], `cartAccordion-${index}`, this.clickCard.bind(this, index));
    });
  }
      
  getHTML() {
    return `
      <div>
        <h1 class="text-center mt-4">Моя корзина Wildberries</h1>
        <p class="text-center">Здесь вы можете посмотреть товары и перейти к подробному описанию.</p>
        <div id="main-page" class="d-flex flex-wrap justify-content-center mt-3"></div>
        
        <div class="d-flex justify-content-center mt-4 gap-2">
          <button class="btn btn-success analytics-btn" id="add-button">
            Добавить товар
          </button>
          <button class="btn btn-danger analytics-btn" id="remove-button">
            Удалить товар
          </button>
          <button class="btn btn-info analytics-btn" id="analytics-button">
            Аналитика
          </button>
        </div>
      </div>
    `;
  }
      
  render() {
    this.parent.innerHTML = '';
    this.parent.insertAdjacentHTML('beforeend', this.getHTML());
    
    this.fetchProducts();

    document.getElementById('add-button').addEventListener('click', () => {
      this.addProduct();
    });

    document.getElementById('remove-button').addEventListener('click', () => {
      this.removeProduct();
    });

    document.getElementById('analytics-button').addEventListener('click', () => {
      this.goToAnalytics();
    });
  }
}