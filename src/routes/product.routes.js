const express = require("express");
//EL ROUTER ES EL OBJETO QUE GUARDA TODAS LAS RUTAS.
const productRouter = express.Router();
//INSTANCIAMOS AL CONTROLADOR PARA USAR LAS FUNCIONES RELATIVAS A CADA RUTA
const {
  getProduct,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controller/product.controller");

const { upload } = require("../middlewares/file.middleware");
const { isAuth } = require("../middlewares/auth.middleware");

// LAS RUTAS
//nombreDelRouter.get('endpoint', <nombreDeLaFuncion>);

//OBTENER UNA CANCIÓN
productRouter.get("/get/:id", getProduct);

//OBTENER TODAS LAS CANCIONES
productRouter.get("/getAll", getProducts);

//CREAR UNA CANCIÓN
// .single es una función de subida de UN ARCHIVO, el campo en los parámetros es donde se espera la recepción de dicho archivo
// en caso de que queramos subir mas de un archivo tendríamos que crear un array [upload.array('cover')]
productRouter.post("/create", [upload.single("product_image"), isAuth], createProduct);
/* productRouter.post("/create", [isAuth], createProduct); */

//UPDATE
productRouter.patch("/update/:id", [upload.single("product_image"), isAuth ], updateProduct);

//DELETE
productRouter.delete("/delete", [isAuth], deleteProduct);

module.exports = productRouter;
