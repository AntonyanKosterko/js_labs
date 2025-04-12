export class CardAccordionComponent {
    constructor(parent) {
      this.parent = parent;
    }
  
    getHTML(items, cardId = 'cardAccordion') {
      return items.map((item, index) => `
        <!-- Весь блок карточки -->
        <div class="card mb-3" 
             style="background-color: #B032FD; color: #fff;">
          <!-- Изображение -->
          <img 
            src="${item.src}" 
            alt="product-image"
            style="width: 100%; max-height: 200px; object-fit: cover;"
          >
          
          <!-- Верхняя часть карточки (название + иконка) -->
          <div class="card-body pb-2 pt-2" style="background-color: inherit;">
            <!-- d-flex: чтобы разместить заголовок слева и иконку справа -->
            <div class="d-flex justify-content-between align-items-center">
              <h5 class="card-title mb-0">${item.title}</h5>
              
              <!-- Кнопка-стрелочка (используем иконку из Bootstrap Icons) -->
              <button 
                class="btn p-0" 
                type="button" 
                data-bs-toggle="collapse" 
                data-bs-target="#${cardId}-collapse-${index}" 
                aria-expanded="false" 
                aria-controls="${cardId}-collapse-${index}"
                style="border: none; background: none; color: #fff;"
              >
                <i class="bi bi-chevron-down fs-5"></i>
              </button>
            </div>
          </div>
          
          <!-- Разворачиваемый блок (описание + кнопки) -->
          <div 
            id="${cardId}-collapse-${index}" 
            class="collapse"
            style="background-color: #B032FD;"
          >
            <!-- Внутренний блок с описанием и кнопками внизу -->
            <div class="card-body pt-2" style="background-color: inherit;">
              <!-- Текст описания -->
              <p class="mb-3">${item.description}</p>
  
              <!-- Кнопка «Перейти к продукту» и «Удалить» -->
              <div class="d-flex gap-2">
                <button 
                  class="btn btn-success" 
                  style="background-color: #7D18F8;
                    border : none;
                  "
                  data-id="${index}" 
                  id="${cardId}-button-${index}"
                >
                  Перейти к продукту
                </button>
                <button 
                  class="btn btn-danger delete-button" 
                  style="background-color: #7D18F8;
                  border : none;"
                  data-id="${index}"
                >
                  Удалить
                </button>
              </div>
            </div>
          </div>
        </div>
      `).join('');
    }
  
    render(items, cardId = 'cardAccordion', buttonClickCallback) {
      const html = this.getHTML(items, cardId);
      this.parent.insertAdjacentHTML('beforeend', html);
  
      // Привязка колбэка к кнопкам «Перейти к продукту», если он есть
      if (buttonClickCallback) {
        items.forEach((item, index) => {
          const productButton = document.getElementById(`${cardId}-button-${index}`);
          if (productButton) {
            productButton.addEventListener('click', (event) => {
              buttonClickCallback(event);
            });
          }
        });
      }
  
      // Находим все кнопки «Удалить» и вешаем обработчик для удаления карточки
      const cardContainer = this.parent;
      const deleteButtons = cardContainer.querySelectorAll('.delete-button');
      deleteButtons.forEach((deleteButton) => {
        deleteButton.addEventListener('click', (event) => {
          const card = event.currentTarget.closest('.card');
          if (card) {
            card.remove();
          }
        });
      });
    }
  }
  