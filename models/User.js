var user = class User {
    /**
     * @description a user a an object that allow a person to use website or application
     * @param {string} id 
     * @param {string} idAuth 
     * @param {string} email 
     * @param {string} password 
     * @param {string} typeUser 
     */
    constructor(id, idAuth, email, password, typeUser) {
        this.id = id;
        this.idAuth = idAuth;
        this.email = email;
        this.password = password;
        this.typeUser = typeUser;
    }

    convertToFirebase(){
        return {
            idAuth : this.idAuth,
            email : this.email,
            password : this.password,
            typeUser : this.typeUser
        }
    }
}

module.exports = user;