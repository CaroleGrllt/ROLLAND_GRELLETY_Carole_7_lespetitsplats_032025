import dataRecipes from "../models/recipesModel.js"

const data = dataRecipes()

export const allRecipes = await data.getAllRecipes()
// console.log(allRecipes)

