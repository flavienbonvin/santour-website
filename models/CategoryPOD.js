var categroyPod = class CategoryPOD{
    /**
     * @description this is a categroy pod use to define different kind of category for each point of danger
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

module.exports = categroyPod;