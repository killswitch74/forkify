import { DOM } from "./base";


export const renderItem = item => {
    const html = `
        <li class="shopping__item" data-itemid=${item.id}>
            <div class="shopping__count">
                    <input type="number" value="${item.count}" step="${item.count}" class="shopping__count--value">
                <p>${item.unit}</p>
            </div>
            <p class="shopping__description">${item.ingredient}</p>
            <button class="shopping__delete btn-tiny">
                <svg>
                    <use href="img/icons.svg#icon-circle-with-cross"></use>
                </svg>
            </button>
        </li>
    `;

    DOM.shoppingList.insertAdjacentHTML('beforeend', html);
};

export const deleteItem = id => {
    Array.from(document.querySelectorAll('.shopping__item')).forEach(current => {
        if (current.dataset.itemid === id) current.parentNode.removeChild(current);
    });

    // ALTERNATIVE
    // const item = document.querySelector(`[data-itemid="${id}"]`);
    // item.parentNode.removeChild(item);
}

export const removeList = () => {
    Array.from(document.querySelectorAll('.shopping__item')).forEach(current => current.parentNode.removeChild(current));
    localStorage.removeItem('shopping');
};

export const toggleDeleteList = list => {
    DOM.deleteList.style.visibility = list.length > 0 ? 'visible' : 'hidden';
};