// import icons from '../../img/icons.svg'; // Parcel 1
import View from "./View";
import previewView from "./previewView";

class ResultsView extends View{
    _parentElement = document.querySelector('.results');
    _errorMsg = 'Sorry, not recipe found for your query. Try again';
    _succMsg = '';  

    _generateMarkup(){
      return this._data.map(result => previewView.render(result, false)).join('') ;
   } 

}

export default new ResultsView();