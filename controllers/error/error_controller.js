/**
 * Error Screen Rendering Controller
 */
module.exports = class errorController {

    /**
     * Render the appropriate template when the controller is called
     * @param {*} req - The request from the internet browser
     * @param {*} res - The response from the server
     * @returns Render the error template with error data
     */
    static error500(req, res) {
        return res.render("error/template", 
        {error: 
            {
                // Error Code
                code: 500,
                // Custom Message to Display
                message: "Something went wrong, I suggest come back later"
            }
        });
    } // EO Error500

    /**
     * Render the appropriate template when the controller is called
     * @param {*} req - The request from the internet browser
     * @param {*} res - The response from the server
     * @returns Render the error template with error data
     */
    static error404(req, res) {
        return res.render("error/template", 
        {error: 
            {
                // Error Code
                code: 404,
            
                // Custom Message to Display
                message: "The Page you are looking for doesn't exist"
            }
        });
    } // EO Error404

}