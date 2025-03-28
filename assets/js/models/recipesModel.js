/*********************************************************************************
*
* Link to JSON file
*
/*********************************************************************************/

export default function dataRecipes() {

    async function getData() {
        return await fetch('../../assets/data/recipes.json') 
        .then(res => res.json())
        .catch(err => console.log("Une erreur s'est produite dans la récupération des données json : ", err))
    }

    async function getAllRecipes() {
        let data = await getData()
        return data.recipes
    }

    // async function getRecipesByIngredient(ingredient) {
    //     let data = await getAllRecipes()
    //     console.log(data)
    //     const recipesByIngredient = data.filter(recipes => recipes.ingredient = "Fraise")
    //     console.log(recipesByIngredient)

    // }

    // async function getRecipesByAppliance(appliance) {
    //     let data = await getAllRecipes()
    //     // console.log(data)
    //     let recipesByAppliance = data.filter((recipes) => recipes.appliance === appliance)
    //     // console.log(recipesByAppliance)
    //     return recipesByAppliance
    // }

    // async function getRecipesByUstensils(ustensil) {
    //     let data = await getAllRecipes()
    //     console.log(data)

    // }


    return { getAllRecipes }
}