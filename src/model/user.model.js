const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Se importa el módulo mongoose para la interacción con la base de datos MongoDB.
// Se importa el módulo bcrypt para el hash y la comparación de contraseñas.
// Se define el nivel de complejidad de encriptación (salt) para el hash de contraseñas.

const salt = 10;

const userSchema = new mongoose.Schema({
  // Se define el esquema para el modelo de usuario.
  // Se especifican los campos del esquema con sus respectivos tipos y opciones.

  username: {
    type: String,
    unique: true,
    trim: true,
    required: true,
  },
  name: {
    type: String,
    trim: true,
    required: true,
  },
  lastname: {
    type: String,
    trim: true,
    required: true,
  },
  password: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    required: true,
  },
  phone: {
    type: String,
    trim: true,
  },
  birthday: {
    type: String,
    trim: true,
  },
  address: {
    type: String,
    trim: true,
  },
  paymentData: {
    type: String,
    trim: true,
  },
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order' // Esto indica a Mongoose que el campo `order` está relacionado con el modelo `Order`
  }
});

// Se define el esquema del modelo de usuario utilizando mongoose.Schema.

userSchema.pre("save", (next) => {
  // Se define un middleware previo a guardar el usuario en la base de datos.

  if (this.password) {
    // Si la contraseña está presente en el objeto del usuario, se procede a realizar el hash de la misma.
    this.password = bcrypt.hashSync(this.password, salt);
  }
  next();
});

// Se utiliza un hook (middleware) de Mongoose para ejecutar una función antes de guardar un usuario en la base de datos.

const User = mongoose.model("User", userSchema);
module.exports = User;

// Se define el modelo de usuario utilizando el esquema definido y se exporta para su uso en otros archivos.
