const express =  require("express");
const router = express.Router();
const PropertyController = require("../controllers/PropertyController");
const Auth = require('../auth');

router.get("/", Auth.requireLogin, PropertyController.getAll);
router.post("/getProperties", Auth.requireLogin, PropertyController.getProperties);
router.post("/", Auth.requireLogin, PropertyController.insert);
router.get("/:id", Auth.requireLogin, PropertyController.getById);
router.post("/edit", Auth.requireLogin, PropertyController.edit);
router.delete("/:id", Auth.requireLogin, PropertyController.removeById);

module.exports = router;