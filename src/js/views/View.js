import icons from '../../img/icons.svg'; // Parcel 1

export default class View {
_data;
  render(data) {
    if(!data || (Array.isArray(data) && data.length === 0)) return this.renderError();
    this._data = data;
    const markupHTML = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markupHTML);
  }

  _clear() {
    this._parentElement.innerHTML = '';
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