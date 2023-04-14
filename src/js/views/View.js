import icons from '../../img/icons.svg'; // Parcel 1

export default class View {
_data;
  render(data, render = true) {
    if(!data || (Array.isArray(data) && data.length === 0)) return this.renderError();
    this._data = data;
    const markupHTML = this._generateMarkup();

    if(!render) return markupHTML;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markupHTML);
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  update(data){
    this._data = data;
    const newMarkup = this._generateMarkup();

    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const currentElements = Array.from(this._parentElement.querySelectorAll('*'));

    newElements.forEach((newEl,i)=>{
      const curEl = currentElements[i];

      if(!newEl.isEqualNode(curEl) && newEl.firstChild?.nodeValue.trim() !== ''){// Este va a actualizar sólo los campos de texto que perciban cambios dentro de sus elementos hijos
        curEl.textContent = newEl.textContent;        
      }

      if(!newEl.isEqualNode(curEl))
        Array.from(newEl.attributes).forEach(attr => 
          curEl.setAttribute(attr.name, attr.value)); // Cambiar los atributos de los elementos para poder usar los botones y actualizar el DOM            
    })


  }

  renderSpinner() {
    const markupSpinner = `
      <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markupSpinner);
  }

  renderError(message = this._errorMsg) {
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
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markupError);
  }

  renderSuccess(message = this._succMsg) {
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
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markupError);
  }

}