const axios = require('axios');
const cheerio = require('cheerio');
const mongoose = require('mongoose');
const Blog = require('./schema-blog');

const urlpai = 'https://www.gov.br/pt-br/noticias';

mongoose.connect('mongodb+srv://admin:456123@cluster0.v2rjt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(result => {
        console.log('Conexão funcionando!')
    })
    .catch(error => {

        console.log('Deu problema!' + error)
    });

function salvandodados(dt) {
    const novodado = new Blog({
        titulo: dt.titulo,
        linkimg: dt.linkimg,
        datapublicacao: dt.datapublicacao,
        texto: dt.texto
    });

    return Blog.find({ titulo: dt.titulo }).then((otitulo) => {
        if (otitulo.length === 0) {
            novodado.save();
            console.log('Dado NÃO CADASTRADO!');
        } else {
            console.log('Dado JÁ CADASTRADO!');
        }
    }).catch((error) => {
        console.error(error);
    });
}


function extraidados(link) {
    axios.get(link).then(resp => {
        const dadoshtml = resp.data;
        const $ = cheerio.load(dadoshtml);

        const titulo = $('h1').text();
        const linkimg = $('img').attr('src');
        const datapublicacao = $('.documentPublished .value').text();  // Ou $('span[class="value"]').text();
        const texto = $('div[property="rnews:articleBody"]').text();

        const dados = { titulo, linkimg, datapublicacao, texto };

        //console.log(dados);
        salvandodados(dados);
    });
}

const links = axios.get(urlpai).then(resp => {
    const dadoshtml = resp.data;
    const $ = cheerio.load(dadoshtml);

    const dados = [];
    $('a[class="summary url"]').each((i, e) => {
        const link = $(e).attr('href');
        //console.log(link)
        dados.push(link);
    });
    return dados
});

async function main() {
    const lnks = await links
    lnks.map((i, e) => {
        extraidados(i);
    })
};

main();

setTimeout(() => {
    mongoose.connection.close();
    console.log('Fechando conexões!')
}, 25000);