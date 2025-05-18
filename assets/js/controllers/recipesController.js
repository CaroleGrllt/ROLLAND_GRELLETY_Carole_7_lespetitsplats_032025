import dataRecipes from "../models/recipesModel.js"

export async function getRecipes(state) {
    const data = dataRecipes()
    let recipes = await data.getAllRecipes()

    // SEARCH FIELD
    if (state.searchLength >= 3) {
        const filtered = []
        for (let i = 0; i < recipes.length; i++) {
            const recipe = recipes[i]
            const name = recipe.name.toLowerCase().split(' ')
            const description = recipe.description.toLowerCase().split(' ')
            const ingredients = []
            for (let j = 0; j < recipe.ingredients.length; j++) {
                ingredients[ingredients.length] = recipe.ingredients[j].ingredient.toLowerCase()
            }
            const dataWords = []
            for (let k = 0; k < name.length; k++) dataWords[dataWords.length] = name[k]
            for (let k = 0; k < description.length; k++) dataWords[dataWords.length] = description[k]
            for (let k = 0; k < ingredients.length; k++) dataWords[dataWords.length] = ingredients[k]

            let allWordsFound = true
            for (let w = 0; w < state.search.length; w++) {
                const word = state.search[w].toLowerCase()
                let found = false
                for (let d = 0; d < dataWords.length; d++) {
                    if (dataWords[d].indexOf(word) !== -1) {
                        found = true
                        break
                    }
                }
                if (!found) {
                    allWordsFound = false
                    break
                }
            }
            if (allWordsFound) {
                filtered[filtered.length] = recipe
            }
        }
        recipes = filtered
    }

    // INGREDIENTS
    if (state.ingredients.length > 0) {
        const filtered = []
        for (let i = 0; i < recipes.length; i++) {
            const recipe = recipes[i]
            const ingredients = []
            for (let j = 0; j < recipe.ingredients.length; j++) {
                ingredients[ingredients.length] = recipe.ingredients[j].ingredient.toLowerCase()
            }

            let allMatch = true
            for (let k = 0; k < state.ingredients.length; k++) {
                const searchIng = state.ingredients[k].toLowerCase()
                let match = false
                for (let l = 0; l < ingredients.length; l++) {
                    if (ingredients[l].indexOf(searchIng) !== -1) {
                        match = true
                        break
                    }
                }
                if (!match) {
                    allMatch = false
                    break
                }
            }
            if (allMatch) {
                filtered[filtered.length] = recipe
            }
        }
        recipes = filtered
    }

    // APPLIANCES
    if (state.appliances.length > 0) {
        const filtered = []
        for (let i = 0; i < recipes.length; i++) {
            const recipe = recipes[i]
            const appliance = recipe.appliance.toLowerCase()
            let match = false
            for (let j = 0; j < state.appliances.length; j++) {
                if (state.appliances[j].toLowerCase() === appliance) {
                    match = true
                    break
                }
            }
            if (match) {
                filtered[filtered.length] = recipe
            }
        }
        recipes = filtered
    }

    // USTENSILS
    if (state.ustensils.length > 0) {
        const filtered = []
        for (let i = 0; i < recipes.length; i++) {
            const recipe = recipes[i]
            const ustensils = []
            for (let j = 0; j < recipe.ustensils.length; j++) {
                ustensils[ustensils.length] = recipe.ustensils[j].toLowerCase()
            }

            let allMatch = true
            for (let k = 0; k < state.ustensils.length; k++) {
                const searchUst = state.ustensils[k].toLowerCase()
                let match = false
                for (let l = 0; l < ustensils.length; l++) {
                    if (ustensils[l].indexOf(searchUst) !== -1) {
                        match = true
                        break
                    }
                }
                if (!match) {
                    allMatch = false
                    break
                }
            }
            if (allMatch) {
                filtered[filtered.length] = recipe
            }
        }
        recipes = filtered
    }

    return recipes
}

// INGREDIENTS LIST
export function getIngredientsList(recipes) {
    const ingredientsSet = {}
    for (let i = 0; i < recipes.length; i++) {
        const recipe = recipes[i]
        const ings = recipe.ingredients
        for (let j = 0; j < ings.length; j++) {
            const ing = ings[j].ingredient.toLowerCase()
            ingredientsSet[ing] = true
        }
    }

    const result = []
    for (let key in ingredientsSet) {
        result[result.length] = key
    }

    // Manual sort (simple bubble sort)
    for (let i = 0; i < result.length - 1; i++) {
        for (let j = 0; j < result.length - i - 1; j++) {
            if (result[j] > result[j + 1]) {
                const temp = result[j]
                result[j] = result[j + 1]
                result[j + 1] = temp
            }
        }
    }

    return result
}

// APPLIANCES LIST
export function getAppliancesList(recipes) {
    const appliancesSet = {}
    for (let i = 0; i < recipes.length; i++) {
        const appliance = recipes[i].appliance.toLowerCase()
        appliancesSet[appliance] = true
    }

    const result = []
    for (let key in appliancesSet) {
        result[result.length] = key
    }

    for (let i = 0; i < result.length - 1; i++) {
        for (let j = 0; j < result.length - i - 1; j++) {
            if (result[j] > result[j + 1]) {
                const temp = result[j]
                result[j] = result[j + 1]
                result[j + 1] = temp
            }
        }
    }

    return result
}

// USTENSILS LIST
export function getUstensilsList(recipes) {
    const ustensilsSet = {}
    for (let i = 0; i < recipes.length; i++) {
        const usts = recipes[i].ustensils
        for (let j = 0; j < usts.length; j++) {
            const ust = usts[j].toLowerCase()
            ustensilsSet[ust] = true
        }
    }

    const result = []
    for (let key in ustensilsSet) {
        result[result.length] = key
    }

    for (let i = 0; i < result.length - 1; i++) {
        for (let j = 0; j < result.length - i - 1; j++) {
            if (result[j] > result[j + 1]) {
                const temp = result[j]
                result[j] = result[j + 1]
                result[j + 1] = temp
            }
        }
    }

    return result
}