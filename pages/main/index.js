import {AccordionComponent} from "../../components/accordion/index.js";
import {ProductPage} from "../product/index.js";

export class MainPage {
  constructor(parent) {
    this.parent = parent;
  }

  getData() {
    return [
      {
        title: 'Nike Air Force 1',
        content: `
          <img
            src="https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/a324d91e-4888-4c4a-94d5-61cc8252a3d4/air-force-1-07-shoes-WrLlWX.png"
            class="img-fluid"
            alt="Nike Air Force 1"
          />
          <p>Популярные кроссовки от Nike. Прочный верх, классический силуэт.</p>
        `
      },
      {
        title: 'Adidas Ultraboost',
        content: `
          <img
            src="https://assets.adidas.com/images/w_600,f_auto,q_auto/8e078a6ecd344076aa46a87001247667_9366/Ultraboost_22_Shoes_White_GX5461_01_standard.jpg"
            class="img-fluid"
            alt="Adidas Ultraboost"
          />
          <p>Беговые кроссовки с мягкой амортизацией и удобной посадкой.</p>
        `
      },
      {
        title: 'Levi’s 501 Jeans',
        content: `
          <img
            src="https://lsco.scene7.com/is/image/lsco/005010089-front-pdp?$qv_desktop_full$"
            class="img-fluid"
            alt="Levi’s 501 Jeans"
          />
          <p>Классическая модель джинсов, остаётся популярной уже много лет.</p>
        `
      },
      {
        title: 'Apple AirPods Pro',
        content: `
          <img
            src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MWP22?wid=2000&hei=2000&fmt=jpeg&qlt=95&.v=1591634795000"
            class="img-fluid"
            alt="Apple AirPods Pro"
          />
          <p>Беспроводные наушники с шумоподавлением и отличным качеством звука.</p>
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
      
  getHTML() {
    return `
      <h1 class="text-center mt-4">Моя корзина Wildberries</h1>
      <p class="text-center">Здесь вы можете посмотреть товары и перейти к подробному описанию.</p>
      <div id="main-page" class="d-flex flex-wrap justify-content-center mt-3"></div>
    `;
  }
      
  render() {
    this.parent.innerHTML = '';
    const html = this.getHTML();
    this.parent.insertAdjacentHTML('beforeend', html);
    
    const data = this.getData();
    data.forEach((item, index) => {
      const accordion = new AccordionComponent(this.pageRoot);
      accordion.render([item], `cartAccordion-${index}`, this.clickCard.bind(this, index));
    });

  }
}
