import uniqid from 'uniqid';

export default class List {
    constructor() {
        this.items = [];
    }

    addItem (recipe) {
        const item = {
            id: uniqid(),
            count: recipe.count,
            unit: recipe.unit,
            ingredient: recipe.ingredient,
        };
        this.items.push(item);
        this.storeLocally();
        return item;
    }

    deleteItem (ID) {
        const index = this.items.findIndex(current => current.id === ID);
        // [2,4,6].splice(1, 2) -> returns = 4, 6; Original array [2] (MUTATES)
        // [2,4,6].slice(1, 2) -> returns = 4; Original array [2,4,6] (Does NOT Mutates)
        this.items.splice(index, 1);
        this.storeLocally();
    }

    updateCount (ID, newCount) {
        this.items.find(current => current.id === ID).count = newCount;
        this.storeLocally();
    }

    storeLocally () {
        localStorage.setItem('shopping', JSON.stringify(this.items));
    }

    readLocally () {
        const storage = JSON.parse(localStorage.getItem('shopping'));
        if (storage) this.items = storage;   
    }
}