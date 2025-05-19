

export default function templateCards(data) {
    const picture = `assets/img/recipes/${data.image}`

    const article = document.createElement( 'article' )

    const link = document.createElement( 'a' )
    link.setAttribute('href', '#')

    const card = document.createElement( 'div' )
    card.classList.add('card')

    const imgContainer = document.createElement('div')
    imgContainer.classList.add('image-container')

    const img = document.createElement( 'img' )
    img.setAttribute('src', picture)
    img.setAttribute('alt', `illustration ${data.name}`)

    const timeContainer = document.createElement('div')
    timeContainer.classList.add('time-container');

    const spanTime = document.createElement('span')
    spanTime.classList.add('time')
    spanTime.textContent = data.time + " min"

    const bodyCard = document.createElement('div')
    bodyCard.classList.add('card-body');

    const h2 = document.createElement('h2')
    h2.classList.add('card-title')
    h2.textContent = data.name

    const recipe = document.createElement('div')
    recipe.classList.add('card-description')

    const cardRecipe = document.createElement('span')
    cardRecipe.classList.add('card-recipe')
    cardRecipe.textContent = 'RECETTE'

    const p = document.createElement('p')
    p.classList.add('card-text')
    p.textContent = data.description

    const ingredientsContainer = document.createElement('div')

    const cardIngredient = document.createElement('span')
    cardIngredient.classList.add('card-ingredients')
    cardIngredient.textContent = "INGREDIENTS"

    const ingredientsList = document.createElement('div')
    ingredientsList.classList.add('ingredients-list')

    const ingArray = data.ingredients
    const ingredientContainer = ingArray.map(ing => {
        const ingIngredient = ing.ingredient;
        const ingQuantity = ing.quantity || "" // Gérer le cas où quantity est undefined
        const ingUnit = ing.unit || "" // Gérer le cas où unit est undefined
    
        const ingredient = document.createElement('div')
        ingredient.classList.add('ingredient')
    
        const firstSpan = document.createElement('span')
        firstSpan.textContent = ingIngredient
    
        const secondSpan = document.createElement('span')
        secondSpan.textContent = ingQuantity + ingUnit
    
        ingredient.appendChild(firstSpan)
        ingredient.appendChild(secondSpan)
    
        return ingredient
    });
    


    article.appendChild(link)
    link.appendChild(card)
    card.appendChild(imgContainer)
    imgContainer.appendChild(img)
    imgContainer.appendChild(timeContainer)
    timeContainer.appendChild(spanTime)
    card.appendChild(bodyCard)
    bodyCard.appendChild(h2)
    bodyCard.appendChild(recipe)
    recipe.appendChild(cardRecipe)
    recipe.appendChild(p)
    bodyCard.appendChild(ingredientsContainer)
    ingredientsContainer.appendChild(cardIngredient)
    ingredientsContainer.appendChild(ingredientsList)
    ingredientContainer.forEach(ingredient => ingredientsList.appendChild(ingredient))

    return (article)
}