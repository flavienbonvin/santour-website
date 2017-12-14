var categroyPoi = class CategoryPOI{
    /**
     * 
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