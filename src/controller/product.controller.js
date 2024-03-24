const Product = require("../model/product.model"); // Importa el modelo de producto
const HTTPSTATUSCODE = require("../../utils/httpStatusCode"); // Importa un módulo de códigos de estado HTTP

// FUNCIONES CRUD

// - CREATE

const createProduct = async (req, res, next) => { // Controlador para crear un nuevo producto
  try {
    const product = new Product(req.body); // Crea un nuevo objeto de producto con los datos recibidos del cliente
    await product.save(); // Guarda el producto en la base de datos
    // Responde con los detalles del producto creado
    res.status(201).json({
      status: 201,
      message: HTTPSTATUSCODE[201],
      data: product,
    });
  } catch (error) { 
    next(error);
  }
};

// - READ

// -- UN PRODUCTO
const getProduct = async (req, res, next) => { // Controlador para obtener un solo producto
  try {
    const id = req.params.id; // Obtiene la ID del producto de los parámetros de la URL
    const product = await Product.findById(id); // Busca el producto en la base de datos por su ID
    // Responde con los detalles del producto encontrado
    res.status(200).json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      data: product,
    });
  } catch (error) { 
    next(error);
  }
};

// -- LISTA DE PRODUCTOS
const getProducts = async (req, res, next) => { // Controlador para obtener todos los productos
  try {
    const products = await Product.find(); // Busca todos los productos en la base de datos
    // Responde con una lista de todos los productos encontrados
    res.status(200).json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      data: products,
    });
  } catch (error) { 
    next(error);
  }
};

// - UPDATE

const updateProduct = async (req, res, next) => { // Controlador para actualizar un producto existente
  try {
    const id = req.params.id; // Obtiene la ID del producto a actualizar de los parámetros de la URL
    const body = req.body; // Recopila los datos actualizados del producto del cuerpo de la solicitud
    const product = await Product.findByIdAndUpdate(id, body, { new: true }); // Busca y actualiza el producto en la base de datos
    if (!product) { // Error 404 si el producto no se encontró
      return res.status(404).json({
        status: 404,
        message: HTTPSTATUSCODE[404],
      });
    }
    // Responde con los detalles del producto actualizado
    res.status(200).json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      data: product,
    });
  } catch (error) { 
    next(error);
  }
};

// - DELETE

const deleteProduct = async (req, res, next) => { // Controlador para eliminar un producto existente
  try {
    const id = req.params.id; // Obtiene la ID del producto a eliminar de los parámetros de la URL
    const product = await Product.findByIdAndDelete(id); // Busca y elimina el producto de la base de datos
    if (!product) { // Verifica si el producto no se encontró
      return res.status(404).json({ message: "Product not found" }); // Responde al cliente con un mensaje de error personalizado
    }
    // Responde al cliente con los detalles del producto eliminado
    res.status(200).json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      data: product,
    });
  } catch (error) { 
    next(error);
  }
};

module.exports = { getProduct, getProducts, createProduct, updateProduct, deleteProduct }; // Exporta las funciones CRUD para su uso en otros archivos
