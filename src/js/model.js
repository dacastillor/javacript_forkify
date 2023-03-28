import { async } from 'regenerator-runtime';
import { API_URL, REST_PER_PAGES } from './config';
import { getJSON } from './helpers';
// Model = Lógica de negocio

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: REST_PER_PAGES,    
  },
};

export const loadRecipe = async function (id) {
  // esto trae el recipe desde el API y lo envía al controlador
  try {
    const reciData = await getJSON(
      // información desde API
      `${API_URL}/${id}`
    );
    const { recipe } = reciData.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceURL: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
  } catch (err) {
    // Error temporal
    console.error(`${err} (Temporal Version)`);
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const searchData = await getJSON(`${API_URL}?search=${query}`);

    state.search.results = searchData.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      };
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getSearchResultsPage = function(page = state.search.page){

  state.search.page = page;

  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;

  return state.search.results.slice(start, end);

}


export const updateServings =  function(newServings) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
  });

  state.recipe.servings = newServings;

}