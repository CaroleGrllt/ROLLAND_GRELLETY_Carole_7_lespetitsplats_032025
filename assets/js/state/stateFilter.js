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
}


