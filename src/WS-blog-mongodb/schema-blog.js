const mongoose = require('mongoose');

// Definindo o esquema para o Blog
const blogSchema = new mongoose.Schema({
    titulo: String,
    linkimg: String,
    datapublicacao: String,  // Certifique-se de que os nomes dos campos estão corretos
    texto: String
});

// Criando o modelo Blog com o esquema definido
const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;