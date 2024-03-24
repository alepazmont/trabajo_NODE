const express = require("express");
const userRouter = express.Router();
const {
  createUser,
  authenticate,
  logout,
  getUsers,
} = require("../controller/user.controller");
const { isAuth } = require("../middlewares/auth.middleware");

userRouter.post("/register", createUser);
userRouter.post("/authenticate", authenticate); //Obtener un token
userRouter.post("/logout", [isAuth], logout);
//Obtener todos los usuarios
userRouter.get("/users", getUsers); //SOLO PARA USAR EN PRUEBAS - hay que borrarlo antes de pasar a producción.

module.exports = userRouter;
