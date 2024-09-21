const express = require("express");

const adminController = require("../controllers/adminController");

const adminRouter = express.Router();

adminRouter.get("/",adminController.getAdminsList)

adminRouter.get("/:id",adminController.getAdminById)

adminRouter.post("/login", adminController.login);

adminRouter.post("/register",adminController.register);

adminRouter.put("/changepassword/:id" ,adminController.changePassword);

adminRouter.put("/changeinfo/:id" ,adminController.changeInfo);

adminRouter.delete("/:id" ,adminController.deleteUserById);


module.exports = adminRouter;