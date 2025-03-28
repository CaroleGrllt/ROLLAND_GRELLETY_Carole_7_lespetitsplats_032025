import { allRecipes , getIngredientsList , getAppliancesList , getUstensilsList} from "../controllers/recipesController.js";

import templateCard from '../templates/cards.js'
import templateFilters from "../templates/filters.js";


const cardsSection      = document.querySelector(".cards-container")
const ingredientsList   = document.querySelector('.select-ingredients ul')
const appliancesList    = document.querySelector('.select-appliances ul')
const ustensilsList     = document.querySelector('.select-ustensils ul')

const recipes           = allRecipes
const allIngredients    = getIngredientsList(recipes)
const allAppliances     = getAppliancesList(recipes)
const allUstensils      = getUstensilsList(recipes)


recipes.forEach((recipe) => {
    const cardTemplate = templateCard(recipe)
    cardsSection.appendChild(cardTemplate)
});

allIngredients.forEach((ingredient) => {
    const filterTemplate = templateFilters(ingredient)
    ingredientsList.appendChild(filterTemplate)
})

allAppliances.forEach((appliance) => {
    const filterTemplate = templateFilters(appliance)
    appliancesList.appendChild(filterTemplate)
})

allUstensils.forEach((ustensil) => {
    const filterTemplate = templateFilters(ustensil)
    ustensilsList.appendChild(filterTemplate)
})