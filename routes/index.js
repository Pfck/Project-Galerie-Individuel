var express = require('express');
var router = express.Router();
const Img_tab = require("../models/Img_tab");


/* GET home page. */
router.get('/', async (req, res) => {
    var sql_results = await Img_tab.getAll();
    res.render("home", {tb_img : sql_results});
});




module.exports = router;
