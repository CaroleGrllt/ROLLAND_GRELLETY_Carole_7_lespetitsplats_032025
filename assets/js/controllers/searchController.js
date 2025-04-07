import dataRecipes from "../models/recipesModel.js"

const data = dataRecipes()
const recipes = await data.getAllRecipes()


export class Search {
    constructor() {
        this.recipes = recipes
    }

    setSearch(newSearch) {
        if(newSearch.length >=3) {
            const value = newSearch.toLowerCase().trim()

            this.recipes = recipes.filter(recipe =>
                recipe.name.toLowerCase().includes(value)
                ||
                recipe.ingredients.some(ing =>
                    ing.ingredient.toLowerCase().includes(value)
                ) 
                ||
                recipe.appliance.toLowerCase().includes(value)
                ||
                recipe.ustensils.some(ust =>
                    ust.toLowerCase().includes(value)
                )
                ||
                recipe.description.toLowerCase().includes(value)
            )
        }
        else {
            this.recipes = recipes
        }
        return this.recipes
    }
}