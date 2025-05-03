export default function StateFilter() {
    this.searchLength = 0;
    this.search = [];
    this.appliances = [];
    this.ingredients = [];
    this.ustensils = [];
    this.tags = [];
}

StateFilter.prototype.setSearch = function(value) {
    this.search = value.toLowerCase().split(' ');
    this.searchLength = value.length;
};

StateFilter.prototype.unsetSearch = function() {
    this.search = [];
    this.searchLength = 0;
};

StateFilter.prototype.setIngredients = function(value) {
    this.ingredients.push(value.toLowerCase());
};

StateFilter.prototype.unsetIngredients = function(value) {
    const result = [];
    for (let i = 0; i < this.ingredients.length; i++) {
        if (this.ingredients[i] !== value) {
            result.push(this.ingredients[i]);
        }
    }
    this.ingredients = result;
};

StateFilter.prototype.setAppliances = function(value) {
    this.appliances.push(value.toLowerCase());
};

StateFilter.prototype.unsetAppliances = function() {
    this.appliances = [];
};

StateFilter.prototype.setUstensils = function(value) {
    this.ustensils.push(value.toLowerCase());
};

StateFilter.prototype.unsetUstensils = function(value) {
    const result = [];
    for (let i = 0; i < this.ustensils.length; i++) {
        if (this.ustensils[i] !== value) {
            result.push(this.ustensils[i]);
        }
    }
    this.ustensils = result;
};

StateFilter.prototype.setTags = function(value) {
    this.tags.push(value);
};

StateFilter.prototype.getTags = function() {
    return this.tags;
};

StateFilter.prototype.unsetTags = function(value) {
    const result = [];
    for (let i = 0; i < this.tags.length; i++) {
        if (this.tags[i] !== value) {
            result.push(this.tags[i]);
        }
    }
    this.tags = result;
};

StateFilter.prototype.unsetAll = function() {
    this.searchLength = 0;
    this.search = [];
    this.appliances = [];
    this.ingredients = [];
    this.ustensils = [];
    this.tags = [];
};


