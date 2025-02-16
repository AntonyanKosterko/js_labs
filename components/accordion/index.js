export class AccordionComponent {
    constructor(parent) {
      this.parent = parent;
    }
  
    getHTML(items, accordionId = 'dogAccordion') {
      return `
        <div class="w-75 mx-auto">
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
                  <div class="accordion-body p-2">
                    ${item.content}
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }
  
    render(items, accordionId = 'dogAccordion') {
      const html = this.getHTML(items, accordionId);
      this.parent.insertAdjacentHTML('beforeend', html);
    }
  }
  