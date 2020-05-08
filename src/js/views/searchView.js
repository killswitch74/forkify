import {DOM} from './base'

export const getQuery = () => DOM.searchField.value;

export const clearQuery = recipe => {
    DOM.container.innerHTML = '';
    DOM.containerBtn.innerHTML = '';
    //DOM.container.removeChild(recipe.recipe_id);
};

export const clearInput = () => {
    DOM.searchField.value = '';
};

export const highlighter = (id, pageId) => {
    if(pageId.find(current => current === id)) {
        Array.from(document.querySelectorAll('.results__link')).forEach(result => result.classList.remove('results__link--active'));
        document.querySelector(`.results__link[href="#${id}"]`).classList.add('results__link--active');
    }
};

export const wordShort = (title, limit = 17) => {
    const newTitle = [];
    if(title.length > limit) {
        title.split(' ').reduce((prev, curr) => {
            if(prev + curr.length <= limit) {
                newTitle.push(curr);
            }
            return prev + curr.length;
        }, 0);
    return `${newTitle.join(' ')} ...`;
    }
    return title;
};

const renderQuery = recipes => {
    const html = `
        <li>
        <a class="results__link" href="#${recipes.recipe_id}" data-id=${recipes.recipe_id}>
            <figure class="results__fig">
                <img src="${recipes.image_url}" alt="${recipes.title}">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${wordShort(recipes.title)}</h4>
                <p class="results__author">${recipes.publisher}</p>
            </div>
        </a>
    </li>
    `;
    DOM.container.insertAdjacentHTML('beforeend', html);
};

const btnRender = (page, pages) =>
{
    if(page === 1) {
        //Only Next Button
        btnList(page, 'next');
    }
    else if (page === pages) {
        //Only Prev Button
        btnList(page, 'prev');
    }
    else {
        //Two Buttons
        btnList(page, 'next');
        btnList(page, 'prev');
    }
};

const btnList = (page, type) => {
    const btn = `
                <button class="btn-inline results__btn--${type}" data-goto=${type === 'next' ? 'right' : 'left'}>
                    <span>Page ${type === 'next'? page + 1 : page - 1}</span>
                        <svg class="search__icon">
                            <use href="img/icons.svg#icon-triangle-${type === 'next' ? 'right' : 'left'}"></use>
                        </svg>
                </button>
                `;
    DOM.containerBtn.insertAdjacentHTML('beforeend', btn);
};

export const cycleQuery = (recipe, page = 1, resPerPage = 10) => {
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;
    const id = [];
    recipe.slice(start, end).forEach(current => {
        renderQuery(current);
        id.push(current.recipe_id);
    });
    const pages = Math.ceil(recipe.length / resPerPage);
    if(pages > 1) btnRender(page, pages);
    return id;
};