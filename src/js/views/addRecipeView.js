import View from "./View";
import icons from '../../img/icons.svg'; // Parcel 1

class AddRecipeView extends View{
    _parentElement = document.querySelector('.upload');
    _succMsg = 'Recipe uploaded succesfully';

    _window = document.querySelector('.add-recipe-window');
    _overlay = document.querySelector('.overlay');
    _btnOpen = document.querySelector('.nav__btn--add-recipe');
    _btnClose = document.querySelector('.btn--close-modal');


    constructor(){
        super();
        this._addHandlerShowWindow();
        this._addHandlerHideWindow();
    }

    toggleWindow(){
        this._overlay.classList.toggle('hidden');
        this._window.classList.toggle('hidden'); 
    }

    _addHandlerShowWindow(){
        this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
    }

    _addHandlerHideWindow(){
        this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
        this._overlay.addEventListener('click', this.toggleWindow.bind(this));
    }

    addHandlerUpload(handler){
        this._parentElement.addEventListener('submit', function(e){
            e.preventDefault();
            const dataArray = [... new FormData(this)]; // Esto es una API que toma la información de un form y los vuelve pares dentro de un Array. eg [title,"TEST"],...
            const data = Object.fromEntries(dataArray); // esto toma los entries del array anterior y los transforma a notación de objeto, eg {title: "TEST",...}
            handler(data);
        });        
    }  
  

    _generateMarkup(){       

    }
}

export default new AddRecipeView();