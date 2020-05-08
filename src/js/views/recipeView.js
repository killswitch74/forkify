import { DOM } from "./base";
import fracty from 'fracty';

export const clearRecipe = () => {
    DOM.recipeContainer.innerHTML = '';
};

const formatCount = count => {
    // // 4.5 -> 4 1/2
    // const [int, dec] = count.toString().split('.').map(x => parseInt(x, 10));

    // // 1 -> 1
    // if(!dec) return count;
    // // 0.333333333 -> 0.33 -> 1/3
    // if(int === 0) {
    //     count = count.toFixed(2);
    //     const fr = new Fraction(count);
    //     return `${fr.numerator}/${fr.denominator}`;
    // }
    // // 1.333333333 -> 1.33 -> 1 1/3
    // else {
    //     count = count.toFixed(2);
    //     const fr = new Fraction(count - int);
    //     return `${int} ${fr.numerator}/${fr.denominator}`;
    // }

    // Above Method Failed so have an Alternative :-

    if (count) {
        return `${fracty(count)}`;
    }

    else return '?'

};

const addIngredients = ingredients =>
`
    <li class="recipe__item">
        <svg class="recipe__icon">
            <use href="img/icons.svg#icon-check"></use>
        </svg>
        <div class="recipe__count">${formatCount(ingredients.count)}</div>
        <div class="recipe__ingredient">
            <span class="recipe__unit">${ingredients.unit}</span>
            ${ingredients.ingredient}
        </div>
    </li>

`;

export const addRecipe = (recipe, isLiked) => {
const html = `
        <figure class="recipe__fig">
        <img src="${recipe.image_url}" alt="${recipe.title}" class="recipe__img">
        <h1 class="recipe__title">
            <span>${recipe.title}</span>
        </h1>
        </figure>
        
        <div class="recipe__details">
            <div class="recipe__info">
                <svg class="recipe__info-icon">
                    <use href="img/icons.svg#icon-stopwatch"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--minutes">${recipe.time}</span>
                <span class="recipe__info-text"> minutes</span>
        </div>
        <div class="recipe__info">
            <svg class="recipe__info-icon">
                <use href="img/icons.svg#icon-man"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${recipe.servings}</span>
            <span class="recipe__info-text"> servings</span>

            <div class="recipe__info-buttons">
                <button class="btn-tiny btn-decrease">
                    <svg>
                        <use href="img/icons.svg#icon-circle-with-minus"></use>
                    </svg>
                </button>
                <button class="btn-tiny btn-increase">
                    <svg>
                        <use href="img/icons.svg#icon-circle-with-plus"></use>
                    </svg>
                </button>
            </div>

        </div>
        <button class="recipe__love">
            <svg class="header__likes">
                <use href="img/icons.svg#icon-heart${isLiked ? '' : '-outlined'}"></use>
            </svg>
        </button>
        </div>

        <div class="recipe__ingredients">
        <ul class="recipe__ingredient-list">
            ${recipe.ingredients.map(x => addIngredients(x)).join('')}
        </ul>

        <button class="btn-small recipe__btn recipe__btn--add">
            <svg class="search__icon">
                <use href="img/icons.svg#icon-shopping-cart"></use>
            </svg>
            <span>Add to shopping list</span>
        </button>
        </div>

        <div class="recipe__directions">
        <h2 class="heading-2">How to cook it</h2>
        <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__by">${recipe.publisher}</span>. Please check out directions at their website.
        </p>
        <a class="btn-small recipe__btn" href="${recipe.source_url}" target="_blank">
            <span>Directions</span>
            <svg class="search__icon">
                <use href="img/icons.svg#icon-triangle-right"></use>
            </svg>

        </a>
        </div>
`;
    DOM.recipeContainer.insertAdjacentHTML('afterbegin', html);
};

export const renderServing = recipe => {
    // Update Servings Count
    document.querySelector('.recipe__info-data--people').textContent = recipe.servings;
    // Update Ingredients Count
    Array.from(document.querySelectorAll('.recipe__count')).forEach((current, index) => {
        current.textContent = formatCount(recipe.ingredients[index].count);
    });
};
