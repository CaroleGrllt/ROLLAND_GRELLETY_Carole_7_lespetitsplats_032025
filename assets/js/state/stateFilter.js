export default class StateFilter {
    constructor() {
        this.searchLength = 0
        this.search = []
        this.appliances = []
        this.ingredients = []
        this.ustensils = []
    }

    setSearch(value) {
        this.search = value.toLowerCase().split(' ')
        this.searchLength = value.length
    }

    unsetSearch() {
        this.search = []
        this.searchLength = 0
    }

    setIngredients(value) {
        this.ingredients.push(value.toLowerCase())
    }

    unsetIngredients(value) {
        this.ingredients = this.ingredients.filter(ingredient => ingredient !== value)
    }

    setAppliances(value) {
        this.appliances.push(value.toLowerCase())
    }

    unsetAppliances() {
        
    }

    setUstensils() {
        
    }

    unsetUstensils() {
        
    }
}


