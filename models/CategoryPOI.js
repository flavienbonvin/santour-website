var categroyPoi = class CategoryPOI{
    /**
     * @description This is a category used to define diffent category for point of interest
     * @param {string} id 
     * @param {string} name 
     */
    constructor(id,name){
        this.id = id;
        this.name = name;
    }
    convertToFirebase(){
        return {
            id: this.id,
            name : this.name
        }
    }
}

module.exports = categroyPoi;