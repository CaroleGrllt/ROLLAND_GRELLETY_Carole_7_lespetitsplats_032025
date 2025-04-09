import dataRecipes from "../models/recipesModel.js"

export async function getRecipes(state) {

    const data = dataRecipes()

    let recipes = await data.getAllRecipes()
 
    // CHAMPS DE RECHERCHE
    if(state.searchLength >=3) {

        recipes = recipes.filter(recipe => {
            const name = recipe.name.toLowerCase().split(' ')
            const description = recipe.description.toLowerCase().split(' ')
            const ingredients = recipe.ingredients.map(data => data.ingredient.toLowerCase())
            const data = [...name, ...description, ...ingredients]

            return(
                state.search.every(word =>
                    data.some(dataWord => dataWord.includes(word.toLowerCase()))
                ) 
            )
        })
    }

    // INGREDIENTS

    // APPAREILS

    // USTENSILES

    return recipes
}


// OBTENIR LA LISTE DES INGREDIENTS
export function getIngredientsList(recipes) {
    const ingredientsSet = new Set(); //permet de ne pas avoir de doublons
    // Parcourir toutes les recettes et ajouter les ingrédients au Set

    recipes.forEach(recipe => {
        recipe.ingredients.forEach(ing => {
            ingredientsSet.add(ing.ingredient.toLowerCase()); // Utilisation de toLowerCase() pour éviter les doublons avec différentes casses
        });
    });
    return Array.from(ingredientsSet).sort();
}

// OBTENIR LA LISTE DES APPAREILS
export function getAppliancesList(recipes) {
    const appliancesSet = new Set();
    recipes.forEach(recipe => {
        appliancesSet.add(recipe.appliance.toLowerCase()); 
        ;
    });
    return Array.from(appliancesSet).sort();
}

// OBTENIR LA LISTE DES USTENSILES
export function getUstensilsList(recipes) {
    const ustensilsSet = new Set(); 
    recipes.forEach(recipe => {
        recipe.ustensils.forEach(ust => {
            ustensilsSet.add(ust.toLowerCase()); 
        });
    });
    return Array.from(ustensilsSet).sort();
}






















// TROUVER DES RECETTES SELON INGREDIENT
export function getRecipesByIngredient(recipes, ingredient) {
    return recipes.filter(recipe => //filtre pour garder que les bonnes recettes
        recipe.ingredients.some(ing => //.some() permet de vérifier la présence de l'ingrédient demander
            ing.ingredient.toLowerCase().includes(ingredient.toLowerCase()))) //includes permet de taper un mot clé et d'afficher quand même les recettes => "coco" pour "lait de coco"
}

// const fraise = getRecipesByIngredient(allRecipes, "coco")
// console.log(fraise)



//TROUVER DES RECETTES SELON APPAREIL
export function getRecipesByAppliance(recipes, appliance) {
    return recipes.filter(recipe => 
        recipe.appliance.toLowerCase() === appliance.toLowerCase())
}

// const four = getRecipesByAppliance(allRecipes, "four")
// console.log(four)

// TROUVER DES RECETTES SELON USTENSILE
export function getRecipesByUstensil(recipes, ustensil) {
    return recipes.filter(recipe => 
        recipe.ustensils.some(ust => 
            ust.toLowerCase().includes(ustensil.toLowerCase()))) 
}

// const citron = getRecipesByUstensil(allRecipes, "citron")
// console.log(citron)


