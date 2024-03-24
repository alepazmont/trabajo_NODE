const mongoose = require('mongoose');

// Se importa el módulo mongoose para la interacción con la base de datos MongoDB.

/* const pass = "mongodb+srv://alepazmont:tEBb7TbaDL6nPWSV@cluster0.q1nfn32.mongodb.net/tienda_ficticia?retryWrites=true&w=majority&appName=Cluster0"
 */
// Se define la cadena de conexión a la base de datos MongoDB, que incluye el nombre de usuario, la contraseña, la URL del servidor y el nombre de la base de datos.

const connectMongo = async () => {
    try {
        // Se intenta establecer la conexión a la base de datos utilizando el método connect de mongoose.
        const conn = await mongoose.connect(process.env.MONGO_URI);
        
        // Si la conexión es exitosa, se muestra un mensaje de información en la consola indicando el nombre de la base de datos a la que se ha conectado.
        console.log('INFO: Conexión a BD correcta:', conn.connection.name)
    } catch (error) {
        // Si se produce un error durante la conexión, se captura y se muestra un mensaje de error en la consola.
        console.log('ERROR: (f connectMongo) ->', error.message);
    }
}

// Se exporta la función connectMongo para que pueda ser utilizada en otros archivos.

module.exports = { connectMongo };
