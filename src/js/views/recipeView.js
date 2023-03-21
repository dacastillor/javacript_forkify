import icons from '../../img/icons.svg'; // Parcel 1
import fracty from 'fracty'; // se usa este proque fractional no funcionó

// Vista = Logica para visualización del cliente

class RecipeView {
  #parentElement = document.querySelector('.recipe'); // se hace de uso privado para no permitir alterar fácilmente la vista
  #data;
  #errorMsg = 'Sorry, there was a problem getting this recipe. Try again';
  #succMsg = '';

  render(data) {
    this.#data = data;
    const markupHTML = this.#generateMarkup();
    this.#clear();
    this.#parentElement.insertAdjacentHTML('afterbegin', markupHTML);
  }

  #clear() {
    this.#parentElement.innerHTML = '';
  }

  renderSpinner() {
    const markupSpinner = `
      <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>
    `;
    this.#clear();
    this.#parentElement.insertAdjacentHTML('afterbegin', markupSpinner);
  }

  renderError(message = this.#errorMsg) {
    const markupError = `
      <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;
    this.#clear();
    this.#parentElement.insertAdjacentHTML('afterbegin', markupError);
  }

  renderSuccess(message = this.#succMsg) {
    const markupError = `
      <div class="message">
        <div>
          <svg>
            <use href="${icons}.svg#icon-smile"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;
    this.#clear();
    this.#parentElement.insertAdjacentHTML('afterbegin', markupError);
  }

  #generateMarkup() {
    return `
      <figure class="recipe__fig">
        <img src="${this.#data.image}" alt="Tomato" class="recipe__img" />
        <h1 class="recipe__title">
          <span>${this.#data.title}</span>
        </h1>
      </figure>

      <div class="recipe__details">
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-clock"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--minutes">${
            this.#data.cookingTime
          }</span>
          <span class="recipe__info-text">minutes</span>
        </div>
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-users"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--people">${
            this.#data.servings
          }</span>
          <span class="recipe__info-text">servings</span>

          <div class="recipe__info-buttons">
            <button class="btn--tiny btn--increase-servings">
              <svg>
                <use href="src/img/icons.svg#icon-minus-circle"></use>
              </svg>
            </button>
            <button class="btn--tiny btn--increase-servings">
              <svg>
                <use href="src/img/icons.svg#icon-plus-circle"></use>
              </svg>
            </button>
          </div>
        </div>

        <div class="recipe__user-generated">
          <svg>
            <use href="src/img/icons.svg#icon-user"></use>
          </svg>
        </div>
        <button class="btn--round">
          <svg class="">
            <use href="src/img/icons.svg#icon-bookmark-fill"></use>
          </svg>
        </button>
      </div>

      <div class="recipe__ingredients">
        <h2 class="heading--2">Recipe ingredients</h2>
        <ul class="recipe__ingredient-list">
          ${this.#data.ingredients.map(this.#generateMarkupIngredient).join('')}
        </ul>
      </div>

      <div class="recipe__directions">
        <h2 class="heading--2">How to cook it</h2>
        <p class="recipe__directions-text">
          This recipe was carefully designed and tested by
          <span class="recipe__publisher">${
            this.#data.publisher
          }</span>. Please check out
          directions at their website.
        </p>
        <a
          class="btn--small recipe__btn"
          href="${this.#data.sourceURL}"
          target="_blank"
        >
          <span>Directions</span>
          <svg class="search__icon">
            <use href="src/img/icons.svg#icon-arrow-right"></use>
          </svg>
        </a>
      </div>
    `;
  }

  #generateMarkupIngredient(ing) {
    //esta función es para hacer un map de elementos HTML con ingredientes
    return `
          <li class="recipe__ingredient">
            <svg class="recipe__icon">
              <use href="src/img/icons.svg#icon-check"></use>
            </svg>
            <div class="recipe__quantity">${
              ing.quantity ? fracty(ing.quantity) : 'Some'
            }</div>
            <div class="recipe__description">
              <span class="recipe__unit">${ing.unit}</span>
              ${ing.description}
            </div>
          </li>
        `;
  }

  // publisher
  addHandlerRender(handler) {
    ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
  }
}

export default new RecipeView();