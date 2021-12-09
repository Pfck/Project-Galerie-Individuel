require('dotenv').config();
const mysql = require("mysql2");

/**
 * Connect to the Databse and execute the given SQL command with or without
 * an array of values
 * @param {String} req_sql - The SQL command with ? as values
 * @param {Any[]} paramtb - (Optional) An array of escaped values
 * @returns {mysql.QueryError | Promise<JSON[]>}
 * - On succes: Results of the query as a Promise
 * - On Failure: mysql.QueryError as a Promise
 * 
 */
function sql(req_sql, paramtb = []) {
    // Creating the connection to the database with env variables
    
    var connection = mysql.createConnection({
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PWD,
        database: process.env.DB
    });

    // Try to connect to the database and to Promisify the query
    // Sending the query
    return new Promise((resolve, reject) => {

        // Connecting to the database
        connection.connect();
        // Quering the database
        connection.query(req_sql, paramtb, (err, rows) => {

            
            // If Error
            if (err) {

                // If Error code = 'ECONNREFUSED'
                if (err.code == 'ECONNREFUSED') {
                    // TODO Log the error
                    // Rejecting the promise with new error
                    reject(new Error("Erreur Connection BaseDeDonnee"));
                } // EO if (err.code)
                
                // TODO Log the error
                reject(new Error({error: "Promise Rejected"}));
                //reject("err");
            } // EO if (err)
            
            // On resolve return the rows
            resolve(rows);
        });
    }); // EO RETURN
        
} // EO SQL


module.exports = { sql }