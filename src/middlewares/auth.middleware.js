// Importación de la librería jsonwebtoken para manejar tokens JWT
const jwt = require("jsonwebtoken");

// Importación del módulo de códigos de estado HTTP
const HTTPSTATUSCODE = require("../../utils/httpStatusCode");

// Middleware para verificar la autenticación del usuario
const isAuth = (request, response, next) => {
  // Obtiene el token de autorización de las cabeceras de la solicitud
  const authorization = request.headers.authorization;

  // Verifica si el token de autorización existe
  if (!authorization) {
    // Si no existe, devuelve un error de autenticación
    return response.json({
      status: 401,
      message: HTTPSTATUSCODE[401], // Obtiene el mensaje asociado al código de estado HTTP 401
      data: null,
    });
  }

  // Divide el token de autorización en sus partes separadas
  const splits = authorization.split(" ");
  
  // Verifica si el token está en el formato correcto
  if (splits.length != 2 || splits[0] != "Bearer") {
    // Si no está en el formato correcto, devuelve un error de solicitud incorrecta
    return response.json({
      status: 400,
      message: HTTPSTATUSCODE[400], // Obtiene el mensaje asociado al código de estado HTTP 400
      data: null,
    });
  }

  // Extrae la cadena JWT del token
  const jwtString = splits[1];

  try {
    // Verifica y decodifica el token JWT utilizando la clave secreta del servidor
    var token = jwt.verify(jwtString, request.app.get("secretKey"));
  } catch (error) {
    // Si hay un error al verificar el token, pasa el error al siguiente middleware
    return next(error);
  }

  // Extrae la información del usuario (en este caso, la ID y el nombre de usuario) del token decodificado
  const authority = {
    id: token.id,
    username: token.username,
  };

  // Añade la información del usuario a la solicitud para que esté disponible en los siguientes middlewares o controladores
  request.authority = authority;

  // Continúa con el siguiente middleware o controlador
  next();
};

// Exporta el middleware isAuth para que pueda ser utilizado en otros archivos
module.exports = {
  isAuth,
};
