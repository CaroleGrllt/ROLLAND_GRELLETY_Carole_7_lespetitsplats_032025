export default class StateFilter {
    constructor() {
        this.searchLength   = 0;
        this.search         = [];
        this.appliances     = [];
        this.ingredients    = [];
        this.ustensils      = [];
        this.tags           = [];
    }

    // Remplace split(" ") et toLowerCase() par version manuelle
    setSearch(value) {
        this.search = [];
        this.searchLength = value.length;

        let word = "";
        let index = 0;

        for (let i = 0; i <= value.length; i++) {
            const char = i < value.length ? value[i].toLowerCase() : " ";
            if (char === " ") {
                if (word.length > 0) {
                    this.search[index++] = word;
                    word = "";
                }
            } else {
                word += char;
            }
        }
    }

    unsetSearch() {
        this.search = [];
        this.searchLength = 0;
    }

    setIngredients(value) {
        const val = value.toLowerCase();
        const len = this.ingredients.length;
        this.ingredients[len] = val;
    }

    unsetIngredients(value) {
        const newArr = [];
        let index = 0;
        for (let i = 0; i < this.ingredients.length; i++) {
            if (this.ingredients[i] !== value) {
                newArr[index++] = this.ingredients[i];
            }
        }
        this.ingredients = newArr;
    }

    setAppliances(value) {
        const val = value.toLowerCase();
        const len = this.appliances.length;
        this.appliances[len] = val;
    }

    unsetAppliances() {
        this.appliances = [];
    }

    setUstensils(value) {
        const val = value.toLowerCase();
        const len = this.ustensils.length;
        this.ustensils[len] = val;
    }

    unsetUstensils(value) {
        const newArr = [];
        let index = 0;
        for (let i = 0; i < this.ustensils.length; i++) {
            if (this.ustensils[i] !== value) {
                newArr[index++] = this.ustensils[i];
            }
        }
        this.ustensils = newArr;
    }

    setTags(value) {
        const len = this.tags.length;
        this.tags[len] = value;
    }

    getTags() {
        return this.tags;
    }

    unsetTags(value) {
        const newArr = [];
        let index = 0;
        for (let i = 0; i < this.tags.length; i++) {
            if (this.tags[i] !== value) {
                newArr[index++] = this.tags[i];
            }
        }
        this.tags = newArr;
    }

    unsetAll() {
        this.searchLength   = 0;
        this.search         = [];
        this.appliances     = [];
        this.ingredients    = [];
        this.ustensils      = [];
        this.tags           = [];
    }
}