const express = require("express");
const router = express.Router();
const authController = require("../controllers/userController");

router.get("/", authController.getUsers);

router.get("/logout", authController.logout);

router.get("/count", authController.getUserCount);

router.get("/:id", authController.getUser);

router.post("/register", authController.register);

router.post("/login", authController.login);

router.delete("/:id", authController.deleteUser);

router.put("/:id", authController.editUser);

// router.put("/password/:id", authController.editPassword);

module.exports = router;
