import dataRecipes from "../models/recipesModel.js"

export async function getRecipes(state) {
    const data = dataRecipes();
    let recipes = await data.getAllRecipes();

    // SEARCH FIELD
    if (state.searchLength >= 3) {
        const filteredRecipes = [];

        for (let i = 0; i < recipes.length; i++) {
            const recipe = recipes[i];

            const nameWords = recipe.name.toLowerCase().split(' ');
            const descWords = recipe.description.toLowerCase().split(' ');

            const ingredientWords = [];
            for (let j = 0; j < recipe.ingredients.length; j++) {
                ingredientWords.push(recipe.ingredients[j].ingredient.toLowerCase());
            }

            const allWords = nameWords.concat(descWords).concat(ingredientWords);

            let matchesAll = true;
            for (let k = 0; k < state.search.length; k++) {
                const word = state.search[k].toLowerCase();
                let found = false;
                for (let l = 0; l < allWords.length; l++) {
                    if (allWords[l].includes(word)) {
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    matchesAll = false;
                    break;
                }
            }

            if (matchesAll) {
                filteredRecipes.push(recipe);
            }
        }

        recipes = filteredRecipes;
    }

    // INGREDIENTS
    if (state.ingredients.length > 0) {
        const filteredRecipes = [];

        for (let i = 0; i < recipes.length; i++) {
            const recipe = recipes[i];

            const ingredients = [];
            for (let j = 0; j < recipe.ingredients.length; j++) {
                ingredients.push(recipe.ingredients[j].ingredient.toLowerCase());
            }

            let matchesAll = true;
            for (let k = 0; k < state.ingredients.length; k++) {
                const wantedIng = state.ingredients[k].toLowerCase();
                let found = false;

                for (let l = 0; l < ingredients.length; l++) {
                    if (ingredients[l].includes(wantedIng)) {
                        found = true;
                        break;
                    }
                }

                if (!found) {
                    matchesAll = false;
                    break;
                }
            }

            if (matchesAll) {
                filteredRecipes.push(recipe);
            }
        }

        recipes = filteredRecipes;
    }

    // APPLIANCES
    if (state.appliances.length > 0) {
        const filteredRecipes = [];

        for (let i = 0; i < recipes.length; i++) {
            const recipe = recipes[i];
            const appliance = recipe.appliance.toLowerCase();

            let found = false;
            for (let j = 0; j < state.appliances.length; j++) {
                if (state.appliances[j].toLowerCase() === appliance) {
                    found = true;
                    break;
                }
            }

            if (found) {
                filteredRecipes.push(recipe);
            }
        }

        recipes = filteredRecipes;
    }

    // USTENSILS
    if (state.ustensils.length > 0) {
        const filteredRecipes = [];

        for (let i = 0; i < recipes.length; i++) {
            const recipe = recipes[i];

            const ustensils = [];
            for (let j = 0; j < recipe.ustensils.length; j++) {
                ustensils.push(recipe.ustensils[j].toLowerCase());
            }

            let matchesAll = true;
            for (let k = 0; k < state.ustensils.length; k++) {
                const wantedUst = state.ustensils[k].toLowerCase();
                let found = false;

                for (let l = 0; l < ustensils.length; l++) {
                    if (ustensils[l].includes(wantedUst)) {
                        found = true;
                        break;
                    }
                }

                if (!found) {
                    matchesAll = false;
                    break;
                }
            }

            if (matchesAll) {
                filteredRecipes.push(recipe);
            }
        }

        recipes = filteredRecipes;
    }

    return recipes;
}

export function getIngredientsList(recipes) {
    const ingredientsSet = new Set();

    for (let i = 0; i < recipes.length; i++) {
        const recipe = recipes[i];

        for (let j = 0; j < recipe.ingredients.length; j++) {
            ingredientsSet.add(recipe.ingredients[j].ingredient.toLowerCase());
        }
    }

    const list = Array.from(ingredientsSet);
    list.sort();
    return list;
}

export function getAppliancesList(recipes) {
    const appliancesSet = new Set();

    for (let i = 0; i < recipes.length; i++) {
        appliancesSet.add(recipes[i].appliance.toLowerCase());
    }

    const list = Array.from(appliancesSet);
    list.sort();
    return list;
}

export function getUstensilsList(recipes) {
    const ustensilsSet = new Set();

    for (let i = 0; i < recipes.length; i++) {
        const recipe = recipes[i];

        for (let j = 0; j < recipe.ustensils.length; j++) {
            ustensilsSet.add(recipe.ustensils[j].toLowerCase());
        }
    }

    const list = Array.from(ustensilsSet);
    list.sort();
    return list;
}