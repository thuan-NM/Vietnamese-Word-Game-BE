const express = require("express");

const userController = require("../controllers/userController");

const userRouter = express.Router();

userRouter.get("/", userController.getUsersList);

userRouter.get("/rank", userController.getUsersTopRank);

userRouter.get("/:id", userController.getUserById);

userRouter.get("/totalpoint/:id", userController.getUserPoint);

userRouter.post("/login", userController.login);

userRouter.post("/register", userController.register);

userRouter.put("/changeinfo/:id", userController.changeInfo);
userRouter.put("/totalpoint", userController.updateTotalPoint);
userRouter.delete("/:id", userController.deleteUserById);

module.exports = userRouter;
