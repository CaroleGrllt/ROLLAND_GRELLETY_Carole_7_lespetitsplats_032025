import dataRecipes from "../models/recipesModel.js"

export async function getRecipes(state) {
    const data = dataRecipes()
    let recipes = await data.getAllRecipes()

    if (state.searchLength >= 3) {
        const filtered = []
        let fIndex = 0

        for (let i = 0; i < recipes.length; i++) {
            const recipe = recipes[i];

            function manualSplit(str) {
                const result = [];
                let rIndex = 0;
                let current = "";
                for (let j = 0; j <= str.length; j++) {
                    if (j === str.length || str[j] === " ") {
                        if (current.length > 0) {
                            result[rIndex++] = current;
                        }
                        current = "";
                    } else {
                        current += str[j];
                    }
                }
                return result;
            }

            const name = manualSplit(recipe.name.toLowerCase());
            const description = manualSplit(recipe.description.toLowerCase());

            const ingredients = [];
            let ingIndex = 0;
            for (let j = 0; j < recipe.ingredients.length; j++) {
                ingredients[ingIndex++] = recipe.ingredients[j].ingredient.toLowerCase();
            }

            const dataWords = [];
            let dIndex = 0;
            for (let j = 0; j < name.length; j++) dataWords[dIndex++] = name[j];
            for (let j = 0; j < description.length; j++) dataWords[dIndex++] = description[j];
            for (let j = 0; j < ingredients.length; j++) dataWords[dIndex++] = ingredients[j];

            let allMatch = true;
            for (let k = 0; k < state.search.length; k++) {
                const word = state.search[k].toLowerCase();
                let found = false;
                for (let l = 0; l < dataWords.length; l++) {
                    if (dataWords[l].indexOf(word) !== -1) {
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    allMatch = false;
                    break;
                }
            }

            if (allMatch) {
                filtered[fIndex++] = recipe;
            }
        }

        recipes = filtered;
    }

    if (state.ingredients.length > 0) {
        const filtered = [];
        let fIndex = 0;

        for (let i = 0; i < recipes.length; i++) {
            const recipe = recipes[i];
            const ingredients = [];
            let ingIndex = 0;

            for (let j = 0; j < recipe.ingredients.length; j++) {
                ingredients[ingIndex++] = recipe.ingredients[j].ingredient.toLowerCase();
            }

            let allFound = true;
            for (let j = 0; j < state.ingredients.length; j++) {
                const searchIng = state.ingredients[j].toLowerCase();
                let found = false;
                for (let k = 0; k < ingredients.length; k++) {
                    if (ingredients[k].indexOf(searchIng) !== -1) {
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    allFound = false;
                    break;
                }
            }

            if (allFound) {
                filtered[fIndex++] = recipe;
            }
        }

        recipes = filtered;
    }

    if (state.appliances.length > 0) {
        const filtered = [];
        let fIndex = 0;

        for (let i = 0; i < recipes.length; i++) {
            const appliance = recipes[i].appliance.toLowerCase();

            for (let j = 0; j < state.appliances.length; j++) {
                if (state.appliances[j].toLowerCase() === appliance) {
                    filtered[fIndex++] = recipes[i];
                    break;
                }
            }
        }

        recipes = filtered;
    }

    if (state.ustensils.length > 0) {
        const filtered = [];
        let fIndex = 0;

        for (let i = 0; i < recipes.length; i++) {
            const ustensils = [];
            let uIndex = 0;

            for (let j = 0; j < recipes[i].ustensils.length; j++) {
                ustensils[uIndex++] = recipes[i].ustensils[j].toLowerCase();
            }

            let allFound = true;
            for (let j = 0; j < state.ustensils.length; j++) {
                const searchUst = state.ustensils[j].toLowerCase();
                let found = false;

                for (let k = 0; k < ustensils.length; k++) {
                    if (ustensils[k].indexOf(searchUst) !== -1) {
                        found = true;
                        break;
                    }
                }

                if (!found) {
                    allFound = false;
                    break;
                }
            }

            if (allFound) {
                filtered[fIndex++] = recipes[i];
            }
        }

        recipes = filtered;
    }

    return recipes;
}

export function getIngredientsList(recipes) {
    const ingredientsSet = {};

    for (let i = 0; i < recipes.length; i++) {
        for (let j = 0; j < recipes[i].ingredients.length; j++) {
            const ing = recipes[i].ingredients[j].ingredient.toLowerCase();
            ingredientsSet[ing] = true;
        }
    }

    const ingredientsArray = [];
    let index = 0;
    for (let key in ingredientsSet) {
        ingredientsArray[index++] = key;
    }

    // manual sort
    for (let i = 0; i < ingredientsArray.length - 1; i++) {
        for (let j = i + 1; j < ingredientsArray.length; j++) {
            if (ingredientsArray[i] > ingredientsArray[j]) {
                const tmp = ingredientsArray[i];
                ingredientsArray[i] = ingredientsArray[j];
                ingredientsArray[j] = tmp;
            }
        }
    }

    return ingredientsArray;
}

export function getAppliancesList(recipes) {
    const appliancesSet = {};

    for (let i = 0; i < recipes.length; i++) {
        const appliance = recipes[i].appliance.toLowerCase();
        appliancesSet[appliance] = true;
    }

    const appliancesArray = [];
    let index = 0;
    for (let key in appliancesSet) {
        appliancesArray[index++] = key;
    }

    for (let i = 0; i < appliancesArray.length - 1; i++) {
        for (let j = i + 1; j < appliancesArray.length; j++) {
            if (appliancesArray[i] > appliancesArray[j]) {
                const tmp = appliancesArray[i];
                appliancesArray[i] = appliancesArray[j];
                appliancesArray[j] = tmp;
            }
        }
    }

    return appliancesArray;
}

export function getUstensilsList(recipes) {
    const ustensilsSet = {};

    for (let i = 0; i < recipes.length; i++) {
        for (let j = 0; j < recipes[i].ustensils.length; j++) {
            const ust = recipes[i].ustensils[j].toLowerCase();
            ustensilsSet[ust] = true;
        }
    }

    const ustensilsArray = [];
    let index = 0;
    for (let key in ustensilsSet) {
        ustensilsArray[index++] = key;
    }

    for (let i = 0; i < ustensilsArray.length - 1; i++) {
        for (let j = i + 1; j < ustensilsArray.length; j++) {
            if (ustensilsArray[i] > ustensilsArray[j]) {
                const tmp = ustensilsArray[i];
                ustensilsArray[i] = ustensilsArray[j];
                ustensilsArray[j] = tmp;
            }
        }
    }

    return ustensilsArray;
}