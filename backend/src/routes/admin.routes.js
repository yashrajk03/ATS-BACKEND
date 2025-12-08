console.log("ADMIN ROUTES FILE LOADED");

const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin.controller");
const auth = require("../middleware/auth.middleware");

// Public Routes
router.post("/register", adminController.register);
router.post("/login", adminController.login);

// Protected Route
router.get("/profile", auth, adminController.profile);

module.exports = router;
