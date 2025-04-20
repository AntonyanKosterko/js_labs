import { ajax } from "../../modules/ajax.js";
import { urls } from "../../modules/urls.js";
import { MainPage } from "../../pages/main/index.js";
import { AddProductPage } from "../../pages/add-product/index.js";

export class CardAccordionComponent {
  constructor(parent) {
    this.parent = parent;
  }

  getHTML(items, cardId = "cardAccordion") {
    return items.map((item, index) => `
      <div class="card mb-3" style="background-color: #B032FD; color: #fff;">
        <img 
          src="${item.src}" 
          alt="product-image"
          style="width: 100%; max-height: 200px; object-fit: cover;"
        />
        <div class="card-body pb-2 pt-2" style="background-color: inherit;">
          <div class="d-flex justify-content-between align-items-center">
            <h5 class="card-title mb-0">${item.title}</h5>
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
        <div
          id="${cardId}-collapse-${index}"
          class="collapse"
          style="background-color: #B032FD;"
        >
          <div class="card-body pt-2" style="background-color: inherit;">
            <p class="mb-3">${item.text}</p>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex gap-2">
                <button
                  class="btn btn-success"
                  type="button"
                  style="background-color: #7D18F8; border: none;"
                  data-id="${item.id}"
                  id="${cardId}-button-${index}"
                >
                  Перейти к продукту
                </button>
                <button
                  class="btn btn-danger delete-button"
                  type="button"
                  style="background-color: #7D18F8; border: none;"
                  data-id="${item.id}"
                >
                  Удалить
                </button>
              </div>
              <div>
                <button
                  class="btn btn-primary edit-button"
                  type="button"
                  style="background-color: #7D18F8; border: none;"
                  data-id="${item.id}"
                >
                  Редактировать
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `).join("");
  }

  render(items, cardId = "cardAccordion", buttonClickCallback) {
    const html = this.getHTML(items, cardId);
    this.parent.insertAdjacentHTML("beforeend", html);

    if (buttonClickCallback) {
      items.forEach((item, index) => {
        const productButton = document.getElementById(`${cardId}-button-${index}`);
        if (productButton) {
          productButton.addEventListener("click", (event) => {
            event.preventDefault();
            buttonClickCallback(event);
          });
        }
      });
    }

    const editButtons = this.parent.querySelectorAll(".edit-button");
    editButtons.forEach((editButton) => {
      editButton.addEventListener("click", (event) => {
        event.preventDefault();
        const productId = editButton.dataset.id;
        const appRoot = document.getElementById("root");
        const editProductPage = new AddProductPage(appRoot, true, productId);
        editProductPage.render();
      });
    });

    const deleteButtons = this.parent.querySelectorAll(".delete-button");
    deleteButtons.forEach((deleteButton) => {
      deleteButton.addEventListener("click", (event) => {
        event.preventDefault();
        const productId = deleteButton.dataset.id;
        ajax.delete(
          urls.deleteProduct(productId),
          {},
          () => {
            const card = deleteButton.closest(".card");
            if (card) {
              card.remove();
            }
          },
          (err) => {
            console.error("Ошибка при удалении:", err);
          }
        );
      });
    });
  }
}
