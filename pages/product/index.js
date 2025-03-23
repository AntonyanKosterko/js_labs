import {ProductComponent} from "../../components/product/index.js";
import {BackButtonComponent} from "../../components/back-button/index.js";
import {MainPage} from "../main/index.js";

export class ProductPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = id;
    }

    getData() {
        const products = {
            0: {
                src: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/a324d91e-4888-4c4a-94d5-61cc8252a3d4/air-force-1-07-shoes-WrLlWX.png",
                title: "Nike Air Force 1",
                text: "Популярные кроссовки от Nike. Прочный верх, классический силуэт, который остаётся вне времени."
            },
            1: {
                src: "https://assets.adidas.com/images/w_600,f_auto,q_auto/8e078a6ecd344076aa46a87001247667_9366/Ultraboost_22_Shoes_White_GX5461_01_standard.jpg",
                title: "Adidas Ultraboost",
                text: "Беговые кроссовки с мягкой амортизацией и удобной посадкой. Отличный выбор для спорта и повседневной носки."
            },
            2: {
                src: "https://lsco.scene7.com/is/image/lsco/005010089-front-pdp?$qv_desktop_full$",
                title: "Levi’s 501 Jeans",
                text: "Классическая модель джинсов, остаётся популярной уже много лет. Отличается прямым кроем и фирменным стилем."
            },
            3: {
                src: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MWP22?wid=2000&hei=2000&fmt=jpeg&qlt=95&.v=1591634795000",
                title: "Apple AirPods Pro",
                text: "Беспроводные наушники с шумоподавлением. Качественный звук и удобная посадка."
            }
        };

        return products[this.id] || {};
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

        const data = this.getData();

        if (!data || !data.title) {
            this.pageRoot.innerHTML = `<p>Продукт не найден</p>`;
            return;
        }

        const product = new ProductComponent(this.pageRoot);
        product.render(data);

        const backButton = new BackButtonComponent(this.pageRoot);
        backButton.render(this.clickBack.bind(this));
    }

    get pageRoot() {
        return document.getElementById('product-page');
    }
}
