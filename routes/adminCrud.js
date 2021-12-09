var express = require('express');
var router = express.Router();


// Controller
var auth = require("../controllers/Authentication_Controller");
var auth_check = auth.check;

const img_TabController = require('../controllers/img_tabController');
// EO Controller

/** CRUD in session */

 // Index
router.get("/index", auth_check,  img_TabController.index); // Index Template

// Create new img_tab
router.get("/new", auth_check, img_TabController.new_img); // Template/Form
router.post("/new", auth_check, img_TabController.new_img); // Route Return from Preview
router.post("/new/preview", auth_check, img_TabController.new_preview); // Preview Template
router.post("/image", auth_check, img_TabController.create); // Post Route

// Update img_tab
router.get("/:id/edit", auth_check, img_TabController.edit); // Template/Form
router.post("/:id/edit", auth_check, img_TabController.edit); // Route Return from Preview
router.post("/:id/edit/preview", auth_check, img_TabController.edit_preview); // Preview Template
router.post("/:id", auth_check, img_TabController.update); // Put Route

// Delete img_tab
router.get("/:id/suppression", auth_check, img_TabController.suppression); // Template/Confirmation
router.get("/:id/delete", auth_check, img_TabController.delete); // Delete Route


// router.use('/', pictureRouter);

module.exports = router;