const express = require("express");
//EL ROUTER ES EL OBJETO QUE GUARDA TODAS LAS RUTAS.
const orderRouter = express.Router();
//INSTANCIAMOS AL CONTROLADOR PARA USAR LAS FUNCIONES RELATIVAS A CADA RUTA
const {
  getOrder,
  getOrders,
  createOrder,
  updateOrder,
  deleteOrder,
} = require("../controller/order.controller");

const { isAuth } = require("../middlewares/auth.middleware");

// LAS RUTAS
//nombreDelRouter.get('endpoint', <nombreDeLaFuncion>);

//OBTENER UNA CANCIÓN
orderRouter.get("/get", getOrder);

//OBTENER TODAS LAS CANCIONES
orderRouter.get("/getAll", getOrders);

//CREAR UNA CANCIÓN
orderRouter.post("/create", [isAuth], createOrder);

//UPDATE
orderRouter.patch("/update", [isAuth], updateOrder);

//DELETE
orderRouter.delete("/delete", [isAuth], deleteOrder);

module.exports = orderRouter;
