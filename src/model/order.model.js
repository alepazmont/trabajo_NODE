const mongoose = require('mongoose');

// Se importa el módulo mongoose para la interacción con la base de datos MongoDB.

const orderSchema = new mongoose.Schema({
  // Se define el esquema para el modelo de orden.
  // Se especifican los campos del esquema con sus respectivos tipos y opciones.

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }],
  total_price: {
    type: Number,
    required: true
  },
  paid: {
    type: Boolean,
    default: false
  },
  shipping_address: {
    type: String,
    trim: true,
    required: true
  },
  shipping_cost: {
    type: Number,
    required: true
  },
  free_shipping: {
    type: Boolean,
    default: false
  },
  order_date: {
    type: Date,
    default: Date.now
  },
  delivery_date: {
    type: Date
  },
  order_status: {
    type: String,
    enum: ['pending', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  }
});

// Se define el esquema del modelo de orden utilizando mongoose.Schema.

module.exports = mongoose.model('Order', orderSchema);

// Se define el modelo de orden utilizando el esquema definido y se exporta para su uso en otros archivos.
