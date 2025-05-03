
import { getRecipes , getIngredientsList , getAppliancesList , getUstensilsList} from "../controllers/recipesController.js";
import { escapeInjection , displayCross, clearInputs, removeAllTags } from "../utils/utils.js";
import templateCard from '../templates/cards.js'
import templateFilter from "../templates/filters.js";
import templateTags from "../templates/tags.js";
import StateFilter from "../state/stateFilter.js";

// INSTANCIATION
const oStateFilter      = new StateFilter()

// RECUPERATION ELEMENTS DOM
const filterContainer   = document.querySelector(".filters-container")
const searchInput       = document.querySelector(".search-recipes")
const errorMessage      = document.querySelector(".error-section")
const errorSearch       = document.querySelector(".search-error")
const cardsSection      = document.querySelector(".cards-container")
const cross             = document.querySelector(".xmark-header")
const totalRecipes      = document.querySelector(".dynamic-change")
const tagsContainer     = document.querySelector('.tags-container')


// FONCTION AFFICHAGE
async function displayCards() {
    let results = await getRecipes(oStateFilter);
    totalRecipes.textContent = results.length + " recettes";

    if (results.length === 0) {
        errorMessage.style.display = "block";
        errorSearch.textContent = "'" + searchInput.value + "'";
        cardsSection.innerHTML = "";
    } else {
        errorMessage.style.display = "none";
        cardsSection.innerHTML = "";

        for (let i = 0; i < results.length; i++) {
            const cardTemplate = templateCard(results[i]);
            cardsSection.appendChild(cardTemplate);
        }
    }

    displayFilters(results);
    return results;
}

function displayFilters(recipes) {
    const sortedIngredients = getIngredientsList(recipes);
    const sortedAppliances = getAppliancesList(recipes);
    const sortedUstensils = getUstensilsList(recipes);

    const data = {
        ingredients: sortedIngredients,
        appliances: sortedAppliances,
        ustensils: sortedUstensils
    };

    const filtersTemplate = templateFilter(data);
    filterContainer.innerHTML = '';
    filterContainer.appendChild(filtersTemplate);

    const filterItems = document.querySelectorAll('ul');
    
    for (let i = 0; i < filterItems.length; i++) {
        const item = filterItems[i];

        item.addEventListener('click', async function (e) {
            const target = e.target.closest('li');
            if (!target) return;

            const id = target.dataset.id;
            const type = target.dataset.type;

            const tagsTemplate = templateTags(id, type, oStateFilter, displayCards);
            if (tagsTemplate) {
                tagsContainer.appendChild(tagsTemplate);
            }

            if (type === 'ingredients') {
                oStateFilter.setIngredients(id);
            } else if (type === 'appliances') {
                oStateFilter.setAppliances(id);
            } else if (type === 'ustensils') {
                oStateFilter.setUstensils(id);
            }

            await displayCards();
        });
    }
}

//LISTENERS
searchInput.addEventListener('input', async function(e) {
    displayCross(e);

    const value = escapeInjection(searchInput.value);    


    oStateFilter.setSearch(value);

    if (
        oStateFilter.ingredients.length > 0 ||
        oStateFilter.appliances.length > 0 ||
        oStateFilter.ustensils.length > 0
    ) {
        oStateFilter.unsetAll();
        removeAllTags();
    }

    await displayCards();
});

cross.addEventListener("click", async function(e) {
    clearInputs(e);
    oStateFilter.unsetSearch();
    oStateFilter.unsetAll();
    removeAllTags();

    await displayCards();
});

// AFFICHAGE INITIAL
displayCards()