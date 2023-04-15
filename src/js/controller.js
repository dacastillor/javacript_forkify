import * as model from './model.js';
import recipeView from './views/recipeView.js';
// import icons from 'url:../img/icons.svg'; // Parcel 2
import 'core-js/stable'; //polyfilling remaining features
import 'regenerator-runtime/runtime'; // polyfilling async/await
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js'
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js'




// Controller = Lógica de orquestación entre Modelo y Vista

const controlRecipe = async function () {
  // recordemos que cuando es una función async necesita los await adentro

  try {
    const id = window.location.hash.slice(1); // agarra el hash de cada receta dependiendo de lo que este en la variabel global ventana

    if (!id) return;
    recipeView.renderSpinner();

    // Update results view to mark selected search result
    resultsView.update(model.getSearchResultsPage()); // con esto se queda seleccionada 

    bookmarksView.update(model.state.bookmarks);


    // Loading Recipe
    await model.loadRecipe(id);
    // Rendering Recipe

    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};



const controlServings =  function(newServings){
  model.updateServings(newServings);
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
}

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    const query = searchView.getQuery();
    if (!query) return;
    await model.loadSearchResults(query);

    // Renderiza los resultados de la bùsqueda
    resultsView.render(model.getSearchResultsPage());

    // Renderiza los botones de la paginación
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function(goToPage){
  
  // Renderiza los resultados de la bùsqueda, dependiendo de la página
  resultsView.render(model.getSearchResultsPage(goToPage));

  // Renderiza los botones de la paginación, dependiendo de la página
  paginationView.render(model.state.search);
}

const controlAddBookmark = function(){
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe)
  else model.deleteBookmark(model.state.recipe.id);


  // Update recipe view

  recipeView.update(model.state.recipe);

  // Render bookmarks

  bookmarksView.render(model.state.bookmarks);
  
}

const controlBookmarks = function(){
  bookmarksView.render(model.state.bookmarks)
}

const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHadlerUpdateServing(controlServings);
  searchView.addHandlerSearch(controlSearchResults);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  paginationView.addClickHandler(controlPagination);
  
};

init();

const clearBookmarks = function (){
  localStorage.clear('bookmarks');
}

//clearBookmarks();

