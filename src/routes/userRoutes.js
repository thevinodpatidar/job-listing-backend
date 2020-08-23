const express = require("express");
const router  = express.Router();

// import user controller.
const { UserAuthController }= require("../controllers/index");

router.post("/login",UserAuthController.Login);
router.post("/signup",UserAuthController.SignUp);

module.exports = router;