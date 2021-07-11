const express =  require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const Auth = require('../auth');

router.get("/", Auth.requireLogin, UserController.getAll);
router.post("/", UserController.insert);
router.get("/:id", Auth.requireLogin, UserController.getById);
router.post("/edit", Auth.requireLogin, UserController.edit);
router.delete("/:id", Auth.requireLogin, UserController.removeById);
router.post("/auth", UserController.auth);

module.exports = router;