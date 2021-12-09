const bcrypt = require('bcrypt');
const Admin = require('../models/Admin')
var session = require('express-session'); // For Sessions



module.exports = class AuthenticationController {

    /**
     * Check the login credentials from the login form against the databases credentials
     * @param {*} req - The request from the internet browser
     * @param {*} res - The response from the server 
     * On Succes -> Redirect to the index page of the images CRUD
     * On Failure ->
     */
    static async login(req, res) {
        var email = req.body.mail; // Get the email from the form
        var pswd = req.body.pswd; // Get the password from the form

        // Crypting of password
        //const saltRounds = 10; //Number of crypting of the password
        //const hash2 = bcrypt.hashSync("Pepe123!", saltRounds);
        //console.log(hash2);
        // try to get one admin by his mail
        try {
            var sql_result = await Admin.getOneByMail([email]);
        
        } catch (error) {
            // If Error, render the 500 error template
            return res.redirect("error/500")
        }

        // If the length of the request's result egal 0,
        // it mean the request did not found the email in the database
        if (sql_result.length == 0) {
            return res.status(403).json({errorMessage: "Wrong credentials"})
           // TODO replace the status 403 by an error array send to the login form
        } // EO IF

        // Check if the password from the from is the same as the crypted one from the db
        if (!bcrypt.compareSync(pswd, sql_result[0].pswd)) {
            return res.status(403).json({errorMessage: "Wrong password"});
            // TODO replace the status 403 by an error array send to the login form
        } // EO IF

        session = req.session; // Create the session
        session.isLogged = true; // Add the property 'isLogged' to the session
        // redirect to the index of the images CRUD
        return res.redirect('/spaceAdmin/index');
    }// EO Login

    /**
     * Destroy the current session and redirect to the home route
     * @param {*} req - The request from the internet browser
     * @param {*} res - The response from the server 
     */
    static logout(req, res) {
        // Destroy the current session and invalid the session ID of the client
        req.session.destroy();
        // Redirect to the home template
        return res.redirect('/');
    } // EO Logout

    /**
     * Check if the current session is allowed to access the protected ressources
     * @param {*} req - The request from the internet browser
     * @param {*} res - The response from the server
     * 
     * On Success -> The middleware allow the access
     * On Failure -> Redirect to the home route
     */
    static check(req, res, next) {
        
        return next(); // Comment this line to enable Protected Routes

        // if the 'isLogged' property is found in the current session
        if (req.session.isLogged) {
            // Allow the acces and go to the controller
            return next();
        } else {
            // Redirect to the home template
            return res.redirect('/');
        } // EO If/Else
    } // EO check

} // EO Authentication_Controller