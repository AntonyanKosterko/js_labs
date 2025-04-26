import { ajax } from "../../modules/ajax.js";
import { urls } from "../../modules/urls.js";

import { ProductComponent } from "../../../../../components/product/index.js";
import { BackButtonComponent } from "../../../../../components/back-button/index.js";
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

        ajax.get(urls.getProductByIndex(this.id), (data) => {
            if (!data || !data.title) {
                this.pageRoot.innerHTML = `<p>Продукт не найден</p>`;
                return;
            }

            const product = new ProductComponent(this.pageRoot);
            product.render(data);

            const backButton = new BackButtonComponent(this.pageRoot);
            backButton.render(this.clickBack.bind(this));
        });
    }

    get pageRoot() {
        return document.getElementById('product-page');
    }
}
