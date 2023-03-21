import { async } from 'regenerator-runtime';
import { API_URL } from './config';
import { getJSON } from './helpers';
// Model = Lógica de negocio

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
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
loadSearchResults('pizza');
