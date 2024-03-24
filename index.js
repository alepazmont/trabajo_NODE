// librerías importadas
const express = require("express"); // Importa la biblioteca Express para la creación de aplicaciones web.
const cors = require("cors"); // Importa la biblioteca CORS para permitir solicitudes HTTP entre diferentes dominios.
const path = require("path"); // Importa el módulo path

require("dotenv").config(); // Solicita las variables de entorno a traves de .env

// componentes "míos" que voy a utilizar
const HTTPSTATUSCODE = require("./utils/httpStatusCode"); // Importa un módulo personalizado que contiene códigos de estado HTTP.
const { connectMongo } = require("./utils/db"); // Importa una función personalizada para conectar a la base de datos MongoDB.
const orderRouter = require("./src/routes/order.routes"); // Importa el enrutador de pedidos desde su ubicación en el proyecto.
const userRouter = require("./src/routes/user.routes"); // Importa el enrutador de usuarios desde su ubicación en el proyecto.
const productRouter = require("./src/routes/product.routes"); // Importa el enrutador de productos desde su ubicación en el proyecto.
/* const releaseRouter = require("./src/routes/release.router");
 */
// AQUI EL ROUTER DE CONTRIBUTOR

const PORT = process.env.PORT || 3000 /* 3000 */; // Puerto en el que se ejecutará el servidor.

// CONFIGURACION
connectMongo(); // Llama a la función para conectar a la base de datos MongoDB.
const app = express(); // Crea una instancia de la aplicación Express.


// Middleware para configurar CORS y permitir solicitudes de diferentes dominios.
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Methods", "GET,PATCH,POST,DELETE"); // Define los métodos HTTP permitidos en las solicitudes CORS.
  res.header("Access-Control-Allow-Credentials", true); // Permite credenciales en las solicitudes CORS.
  res.header("Access-Control-Allow-Headers", "Content-Type"); // Define los encabezados permitidos en las solicitudes CORS.
  next(); // Llama a la siguiente función de middleware.
});

app.use(cors()); // Utiliza el middleware CORS para permitir solicitudes entre diferentes dominios.
app.use(express.json()); // Middleware para analizar el cuerpo de las solicitudes entrantes con formato JSON.
app.use(express.urlencoded({ extended: true })); // Middleware para analizar el cuerpo de las solicitudes entrantes con formato de formulario codificado.
app.set("secretKey", process.env.JWT_SECRET/* "N7dgy5274lAYj0CeDSDqjJ0shijoYQPR" */); // Establece una clave secreta para JWT (JSON Web Tokens).
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

/* ROUTES */
app.use("/order", orderRouter); // Define las rutas para los pedidos y utiliza el enrutador de pedidos.
app.use("/product", productRouter); // Define las rutas para los productos y utiliza el enrutador de productos.
app.use("/user", userRouter); // Define las rutas para los usuarios y utiliza el enrutador de usuarios.

// Ruta de bienvenida
app.get("/", (request, response) => {
  response.status(200).json({
    message: "Conectado al servidor", // Mensaje de bienvenida enviado como respuesta.
    app: "BBDD para tienda ficticia", // Nombre de la aplicación enviado como respuesta.
  });
});

/* MANEJO DE ERRORES */

// Middleware para manejar errores 404 (no encontrado).
app.use((request, response, next) => {
  let error = new Error(); // Crea un nuevo objeto de error.
  error.status = 404; // Establece el código de estado del error en 404.
  error.message = HTTPSTATUSCODE[404]; // Establece el mensaje de error utilizando el módulo de códigos de estado HTTP.
  next(error); // Llama al siguiente middleware con el objeto de error.
});

// Middleware para manejar errores generales.
app.use((error, request, response, next) => {
  return response
    .status(error.status || 500) // Devuelve el código de estado del error o 500 si no está definido.
    .json(error.message || "Unexpected error"); // Devuelve el mensaje de error o "Unexpected error" si no está definido.
});

app.disable("x-powered-by"); // Deshabilita la cabecera "X-Powered-By" para mejorar la seguridad.

/* DEFINIR EL PUERTO E INICIAR LA ESCUCHA */
app.listen(PORT, () => {
  console.log(`app running in port ${PORT}`); // Imprime un mensaje en la consola indicando que el servidor está escuchando en el puerto especificado.
});
