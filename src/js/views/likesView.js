import { DOM } from "./base";
import { wordShort } from './searchView';

export const toggleLike = isLike => {
    const icon = isLike ? 'icon-heart' : 'icon-heart-outlined';
    document.querySelector('.recipe__love use').setAttribute('href', `img/icons.svg#${icon}`);
};

export const toggleLikeTop = likesCount => {
    DOM.likesIcon.style.visibility = (likesCount > 0 ? 'visible' : 'hidden');
};

export const renderLike = likes => {

    const html = `
        <li>
            <a class="likes__link" href="#${likes.id}">
                <figure class="likes__fig">
                    <img src="${likes.img}" alt="${likes.title}">
                </figure>
                <div class="likes__data">
                    <h4 class="likes__name">${wordShort(likes.title)}</h4>
                        <p class="likes__author">${likes.publisher}</p>
                </div>
            </a>
        </li>
    `;

    DOM.likesList.insertAdjacentHTML('beforeend', html);
};

export const deleteLike = id => {
    const x = document.querySelector(`.likes__link[href="#${id}"]`).parentElement
    x.parentElement.removeChild(x);
};