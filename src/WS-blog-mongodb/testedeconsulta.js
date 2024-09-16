const mongoose = require('mongoose');
const Blog = require('./schema-blog');

const frase = 'Fundo Amazônia: Dinamarca anuncia doação de R$ 110 milhões';

mongoose.connect('mongodb+srv://admin:456123@cluster0.v2rjt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(() => {
    console.log('Conexão funcionando!');

    // Procurando a frase no banco de dados
    return Blog.find({ 'titulo': frase });
})
.then((otitulo) => {
    if (otitulo.length === 0) {
        console.log('Dado NÃO CADASTRADO!');
    } else {
        console.log('Dado JÁ CADASTRADO!');
    }
})
.catch((error) => {
    console.error(error);
});

setTimeout(() => {
    mongoose.connection.close();
    console.log('Fechando conexões!')
}, 25000);