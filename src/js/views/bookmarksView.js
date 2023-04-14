// import icons from '../../img/icons.svg'; // Parcel 1
import View from "./View";
import previewView from "./previewView.js";

class BookmarksView extends View{
    _parentElement = document.querySelector('.bookmarks__list');
    _errorMsg = 'No bookmarks added yet';
    _succMsg = '';  

    _generateMarkup(){
       return this._data.map(bookmark => previewView.render(bookmark, false)).join('') ;
    } 

}

export default new BookmarksView();