import {ButtonComponent} from "../../components/button/index.js";
import {ProductCardComponent} from "../../components/product-card/index.js";
import {AccordionComponent} from "../../components/accordion/index.js";
import {ProductPage} from "../product/index.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
    }

    getData() {
        return [
            {
                title: 'Раздел 1',
                content: 'Содержимое первого раздела'
            },
            {
                title: 'Раздел 2',
                content: 'Содержимое второго раздела'
            },
            {
                title: 'Раздел 3',
                content: 'Содержимое третьего раздела'
            }
        ]
    }

    get pageRoot() {
        return document.getElementById('main-page')
    }

    clickCard(e) {
        const cardId = e.target.dataset.id
    
        const productPage = new ProductPage(this.parent, cardId)
        productPage.render()
    }
        
    getHTML() {
        return (
            `
                <div id="main-page" class="d-flex flex-wrap"><div/>
            `
        )
    }
    
    render() {
        this.parent.innerHTML = ''
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)
        
        const data = this.getData()
        /*
        data.forEach((item) => {
            const accordion = new AccordionComponent(this.pageRoot)
            accordion.render([item])
        })
        */
        const accordion = new AccordionComponent(this.pageRoot)
        accordion.render(data, 'myAccordion')
    }
    
}