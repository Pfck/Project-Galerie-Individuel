var sql = require("../controllers/db_Controller"); // Controller for sql queries

/**
 * Model de la table img_tab
 */
module.exports = class Img_tab {

    /**
     * Constructeur du model Img_tab
     * @param {String} title - The title of the picture
     * @param {String} img_url - The url to the picture
     * @param {String} description - The Description of the picture
     */
    constructor(title, img_url, description) {
        this.title = title;
        this.img_url = img_url;
        this.description = description;
    } // EO constructor()

    /**
     * Get One img_tab from his id and return it
     * @param {any[]} argTab - Array containing an id
     * @returns {Error | Promise<JSON[]>}
     * - On Succes: Promise of an Array of JSON
     * - On Failure: Error with message
     */
    static async getOneById(argTab) {
        // The Query String
        var query_str = 
                "SELECT * " +
                "FROM img_tab " +
                "where id = ?";
        // Return the results of the query with the array as value
        try {
            return await sql.sql(query_str, argTab);

        // If error
        } catch (error) {
            //Throwing the error
            throw error;
        }// EO Try/Catch
        
    } // EO getOneById()

    /**
     * Get all img_tab and return them
     * @returns {Error | Promise<JSON[]>}
     * - On Succes: Promise of an Array of JSON
     * - On Failure: Error with message
     */
    static async getAll() {
        // The Query String
        var query_str = 
                "SELECT * " +
                "FROM img_tab " +
                "ORDER BY RAND ()"; 

        // Return the query result
        try {
            return await sql.sql(query_str);

        // If error 
        } catch (error) {
            //Throwing the error
            throw error;
        } // EO Try/Catch
        
        
    } // EO getAll()

    static async getAllExceptOneId(argTab) {
        // The Query String
        var query_str = 
                "SELECT * " +
                "FROM img_tab " +
                "WHERE NOT id = ?"; 
        
        // Return the query result
        try {
            return await sql.sql(query_str,argTab);

        // If error 
        } catch (error) {
            //Throwing the error
            throw error;
        } // EO Try/Catch
    }


    /**
     * Get One img_tab from his img_url and return it
     * @param {any[]} argTab - Array containing an img_url
     * @returns {Error | Promise<JSON[]>}
     * - On Succes: Promise of an Array of JSON
     * - On Failure: Error with message
     */
    static getOneByLink(argTab) {
        // The Query String
        var query_str = 
                "SELECT * " +
                "FROM img_tab " +
                "WHERE img_url = ?"; 

        // Return the results of the query with the array as value
        try {
            return sql.sql(query_str, argTab);
        // If error 
        } catch (error) {
            //Throwing the error
            throw error;
        } // EO Try/Catch

    } // EO getOneByLink()

    /**
     * Update an entry of the img_tab table by its id
     * @param {any[]} argTab - an arguments array [title, img_url, description, id]
     * @returns {Error | true}
     * - On Succes: Boolean true
     * - On Failure: Error
     */
    static updateOneById(argTab) {
        var query_str = 
                "UPDATE img_tab SET " +
                "titre = ?, " +
                "img_url = ?, " +
                "description = ? " +
                "WHERE id = ?;";

        try {
            sql.sql(query_str, argTab);
        // If error 
        } catch (error) {
            //Throwing the error
            throw error;
        } // EO Try/Catch
       
        return true;
        
    } // EO updateOneById


    /**
     * Check if the img_url is already inside the database and if not
     * flush the current object in the database
     * @returns {true | Error}
     * - On Succes: Boolean True
     * - On Failure: Error with message
     */
    async insert() {

        // The query String
        var query_str = 
                "INSERT INTO img_tab " +
                "(titre, img_url, description) " +
                "VALUES (?, ?, ?);"

        // Check in the database if an entry have the same img_url
        try {
            var results = await Img_tab.getOneByLink([this.img_url]);
        } catch (error) {
            throw error;
        } // EO try/catch
        
        // If the result of the previous query have a length of 0
        // (It mean the request have not found the img_url)
        if (results.length == 0) {
            // Insert the current object in the database
            try {
                await sql.sql(query_str, [this.title, this.img_url, this.description]);
            } catch (error) {
                throw error;
            }
        // If the result return with a length > 0
        } else {
            // Return new Error with message
            throw new Error("Le lien est déjà utilisé");
        }
        // return true
        return true;
    } // EO insert()


    /**
     * Delete a img_tab from its id
     * @param {any[]} argTab 
     * @returns {Error | true}
     * - On succes: Return Boolean True
     * - On failure: Throw Error
     */
    static deleteById(argTab) {

        // The query String
        var query_str = 
                "DELETE FROM img_tab " +
                "WHERE id = ?"

        // Try delete img_tab from its id
        try {
            sql.sql(query_str, argTab)

        // If error
        } catch (error) {

            // Throw Error
            throw new Error("Error");
        }

        // Return true
        return true;
    }

}// EO Img_tab