import { allRecipes , getIngredientsList , getAppliancesList , getUstensilsList} from "../controllers/recipesController.js";
import { Search } from "../controllers/searchController.js";
import { clearInput } from "../utils/utils.js";
import templateCard from '../templates/cards.js'
import templateFilters from "../templates/filters.js";

// INSTANCIATION
const search            = new Search()

// RECUPERATION ELEMENTS HTML
const searchInput       = document.querySelector(".search-recipes")
const errorMessage      = document.querySelector(".error-section")
const errorSearch       = document.querySelector(".search-error")
const ingredientsList   = document.querySelector('.select-ingredients ul')
const appliancesList    = document.querySelector('.select-appliances ul')
const ustensilsList     = document.querySelector('.select-ustensils ul')
const cardsSection      = document.querySelector(".cards-container")
const crosses           = document.querySelectorAll(".cross")
const totalRecipes      = document.querySelector(".dynamic-change")

// RECUPERATION CONTENU NECESSAIRE
const recipes           = allRecipes
const allIngredients    = getIngredientsList(recipes)
const allAppliances     = getAppliancesList(recipes)
const allUstensils      = getUstensilsList(recipes)

// AFFICHAGE INITIAL
totalRecipes.textContent = recipes.length

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


// FONCTION AFFICHAGE APRES RECHERCHE INPUT
function displaySearch() {
    const newSearch = searchInput.value
    // console.log(newSearch)
    let results = search.setSearch(newSearch)
    console.log(results)
    totalRecipes.textContent = results.length

    const inputForm = searchInput.closest('form');
    const currentCross = inputForm.querySelector('.cross');
    currentCross.style.visibility = newSearch.trim() === "" ? "hidden" : "visible";

    if(results.length === 0) {
        // console.log('Recherche sans résultat')
        errorMessage.style.display = "block"
        errorSearch.textContent ="'" + newSearch + "'"
        cardsSection.innerHTML = ""
    } else {
        errorMessage.style.display = "none"
        cardsSection.innerHTML = ""
        results.forEach((result) => {
            const cardTemplate = templateCard(result)
            cardsSection.appendChild(cardTemplate)
        })
    }
}


//LISTENERS
searchInput.addEventListener('input', displaySearch)
crosses.forEach((cross) => cross.addEventListener("click", (event) => clearInput(event, displaySearch))); // displaySearch en callback pour fonctionner dans fonction clearInput du fichier utils.js



