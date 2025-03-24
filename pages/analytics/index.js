import {concatenate} from "../../services/concatenate.js";
import {erase} from "../../services/erase.js";
import {maxQualityDifference} from "../../services/maxQualityDifference.js";
import {groupAnagrams} from "../../services/groupAnagrams.js";

import {BackButtonComponent} from "../../components/back-button/index.js";

export class AnalyticsPage {
  constructor(parent) {
    this.parent = parent;
  }

  get pageRoot() {
    return document.getElementById('analytics-page');
  }

  getHTML() {
    return `
      <div id="analytics-page" class="p-4">
        <h2>Аналитика Wildberries</h2>
        
        <!-- Пример 1: concatenate -->
        <div class="mt-3">
          <h4>Склеиваем товары:</h4>
          <div>Товары: <span id="concat-items"></span></div>
        </div>

        <!-- Пример 2: erase -->
        <div class="mt-3">
          <h4>Очистка корзины от ложных значений:</h4>
          <div id="erase-result"></div>
        </div>

        <!-- Пример 3: maxQualityDifference -->
        <div class="mt-3">
          <h4>Максимальная качественная разница:</h4>
          <label>Введите массив чисел, через запятую:</label>
          <input type="text" id="mq-input" value="5,6,2,7,4" />
          <button id="mq-button" class="btn btn-primary">Рассчитать</button>
          <p>Результат: <span id="mq-result"></span></p>
        </div>

        <!-- Пример 4: groupAnagrams -->
        <div class="mt-3">
          <h4>Группировка слов-анаграмм:</h4>
          <label>Введите слова, разделённые запятой:</label><br />
          <textarea id="anagram-input" rows="3" cols="40">
listen, silent, license, silence, cat, tac, act
          </textarea><br />
          <button id="anagram-button" class="btn btn-primary">Показать анаграммы</button>
          <div id="anagram-result" class="mt-2"></div>
        </div>

        <div id="back-button-container" class="mt-4"></div>
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
    concatElem.textContent = concatenate(sampleItems, delimiter);

    const basketData = [0, 'iPhone 14', undefined, ' ', null, 'Guitar', false];
    const cleaned = erase(basketData);
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
      const diff = maxQualityDifference(nums);
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
