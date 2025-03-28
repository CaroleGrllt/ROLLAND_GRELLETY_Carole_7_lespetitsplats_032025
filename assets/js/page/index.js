import { allRecipes } from "../controllers/recipesController.js";
// import { recipesByIngredient } from "../controllers/filtersController.js";
import templateCard from '../templates/cards.js'


const cardsSection = document.querySelector(".cards-container")

const recipes = allRecipes

recipes.forEach((recipe) => {
    // console.log(recipe)
    const cardTemplate = templateCard(recipe)
    cardsSection.appendChild(cardTemplate)
});