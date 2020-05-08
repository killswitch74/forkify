import axios from 'axios';

export default class Search {
    constructor(query, result) {
        this.query = query;
        this.result = result;
    }

    async getResults () {
        try{
            const recipe = await axios(`https://forkify-api.herokuapp.com/api/search?q=${this.query}`);
            //console.log(recipe.data.recipes[0]);
            this.result = recipe.data.recipes;
        }
        catch (error) {
            prompt(error);
        }
    }

}