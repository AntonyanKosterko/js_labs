import {ProductComponent} from "../../components/product/index.js";
import {BackButtonComponent} from "../../components/back-button/index.js";
import {MainPage} from "../main/index.js";

export class ProductPage {
    constructor(parent, id) {
        this.parent = parent
        this.id = id
    }

    getData() {
        const products = {
            0: {
                src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0gcUu-D8ElLcFw0TZSvCdBasqs4rG_YesHQm9Rw269lUZeRMN-dPzVZ9VH82U9Ji8OC3XHBke75d21Coy7Cho4Q",
                title: "Golden Retriever",
                text: "Golden Retrievers are friendly, intelligent, and devoted. They are one of the most popular dog breeds."
            },
            1: {
                src: "https://upload.wikimedia.org/wikipedia/commons/d/d0/German_Shepherd_-_DSC_0346_%2810096362833%29.jpg",
                title: "German Shepherd",
                text: "German Shepherds are known for their intelligence, courage, and loyalty. They are often used in police and military roles."
            },
            2: {
                src: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Bulldog_inglese.jpg/800px-Bulldog_inglese.jpg",
                title: "Bulldog",
                text: "Bulldogs are calm, courageous, and friendly. They are known for their wrinkled face and muscular build."
            }
        };

        return products[this.id] || {};
    }

    get pageRoot() {
        return document.getElementById('product-page')
    }

    getHTML() {
        return `
            <div id="product-page"></div>
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

        const backButton = new BackButtonComponent(this.pageRoot);
        backButton.render(this.clickBack.bind(this));

        const data = this.getData();

        if (!data || !data.title) {
            this.pageRoot.innerHTML = `<p>Продукт не найден</p>`;
            return;
        }

        const product = new ProductComponent(this.pageRoot);
        product.render(data);
    }
}
