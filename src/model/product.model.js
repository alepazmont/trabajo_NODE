const mongoose = require("mongoose");

// Se importa el módulo mongoose para la interacción con la base de datos MongoDB.

const productSchema = new mongoose.Schema({
  // Se define el esquema para el modelo de producto.
  // Se especifican los campos del esquema con sus respectivos tipos y opciones.

  category: {
    type: String,
    trim: true,
    required: true,
  },
  product_name: {
    type: String,
    trim: true,
    required: true,
  },
  brand: {
    type: String,
    trim: true,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  color: {
    type: String,
    trim: true,
    required: true,
  },
  size: {
    type: String,
    trim: true,
  },
  material: {
    type: String,
    trim: true,
    required: true,
  },
  dimensions: {
    type: String,
    trim: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    default: 0,
  },
  product_image: {
    type: String,
    trim: true,
  }
});

// Se define el esquema del modelo de producto utilizando mongoose.Schema.

module.exports = mongoose.model('Product', productSchema);

// Se define el modelo de producto utilizando el esquema definido y se exporta para su uso en otros archivos.
