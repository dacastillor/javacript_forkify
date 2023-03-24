import View from './View';
import icons from '../../img/icons.svg'; // Parcel 1
import fracty from 'fracty'; // se usa este porque fractional no funcionó

// Vista = Logica para visualización del cliente

class RecipeView extends View{
  _parentElement = document.querySelector('.recipe'); // se hace de uso protegido para no permitir alterar fácilmente la vista, se hace protegido y no privado por Babel  
  _errorMsg = 'Sorry, there was a problem getting this recipe. Try again';
  _succMsg = '';  

  _generateMarkup() {
    return `
      <figure class="recipe__fig">
        <img src="${this._data.image}" alt="Tomato" class="recipe__img" />
        <h1 class="recipe__title">
          <span>${this._data.title}</span>
        </h1>
      </figure>

      <div class="recipe__details">
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-clock"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--minutes">${
            this._data.cookingTime
          }</span>
          <span class="recipe__info-text">minutes</span>
        </div>
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-users"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--people">${
            this._data.servings
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
            <use href="${icons}#icon-bookmark-fill"></use>
          </svg>
        </button>
      </div>

      <div class="recipe__ingredients">
        <h2 class="heading--2">Recipe ingredients</h2>
        <ul class="recipe__ingredient-list">
          ${this._data.ingredients.map(this._generateMarkupIngredient).join('')}
        </ul>
      </div>

      <div class="recipe__directions">
        <h2 class="heading--2">How to cook it</h2>
        <p class="recipe__directions-text">
          This recipe was carefully designed and tested by
          <span class="recipe__publisher">${
            this._data.publisher
          }</span>. Please check out
          directions at their website.
        </p>
        <a
          class="btn--small recipe__btn"
          href="${this._data.sourceURL}"
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

  _generateMarkupIngredient(ing) {
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
