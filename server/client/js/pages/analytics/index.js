import {formatProductFeatures} from "../../services/formatProductFeatures.js";
import {sanitizeProductAttributes} from "../../services/sanitizeProductAttributes.js";
import {findMaxPriceCombinationDifference} from "../../services/findMaxPriceCombinationDifference.js";
import {groupAnagrams} from "../../services/groupAnagrams.js";

import {BackButtonComponent} from "../../../../../components/back-button/index.js";

export class AnalyticsPage {
  constructor(parent) {
    this.parent = parent;
  }

  get pageRoot() {
    return document.getElementById('analytics-page');
  }

  getHTML() {
    return `
    <div id="analytics-page" class="analytics-container">
    <div class="analytics-header">
      <h2 class="analytics-title">Аналитика Wildberries</h2>
    </div>
    
    <div class="analytics-section">
      <div class="section-header">
        <i class="fas fa-link section-icon"></i>
        <h4 class="section-title">Склеивание характеристик товаров</h4>
      </div>
      <div class="section-content">
        <p class="input-label">Товары для склеивания:</p>
        <div class="result-box" id="concat-items"></div>
      </div>
    </div>
  
    <div class="analytics-section">
      <div class="section-header">
        <i class="fas fa-broom section-icon"></i>
        <h4 class="section-title">Очистка корзины</h4>
      </div>
      <div class="section-content">
        <p class="input-label">Результат очистки:</p>
        <div class="result-box" id="erase-result"></div>
      </div>
    </div>
  
    <div class="analytics-section">
      <div class="section-header">
        <i class="fas fa-chart-line section-icon"></i>
        <h4 class="section-title">Анализ цен</h4>
      </div>
      <div class="section-content">
        <p class="input-label">Введите цены товаров через запятую:</p>
        <div class="input-group">
          <input type="text" id="mq-input" class="form-input" value="5,6,2,7,4" />
          <button id="mq-button" class="primary-button">
            <i class="fas fa-calculator"></i> Рассчитать
          </button>
        </div>
        <p class="result-label">Результат:</p>
        <div class="result-box" id="mq-result"></div>
      </div>
    </div>
  
    <div class="analytics-section">
      <div class="section-header">
        <i class="fas fa-font section-icon"></i>
        <h4 class="section-title">Поиск анаграмм</h4>
      </div>
      <div class="section-content">
        <p class="input-label">Введите слова через запятую:</p>
        <textarea id="anagram-input" class="form-textarea" rows="3">
  listen, silent, license, silence, cat, tac, act
        </textarea>
        <button id="anagram-button" class="primary-button">
          <i class="fas fa-search"></i> Найти анаграммы
        </button>
        <p class="result-label">Результат:</p>
        <div class="result-box" id="anagram-result"></div>
      </div>
    </div>
  
    <div id="back-button-container" class="back-button-wrapper"></div>
  </div>
    `;
  }

  clickBack() {
    window.location.reload();
  }

  render() {
    this.parent.innerHTML = '';
    this.parent.insertAdjacentHTML('beforeend', this.getHTML());

    const sampleItems = ['Nike AF1', 'Apple AirPods', 'Levi’s Jeans'];
    const delimiter = ' | ';
    const concatElem = document.getElementById('concat-items');
    concatElem.textContent = formatProductFeatures(sampleItems, delimiter);

    const basketData = [0, 'iPhone 14', undefined, ' ', null, 'Guitar', false];
    const cleaned = sanitizeProductAttributes(basketData);
    document.getElementById('erase-result').textContent =
      `Исходные: ${JSON.stringify(basketData)} | Очищенные: ${JSON.stringify(cleaned)}`;

    const mqInput = document.getElementById('mq-input');
    const mqButton = document.getElementById('mq-button');
    const mqResult = document.getElementById('mq-result');

    mqButton.addEventListener('click', () => {
      const nums = mqInput.value
        .split(',')
        .map(num => Number(num.trim()))
        .filter(n => !isNaN(n));
      const diff = findMaxPriceCombinationDifference(nums);
      mqResult.textContent = diff;
    });

    const anagramInput = document.getElementById('anagram-input');
    const anagramButton = document.getElementById('anagram-button');
    const anagramResult = document.getElementById('anagram-result');

    anagramButton.addEventListener('click', () => {
      const words = anagramInput.value.split(',');
      const groups = groupAnagrams(words);
      if (groups.length === 0) {
        anagramResult.textContent = 'Нет групп из 2+ слов.';
      } else {
        anagramResult.innerHTML = groups.map(group => `[${group.join(', ')}]`).join('<br/>');
      }
    });

    const backButton = new BackButtonComponent(document.getElementById('back-button-container'));
    backButton.render(this.clickBack.bind(this));
  }
}
