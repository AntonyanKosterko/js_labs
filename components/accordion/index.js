export class AccordionComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(items, accordionId = 'myAccordion') {
        return `
            <div class="accordion" id="${accordionId}">
                ${items.map((item, index) => `
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="${accordionId}-heading-${index}">
                            <button
                                class="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#${accordionId}-collapse-${index}"
                                aria-expanded="false"
                                aria-controls="${accordionId}-collapse-${index}"
                            >
                                ${item.title}
                            </button>
                        </h2>
                        <div
                            id="${accordionId}-collapse-${index}"
                            class="accordion-collapse collapse"
                            aria-labelledby="${accordionId}-heading-${index}"
                            data-bs-parent="#${accordionId}"
                        >
                            <div class="accordion-body">
                                ${item.content}
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    render(items, accordionId) {
        const html = this.getHTML(items, accordionId);
        this.parent.insertAdjacentHTML('beforeend', html);
    }
}
