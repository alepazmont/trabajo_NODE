// Importación de la librería multer para el manejo de archivos
const multer = require('multer'); // npm i multer
const axios = require('axios'); // Importa axios para hacer solicitudes HTTP

// Importación del módulo path para manejar rutas de archivos
const path = require('path');
const fs = require('fs'); // Importa fs para manejar archivos en el sistema de archivos

// Configuración del almacenamiento de archivos utilizando multer
const storage = multer.diskStorage({
    // Define el nombre del archivo en función de la fecha actual y el nombre original del archivo
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
    // Define la carpeta de destino para guardar los archivos subidos
    destination: (req, file, cb) => {
        // Define la ruta absoluta de la carpeta de destino utilizando el módulo path
        const folder = path.join(__dirname, '../../public/uploads');
        console.log(folder);
        // Llama a la función de devolución de llamada con la ruta de la carpeta de destino
        cb(null, folder);
    }
});

// Lista de tipos de archivos válidos que se pueden subir
const VALID_FILE_TYPES = ['image/png', 'image/jpg', 'image/jpeg', 'image/webp'];

// Función de filtro de archivos para verificar si el tipo de archivo es válido
const fileFilter = (req, file, cb) => {
    // Verifica si el tipo de archivo no está incluido en la lista de tipos de archivo válidos
    if (!VALID_FILE_TYPES.includes(file.mimetype)) {
        // Si el tipo de archivo no es válido, crea un nuevo error
        const error = new Error('File type not supported');
        // Llama a la función de devolución de llamada con el error
        cb(error);
    } else {
        // Si el tipo de archivo es válido, llama a la función de devolución de llamada sin errores
        cb(null, true);
    }
};

// Configuración de multer con las opciones de almacenamiento y filtro de archivos
const upload = multer({ storage, fileFilter });

// Función para guardar una imagen de una URL en el servidor local
const saveImageFromURL = async (url, filename) => {
    try {
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        const imagePath = path.join(__dirname, '../../public/uploads', filename);
        fs.writeFileSync(imagePath, response.data);
        return imagePath;
    } catch (error) {
        throw error;
    }
};

// Exporta el middleware upload y la función saveImageFromURL
module.exports = { upload, saveImageFromURL };
