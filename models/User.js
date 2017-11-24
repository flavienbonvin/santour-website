var user = class User{
    /**
     * 
     * @param {string} id 
     * @param {string} pseudo 
     * @param {string} email 
     * @param {string} password 
     * @param {string} typeUser 
     */
    constructor(id,pseudo,email,password,typeUser){
        this.id =id;
        this.pseudo = pseudo;
        this.email = email;
        this.password = password;
        this.typeUser = typeUser;
    }
}