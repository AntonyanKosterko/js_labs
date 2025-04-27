(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();class P{constructor(){this.url="http://localhost:3000"}getAllProducts(){return`${this.url}/products`}getProductByIndex(t){return`${this.url}/products/${t}`}createProduct(){return`${this.url}/products`}deleteProduct(t){return`${this.url}/products/${t}`}patchProduct(t){return`${this.url}/products/${t}`}}const p=new P;class v{constructor(t){this.parent=t}addListeners(t){document.getElementById("back-button").addEventListener("click",t)}getHTML(){return`
        <button class="btn btn-primary mt-4" id="back-button">Домой</button>
      `}render(t){const e=this.getHTML();this.parent.insertAdjacentHTML("beforeend",e),this.addListeners(t)}}class b{constructor(t,e=!1){this.parent=t,this.showHomeButton=e}render(){const t=document.createElement("header");t.className="d-flex justify-content-between align-items-center p-3 mb-3 border-bottom";const e=document.createElement("h2");if(e.textContent="WB",t.appendChild(e),this.parent.appendChild(t),this.showHomeButton){const n=document.createElement("div");t.appendChild(n),new v(n).render(()=>{new u(this.parent).render()})}}}class y{constructor(t,e=!1,n=null){this.parent=t,this.isEdit=e,this.productId=n,this.productData=null}getHTML(){const t=this.isEdit?"Редактировать товар":"Добавить новый товар",e=this.isEdit?"Обновить товар":"Добавить";return`
      <div>
        <h1 class="text-center mt-4">${t}</h1>
        <p class="text-center">
          ${this.isEdit?"Измените нужные поля и сохраните.":"Введите данные для нового товара."}
        </p>
        <div class="d-flex justify-content-center mt-3">
          <form id="add-product-form" style="width: 600px;">
            <div class="mb-3">
              <label for="product-title" class="form-label">Название товара</label>
              <input type="text" class="form-control" id="product-title" required />
            </div>
            <div class="mb-3">
              <label for="product-text" class="form-label">Описание</label>
              <textarea class="form-control" id="product-text" rows="3"></textarea>
            </div>
            <div class="mb-3">
              <label for="product-src" class="form-label">Ссылка на изображение</label>
              <input type="text" class="form-control" id="product-src" />
            </div>
            <button type="submit" class="btn btn-primary">${e}</button>
          </form>
        </div>
      </div>
    `}fillForm(){this.productData&&(document.getElementById("product-title").value=this.productData.title||"",document.getElementById("product-text").value=this.productData.text||"",document.getElementById("product-src").value=this.productData.src||"")}handleSubmit(t){t.preventDefault();const e=document.getElementById("product-title").value.trim(),n=document.getElementById("product-text").value.trim(),s=document.getElementById("product-src").value.trim(),r={title:e,text:n,src:s};this.isEdit&&this.productId?fetch(p.patchProduct(this.productId),{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)}).then(o=>o.ok?(new u(this.parent).render(),o.json()):Promise.reject(o.statusText)).then(()=>{new u(this.parent).render()}).catch(o=>{console.error("Ошибка при обновлении товара:",o)}):fetch(p.createProduct(),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)}).then(o=>o.ok?(new u(this.parent).render(),o.json()):Promise.reject(o.statusText)).then(()=>{new u(this.parent).render()}).catch(o=>{console.error("Ошибка при добавлении товара:",o)})}loadProductData(){this.productId&&fetch(p.getProductByIndex(this.productId)).then(t=>t.ok?t.json():Promise.reject(t.statusText)).then(t=>{this.productData=t,this.fillForm()}).catch(t=>{console.error("Ошибка при загрузке товара:",t)})}render(){this.parent.innerHTML="",new b(this.parent,!0).render(),this.parent.insertAdjacentHTML("beforeend",this.getHTML()),this.isEdit&&this.loadProductData(),document.getElementById("add-product-form").addEventListener("submit",this.handleSubmit.bind(this))}}class E{constructor(t){this.parent=t}getHTML(t,e="cardAccordion"){return t.map((n,s)=>`
      <div class="card mb-3" style="background-color: #B032FD; color: #fff;">
        <img 
          src="${n.src}" 
          alt="product-image"
          style="width: 100%; max-height: 200px; object-fit: cover;"
        />
        <div class="card-body pb-2 pt-2" style="background-color: inherit;">
          <div class="d-flex justify-content-between align-items-center">
            <h5 class="card-title mb-0">${n.title}</h5>
            <button 
              class="btn p-0"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#${e}-collapse-${s}"
              aria-expanded="false"
              aria-controls="${e}-collapse-${s}"
              style="border: none; background: none; color: #fff;"
            >
              <i class="bi bi-chevron-down fs-5"></i>
            </button>
          </div>
        </div>
        <div
          id="${e}-collapse-${s}"
          class="collapse"
          style="background-color: #B032FD;"
        >
          <div class="card-body pt-2" style="background-color: inherit;">
            <p class="mb-3">${n.text}</p>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex gap-2">
                <button
                  class="btn btn-success"
                  type="button"
                  style="background-color: #7D18F8; border: none;"
                  data-id="${n.id}"
                  id="${e}-button-${s}"
                >
                  Перейти к продукту
                </button>
                <button
                  class="btn btn-danger delete-button"
                  type="button"
                  style="background-color: #7D18F8; border: none;"
                  data-id="${n.id}"
                >
                  Удалить
                </button>
              </div>
              <div>
                <button
                  class="btn btn-primary edit-button"
                  type="button"
                  style="background-color: #7D18F8; border: none;"
                  data-id="${n.id}"
                >
                  Редактировать
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `).join("")}render(t,e="cardAccordion",n){const s=this.getHTML(t,e);this.parent.insertAdjacentHTML("beforeend",s),n&&t.forEach((c,d)=>{const l=document.getElementById(`${e}-button-${d}`);l&&l.addEventListener("click",a=>{a.preventDefault(),n(a)})}),this.parent.querySelectorAll(".edit-button").forEach(c=>{c.addEventListener("click",d=>{d.preventDefault();const l=c.dataset.id,a=document.getElementById("root");new y(a,!0,l).render()})}),this.parent.querySelectorAll(".delete-button").forEach(c=>{c.addEventListener("click",d=>{d.preventDefault();const l=c.dataset.id;fetch(p.deleteProduct(l),{method:"DELETE"}).then(a=>{if(!a.ok)return Promise.reject(a.statusText);const m=document.getElementById("root");return new u(m).render(),a.json()}).catch(a=>{console.error("Ошибка при удалении товара:",a)})})})}}class x{constructor(t){this.parent=t}getHTML(t){return`
                    <div class="card" style="width: 300px; text-align: center;">
                        <img class="card-img-top" src="${t.src}" alt="картинка">
                        <div class="card-body">
                            <h5 class="card-title">${t.title}</h5>
                            <p class="card-text">${t.text}</p>
                        </div>
                    </div>
            `}render(t){const e=this.getHTML(t);this.parent.insertAdjacentHTML("beforeend",e)}}class L{constructor(t,e){this.parent=t,this.id=e}getHTML(){return`
      <div
        id="product-page"
        class="d-flex flex-column justify-content-center align-items-center"
        style="min-height: 100vh;"
      >
      </div>
    `}clickBack(){new u(this.parent).render()}render(){this.parent.innerHTML="";const t=this.getHTML();this.parent.insertAdjacentHTML("beforeend",t),fetch(p.getProductByIndex(this.id)).then(e=>{if(!e.ok)throw new Error(`Ошибка запроса: ${e.status} ${e.statusText}`);return e.json()}).then(e=>{if(!e||!e.title){this.pageRoot.innerHTML="<p>Продукт не найден</p>";return}new x(this.pageRoot).render(e),new v(this.pageRoot).render(this.clickBack.bind(this))}).catch(e=>{console.error("Ошибка при загрузке товара:",e),this.pageRoot.innerHTML="<p>Произошла ошибка при загрузке товара</p>"})}get pageRoot(){return document.getElementById("product-page")}}function B(i,t){return i.join(t)}function T(i){return i.filter(Boolean)}function I(i){let t=Number.NEGATIVE_INFINITY;for(let e=0;e<i.length;e++)for(let n=e+1;n<i.length;n++)for(let s=0;s<i.length;s++)for(let r=s+1;r<i.length;r++)if(e!==s&&e!==r&&n!==s&&n!==r){const o=i[e]*i[n]-i[s]*i[r];o>t&&(t=o)}return t}function w(i){const t=new Map;for(let n of i){if(n=n.trim(),!n)continue;const s=n.split("").sort().join("");t.has(s)||t.set(s,[]),t.get(s).push(n)}const e=[];for(let n of t.values())n.length>=2&&(n.sort(),e.push(n));return e.sort((n,s)=>n[0].localeCompare(s[0])),e}class ${constructor(t){this.parent=t}get pageRoot(){return document.getElementById("analytics-page")}getHTML(){return`
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
      </div>
    `}render(){this.parent.innerHTML="",new b(this.parent,!0).render(),this.parent.insertAdjacentHTML("beforeend",this.getHTML());const e=["Nike AF1","Apple AirPods","Levi’s Jeans"],n=" | ";document.getElementById("concat-items").textContent=B(e,n);const s=[0,"iPhone 14",void 0," ",null,"Guitar",!1],r=T(s);document.getElementById("erase-result").textContent=`Исходные: ${JSON.stringify(s)} | Очищенные: ${JSON.stringify(r)}`;const o=document.getElementById("mq-input"),c=document.getElementById("mq-button"),d=document.getElementById("mq-result");c.addEventListener("click",()=>{const g=o.value.split(",").map(h=>Number(h.trim())).filter(h=>!isNaN(h)),f=I(g);d.textContent=f});const l=document.getElementById("anagram-input"),a=document.getElementById("anagram-button"),m=document.getElementById("anagram-result");a.addEventListener("click",()=>{const g=l.value.split(","),f=w(g);m.innerHTML=f.length===0?"Нет групп из 2+ слов.":f.map(h=>`[${h.join(", ")}]`).join("<br/>")})}}class u{constructor(t){this.parent=t,this.products=[],this.sortAscending=!0}getInitialData(){fetch(p.getAllProducts()).then(t=>t.json()).then(t=>{console.log(t),this.renderProducts(t)}).catch(t=>{console.error("Ошибка при получении товаров:",t)})}get pageRoot(){return document.getElementById("main-page")}clickCard(t){new L(this.parent,t).render()}goToAnalytics(){new $(this.parent).render()}addProduct(){new y(this.parent).render()}sortProducts(){this.products.sort((t,e)=>{const n=t.title.localeCompare(e.title);return this.sortAscending?n:-n}),this.sortAscending=!this.sortAscending,this.renderProducts()}renderProducts(t){if(t&&(this.products=t),!this.products||!this.products.length){this.pageRoot.innerHTML="<p>Нет товаров</p>";return}const e=this.pageRoot;e.innerHTML="";const n=document.createElement("div");n.style.width="600px",n.style.margin="0 auto",e.appendChild(n);const s=document.createElement("div");s.className="row",n.appendChild(s),this.products.forEach((r,o)=>{const c=document.createElement("div");c.className="col-6 mb-4",s.appendChild(c),new E(c).render([r],`cardAccordion-${o}`,this.clickCard.bind(this,o))})}getHTML(){return`
      <div>
        <h1 class="text-center mt-4">Моя корзина Wildberries</h1>
        <p class="text-center">Здесь вы можете посмотреть товары и перейти к подробному описанию.</p>
        <div id="main-page" class="mt-3"></div>
        <div class="d-flex justify-content-center mt-4 gap-2">
          <button class="btn btn-success analytics-btn" id="add-button">
            Добавить товар
          </button>
          <button class="btn btn-warning analytics-btn" id="sort-button">
            Сортировать по названию
          </button>
          <button class="btn btn-info analytics-btn" id="analytics-button">
            Аналитика
          </button>
        </div>
      </div>
    `}render(){this.parent.innerHTML="",new b(this.parent,!1).render(),this.parent.insertAdjacentHTML("beforeend",this.getHTML()),this.getInitialData(),document.getElementById("add-button").addEventListener("click",()=>this.addProduct()),document.getElementById("sort-button").addEventListener("click",()=>this.sortProducts()),document.getElementById("analytics-button").addEventListener("click",()=>this.goToAnalytics())}}const M=document.getElementById("root"),H=new u(M);H.render();
