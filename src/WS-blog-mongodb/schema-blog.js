const mongoose = require('mongoose');

// Definição do esquema para o Blog
const blogSchema = new mongoose.Schema({
    titulo: String,
    linkimg: String,
    datapublicacao: String,
    texto: String
});

const Blog = mongoose.model('Blog', blogSchema);   // Criando o modelo Blog com o esquema

module.exports = Blog;