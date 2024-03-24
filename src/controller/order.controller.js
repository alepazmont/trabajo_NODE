const Order = require("../model/order.model");
// Se importa el modelo Order desde el archivo order.model.js.

const HTTPSTATUSCODE = require("../../utils/httpStatusCode");
// Se importa el objeto HTTPSTATUSCODE, que contiene códigos de estado HTTP, desde el archivo httpStatusCode.js.

const getOrder = async (req, res, next) => {
  try {
    // Se obtiene el ID proporcionado por el usuario en la solicitud.
    const id = req.params.id;
    // Se busca en la base de datos el pedido correspondiente al ID proporcionado y se popula el campo 'user'.
    const order = await Order.findById(id).populate("user");
    // Se responde con el pedido encontrado.
    res.status(200).json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

const getOrders = async (req, res, next) => {
  try {
    // Se buscan todos los pedidos en la base de datos y se popula el campo 'user'.
    const orders = await Order.find().populate("user");
    // Se responde con la lista de pedidos encontrados.
    res.status(200).json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      data: orders,
    });
  } catch (error) {
    next(error);
  }
};

const createOrder = async (req, res, next) => {
  try {
    // Se crea un nuevo pedido con los datos proporcionados por el usuario.
    const order = new Order(req.body);
    // Se guarda el nuevo pedido en la base de datos.
    await order.save();
    // Se responde confirmando la creación del pedido.
    res.status(201).json({
      status: 201,
      message: HTTPSTATUSCODE[201],
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

const updateOrder = async (req, res, next) => {
  try {
    // Se obtiene el ID del pedido que se va a modificar.
    const id = req.params.id;
    // Se recopilan los datos que el usuario desea modificar.
    const body = req.body;
    // Se actualiza el pedido en la base de datos con los nuevos datos proporcionados.
    const order = await Order.findByIdAndUpdate(id, body, { new: true });
    // Si el pedido no se encuentra, se responde con un código de estado 404.
    if (!order) {
      return res.status(404).json({
        status: 404,
        message: HTTPSTATUSCODE[404],
      });
    }
    // Se responde con el pedido modificado.
    res.status(200).json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

const deleteOrder = async (req, res, next) => {
  try {
    // Se obtiene el ID del pedido que se va a eliminar.
    const id = req.params.id;
    // Se elimina el pedido de la base de datos.
    const order = await Order.findByIdAndDelete(id);
    // Si el pedido no se encuentra, se responde con un mensaje de error personalizado.
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    // Se responde confirmando la eliminación del pedido.
    res.status(200).json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getOrder, getOrders, createOrder, updateOrder, deleteOrder };
// Se exportan las funciones definidas para su uso en otros archivos.
