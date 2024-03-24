// Importación de módulos necesarios
const User = require("../model/user.model"); // Se importa el modelo de usuario
const bcrypt = require("bcrypt"); // Se importa la librería para el hash de contraseñas
const jwt = require("jsonwebtoken"); // Se importa la librería para generar tokens JWT
const HTTPSTATUSCODE = require("../../utils/httpStatusCode"); // Se importa el módulo de códigos de estado HTTP

// Función para crear un nuevo usuario
const createUser = async (request, response, next) => {
  try {
    const user = new User(); // Se crea una nueva instancia del modelo de usuario
    // Se asignan los datos recibidos en el cuerpo de la solicitud al objeto de usuario
    user.username = request.body.username;
    user.name = request.body.name;
    user.lastname = request.body.lastname;
    user.email = request.body.email;
    user.birthday = request.body.birthday;
    user.gender = request.body.gender;
    user.city = request.body.city;
    user.users = request.body.users;

    const salt = 10; // Se define el nivel de sal para el hash de la contraseña
    user.password = await bcrypt.hash(request.body.password, salt); // Se encripta la contraseña

    // Se verifica si ya existe un usuario con el mismo nombre de usuario
    if (await User.findOne({ username: request.body.username })) {
      return response.status(400).json({
        status: 400,
        message: HTTPSTATUSCODE[400],
        data: user,
      });
    }

    // Se guarda el usuario en la base de datos
    await user.save();
    return response.status(201).json({
      status: 201,
      message: HTTPSTATUSCODE[201],
      data: user,
    });
  } catch (error) {
    next(error); // Se pasa el error al siguiente middleware
  }
};

// Función para autenticar a un usuario
const authenticate = async (request, response, next) => {
  try {
    // Se busca el usuario por nombre de usuario en la base de datos
    const userInfo = await User.findOne({ username: request.body.username });

    // Se compara la contraseña proporcionada con la almacenada en la base de datos
    if (bcrypt.compareSync(request.body.password, userInfo.password)) {
      // Si las contraseñas coinciden, se genera un token JWT
      const token = jwt.sign(
        {
          id: userInfo._id,
          username: userInfo.username,
        },
        request.app.get("secretKey"),
        { expiresIn: "1d" }
      );

      // Se devuelve la respuesta con el token y la información del usuario
      return response.json({
        status: 200,
        message: HTTPSTATUSCODE[200],
        data: { user: userInfo, token: token },
      });
    } else {
      // Si las contraseñas no coinciden, se devuelve un error 400
      return response.json({
        status: 400,
        message: HTTPSTATUSCODE[400],
        data: null,
      });
    }
  } catch (error) {
    return next(error); // Se pasa el error al siguiente middleware
  }
};

// Función para cerrar sesión (logout)
const logout = (request, response, next) => {
  try {
    // Se devuelve una respuesta exitosa con un token nulo para cerrar sesión
    return res.json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      token: null,
    });
  } catch (error) {
    return next(error); // Se pasa el error al siguiente middleware
  }
};

// Función para obtener todos los usuarios
const getUsers = async (request, response, next) => {
  try {
    // Se obtienen todos los usuarios de la base de datos
    const users = await User.find();
    // Se devuelve la respuesta con los usuarios obtenidos
    response.status(200).json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      data: users,
    });
  } catch (error) {
    next(error); // Se pasa el error al siguiente middleware
  }
};

// Exportación de las funciones del controlador
module.exports = {
  createUser,
  authenticate,
  logout,
  getUsers,
};
