var db_Controller = require('../controllers/db_Controller');

class Admin {

    /**
     * Constructor of the Admin Model Class
     * @param {*} mail - Email of the admin
     * @param {*} pswd - Password of the admin
     */

    constructor(id, email, password) {
        this.mail = mail,
        this.pswd  = pswd 
    }

    /**
     * Fonction permettant de récupérer les admins
     */
    static getAll() {
        const sql_string = "SELECT * FROM admin";
        return db_Controller.sql(sql_string);
        
    } // EO getAll

    /**
     * Fonction permettant de retourner un admin par son email
     * @param {any[]} argTab - Email of the admin in an array.
     */
    static getOneByMail(argTab) {
        const sql_string = "SELECT * FROM admin where mail = ?";
        try {
            return db_Controller.sql(sql_string, argTab);
        } catch (error) {
            throw error;
        }
    } // EO getOneByMail

} // EO Class Admin

module.exports = Admin;