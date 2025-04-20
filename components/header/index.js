
import { BackButtonComponent } from "../back-button/index.js";
import { MainPage } from "../../pages/main/index.js";

export class HeaderComponent {
  constructor(parent, showHomeButton = false) {
    this.parent = parent;
    this.showHomeButton = showHomeButton;
  }

  render() {
    const headerEl = document.createElement("header");
    headerEl.className = "d-flex justify-content-between align-items-center p-3 mb-3 border-bottom";

    const titleEl = document.createElement("h2");
    titleEl.textContent = "WB";
    headerEl.appendChild(titleEl);

    this.parent.appendChild(headerEl);

    if (this.showHomeButton) {
      const buttonContainer = document.createElement("div");
      headerEl.appendChild(buttonContainer);

      const backButton = new BackButtonComponent(buttonContainer);
      backButton.render(() => {
        const mainPage = new MainPage(this.parent);
        mainPage.render();
      });
    }
  }
}