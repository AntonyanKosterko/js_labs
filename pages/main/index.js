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
                  title: 'Golden Retriever',
                  content: `
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0gcUu-D8ElLcFw0TZSvCdBasqs4rG_YesHQm9Rw269lUZeRMN-dPzVZ9VH82U9Ji8OC3XHBke75d21Coy7Cho4Q"
                      class="img-fluid"
                      alt="Golden Retriever"
                    />
                    <p>Golden Retrievers are friendly, intelligent, and devoted.</p>
                  `
                },
                {
                  title: 'German Shepherd',
                  content: `
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/d/d0/German_Shepherd_-_DSC_0346_%2810096362833%29.jpg"
                      class="img-fluid"
                      alt="German Shepherd"
                    />
                    <p>German Shepherds are known for their intelligence and loyalty.</p>
                  `
                },
                {
                  title: 'Bulldog',
                  content: `
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Bulldog_inglese.jpg/800px-Bulldog_inglese.jpg"
                      class="img-fluid"
                      alt="Bulldog"
                    />
                    <p>Bulldogs are calm and friendly, with a distinctive wrinkled face.</p>
                  `
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
        data.forEach((item, index) => {
            const accordion = new AccordionComponent(this.pageRoot)
            // Передаём массив из одного объекта [item], а вторым параметром — уникальный ID
            accordion.render([item], `accordion-${index}`)
          })
    }
    
}