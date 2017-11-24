var Position = require('./Position');

var poi = class POI {
    /**
     * 
     * @param {string} name 
     * @param {string} description 
     * @param {string} picture 
     * @param {Position} position 
     * @param {string[]} categoriesID 
     */
    constructor(name, description, picture, position, categoriesID) {
        this.name = name;
        this.description = description;
        this.picture = picture;
        this.position = position;
        this.categoriesID = categoriesID;
    }
}

module.exports = poi;