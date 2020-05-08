import Search from './models/Search';
import {DOM, loaderRender, loaderClear} from './views/base';
import * as searchView from './views/searchView';
import Recipe from './models/recipe';
import {addRecipe, clearRecipe, renderServing} from './views/recipeView';
import List from './models/list';
import * as listView from './views/listView';
import Likes from './models/Likes'
import * as likesView from './views/likesView'

const state = {};
window.state = state;

//  SEARCH CONTAINER

let page, pageId;
const controlSearch = async () => {
    // 1. Get query from view.
    const query = searchView.getQuery();
    
    if(query) {
        page = 1; // Page is for Pagination Event Handler
        // 2. Store it in State variable.
        state.search = new Search(query);
        // 3. Clean the UI.
        searchView.clearQuery();
        searchView.clearInput();
        try {
            loaderRender(DOM.containerRes);
            // 4. Get Results from Search.js.
            await state.search.getResults();
            // 5. Display the results to UI.
            loaderClear();
            pageId = searchView.cycleQuery(state.search.result);
        }
        catch (error) {
            prompt('Error fetching Search.');
            loaderClear();
        }
    }
}

//  SEARCH HANDLER

DOM.searchForm.addEventListener('submit', event => {
    event.preventDefault();
    controlSearch();
    page = 1;
});

DOM.containerBtn.addEventListener('click', event => {

    const goToPage = event.target.closest('.btn-inline').dataset.goto;
    if(goToPage) {
        goToPage === 'right' ? page++ : page--;
        searchView.clearQuery();
        pageId = searchView.cycleQuery(state.search.result, page);
    }
});



// ***********//////////////////*******************////////////////////**************

//  RECIPE CONTAINER

const controlRecipe = async () => {
    // 1. Get Recipe ID from UI.
    const id = window.location.hash.replace('#', '');
    if(id) {
        // 2.Store the data in state variable.
        state.recipe = new Recipe(id);
        //window.r = state.recipe;
        // 3.Clear the UI / Highlight the selection.
        if(state.search) searchView.highlighter(id, pageId);  // -- FIXED --
        clearRecipe();
        // 4.Get Recipe from Recipe.js.
        loaderRender(DOM.recipeContainer);
        try {
            await state.recipe.getRecipes();
            loaderClear();
            
            state.recipe.parseIngredients();
            
            state.recipe.calcTime();
            state.recipe.calcServing();
            // 5.Display the result to UI.
            addRecipe(state.recipe, state.likes.isLiked(state.recipe.id));
        }
        catch (error) {
            alert('Error fetching Recipe.');
            loaderClear();
        }
    }
};

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

// DOM.container.addEventListener('click', event => {
//     const recipeId = event.target.closest('.results__link').dataset.id;
//     //console.log(recipeId);
//     controlRecipe(recipeId);
// });
    

//  RECIPE HANDLER
DOM.recipeContainer.addEventListener('click', event => {
    if (event.target.matches('.btn-decrease, .btn-decrease *')) {
        if (state.recipe.servings > 1)
        {
            state.recipe.updateServing('dec');
            renderServing(state.recipe);
        }
    }
    else if (event.target.matches('.btn-increase, .btn-increase *')) {
        state.recipe.updateServing('inc');
        renderServing(state.recipe);
    }
    else if (event.target.closest('.recipe__btn--add')) {
        controlList();
        //const id = event.dataset.itemid;
    }
    else if (event.target.closest('.recipe__love')) {
        controlLike();
    }
});



// ***********//////////////////*******************////////////////////**************

//  SHOPPING CONTAINER

const controlList = () => {
    //1. Create new List class if there isn't already
    if(!state.list) state.list = new List();
    //2. Add data to the state and the UI
    state.recipe.ingredients.forEach(current => {
        const item = state.list.addItem(current);
        listView.renderItem(item);
    });
    listView.toggleDeleteList(state.list.items);
};
    
    //  SHOPPING LIST HANDLER
['click', 'change'].forEach(e => DOM.shoppingList.addEventListener(e, event => {
    const click = event.target.closest('.shopping__item');
    const id = click.dataset.itemid;
    if(click) {
        //Delete the item
        if(event.target.closest('.shopping__delete')) {
            listView.deleteItem(id);
            state.list.deleteItem(id);
            listView.toggleDeleteList(state.list.items);
        }
        //Change the count
        else if(event.target.matches('.shopping__count--value')) {
            const val = parseFloat(event.target.value);
            if(val > 0) state.list.updateCount(id, val);
        }
    }
}));

//  Delete Shopping Items List
DOM.deleteList.addEventListener('click', () => {
    if (state.list) {
        console.log("Working");
        listView.removeList();
        state.list = new List();
    }
    listView.toggleDeleteList(state.list.items);
});

// ***********//////////////////*******************////////////////////**************

window.addEventListener('load', () => {
        // When page refreshes, store the likes in localStorage
    if(!state.likes) state.likes = new Likes();
    if(!state.list) state.list = new List();    
        // Read data from the localStorage
    state.likes.readLocally();
    state.list.readLocally();
        // Toggle the Likes' Menu Button
    likesView.toggleLikeTop(state.likes.getLikes());
    listView.toggleDeleteList(state.list.items);
        // Render all the likes list and shopping list
    state.likes.likes.forEach(current => likesView.renderLike(current));
    state.list.items.forEach(current => listView.renderItem(current));
});

const controlLike = () => {
    // Store the variable to the State
    // User has NOT liked the Recipe
    if(!state.likes.isLiked(state.recipe.id)) {
        // Add recipe to Likes class
        const newLike = state.likes.addLike(state.recipe);
        // Toggle the Love Button
        likesView.toggleLike(true);
        // Display the Recipe in the liked window
        likesView.renderLike(newLike);
    }
    //User has ALREADY LIKED the Recipe
    else {
        // Remove recipe from Likes class
        state.likes.deleteLike(state.recipe.id);
        // Toggle the Love Button
        likesView.toggleLike(false);
        // Remove the Recipe from the liked window
        likesView.deleteLike(state.recipe.id);
    }
    likesView.toggleLikeTop(state.likes.getLikes());
};

//     TESTER EVENT-LISTENER
// DOM.recipeContainer.addEventListener('click', event =>{
//     console.log(event.target);
// });