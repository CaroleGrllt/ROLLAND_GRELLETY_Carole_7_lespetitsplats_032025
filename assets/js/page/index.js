import { getRecipes , getIngredientsList , getAppliancesList , getUstensilsList} from "../controllers/recipesController.js";
import { toggleBtn, displayCross, clearInputs } from "../utils/utils.js";
import templateCard from '../templates/cards.js'
import templateFilters from "../templates/filters.js";
import StateFilter from "../state/stateFilter.js";

// INSTANCIATION
const oStateFilter      = new StateFilter()

// RECUPERATION ELEMENTS DOM
const searchInput       = document.querySelector(".search-recipes")
const errorMessage      = document.querySelector(".error-section")
const errorSearch       = document.querySelector(".search-error")
const ingredientsList   = document.querySelector('.select-ingredients ul')
const appliancesList    = document.querySelector('.select-appliances ul')
const ustensilsList     = document.querySelector('.select-ustensils ul')
const cardsSection      = document.querySelector(".cards-container")
const crosses           = document.querySelectorAll(".cross")
const totalRecipes      = document.querySelector(".dynamic-change")
const allChevronBtns    = document.querySelectorAll(".dropdown-btn")
const allInputs         = document.querySelectorAll('input')
const filterItems       = document.querySelectorAll('ul')



// RECUPERATION CONTENU NECESSAIRE
const recipes           = await getRecipes(oStateFilter)


const allAppliances     = getAppliancesList(recipes)
const allUstensils      = getUstensilsList(recipes)



//LISTENERS
allInputs.forEach((input) => input.addEventListener('input', displayCross))

allChevronBtns.forEach((btn) => btn.addEventListener('click', toggleBtn))

searchInput.addEventListener('input', async () => {
    oStateFilter.setSearch(searchInput.value)
    
    if(oStateFilter.ingredients.length > 0 || oStateFilter.appliances.length > 0 || oStateFilter.ustensils.length > 0) {
        const ingredientsArray = oStateFilter.ingredients
        const appliancesArray = oStateFilter.appliances
        const ustensilsArray = oStateFilter.ustensils

        ingredientsArray.forEach(ingredient => {
            oStateFilter.unsetIngredients(ingredient)
        })

        oStateFilter.unsetAppliances(appliancesArray)

        ustensilsArray.forEach(ustensil => {
            oStateFilter.unsetUstensils(ustensil)
        })

    }
    
    await displayCards()
})

filterItems.forEach((item) => {
    item.addEventListener('click', async (e) => {
        const target = e.target.closest('li')
        const id = target.dataset.id
        const type = target.dataset.type

        if (type === 'ingredients') {
            oStateFilter.setIngredients(id)
        } else if (type === 'appliances') {
            oStateFilter.setAppliances(id)
        }

        console.log(oStateFilter)

        await displayCards()        
    })
})

crosses.forEach((cross) => cross.addEventListener("click", async (e) => {
    oStateFilter.unsetSearch()
    clearInputs(e)
    await displayCards()        
}))


// FONCTION AFFICHAGE
async function displayCards() {
    
    let results = await getRecipes(oStateFilter)
    totalRecipes.textContent = results.length

    if(results.length === 0) {
        errorMessage.style.display = "block"
        errorSearch.textContent ="'" + searchInput.value + "'"
        cardsSection.innerHTML = ""
    } else {
        errorMessage.style.display = "none"
        cardsSection.innerHTML = ""
        results.forEach((result) => {
            const cardTemplate = templateCard(result)
            cardsSection.appendChild(cardTemplate)
        })
    }
    displayIngredients(results)
    displayAppliances(results)

    return results
}


function displayIngredients(recipes) {

    const sortedIngredients = getIngredientsList(recipes)
    
    ingredientsList.innerHTML = '';

    sortedIngredients.forEach((ingredient) => {
        const filterTemplate = templateFilters(ingredient, 'ingredients')
        ingredientsList.appendChild(filterTemplate)
    })

    return sortedIngredients
}

function displayAppliances(recipes) {
    const sortedApplicances = getAppliancesList(recipes)

    appliancesList.innerHTML = ''

    sortedApplicances.forEach((appliance) => {
        const filterTemplate = templateFilters(appliance, 'appliances')
        appliancesList.appendChild(filterTemplate)
    })

    return sortedApplicances
}






// AFFICHAGE INITIAL

displayCards()

// test suppression du code précédent avec juste fonction affichage appelée. Voir si fonctionne. 
//  /!\ Ne pas supprimer ancien code pour le moment !!! /!\

// totalRecipes.textContent = recipes.length

// recipes.forEach((recipe) => {
//     const cardTemplate = templateCard(recipe)
//     cardsSection.appendChild(cardTemplate)
// });

// allIngredients.forEach((ingredient) => {
//     const filterTemplate = templateFilters(ingredient)
//     ingredientsList.appendChild(filterTemplate)
// })

// allAppliances.forEach((appliance) => {
//     const filterTemplate = templateFilters(appliance)
//     appliancesList.appendChild(filterTemplate)
// })

// allUstensils.forEach((ustensil) => {
//     const filterTemplate = templateFilters(ustensil)
//     ustensilsList.appendChild(filterTemplate)
// })







