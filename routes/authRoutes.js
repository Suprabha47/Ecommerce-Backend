const express = require("express");
const router = express.Router();
const { signUp, signIn, googleAuth } = require("../controllers/authController");

router.post("/sign-up", signUp);
router.post("/sign-in", signIn);
router.post("/google-auth", googleAuth);

module.exports = router;
