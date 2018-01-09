var Position = require('./Position');
var RatePOD = require('./RatePod');

var pod = class POD {
    /**
     * @description this a point of danger
     * @param {string} name 
     * @param {string} description 
     * @param {string} picture 
     * @param {Position} position 
     * @param {RatePOD[]} categoriesID 
     */
    constructor(name, description, picture, position, categoriesID) {
        this.name = name;
        this.description = description;
        this.picture = picture;
        this.position = position;
        this.categoriesID = categoriesID;
    }
}

module.exports = pod;