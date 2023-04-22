import { async } from 'regenerator-runtime';
import { API_URL, REST_PER_PAGES, KEY } from './config';
//import { getJSON,sendJSON } from './helpers';
import {AJAX} from './helpers';
// Model = Lógica de negocio

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: REST_PER_PAGES,    
  },
  bookmarks: []
};

const createRecipeObject =  function(data){
  const { recipe } = data.data;
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    ...(recipe.key && {key: recipe.key}), // si el key existe
  };
}

export const loadRecipe = async function (id) {
  // esto trae el recipe desde el API y lo envía al controlador
  try {
    const reciData = await AJAX(
      // información desde API
      `${API_URL}${id}?key=${KEY}`
    );
    
    state.recipe = createRecipeObject(reciData);

    if(state.bookmarks.some(bookmark => bookmark.id === id)){
      state.recipe.bookmarked = true;
    }else{
      state.recipe.bookmarked = false;
    }
      


  } catch (err) {
    // Error temporal
    console.error(`${err} (Temporal Version)`);
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const searchData = await AJAX(`${API_URL}?search=${query}&key=${KEY}`);

    state.search.results = searchData.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
        ...(rec.key && {key: rec.key}), // si el key existe
      };
    });
    state.search.page = 1; // esto se hace ya que la paginación se daña al cambiar el 
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


const persistBookmarks = function(){
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks)) 
}

export const addBookmark = function(recipe){

  state.bookmarks.push(recipe);

  if(recipe.id === state.recipe.id) state.recipe.bookmarked = true;

  persistBookmarks();

}

export const deleteBookmark = function(id){
  

  // Eliminar bookmark
  const index = state.bookmarks.findIndex( el => el.id  === id);
  state.bookmarks.splice(index, 1);

  // Setear la receta sin Bookmark
  if (id === state.recipe.id) state.recipe.bookmarked = false;

  persistBookmarks();


}

const init = function(){
  const storage= localStorage.getItem('bookmarks');
  if(storage) state.bookmarks = JSON.parse(storage);
}

init();

export const uploadRecipe = async function (newRecipe){
  try{
    const ingredients = Object.entries(newRecipe)
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
      .map(ing=>{ 
        const ingArray = ing[1].split(',').map(el=>el.trim())      
      
        if(ingArray.length !== 3) throw new Error ("Missing fields in ingredients, check format");
  
        const [quantity, unit, description] = ingArray;
        
        return { quantity: quantity ? +quantity : null, unit, description};
      });
      
      const recipe = {
        title: newRecipe.title,
        source_url: newRecipe.sourceUrl,
        image_url: newRecipe.image,
        publisher: newRecipe.publisher,
        cooking_time: +newRecipe.cookingTime,
        servings: +newRecipe.servings,
        ingredients,
      }

      const data= await AJAX(`${API_URL}?key=${KEY}`, recipe)
      console.log(data);
      state.recipe = createRecipeObject(data);
      addBookmark(state.recipe);

    } catch (err){
      throw err;
    }
  
}