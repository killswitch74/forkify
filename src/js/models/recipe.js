import axios from 'axios';

export default class Recipe {
    constructor (id) {
        this.id = id;
    }

    async getRecipes () {
        try {
            const recipes = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
            this.result = recipes.data.recipe;
            //console.log(recipes.data.recipe);
            this.publisher = this.result.publisher;
            this.ingredients = this.result.ingredients;
            this.source_url = this.result.source_url;
            this.recipe_id = this.result.recipe_id;
            this.image_url = this.result.image_url;
            this.title = this.result.title;
        }
        catch (error) {
            prompt(error);
        }
    }
    
    calcTime () {
        // We need 15 mins for each 3 ingredients.
        this.time = Math.ceil((this.ingredients.length / 3) * 15);
    }

    calcServing () {
        this.servings = 4;
    }

    updateServing (type) {
        // Update Servings Count
        const newServings = type === 'inc' ? this.servings + 1 : this.servings - 1;
        // Update Ingredients Count
        const newCount = this.ingredients.map(current => current.count);
        newCount.forEach((current, index) => {
            current *= (newServings / this.servings);
            this.ingredients[index].count = current;
        });
        this.servings = newServings;
    }

    parseIngredients () {
        const unitKey = ['tsp', 'tsp', 'tbsp', 'tbsp', 'oz', 'oz', 'lb', 'lb', 'cup'];
        const unitValue = ['teaspoons', 'teaspoon', 'tablespoons', 'tablespoon', 'ounces', 'ounce', 'pounds', 'pound', 'cups'];
        const units = [...unitKey, 'kg', 'g'];

        const ingArr = this.ingredients.map(current => {
            let words = [];
            //Step 1: Uniform units
            words = current.toLowerCase();
            unitValue.forEach((value, key) => {
              words = words.replace(value, unitKey[key]);
            });
            
            //Step 2: Remove text between Paranthesis
            words = words.replace(/ *\([^)]*\) */g, ' ');

            //Step 3: Separate Count, Unit and Ingredients
            const arrWords = words.split(' ');
            const unitIndex = arrWords.findIndex(curr2 => units.includes(curr2));

            let ing, arrCount;
            //Case 1: Count + Unit + Ingredient
            if (unitIndex > -1) {
                let count2;
                arrCount = arrWords.slice(0, unitIndex);
                if (arrCount.length === 1) { count2 = eval(arrWords[0].replace('-', '+')); } //For the case where Count could be: "4-1/2"
                else { count2 = eval(arrWords.slice(0, unitIndex).join('+')); }

                ing = {
                    count: count2,
                    unit: arrWords[unitIndex],
                    ingredient: arrWords.slice(unitIndex + 1).join(' ')
                };
            }

            //Case 2 : Count + Ingredient
            else if (parseFloat(arrWords[0], 10)) {
                if(parseFloat(arrWords[1], 10)) {
                    ing = {
                        count: eval(arrWords.slice(0, 2).join('+')),
                        unit: '',
                        ingredient: arrWords.slice(1).join(' ')
                    };
                }
                else {
                    ing = {
                        count: parseFloat(arrWords[0]),
                        unit: '',
                        ingredient: arrWords.slice(1).join(' ')
                    };
                }
            }
            
            //Case 3 : String starting with 'a' or 'A' + Ingredient
            else if (arrWords[0] === 'a' || arrWords[0] === 'A') {
                ing = {
                    count: 1,
                    unit: '',
                    ingredient: arrWords.slice(1).join(' ')
                };
            }

            //Case 4 : Only Ingredient
            else if (unitIndex === -1) {
                ing = {
                    count: 1,
                    unit: '',
                    ingredient: words
                };
            }

            return ing;
        });
        
        this.ingredients = ingArr;
        //this.storeLocally();
    }

    storeLocally () {
        localStorage.setItem('recipes', JSON.stringify(this.result));
    }

    readLocally () {
        const storage = JSON.parse(localStorage.getItem('recipes'));
        if (storage) this.results = storage;
    }

}
