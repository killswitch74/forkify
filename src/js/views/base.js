export const DOM = {
    searchForm: document.querySelector('.search'),
    searchField: document.querySelector('.search__field'),
    container: document.querySelector('.results__list'),
    containerRes: document.querySelector('.results'),
    containerBtn: document.querySelector('.results__pages'),
    containerLink : document.querySelector('.results__link'),
    recipeContainer: document.querySelector('.recipe'),
    shoppingList: document.querySelector('.shopping__list'),
    likesList: document.querySelector('.likes__list'),
    likesIcon: document.querySelector('.likes__field'),
    deleteList: document.querySelector('.delete__list'),
    loader: `
        <div class="loader">
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg>
        </div>
        `
};

export const loaderRender = parent => {
    parent.insertAdjacentHTML('afterbegin', DOM.loader);
};

export const loaderClear = () => {
    document.querySelector('.loader').parentNode.removeChild(document.querySelector('.loader'));
};