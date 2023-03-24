import * as model from './model.js';
import recipeView from './views/recipeView.js';
// import icons from 'url:../img/icons.svg'; // Parcel 2
import 'core-js/stable'; //polyfilling remaining features
import 'regenerator-runtime/runtime'; // polyfilling async/await
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js'

// Controller = Lógica de orquestación entre Modelo y Vista

const controlRecipe = async function () {
  // recordemos que cuando es una función async necesita los await adentro

  try {
    const id = window.location.hash.slice(1); // agarra el hash de cada receta dependiendo de lo que este en la variabel global ventana

    if (!id) return;
    recipeView.renderSpinner();

    // Loading Recipe
    await model.loadRecipe(id);
    // Rendering Recipe

    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    const query = searchView.getQuery();
    if (!query) return;
    await model.loadSearchResults(query);
    //console.log(model.state.search.results);
    resultsView.render(model.state.search.results)
  } catch (err) {
    console.log(err);
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipe);
  searchView.addHandlerSearch(controlSearchResults);
};

init();
