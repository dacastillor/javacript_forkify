import View from "./View";
import icons from '../../img/icons.svg'; // Parcel 1

class PaginationView extends View{
    _parentElement = document.querySelector('.pagination');

    addClickHandler(handler){
        this._parentElement.addEventListener('click', function(e){
            const btn = e.target.closest('.btn--inline');
            if(!btn)return; // si se oprime fuera del botón de cambiar página pero dentro del contenedor de los dos botones, no se hace nada
            const goToPageData = +btn.dataset.goto;
            handler(goToPageData);            
        })
    }

    _generateMarkup(){

        const currentPage = this._data.page;

        const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);
              
        // Pagina 1

        if(currentPage === 1 && numPages > 1){
            return`
            <button data-goto="${currentPage + 1}" class="btn--inline pagination__btn--next">
                <span>Page ${currentPage + 1}</span>
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-right"></use>
                </svg>
            </button>
            `;
        }   
        

        // Ultima pagina

        if(currentPage === numPages && numPages > 1){
            return`
            <button data-goto="${currentPage - 1}" class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-left"></use>
                </svg>
                <span>Page ${currentPage - 1}</span>
            </button>`            
        }

        // Si hay más páginas

        if(currentPage < numPages){
            return`
            <button data-goto="${currentPage - 1}" class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-left"></use>
                </svg>
                <span>Page ${currentPage - 1}</span>
            </button>
            <button data-goto="${currentPage + 1}" class="btn--inline pagination__btn--next">
                <span>Page ${currentPage + 1}</span>
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-right"></use>
                </svg>
            </button>`;   
        }

        // Si no hay más páginas
        return '';

    }
}

export default new PaginationView();