export default class Likes {
    constructor() {
        this.likes = [];
    }

    addLike (recipe) {
        const like = {
            id: recipe.recipe_id,
            title: recipe.title,
            img: recipe.image_url,
            publisher: recipe.publisher
        }
        this.likes.push(like);
        this.storeLocally();
        return like;
    }

    deleteLike (ID) {
        const index = this.likes.findIndex(current => current.id === ID);
        this.likes.splice(index, 1);
        this.storeLocally();
        if(this.likes.length < 1) localStorage.removeItem('likes');
    }

    isLiked (ID) {
        return this.likes.findIndex(current => current.id === ID) !== -1;
    }

    getLikes () {
        return this.likes.length;
    }

    storeLocally () {
        localStorage.setItem('likes', JSON.stringify(this.likes));
    }

    readLocally () {
        const storage = JSON.parse(localStorage.getItem('likes'));
        if (storage) this.likes = storage;
    }

};